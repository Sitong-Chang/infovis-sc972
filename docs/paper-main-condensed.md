# Prompt Influence Inspector: Separating Recorded Evidence from AI Interpretation

Sitong Chang · INFOSCI 301 · Condensed two-page draft

## Abstract

Text-to-image creation often requires iterative prompt editing, yet visible output differences do not reveal which evidence is historical, regenerated, or model-interpreted. Building on PrompTHis, an IEEE VIS 2024 system for reviewing prompt-image histories [1], I redesign its Image Variant Graph for provenance-aware comparison. The prototype integrates a three-step revision thread from Midjourney Threads [2] with newly generated demonstration images and a multimodal visual-change summary. Its Influence Inspector separates recorded prompts and upscale actions, derived word differences, regenerated images, unavailable originals, and AI interpretation. A formative comparison with four DKU student proxies examines edit identification, completion time, confidence, and provenance comprehension. The project contributes a scoped interface pattern for practicing critical AI and data literacy.

## 1. Introduction and Research Question

Text-to-image systems encourage trial-and-error prompt revision, but a polished output does not show which words mattered or what evidence supports an explanation. PrompTHis addresses this problem through an Image Variant Graph: image nodes, word-change edges, and projected image distances help users compare prompt-image pairs and review creative history [1]. My redesign does not claim that PrompTHis lacks influence analysis. It asks:

> **RQ: How can provenance-labeled multimodal comparison help novice creators inspect real prompt revisions without confusing recorded interaction data, regenerated visual evidence, and AI interpretation?**

My 2056 aspiration—helping people question opaque recommendations rather than accept outputs—now extends to generative AI. It connects human-centered visualization with critical AI literacy. The earlier Energy Lens lesson also transfers: different questions require different idioms, and derived values are not neutral source facts. Tencent field evidence motivated coordinated overview/detail views; museum evidence motivated question-specific public explanation. **[Replace with exact photo captions.]**

The prospective community is DKU students and novice creators in Kunshan; their need remains a hypothesis. Missing voices include art/design students, professionals, instructors, and people who avoid generative AI. The project relates narrowly to SDG 4.4: provenance classification may exercise relevant ICT/AI literacy, but one prototype does not achieve the target [3].

![PrompTHis interface showing the Image Variant Graph, history box, navigation mini-map, control panel, and creation panel](../assets/screenshots/figure1-prompthis-original.png)

**Figure 1. Selected PrompTHis system.** The original interface coordinates the Image Variant Graph (a), history box (b), navigation mini-map (c), control panel (d), and creation panel (e). Source: Guo et al. [1], Fig. 7.

## 2. Critical Evaluation and Governance

**Table 1. Munzner four-level validation and design consequences.**

| Level | Evidence-based assessment | Design consequence |
|---|---|---|
| **Domain** | PrompTHis was co-designed with two artists and evaluated with 11 amateurs plus five professionals and one amateur. Its stated target was professional artists; novice-student provenance comprehension was not evaluated (Secs. III, VI [1]). | Treat students as proxy users and test comprehension, not professional productivity. |
| **Data/task** | Prompt-image histories support review, comparison, model sensemaking, and planning. The authors identify seed images, parameters, editing, and cross-tool history as context needing fuller capture (Secs. III-B, VI-B.4 [1]). | Add one real iterative thread; do not infer intention or preference. |
| **Idiom** | The graph reveals semantic history, but participants reported distraction from dense nodes/edges and sometimes wanted more text (Secs. IV-B, VI-B.4 [1]). | Retain the graph for overview and add a focused side-by-side inspector. |
| **Algorithm** | Myers alignment, CLIP embeddings, t-SNE, Procrustes alignment, clustering, and edge filtering are documented; thresholds/layout affect interpretation, and hosted backends may be inaccessible [1,4]. | Do not reproduce or claim PrompTHis influence scores; use a static, inspectable artifact with explicit failures. |

