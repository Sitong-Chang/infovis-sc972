# Appendix A. Technical Evidence, Continuity, and Governance

## A1. Week 1–2 Integration Record

This project changes domain while preserving the earlier methodological development. “Retained” means the principle still shapes the redesign; “revised” means it is adapted to the new question; “rejected” means it is documented but not forced into the present artifact.

| Earlier component | Decision | Transfer to this project |
|---|---|---|
| 2056 aspiration: help people question opaque recommendations rather than accept outputs | Retain + revise | Extend transparency from ranking influence to prompt influence and AI interpretation. |
| Zhouzhuang community framing | Replace domain; retain community-validation method | Do not claim a Zhouzhuang need for this new topic. Treat DKU/Kunshan novice creators as a prospective community whose need requires dialogue. |
| Popularity/default transparency | Retain principle | Make influential system-produced interpretation inspectable rather than invisible. |
| Week 1 Ziman safeguard | Strongly retain | Visually distinguish recorded evidence, regenerated material, and AI interpretation. |
| Week 1 initial design | Revise | **[Insert exact title/link and one-sentence description of the Week 1 artifact.]** |
| Week 1 exhibition observation | Retain relevant cue | **[Insert exact observation, location/date, and photo reference.]** |
| Teammate insight | Retain only with exact wording | **[Insert teammate’s name/role if permitted and exact insight; do not reconstruct from memory.]** |
| Energy Lens domain and energy dataset | Reject for current domain | Energy records do not answer the prompt-revision research question. |
| Energy Lens: different questions require different idioms | Retain | Keep the graph for history; add the inspector only for focused evidence comparison. |
| Total versus per-capita transformation lesson | Retain governance principle | Derived word diffs and AI summaries are labeled rather than presented as neutral source facts. |
| Provenance, missingness, and failure states | Retain | Show original-image HTTP 404, regenerated-image status, and interpretation labels. |
| Human design decisions | Retain | Record graph retention, non-ranking of upscale, and evidence/interpretation separation. |

Prior Week 2 artifact: **[insert exact Hugging Face Space/site URL]**.  
Week 2 dataset and version: **[insert exact dataset name, URL, and version/commit]**.

## A2. Field Evidence, Open-Source Precedents, Community, and SDG

### A2.1 Required field-photo panels

The statements below separate observation from inference. Replace every bracketed field with the original Week 2 evidence.

| Panel | Place/date/photo | Accessible alt text | Observation | Inference and design consequence |
|---|---|---|---|---|
| Tencent industry opportunity | **[exact location, date, photo number]** | **[literal description of visible panel]** | **[record only what is visibly present]** | Coordinated views may help audiences move between overview and detail; this informed the graph-plus-inspector structure. |
| Museum public opportunity | **[exact museum, date, photo number]** | **[literal description of visible exhibit]** | **[record only what is visibly present]** | Different visual forms may support different public questions; this informed the focused comparison view. |

### A2.2 Two student-discovered open-source precedents

| Precedent | Site/repository/license/version | Useful idea | Limitation for this project |
|---|---|---|---|
| **[Precedent 1 name]** | **[demo] · [repository] · [license] · [commit/version]** | **[specific transferred interaction or encoding]** | **[specific non-transferable condition]** |
| **[Precedent 2 name]** | **[demo] · [repository] · [license] · [commit/version]** | **[specific transferred interaction or encoding]** | **[specific non-transferable condition]** |

PrompTHis is the selected research system, not one of the two student-discovered precedents.

### A2.3 Community hypothesis and missing voices

**Prospective community:** DKU students and novice digital creators in Kunshan who use generative AI for coursework, design, or creative experimentation.

**Hypothesis:** novice creators may benefit from an interface that distinguishes prompt-edit history, regenerated visual evidence, historical interaction traces, and AI interpretation.

This is not yet a validated community need. Missing voices include art/design students, professional creators, instructors, people who avoid generative AI, and the anonymous creator represented in the selected thread. A future dialogue should ask what evidence these groups need, whether the terminology is understandable, and what forms of creative-history reuse they consider acceptable.

