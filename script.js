const graphElement = document.querySelector("#variant-graph");
const statusElement = document.querySelector("#status");
const modeButtons = document.querySelectorAll(".mode-button");

let projectData;
let activeComparisonId;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nodeById(id) {
  return projectData.nodes.find((node) => node.id === id);
}

function renderGraph() {
  const rows = [];
  projectData.nodes.forEach((node, index) => {
    rows.push(`
      <article class="variant-node">
        <img src="${escapeHtml(node.image)}" alt="${escapeHtml(node.alt)}">
        <div>
          <p class="node-kicker">${escapeHtml(node.label)} · ${escapeHtml(node.data_status)}</p>
          <p class="node-prompt">${escapeHtml(node.prompt)}</p>
        </div>
      </article>
    `);

    if (index < projectData.nodes.length - 1) {
      const comparison = projectData.comparisons.find((item) => item.from === node.id);
      rows.push(`
        <div class="edge-row">
          <span class="edge-line" aria-hidden="true"></span>
          <button class="edge-button" data-comparison="${escapeHtml(comparison.id)}">Inspect ${escapeHtml(comparison.edit)}</button>
        </div>
      `);
    }
  });
  graphElement.innerHTML = rows.join("");
  graphElement.querySelectorAll(".edge-button").forEach((button) => {
    button.addEventListener("click", () => selectComparison(button.dataset.comparison));
  });
}

function imageCard(node, position) {
  return `<figure class="image-card">
    <img src="${escapeHtml(node.image)}" alt="${escapeHtml(node.alt)}">
    <figcaption><span>${position}: ${escapeHtml(node.label)} · ${escapeHtml(node.data_status)}</span></figcaption>
  </figure>`;
}

function selectComparison(id) {
  const comparison = projectData.comparisons.find((item) => item.id === id);
  if (!comparison) return;
  activeComparisonId = id;

  const before = nodeById(comparison.from);
  const after = nodeById(comparison.to);
  document.querySelector("#edit-text").textContent = comparison.edit;
  document.querySelector("#prompt-pair").innerHTML = `
    <div class="prompt-card"><strong>Before</strong>${escapeHtml(before.prompt)}</div>
    <div class="prompt-card"><strong>After</strong>${escapeHtml(after.prompt)}</div>`;
  document.querySelector("#image-pair").innerHTML = imageCard(before, "Before") + imageCard(after, "After");

  const preference = comparison.preference;
  document.querySelector("#preference-text").textContent = preference.available
    ? `${preference.statement} (${preference.data_status})`
    : "No public preference record is available for this pair.";

  document.querySelector("#change-tags").innerHTML = comparison.ai_interpretation.tags
    .map((tag) => `<span class="change-tag">${escapeHtml(tag)}</span>`)
    .join("");
  document.querySelector("#ai-summary").textContent = comparison.ai_interpretation.summary;

  document.querySelectorAll(".edge-button").forEach((button) => {
    const selected = button.dataset.comparison === id;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  statusElement.textContent = `Showing ${before.label} → ${after.label}.`;
}

function setMode(mode) {
  const baseline = mode === "baseline";
  document.body.classList.toggle("baseline-mode", baseline);
  modeButtons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  statusElement.textContent = baseline
    ? "Baseline mode: graph and adjacent prompt-image evidence only."
    : "Redesign mode: evidence, preference context, and labeled interpretation.";
  if (activeComparisonId) selectComparison(activeComparisonId);
}

modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));

fetch("data/prototype.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Data request failed (${response.status})`);
    return response.json();
  })
  .then((data) => {
    projectData = data;
    renderGraph();
    selectComparison(data.comparisons[0].id);
  })
  .catch((error) => {
    statusElement.classList.add("error");
    statusElement.textContent = "Prototype data could not be loaded. Run this project through a local HTTP server rather than opening index.html directly.";
    graphElement.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  });
