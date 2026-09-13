# Appendix B. AI Assistance and Human Verification

## B1. Assistance Record

| Tool/model/version/date | Purpose and significant input summary | Accepted output and location | Rejected output and reason |
|---|---|---|---|
| OpenAI ChatGPT/Codex Work environment; exact deployed model identifier not exposed; 13 Sep 2026 | Scope the redesign, inspect the repository structure, draft HTML/CSS/JavaScript/JSON and documentation | Static interface in `index.html`, `style.css`, `script.js`; documentation structure in README and `docs/` | A proposed Pick-a-Pic preference layer was rejected after checking that the dataset compares images generated from the same prompt rather than prompt revisions. |
| OpenAI image generation; exact model identifier not exposed; 13 Sep 2026 | Generate three prompt-conditioned demonstration images from the exact source prompts, with shared landscape framing and no text/logo/watermark | Three `thread-2231-*-regenerated.webp` assets; complete prompts in `docs/image-generation-record.md` | No output was represented as an original Midjourney image. Composition differences that exceed the word edits were not hidden. |
| OpenAI ChatGPT/Codex Work environment; exact deployed model identifier not exposed; 13 Sep 2026 | Draft visual-change tags/summaries and claim-limit language | Stored summaries in `data/prototype.json`; labels and warnings in the Influence Inspector | “Upscale equals preference/quality” wording was rejected as unsupported. |
| OpenAI ChatGPT/Codex Work environment; exact deployed model identifier not exposed; 13 Sep 2026 | Draft paper sections, validation table, governance record, and evaluation structure | `docs/paper-draft.md`, `docs/evaluation-record.md`, Appendices A–B | Any claim that the simulated four-participant draft was completed empirical research was rejected; values remain explicitly provisional. |

## B2. Human Edits and Decisions

The student selected PrompTHis, chose GitHub and Vercel, approved the focused Influence Inspector scope, and retained a static implementation. Human judgment narrowed the contribution from “adding AI to PrompTHis” to separating evidentiary roles in a real prompt-revision example.

Material human decisions included:

- preserving PrompTHis’s graph rather than replacing it;
- replacing the incompatible Pick-a-Pic plan with Midjourney Threads;
- selecting thread 2231 after inspecting candidate records;
- preserving the source spelling “forrest” while explaining its interpretation;
- refusing to treat upscale as explicit preference;
- labeling all new images as regenerated demonstrations;
- exposing inaccessible originals instead of silently substituting new images;
- choosing pre-generated summaries rather than a live API;
- revising warnings into concise claim-limit statements;
- keeping simulated evaluation values separate from findings.

Before submission, the student must personally edit the argument for length and voice, insert verified Week 1–2 evidence, replace simulated evaluation values, and confirm all figure/table references.

## B3. Original Sources and Records Checked

- Guo et al., *PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation*, including the design rationale, Image Variant Graph encoding/algorithm, evaluation, discussion, and future work.
- Official PrompTHis GitHub repository, including architecture and backend-availability notes.
- Don-Yehiya et al., *Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney*.
- Official Mid-Journey-to-alignment repository and `data/threads_0.csv`.
- Exact rows for thread 2231, including prompts, arguments, timestamps, labels, IDs, and recorded image URLs.
- UN SDG 4, Target 4.4.
- FAIR Guiding Principles and Datasheets for Datasets.

## B4. Data and Code Tests

The following outputs were inspected:

- `data/prototype.json` parsed without errors.
- `script.js` passed JavaScript syntax checking.
- Static HTML, CSS, JavaScript, JSON, and all three WebP images returned HTTP 200.
- Both graph edges updated the before/after comparison.
- Baseline hid redesign-only content; Redesign restored it.
- Images contained the intended shared subject and visually distinguishable settings.
- Source CDN links for all three historical records returned HTTP 404.
- The project ZIP passed an archive-integrity check.

## B5. Failures Corrected and Remaining Unverified Points

Corrected failures:

- The initial dataset plan incorrectly treated Pick-a-Pic as prompt-edit preference data.
- Early wording risked claiming that PrompTHis only showed history; paper review confirmed that it already supports influence analysis.
- Initial SVG images were illustrative placeholders and were replaced by provenance-labeled generated demonstrations.
- Long warnings were condensed and a persistent provenance legend was added.
- Direct automated writes to the course organization repository returned HTTP 403; files were transferred through the student-controlled GitHub upload/Desktop workflow.

Remaining unverified:

- Exact Week 1 exhibition observation, teammate wording, Week 2 site link, and the two student-discovered open-source precedents.
- Separate redistribution license for the Midjourney Threads dataset.
- Original Midjourney images, currently inaccessible through recorded URLs.
- Creator intention and explicit preference.
- Real participant results; the current four-person values are simulated reporting placeholders.
- Final two-page layout, figure legibility, and reference numbering after template insertion.

## B6. Student Responsibility Statement

I understand that AI assistance does not transfer responsibility for the submission. I am responsible for checking the original publications and source records, verifying the code and visuals, replacing all simulated evaluation material with real observations, correcting unsupported claims, crediting prior work, and ensuring that the final paper accurately represents what was built and tested.

**Student:** Sitong Chang  
**Verification date:** **[insert final verification date]**