### A2.4 SDG mechanism

| Element | Scoped statement |
|---|---|
| Target | UN SDG 4.4: relevant technical/vocational and ICT skills |
| Technology | Prompt-conditioned generation and multimodal comparison |
| Visual mechanism | Persistent provenance legend plus separated evidence/interpretation blocks |
| Possible use | Practice inspecting AI-supported creative records |
| Observable outcome | Correctly classify displayed material by provenance and avoid equating upscale with objective preference |
| Claim boundary | The prototype may support a literacy mechanism; it does not achieve SDG 4.4 by itself |

## A3. Data Contract and Governance Record

### A3.1 Three data conditions

| Condition | Artifact and coverage | Governance response |
|---|---|---|
| Current/baseline data | Attributed reconstruction of the PrompTHis Image Variant Graph; no original PrompTHis session export | State reconstruction status and do not claim full replication. |
| Complementary public data | Midjourney Threads, `data/threads_0.csv`, thread 2231, three consecutive records | Preserve exact identifiers, prompts, timestamps, parameters, and upscale labels. |
| No suitable open data | Creator intention and explicit preference for each edit; historical image URLs are inaccessible | Do not infer intention/preference; display original-image failure; use clearly labeled regenerated demonstrations. |

### A3.2 Selected source records

| Step | Record ID | UTC timestamp | Parameters | Upscaled label |
|---|---|---|---|---|
| 1 | `1071138984736084058` | 2023-02-03 18:43:54.761 | `--chaos 50` | False |
| 2 | `1071139569849880656` | 2023-02-03 18:46:14.263 | `--quality 5` | True |
| 3 | `1071140082511253515` | 2023-02-03 18:48:16.491 | `--quality 5` | True |

Selection rule: three consecutive English-language records were chosen because they contain two compact, inspectable revisions. The sample supports a demonstration task, not statistical claims.

### A3.3 Provenance classes and transformations

| Class | Fields shown | Processing |
|---|---|---|
| Recorded source | prompt, arguments, ID, timestamp, thread ID, upscale Boolean | Copied from selected CSV rows and checked against the source file |
| Derived | added/removed terms | Deterministic comparison stored in JSON; source spelling “forrest” is preserved |
| Regenerated | three WebP images | Independently generated from recorded prompts with shared framing constraints; visually inspected |
| AI interpretation | visual tags and summaries | Pre-generated, manually compared with displayed images, stored locally |
| Missing | three historical images, intention, explicit preference | HTTP 404 recorded for image URLs; other fields marked unavailable rather than inferred |

### A3.4 FAIR, Datasheets, reuse, and CARE

- **Findable:** paper, dataset repository, source file, thread ID, and record IDs are documented.
- **Accessible:** the public CSV and local JSON can be inspected without an API; the historical CDN images are no longer accessible.
- **Interoperable:** the selected fields are mapped into a small documented JSON structure.
- **Reusable:** source and transformation notes support checking, but the dataset repository does not display a separate data license. Redistribution beyond the minimal sample requires confirmation.
- **Datasheets:** motivation, composition, collection context, transformations, intended task, limitations, and missing data are documented here.
- **CARE relevance:** no Indigenous community or authority is identified in the selected sample, so the project does not make an Indigenous-data governance claim. Benefit to the proposed DKU/Kunshan community remains a hypothesis requiring dialogue.

Personal identifiers are not displayed. The dataset’s anonymous user ID and Discord channel ID are excluded from the interface because they are unnecessary for the task.

## A4. Technical Evidence and Reproduction

| Item | Evidence |
|---|---|
| Repository | https://github.com/dku-infosci301-Autumn2026/infovis-sc972 |
| Live demo | https://infovis-sc972.vercel.app/ |
| Entry file | `index.html` |
| Data file | `data/prototype.json` |
| Image-generation record | `docs/image-generation-record.md` |
| Evaluation record | `docs/evaluation-record.md` |
| Local run | `python -m http.server 8000`, then open `http://localhost:8000` |
| Dependencies | No build step, package manager, API key, or backend |

