const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const colors = {
  "Addition": "#14766b",
  "Removal": "#aa3f2e",
  "Mixed / replacement": "#7652c7",
  "Parameter-only": "#7b8498"
};

const state = {
  analysis: null,
  prototype: null,
  transitions: [],
  selectedId: "t2231-1",
  filters: { search: "", edit: "all", upscale: "all", minChange: 0 },
  sort: "change"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function prepareTransitions() {
  state.transitions = state.analysis.threads.flatMap((thread) => {
    const records = new Map(thread.records.map((record) => [record.id, record]));
    return thread.transitions
      .filter((transition) => thread.retained_transition_ids.includes(transition.id))
      .map((transition) => ({ ...transition, before: records.get(transition.from), after: records.get(transition.to), thread }));
  });
}

function filteredTransitions() {
  const query = state.filters.search.trim().toLowerCase();
  return state.transitions.filter((item) => {
    const textMatches = !query || `${item.before.prompt} ${item.after.prompt}`.toLowerCase().includes(query);
    const editMatches = state.filters.edit === "all" || item.edit_type === state.filters.edit;
    const upscaleMatches = state.filters.upscale === "all" || String(item.later_upscaled) === state.filters.upscale;
    return textMatches && editMatches && upscaleMatches && item.prompt_change >= state.filters.minChange;
  });
}

function selectedTransition() {
  return state.transitions.find((item) => item.id === state.selectedId) || state.transitions[0];
}

function renderMetrics(items) {
  $("#metric-threads").textContent = new Set(items.map((item) => item.thread_id)).size;
  $("#metric-transitions").textContent = items.length;
  $("#metric-prompt").textContent = items.length ? mean(items.map((item) => item.prompt_change)).toFixed(2) : "—";
  $("#metric-caption").textContent = items.length ? mean(items.map((item) => item.caption_change)).toFixed(2) : "—";
}

function renderEditChart(items) {
  const types = Object.keys(colors);
  const counts = Object.fromEntries(types.map((type) => [type, items.filter((item) => item.edit_type === type).length]));
  const max = Math.max(1, ...Object.values(counts));
  const width = 440, height = 260, left = 145, right = 35, top = 20, row = 55;
  const bars = types.map((type, index) => {
    const y = top + index * row;
    const barWidth = (counts[type] / max) * (width - left - right);
    const selected = state.filters.edit === type;
    return `<g class="edit-bar" data-type="${escapeHtml(type)}" tabindex="0" role="button" aria-label="Filter ${escapeHtml(type)}, ${counts[type]} transitions">
      <text class="bar-label" x="0" y="${y + 16}">${escapeHtml(type)}</text>
      <rect x="${left}" y="${y}" width="${barWidth}" height="24" rx="6" fill="${colors[type]}" opacity="${selected || state.filters.edit === "all" ? 1 : .35}"></rect>
      <text class="bar-value" x="${left + barWidth + 7}" y="${y + 16}">${counts[type]}</text>
    </g>`;
  }).join("");
  $("#edit-chart").innerHTML = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">${bars}</svg>`;
  $$(".edit-bar").forEach((bar) => {
    const activate = () => {
      state.filters.edit = state.filters.edit === bar.dataset.type ? "all" : bar.dataset.type;
      $("#edit-filter").value = state.filters.edit;
      renderAll();
    };
    bar.addEventListener("click", activate);
    bar.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") activate(); });
  });
}

function renderScatter(items) {
  const width = 680, height = 330, left = 55, right = 24, top = 18, bottom = 48;
  const xMax = .7, yMax = 1;
  const x = (value) => left + Math.min(value, xMax) / xMax * (width - left - right);
  const y = (value) => height - bottom - Math.min(value, yMax) / yMax * (height - top - bottom);
  const xTicks = [0, .2, .4, .6];
  const yTicks = [0, .25, .5, .75, 1];
  const grid = yTicks.map((tick) => `<line class="grid-line" x1="${left}" x2="${width-right}" y1="${y(tick)}" y2="${y(tick)}"></line><text class="axis-label" x="${left-9}" y="${y(tick)+3}" text-anchor="end">${tick.toFixed(2)}</text>`).join("");
  const xAxis = xTicks.map((tick) => `<line class="axis-line" x1="${x(tick)}" x2="${x(tick)}" y1="${height-bottom}" y2="${height-bottom+5}"></line><text class="axis-label" x="${x(tick)}" y="${height-bottom+19}" text-anchor="middle">${tick.toFixed(1)}</text>`).join("");
  const points = items.map((item) => `<circle class="scatter-point${item.id === state.selectedId ? " selected" : ""}" tabindex="0" role="button" aria-label="Thread ${item.thread_id}, prompt change ${item.prompt_change}, caption change ${item.caption_change}" data-id="${item.id}" cx="${x(item.prompt_change)}" cy="${y(item.caption_change)}" r="5" fill="${colors[item.edit_type]}"></circle>`).join("");
  $("#scatter-chart").innerHTML = `<svg viewBox="0 0 ${width} ${height}">
    ${grid}<line class="axis-line" x1="${left}" x2="${width-right}" y1="${height-bottom}" y2="${height-bottom}"></line>${xAxis}${points}
    <text class="axis-label" x="${(left+width-right)/2}" y="${height-8}" text-anchor="middle">Prompt-token change →</text>
    <text class="axis-label" transform="translate(13 ${(top+height-bottom)/2}) rotate(-90)" text-anchor="middle">BLIP-2 caption-token change →</text>
  </svg>`;
  $$(".scatter-point").forEach((point) => {
    const item = state.transitions.find((candidate) => candidate.id === point.dataset.id);
    const activate = () => selectTransition(point.dataset.id, true);
    point.addEventListener("click", activate);
    point.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") activate(); });
    point.addEventListener("pointerenter", (event) => showTooltip(event, `<strong>Thread ${item.thread_id}</strong><br>${escapeHtml(item.edit_type)}<br>Prompt ${item.prompt_change.toFixed(2)} · caption ${item.caption_change.toFixed(2)}`));
    point.addEventListener("pointermove", moveTooltip);
    point.addEventListener("pointerleave", hideTooltip);
  });
}

function renderLandscape(items) {
  const byThread = new Map();
  items.forEach((item) => {
    if (!byThread.has(item.thread_id)) byThread.set(item.thread_id, []);
    byThread.get(item.thread_id).push(item);
  });
  let rows = [...byThread.entries()].map(([threadId, transitions]) => ({
    threadId, transitions: transitions.sort((a, b) => a.before.timestamp.localeCompare(b.before.timestamp)),
    meanChange: mean(transitions.map((item) => item.prompt_change)),
    recordCount: new Set(transitions.flatMap((item) => [item.from, item.to])).size
  }));
  rows.sort((a, b) => state.sort === "length" ? b.recordCount - a.recordCount : state.sort === "id" ? a.threadId - b.threadId : b.meanChange - a.meanChange);
  $("#thread-landscape").innerHTML = rows.length ? rows.map((row) => {
    const track = row.transitions.map((item, index) => `${index === 0 ? '<span class="record-node" aria-hidden="true"></span>' : ''}<button class="transition-segment${item.id === state.selectedId ? " selected" : ""}" style="--weight:${Math.max(.5,item.prompt_change*5)};--segment-color:${colors[item.edit_type]}" data-id="${item.id}" aria-label="Inspect ${escapeHtml(item.edit_type)} in thread ${row.threadId}"></button><span class="record-node" aria-hidden="true"></span>`).join("");
    return `<div class="thread-row"><span class="thread-label">Thread ${row.threadId}</span><div class="thread-track">${track}</div><span class="thread-meta">${row.recordCount} steps · ${row.meanChange.toFixed(2)}</span></div>`;
  }).join("") : '<p class="empty-evidence">No transitions match these filters. Reset or broaden the selection.</p>';
  $$(".transition-segment").forEach((button) => button.addEventListener("click", () => selectTransition(button.dataset.id, true)));
}

function renderMatrix(item) {
  const threadTransitions = item.thread.transitions.filter((transition) => item.thread.retained_transition_ids.includes(transition.id));
  const focuses = ["Subject / other", "Quality / rendering", "Style / mood", "Camera / composition", "Color / lighting", "Environment", "No lexical change"];
  const header = threadTransitions.map((transition, index) => `<th scope="col">R${index + 1}→R${index + 2}</th>`).join("");
  const body = focuses.map((focus) => {
    const cells = threadTransitions.map((transition) => {
      const active = transition.focus.includes(focus);
      return `<td class="${active ? "active" : ""}"><button data-id="${transition.id}" aria-label="${escapeHtml(focus)} ${active ? "changed" : "did not change"} in ${transition.id}">${active ? "●" : ""}</button></td>`;
    }).join("");
    return `<tr><th scope="row">${escapeHtml(focus)}</th>${cells}</tr>`;
  }).join("");
  $("#focus-matrix").innerHTML = `<table class="matrix-table"><thead><tr><th>Focus</th>${header}</tr></thead><tbody>${body}</tbody></table>`;
  $$("#focus-matrix button").forEach((button) => button.addEventListener("click", () => selectTransition(button.dataset.id, false)));
}

function tagList(values, className, emptyText) {
  return values.length ? values.map((value) => `<span class="token ${className}">${escapeHtml(value)}</span>`).join("") : `<span class="token">${emptyText}</span>`;
}

function prototypeNode(recordId) {
  return state.prototype.nodes.find((node) => node.id === recordId);
}

function renderInspector(item) {
  const beforeDemo = prototypeNode(item.from);
  const afterDemo = prototypeNode(item.to);
  $("#selected-thread-badge").textContent = `Thread ${item.thread_id}`;
  const images = beforeDemo && afterDemo ? `<div class="image-pair">
    <figure class="image-card"><img src="${escapeHtml(beforeDemo.image)}" alt="${escapeHtml(beforeDemo.alt)}"><figcaption>Before · regenerated demonstration</figcaption></figure>
    <figure class="image-card"><img src="${escapeHtml(afterDemo.image)}" alt="${escapeHtml(afterDemo.alt)}"><figcaption>After · regenerated demonstration</figcaption></figure>
  </div><p class="claim-note">These are newly generated demonstrations, not the unavailable historical Midjourney outputs. They cannot isolate causal effects.</p>` : `<div class="empty-evidence">No regenerated demonstration was created for this sampled transition. The interface does not substitute the expired source image with an unlabeled proxy.</div>`;
  const captions = (record) => escapeHtml(record.captions.filter(Boolean).join(" · "));
  $("#inspector-content").innerHTML = `
    <div class="transition-heading"><strong>${escapeHtml(item.edit_type)}</strong><span>${new Date(item.before.timestamp).toLocaleString()} → ${new Date(item.after.timestamp).toLocaleString()}</span></div>
    <section class="evidence-block recorded-layer"><div class="evidence-title"><h3>Exact prompt records</h3><span class="badge source-badge">Recorded</span></div><div class="prompt-pair">
      <div class="prompt-card"><strong>Before · ${escapeHtml(item.from)}</strong>${escapeHtml(item.before.prompt)}<br><small>${escapeHtml(item.before.args || "No parameters")}</small></div>
      <div class="prompt-card"><strong>After · ${escapeHtml(item.to)}</strong>${escapeHtml(item.after.prompt)}<br><small>${escapeHtml(item.after.args || "No parameters")}</small></div>
    </div><p class="claim-note">Later output action: ${item.later_upscaled ? "upscaled" : "not upscaled"}. This is a behavioral trace, not a quality or preference score.</p></section>
    <section class="evidence-block derived-layer"><div class="evidence-title"><h3>Token change + measures</h3><span class="badge derived-badge">Derived</span></div>
      <div class="diff-row">${tagList(item.removed,"removed","No removed terms")}${tagList(item.added,"added","No added terms")}</div>
      <div class="measure-grid"><div class="measure"><strong>${item.prompt_change.toFixed(2)}</strong><span>prompt-token Jaccard distance</span></div><div class="measure"><strong>${item.caption_change.toFixed(2)}</strong><span>caption-token Jaccard distance</span></div></div>
    </section>
    <section class="evidence-block ai-layer"><div class="evidence-title"><h3>Dataset image captions</h3><span class="badge interpretation-badge">BLIP-2 · AI-derived</span></div><div class="caption-pair">
      <div class="caption-card"><strong>Before captions</strong>${captions(item.before)}</div><div class="caption-card"><strong>After captions</strong>${captions(item.after)}</div>
    </div><p class="claim-note">These captions describe model-observed content imperfectly. The caption-change score is not ground truth.</p></section>
    <section class="evidence-block generated-layer"><div class="evidence-title"><h3>Regenerated comparison</h3><span class="badge generated-badge">Demonstration</span></div>${images}</section>`;
  applyLayerVisibility();
}

function selectTransition(id, scroll) {
  const item = state.transitions.find((candidate) => candidate.id === id);
  if (!item) return;
  state.selectedId = id;
  renderScatter(filteredTransitions());
  renderLandscape(filteredTransitions());
  renderMatrix(item);
  renderInspector(item);
  $("#status").textContent = `Selected thread ${item.thread_id}: ${item.edit_type.toLowerCase()}, prompt change ${item.prompt_change.toFixed(2)}, caption change ${item.caption_change.toFixed(2)}.`;
  if (scroll) $("#inspector").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBaseline() {
  const comparisons = new Map(state.prototype.comparisons.map((comparison) => [comparison.from, comparison]));
  const rows = [];
  state.prototype.nodes.forEach((node, index) => {
    rows.push(`<article class="baseline-node"><img src="${escapeHtml(node.image)}" alt="${escapeHtml(node.alt)}"><div><p>${escapeHtml(node.label)} · ${escapeHtml(node.prompt)}</p><small>${escapeHtml(node.args)}</small></div></article>`);
    if (index < state.prototype.nodes.length - 1) {
      const comparison = comparisons.get(node.id);
      rows.push(`<div class="baseline-edge"><i aria-hidden="true"></i><button data-id="t2231-${index+1}">Inspect ${escapeHtml(comparison.edit)}</button></div>`);
    }
  });
  $("#baseline-graph").innerHTML = rows.join("");
  $$("#baseline-graph button").forEach((button) => button.addEventListener("click", () => { setMode("explore"); selectTransition(button.dataset.id, true); }));
}

function renderEvaluation() {
  const metrics = [
    { label: "Prompt-edit identification", baseline: 50, redesign: 100, b: "2/4", r: "4/4" },
    { label: "Provenance distinction", baseline: 0, redesign: 100, b: "0/4", r: "4/4" },
    { label: "Median confidence", baseline: 70, redesign: 90, b: "3.5/5", r: "4.5/5" },
    { label: "Median completion time", baseline: 100, redesign: 76, b: "87.5s", r: "66.5s" }
  ];
  $("#evaluation-chart").innerHTML = metrics.map((item) => `<article class="evaluation-card"><h3>${item.label}</h3>
    <div class="eval-row"><span>Baseline</span><div class="eval-track"><div class="eval-fill" style="width:${item.baseline}%"></div></div><strong>${item.b}</strong></div>
    <div class="eval-row redesign"><span>Redesign</span><div class="eval-track"><div class="eval-fill" style="width:${item.redesign}%"></div></div><strong>${item.r}</strong></div></article>`).join("");
}

function renderMethod() {
  const method = state.analysis.method;
  $("#method-text").innerHTML = `<p><strong>Source:</strong> ${escapeHtml(method.source)} (${method.source_rows.toLocaleString()} records; ${method.source_threads.toLocaleString()} threads).</p>
    <p><strong>Analysis filter:</strong> ${escapeHtml(method.filter)} This yields ${method.qualifying_transitions.toLocaleString()} transitions across ${method.qualifying_threads.toLocaleString()} threads.</p>
    <p><strong>Browser display:</strong> ${escapeHtml(method.display_sample)} The current file contains ${method.display_threads} threads and ${method.display_transitions} transitions for responsive exploration.</p>
    <p><strong>Boundary:</strong> ${escapeHtml(method.caption_note)} ${escapeHtml(method.semantic_note)}</p>`;
}

function renderAll() {
  const items = filteredTransitions();
  if (items.length && !items.some((item) => item.id === state.selectedId)) state.selectedId = items[0].id;
  renderMetrics(items); renderEditChart(items); renderScatter(items); renderLandscape(items);
  const selected = selectedTransition();
  renderMatrix(selected); renderInspector(selected);
  $("#status").textContent = `Showing ${items.length} revisions across ${new Set(items.map((item) => item.thread_id)).size} sampled threads.`;
}

function applyLayerVisibility() {
  const layers = Object.fromEntries($$("[data-layer]").map((input) => [input.dataset.layer, input.checked]));
  ["derived", "ai", "generated"].forEach((layer) => $$(`.${layer}-layer`).forEach((element) => element.classList.toggle("layer-hidden", !layers[layer])));
}

function setMode(mode) {
  const explore = mode === "explore";
  $("#explorer").hidden = !explore; $("#baseline").hidden = explore;
  $$(".mode-button").forEach((button) => { const active = button.dataset.mode === mode; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
  $("#status").textContent = explore ? "Redesign explorer: overview, coordinated filters, selection, and details on demand." : "Baseline case: one linear thread with adjacent comparisons only.";
}

function showTooltip(event, html) { const tooltip = $("#tooltip"); tooltip.innerHTML = html; tooltip.hidden = false; moveTooltip(event); }
function moveTooltip(event) { const tooltip = $("#tooltip"); tooltip.style.left = `${Math.min(window.innerWidth - 290, event.clientX + 14)}px`; tooltip.style.top = `${Math.max(8, event.clientY - 36)}px`; }
function hideTooltip() { $("#tooltip").hidden = true; }

function bindControls() {
  $("#search-input").addEventListener("input", (event) => { state.filters.search = event.target.value; renderAll(); });
  $("#edit-filter").addEventListener("change", (event) => { state.filters.edit = event.target.value; renderAll(); });
  $("#upscale-filter").addEventListener("change", (event) => { state.filters.upscale = event.target.value; renderAll(); });
  $("#change-filter").addEventListener("input", (event) => { state.filters.minChange = Number(event.target.value); $("#change-output").textContent = state.filters.minChange.toFixed(2); renderAll(); });
  $("#thread-sort").addEventListener("change", (event) => { state.sort = event.target.value; renderLandscape(filteredTransitions()); });
  $("#reset-filters").addEventListener("click", () => {
    state.filters = { search: "", edit: "all", upscale: "all", minChange: 0 };
    $("#search-input").value = ""; $("#edit-filter").value = "all"; $("#upscale-filter").value = "all"; $("#change-filter").value = 0; $("#change-output").textContent = "0.00"; renderAll();
  });
  $$("[data-layer]").forEach((input) => input.addEventListener("change", applyLayerVisibility));
  $$(".mode-button").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
}

Promise.all([
  fetch("data/analysis.json").then((response) => { if (!response.ok) throw new Error(`Analysis data failed (${response.status})`); return response.json(); }),
  fetch("data/prototype.json").then((response) => { if (!response.ok) throw new Error(`Prototype data failed (${response.status})`); return response.json(); })
]).then(([analysis, prototype]) => {
  state.analysis = analysis; state.prototype = prototype; prepareTransitions();
  const types = Object.keys(colors);
  $("#edit-filter").insertAdjacentHTML("beforeend", types.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join(""));
  bindControls(); renderBaseline(); renderEvaluation(); renderMethod(); renderAll();
}).catch((error) => {
  $("#status").classList.add("error");
  $("#status").textContent = "Analysis files could not be loaded. Serve this repository through a local HTTP server instead of opening index.html directly.";
  console.error(error);
});
