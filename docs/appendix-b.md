# Appendix B. AI Assistance and Human Verification

## B1. Assistance Record

| Tool/model/date                              | Purpose and significant input summary                                                                                                                        | Accepted output and location                                                                                                             | Rejected or revised output                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| OpenAI ChatGPT / GPT-5.6 Sol, September 2026 | Scope the redesign, inspect the repository structure, help draft HTML/CSS/JavaScript/JSON, and organize documentation                                        | Static interface in `index.html`, `style.css`, and `script.js`; documentation structure in `README.md` and `docs/`                       | Early ideas that overstated novelty or treated the redesign as a replacement for PrompTHis influence analysis were revised after checking the original paper.      |
| OpenAI image generation, September 2026      | Generate three prompt-conditioned demonstration images from the selected Midjourney Threads source prompts while keeping a broadly comparable visual framing | Regenerated image assets stored locally; generation details documented in `docs/image-generation-record.md`                              | No generated image was represented as an original historical Midjourney output. Composition differences beyond the edited terms were preserved rather than hidden. |
| OpenAI ChatGPT / GPT-5.6 Sol, September 2026 | Draft visual-change tags, multimodal summaries, provenance labels, and claim-limit wording                                                                   | Stored summaries in `data/prototype.json`; provenance and warning text in the Influence Inspector                                        | Wording that implied “upscale = preference,” “upscale = quality,” or causal prompt influence was rejected as unsupported.                                          |
| OpenAI ChatGPT / GPT-5.6 Sol, September 2026 | Help structure the research paper, Munzner validation table, governance documentation, appendices, and evaluation protocol                                   | `docs/paper-main-condensed.md`, `docs/evaluation-record.md`, `docs/appendix-a.md`, and this Appendix B                                   | Initial simulated evaluation scaffolds were used only as planning structures and were replaced after real participant testing.                                     |
| OpenAI ChatGPT / GPT-5.6 Sol, September 2026 | Help organize and summarize four anonymized participant records supplied by the student                                                                      | Aggregate evaluation table, formative findings, and revision directions in `docs/evaluation-record.md`, paper Section 4, and Appendix A5 | Strong causal claims such as “the redesign proved better performance” were rejected because the sample was small and tasks were not perfectly matched.             |

AI assistance supported implementation and drafting, but did not determine the final research claim or evidence boundary.

---

## B2. Human Decisions and Edits

The student selected PrompTHis as the primary visualization system, chose GitHub and Vercel for implementation and deployment, and approved the focused Influence Inspector scope.

Human judgment narrowed the contribution from a broad idea of “adding AI to PrompTHis” to a more specific research question:

> How can provenance-labeled multimodal comparison help novice creators inspect real prompt revisions without confusing recorded interaction data, regenerated visual evidence, and AI interpretation?

Material human decisions included:

* retaining the PrompTHis-style graph rather than replacing it;
* using Midjourney Threads as the complementary data source;
* rejecting the earlier Pick-a-Pic idea after determining that its preference structure did not represent prompt revisions;
* selecting thread `2231` as a compact three-step revision example;
* preserving the recorded source spelling “forrest” rather than silently correcting it;
* refusing to treat upscale as explicit preference or objective quality;
* labeling new images as regenerated demonstrations;
* exposing inaccessible historical image evidence rather than silently substituting new images;
* using pre-generated summaries rather than a live runtime AI API;
* separating recorded, derived, regenerated, interpreted, and missing evidence visually;
* using real formative evaluation data rather than the earlier simulated scaffold;
* interpreting the evaluation descriptively rather than causally;
* retaining participant comments about generation variability as a limitation rather than removing them;
* selecting the two Shanghai Science and Technology Museum photographs used in Appendix A;
* and approving the final wording, scope, and structure of the submission.

The student remains responsible for the final argument, code, evidence, citation choices, and submitted artifact.

---

## B3. Original Sources and Records Checked

The following original or primary materials informed the project and were checked during development:

