# Prompt Influence Explorer

An evidence-aware visual analysis of iterative prompt editing for INFOSCI 301. The redesign extends the earlier single-thread **Prompt Influence Inspector** into a coordinated exploration system:

> overview → filter → select → inspect exact evidence

The project asks:

**How can interactive visualization help creators explore patterns between prompt revisions and image-description changes while preserving the provenance of recorded, derived, regenerated, and AI-interpreted evidence?**

## Live project

- Website: https://infovis-sc972.vercel.app/
- Repository: https://github.com/dku-infosci301-Autumn2026/infovis-sc972

## Why the visualizations are meaningful

Every view is tied to an analytical question rather than added for decoration.

| View | Question it answers | Interaction |
|---|---|---|
| Edit-direction bars | How are prompts revised in the current selection? | Click a bar to filter all views |
| Prompt-change vs caption-change scatterplot | Do larger text edits align with larger shifts in BLIP-2 descriptions? | Hover for values; click a point to inspect it |
| Thread landscape | How do revision length, order, and edit direction vary across threads? | Sort and select any transition |
| Semantic edit matrix | Which prompt dimensions changed within the selected thread? | Select a revision column/cell |
| Revision inspector | What exactly changed, and what is the provenance of each claim? | Toggle derived, AI-caption, and regenerated layers |
| Baseline case | What could the original linear single-thread view support—and not support? | Switch between baseline and explorer |

The views are coordinated: search, edit type, upscale action, and minimum-change filters update the summaries, bars, scatterplot, and thread landscape. Selecting a mark updates the semantic matrix and evidence inspector.

## Data

The source is **Midjourney Threads**, released with *Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney*.

- Paper: https://aclanthology.org/2023.emnlp-main.253/
- Dataset repository: https://github.com/shachardon/Mid-Journey-to-alignment
- Source slice used for derivation: `threads_0.csv`
- Source slice size: 20,000 records in 11,914 threads

### Transparent analysis filter

The build script:

1. groups records by `thread_id` and orders them by timestamp;
2. keeps English threads with at least two records;
3. compares consecutive prompt-token sets;
4. retains transitions with Jaccard similarity of at least `0.35`, reducing obviously unrelated consecutive records;
5. computes added/removed tokens, edit direction, prompt-token distance, BLIP-2-caption distance, and a disclosed keyword-based semantic focus;
6. writes a deterministic browser sample of 59 evenly spaced qualifying threads plus thread 2231.

Across the full 20,000-record source slice, the filter yields **7,307 qualifying transitions in 3,116 threads**. The browser-ready sample contains **60 threads and 104 transitions**. Aggregate counts in `analysis.json` are calculated across all qualifying transitions; interactive marks use the disclosed sample so the static page remains responsive.

Rebuild the derived data after downloading the cited source repository beside this project:

```bash
python scripts/build_analysis.py ../Mid-Journey-to-alignment/data/threads_0.csv
```

## Evidence provenance and claim boundaries

| Layer | Status | Claim boundary |
|---|---|---|
| Prompt text, IDs, timestamps, parameters, upscale label | Recorded source data | Describes dataset records only |
| Added/removed tokens, Jaccard distances, edit direction | Deterministic derived data | Depends on tokenization and the disclosed filter |
| Semantic edit focus | Keyword-heuristic derived data | Not manually coded ground truth |
| BLIP-2 captions | AI-derived data included in the dataset | Imperfect model interpretations, not direct visual truth |
| Caption-change distance | Derived from AI captions | Measures caption-token difference, not image distance |
| Three displayed images for thread 2231 | Regenerated demonstration | Not the historical Midjourney outputs; cannot isolate causality |
| Historical image files | Unavailable evidence | Recorded Discord CDN URLs returned HTTP 404 when checked on 2026-09-13 |
| Upscale label | Recorded historical action | Behavioral trace, not explicit preference or objective quality |
| Creator intention | Unavailable | Not inferred |

The scatterplot therefore asks whether two **measured descriptions change together**. It does not claim that a prompt edit caused an image change.

## Evaluation evidence

The page visualizes a formative evaluation of the **first one-thread provenance redesign** with four anonymized DKU student participants. Each participant completed a related inspection task; the tasks were not identical and there was no controlled baseline.

| Participant | Time | Confidence | Initial ambiguity | Cue that supported correction |
|---|---:|---:|---|---|
| P1 | 68 s | 4/5 | Regenerated image read as historical output | Generated demonstration label |
| P2 | 91 s | 3/5 | Graph edge read as image similarity | Timestamps and prompt changes |
| P3 | 74 s | 4/5 | Upscale read as preference | Claim-limit warning |
| P4 | 112 s | 3/5 | AI interpretation read as a causal answer | Model-derived warning |
| **Median** | **82.5 s** | **3.5/5** | **4/4 began with an ambiguity** | **4/4 revised after a cue** |

These findings are descriptive design evidence, not a claim that the redesign outperformed a baseline. They motivate stronger image-level provenance, an **Earlier → Later** direction cue, an **Observed / Unknown** pair for upscale, and a visually subordinate AI interpretation. The final multi-thread Explorer has not yet been user-tested. A future study should use matched tasks, a larger art/design/creative-technology sample, and separate checks of AI-caption accuracy and neutrality.

## Relationship to prior work

The project builds on **PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation**.

- Paper: https://arxiv.org/abs/2403.09615
- Repository: https://github.com/Vis4Sense/prompthis

The Baseline is an attributed simplified reconstruction, not a full replication. The redesign does not claim to invent prompt-history visualization. Its contribution is a focused combination of multi-thread pattern exploration, coordinated selection, and explicit provenance boundaries.

## Files

```text
index.html                 page structure and accessibility labels
style.css                  responsive layout and visual encodings
script.js                  filters, linked views, SVG charts, and evidence toggles
data/analysis.json         deterministic multi-thread browser dataset
data/prototype.json        original thread-2231 case and regenerated-image metadata
scripts/build_analysis.py  reproducible analysis-data builder
assets/images/             labeled regenerated demonstrations
assets/screenshots/        baseline, redesign, and final Explorer screenshots
docs/                      submitted paper, appendices, generation record, evaluation record
docs/PS1-sc972-Sitong-Chang-Final-Updated.docx  editable final manuscript
```

## Run locally

The page loads JSON with `fetch`, so use a local HTTP server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Accessibility and implementation

- vanilla HTML, CSS, JavaScript, and inline SVG; no runtime API or framework dependency;
- keyboard-operable chart marks and controls;
- persistent textual explanations of encodings and claim limits;
- responsive one-column layout on narrow screens;
- visible focus states, semantic headings, live status updates, and alt text;
- locally stored regenerated demonstrations for reproducibility.

## AI assistance and human verification

AI assistance supported code scaffolding, image generation, comparison drafting, and documentation organization. Human verification included checking dataset rows, preserving source spelling, reviewing provenance labels, testing coordinated filters and selection behavior, reviewing generated images and AI summaries, and maintaining explicit claim limits. AI-generated or AI-derived content remains visibly labeled.