### A4.1 Tested interaction

1. Page loads three records from Midjourney Threads thread 2231.
2. Selecting either graph edge updates before/after prompts, images, historical action, and summary.
3. Baseline hides the historical-action and interpretation blocks.
4. Redesign restores the four provenance layers.
5. Controls expose keyboard focus and `aria-pressed`; images include alt text.

Checks completed on 13 September 2026:

- Vercel page, CSS, JavaScript, JSON, and three WebP assets returned HTTP 200.
- Both edit buttons updated the inspector.
- Baseline/Redesign visibility behavior worked.
- JSON parsed successfully and JavaScript passed syntax checking.
- The historical Discord image URLs returned HTTP 404.

### A4.2 Failure handling

- Data-fetch failure produces an explicit error message and local-server instruction.
- Historical-image failure remains visible next to the regenerated comparison.
- Creator intention and explicit preference are marked unavailable.
- No runtime AI dependency exists; stored summaries remain inspectable if an external service is unavailable.

### A4.3 GitHub evidence trail

| Commit | Date | Recorded message | Interpreted milestone |
|---|---|---|---|
| `26b9fa1` | 2026-09-13 | `feat: add evidence-aware redesign prototype` | Initial working artifact |
| `9e18a71` | 2026-09-13 | `Add files via upload` | Repository upload |
| `9d3c40e` | 2026-09-13 | `Add files via upload` | Midjourney example and generated assets |
| `6e02c80`–`f6afc47` | 2026-09-13 | `Add files via upload` | Documentation and interface iterations |

Because several commits use the generic web-upload message, the milestone interpretation is supported by file history rather than the message alone. Three unused legacy SVGs remain in the repository and should be deleted before final submission: `variant-a.svg`, `variant-b.svg`, and `variant-c.svg`.

## A5. Evaluation Materials and Revision Record

Evaluation task, measures, success criterion, and the four-participant simulated reporting scaffold are stored in `docs/evaluation-record.md`. The simulated values are not participant findings and must be replaced after testing.

Planned counterbalancing:

- P1/P3: Baseline edge 1, then Redesign edge 2.
- P2/P4: Redesign edge 1, then Baseline edge 2.

Questions cover prompt changes, visual changes, provenance classification, upscale interpretation, confidence, and confusion. Raw notes should preserve participant wording while using only anonymized IDs.

Anticipated-usability walkthroughs motivated three pre-test revisions: add a persistent provenance legend, strengthen the regenerated-image badge, and shorten warnings into “Claim limit” statements. These are designer-led revisions, not participant-derived findings.

## A6. Human Decisions, Feedback, Migration, and Credits

### Human decisions

1. Retain the graph for history and add, rather than substitute, the inspector.
2. Keep upscale as contextual text rather than ranking or node size.
3. Use separate colors and language for recorded, regenerated, interpreted, and unavailable material.

### Accepted and rejected directions

| Direction | Decision | Reason |
|---|---|---|
| Pick-a-Pic preference data on prompt-edit edges | Rejected | Pick-a-Pic compares two images for one prompt; its label does not measure a prompt revision. |
| Midjourney Threads iterative records | Accepted | Consecutive prompts match the edge-based revision task. |
| Live multimodal API | Rejected for preliminary artifact | Adds keys, backend dependency, latency, and unrepeatable output. |
| Stored generated images and summaries | Accepted with labels | Enables a working static interaction and inspection. |
| Claim that PrompTHis lacks influence analysis | Rejected after paper verification | The original system explicitly compares prompt-image pairs and estimates edge influence. |

### Credits

- Project design, final decisions, verification, and responsibility: Sitong Chang.
- Selected system: Guo et al., PrompTHis.
- Additional dataset: Don-Yehiya, Choshen, and Abend, Midjourney Threads.
- AI assistance: documented in Appendix B.
- **[Add teammate/peer feedback credit only after confirming name, permission, and contribution.]**