* Guo et al., *PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation*;
* the official PrompTHis repository maintained by Vis4Sense;
* Don-Yehiya, Choshen, and Abend, *Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney*;
* the official `Mid-Journey-to-alignment` repository;
* `data/threads_0.csv`;
* the three selected records from thread `2231`;
* selected record IDs, prompts, generation arguments, timestamps, upscale labels, and historical image URLs;
* UN SDG 4, Target 4.4;
* the FAIR Guiding Principles;
* Datasheets for Datasets;
* the Week 1 Transparent Zhouzhuang Travel Recommendation Prototype;
* the Week 2 Energy Lens artifact;
* and two field-trip photographs taken at the Shanghai Science and Technology Museum on September 4, 2026.

Where original evidence was unavailable, the project marks the absence rather than reconstructing unsupported facts.

---

## B4. Image Generation and Multimodal Interpretation

### B4.1 Regenerated images

The three displayed comparison images are not historical Midjourney outputs.

They were newly generated from the selected recorded prompts to provide a working visual comparison after the historical source-image URLs became inaccessible.

The images are therefore labeled:

> **Regenerated demonstration**

rather than:

> original image
> source image
> historical Midjourney output

Generation details are recorded in:

`docs/image-generation-record.md`

The generated images were manually inspected for:

* broad consistency with the recorded prompt;
* presence of the intended shared subject;
* sufficient visual difference for comparison;
* absence of misleading source attribution;
* and obvious rendering failures.

Generation variability remains an explicit limitation.

### B4.2 AI-generated summaries

AI assistance was also used to draft short visual-change summaries and tags.

These summaries are stored locally rather than generated at runtime.

They are labeled as:

> **AI interpretation**

and are not treated as dataset fields or historical creator statements.

The student manually checked the summaries against the displayed regenerated images and revised wording that overstated causality.

For example, the project avoids statements such as:

> “Removing this word caused the composition change.”

Instead, it uses wording closer to:

> “The regenerated comparison shows a composition change associated with this revision, but independent generation prevents causal attribution.”

---

## B5. Data and Code Verification

The following checks were performed during development.

### B5.1 Data checks

* `data/prototype.json` parsed successfully.
* Selected prompts were checked against the source records.
* Record IDs and timestamps were preserved.
* Generation arguments were checked against the selected rows.
* Upscale labels were retained as historical Boolean records.
* The spelling “forrest” was preserved from the source prompt.
* Added and removed terms were treated as derived data rather than source fields.

### B5.2 Interface checks

* Both prompt-edit edges update the selected comparison.
* Baseline and Redesign modes switch correctly.
* Redesign-specific provenance and interpretation content appears only when intended.
* Image alt text is present.
* Keyboard-accessible controls expose visible focus states.
* Mode controls expose `aria-pressed`.
* Loading and error states are represented in the static implementation.
* The interface does not require a live API key or backend.

### B5.3 Deployment checks

The deployed Vercel artifact was checked during development for:

* HTML loading;
* CSS loading;
* JavaScript loading;
* JSON access;
* local generated image access;
* and working interaction updates.

The implementation uses static browser-compatible HTML, CSS, JavaScript, JSON, and local assets.

### B5.4 Historical source-image checks

The recorded historical Discord image URLs for the three selected records were checked on September 13, 2026.

All three returned HTTP 404.

This failure is treated as part of the data condition rather than hidden.

---

## B6. Evaluation Verification

A formative evaluation was completed with four anonymized DKU student participants using the first one-thread provenance redesign.

Participant records are stored in:

`docs/evaluation-record.md`

The student supplied the participant observations and timings. AI assistance was used to organize and summarize these records, not to invent participants or responses.

### B6.1 Real participant results

| Participant | Time | Confidence | Initial ambiguity | Correction cue |
|---|---:|---:|---|---|
| P1 | 68 s | 4/5 | Regenerated image read as historical output | Generated demonstration label |
| P2 | 91 s | 3/5 | Graph edge read as image similarity | Timestamps and prompt changes |
| P3 | 74 s | 4/5 | Upscale read as preference | Claim-limit warning |
| P4 | 112 s | 3/5 | AI interpretation read as a causal answer | Model-derived warning |
| **Median** | **82.5 s** | **3.5/5** | **4/4 began with an ambiguity** | **4/4 revised after a cue** |

Participant observations were retained even when they complicated the redesign claim.