Complementary data come from Midjourney Threads: three consecutive records from `threads_0.csv`, `thread_id=2231` [2,5]. Exact prompts, IDs, timestamps, parameters, and upscale labels are **source records**; added/removed terms are **derived**. The original Discord image URLs returned HTTP 404 on 13 September 2026, so three new images are labeled **regenerated demonstrations**. Tags and summaries are labeled **AI interpretation**.

This prevents evidence substitution. Regenerated images are not historical outputs; independent generation cannot prove causal prompt effects. Upscale is a behavioral trace about an unavailable output, not explicit preference or aesthetic quality. Creator intention and preference remain unavailable and are not inferred. FAIR/Datasheets documentation records source, coverage, transformations, missingness, and reuse limits [6,7]. The dataset repository exposes files and fields but no separate license; broader redistribution requires confirmation.

> **Design objective:** Enable novice creators to identify a prompt edit and distinguish source, derived, regenerated, missing, behavioral, and AI-interpreted information.

## 3. Integrated Redesign and Demo

Additional data and emerging technology jointly enable a provenance-aware comparison of a real revision sequence. Clicking an edit edge opens the **Influence Inspector**:

1. recorded before/after prompts and derived word diff;
2. regenerated images and missing-original warning;
3. the later record’s historical upscale action;
4. pre-generated multimodal tags and visual summary.

A persistent legend maps blue to recorded, green to regenerated, amber to interpreted, and red to unavailable material. Baseline shows graph history and adjacent comparisons; Redesign exposes all four layers.

![Matched screenshots comparing Baseline and Redesign modes for the Step 2 to Step 3 prompt revision](../assets/screenshots/figure2-baseline-vs-redesign.png)

**Figure 2. Same task before and after redesign.** Both modes show the Step 2→3 comparison. Baseline preserves the attributed PrompTHis-style history graph; Redesign adds explicit provenance and claim boundaries.

Three human decisions were consequential: **(1)** retain the graph rather than replace it; **(2)** never encode upscale as rank, node size, or quality; and **(3)** separate evidence from interpretation while keeping HTTP 404 visible. Images and summaries are stored locally instead of called through a live API, improving reproducibility while retaining model-error and randomness limitations.

## 4. Evaluation and Findings

Four DKU student proxies complete one Baseline and one Redesign task in counterbalanced order: identify an edit, explain the visible change, classify provenance, interpret upscale, and rate confidence. Measures are accuracy, time, explanation quality, provenance comprehension, claim calibration, and confidence.

**Table 2. Provisional reporting structure—replace simulated values before submission.**

| Measure | Baseline draft | Redesign draft |
|---|---:|---:|
| Correct edit identification | 2/4 | 4/4 |
| Correct provenance distinction | 0/4 | 4/4 |
| Median time | 87.5 s | 66.5 s |
| Median confidence | 3.5/5 | 4.5/5 |

The draft tests whether word diffs reduce missed deletions, provenance labels prevent regenerated images being mistaken for source evidence, and claim-limit text prevents upscale overclaiming. Only patterns supported by real participant records will be reported as findings.

## 5. Contribution and Next Step

The contribution is a provenance-layered comparison pattern that keeps source records, regenerated media, behavioral traces, missing evidence, and AI explanations inspectably distinct. The static GitHub/Vercel artifact provides one working interaction without backend keys. It cannot recover historical images, determine intention, prove causal effects, or generalize from one thread and four students. Next, real observations will replace Table 2, followed by testing with art/design students and creator-authored intention annotations.

## References

[1] Y. Guo et al. “PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation.” *IEEE TVCG*, 2024.  
[2] S. Don-Yehiya et al. “Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney.” *EMNLP*, 2023.  
[3] United Nations. “SDG 4, Target 4.4.”  
[4] Vis4Sense. “PrompTHis” source repository.  
[5] Don-Yehiya et al. “Mid-Journey-to-alignment” dataset repository.  
[6] M. D. Wilkinson et al. “The FAIR Guiding Principles.” *Scientific Data*, 2016.  
[7] T. Gebru et al. “Datasheets for Datasets.” *Communications of the ACM*, 2021.

Full technical evidence and continuity appear in Appendix A; AI assistance and verification appear in Appendix B.