For example, P1 exposed delayed provenance recognition, P2 exposed ambiguous edge meaning, P3 exposed preference inference from upscale, and P4 exposed the rhetorical authority of AI interpretation. These observations support clearer image-level provenance, direction cues, observed/unknown pairings, and a lighter hierarchy for model-derived explanations.

### B6.2 Evaluation claim boundary

The results are not presented as a controlled causal experiment.

Reasons include:

* only four participants;
* DKU student participants rather than representative professional creators;
* heterogeneous participant tasks and no controlled baseline;
* a short evaluation session;
* uncontrolled variation in regenerated images;
* and no user evaluation of the final multi-thread Explorer.

AI-assisted drafting therefore uses phrases such as:

* “formative results suggest”;
* “in this small sample”;
* “appeared to help”;
* and “descriptive result.”

The project avoids:

* “proved”;
* “demonstrated effectiveness”;
* “significantly improved”;
* or other unsupported inferential language.

---

## B7. Failures Corrected During Development

Several ideas or intermediate states were corrected during the project.

### 1. Pick-a-Pic mismatch

**Initial issue:** Pick-a-Pic was considered as complementary preference data.

**Correction:** The dataset compares outputs associated with the same prompt rather than directly measuring prompt-edit transitions.

**Decision:** Reject it for the edge-based prompt-revision task.

### 2. Overstating the PrompTHis gap

**Initial issue:** Early wording risked suggesting that PrompTHis only showed history and lacked influence analysis.

**Correction:** Review of the original paper confirmed that influence analysis is already central to the system.

**Decision:** Position the redesign as adding provenance separation and claim boundaries rather than inventing prompt influence analysis.

### 3. Illustrative image placeholders

**Initial issue:** Early placeholder visuals could be mistaken for evidence if left unlabeled.

**Correction:** Replace them with regenerated images and visibly label them as demonstrations.

### 4. Upscale interpretation

**Initial issue:** Upscale could easily be misread as preference or quality.

**Correction:** Keep it as a historical action and add a claim-limit explanation.

### 5. Long warning text

**Initial issue:** Early warnings were visually dense.

**Correction:** Condense key limitations into shorter claim-limit language while preserving detailed explanation in the documentation.

### 6. Simulated evaluation scaffold

**Initial issue:** Before testing, simulated values were used to prepare the reporting structure.

**Correction:** The simulated values were replaced by real P1–P4 participant records before final submission.

### 7. Incomplete Week 1–2 continuity evidence

**Initial issue:** Earlier Appendix A drafts contained placeholders for field evidence and prior project continuity.

**Correction:** Verified Week 1 and Week 2 artifacts were documented, and two September 4, 2026 Shanghai Science and Technology Museum photographs were added to the repository.

---

## B8. Remaining Limitations and Unverified Information

The following limitations remain and are not resolved through AI assistance.

### Historical images

The original Midjourney images associated with the selected records remain unavailable through their recorded URLs.

### Creator intention

The dataset does not provide a reliable statement explaining why the creator made each prompt change.

The project does not infer this intention.

### Explicit preference

The selected thread does not contain a direct preference judgment for each prompt revision.

Upscale therefore remains only a historical action.

### Regeneration variability

The displayed images were independently regenerated and cannot isolate causal effects of individual prompt terms.

### Dataset reuse conditions

Broader redistribution or reuse should continue to respect the conditions of the original dataset repository. The project does not treat lack of visible licensing detail as permission for unrestricted reuse.

### Evaluation generalizability

Four student participants cannot represent professional artists, broader creator communities, or long-term use.

### Final layout

Markdown documentation records the content and evidence structure, but final page count, typography, and figure legibility still depend on the final submission template or PDF layout.

---

## B9. Student Responsibility Statement

I understand that AI assistance does not transfer responsibility for this submission.

I am responsible for:

* checking source records;
* verifying citations and prior work;
* reviewing generated images;
* checking AI-produced summaries;
* preserving provenance distinctions;
* reporting missing evidence honestly;
* ensuring that participant records are represented accurately;
* avoiding unsupported causal or preference claims;
* checking the deployed artifact;
* and ensuring that the final paper accurately represents what was built, observed, and tested.

AI-generated material was treated as draft assistance or generated demonstration material rather than independent evidence.

**Student:** Sitong Chang
**Verification date:** September 13, 2026
