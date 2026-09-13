# Prompt Influence Inspector: Separating Recorded Evidence from AI Interpretation in Prompt Revision

Sitong Chang · INFOSCI 301 · Draft v0.1

## Abstract

Text-to-image creation often requires iterative prompt editing, yet visible output differences do not reveal which evidence is historical, regenerated, or model-interpreted. Building on PrompTHis, an IEEE VIS 2024 system for reviewing prompt-image histories [1], I redesign its Image Variant Graph for provenance-aware comparison. The prototype integrates a three-step revision thread from the public Midjourney Threads dataset [2] with newly generated demonstration images and a multimodal visual-change summary. Its Influence Inspector separates recorded prompts and upscale actions, derived word differences, regenerated images, unavailable originals, and AI interpretation. A planned formative comparison with four DKU student proxies will examine edit identification, completion time, confidence, and provenance comprehension; results are not yet collected. The project contributes a scoped interface pattern for practicing critical AI and data literacy.

## 1. Introduction and Research Question

Text-to-image systems encourage creators to improve results through repeated prompt revision. However, a polished output does not explain which words mattered, whether every visual difference resulted from the edit, or what evidence supports an interface explanation. Don-Yehiya et al. show that users iteratively adapt prompts in response to generated images and may partly adapt to a model’s preferred language rather than only clarify their own intentions [2]. This makes prompt histories valuable evidence, but also makes causal and intentional claims risky.

PrompTHis addresses part of this problem through the Image Variant Graph, which represents generated images as nodes, prompt differences as edges, and image distances through spatial projection [1]. It supports comparison and historical review; therefore, my redesign does not claim that the original system lacks influence analysis. Instead, it asks an additional question:

> **RQ: How can provenance-labeled multimodal comparison help novice creators inspect real prompt revisions without confusing recorded interaction data, regenerated visual evidence, and AI interpretation?**

My earlier 2056 aspiration was to help people question opaque recommendations rather than simply accept system outputs. This project transfers that principle from ranked recommendations to generative-AI creation. It connects two traditions: **human-centered visualization**, which matches representations to users and tasks, and **critical AI literacy**, which asks users to inspect provenance, uncertainty, and claim boundaries. The Week 1 safeguard is retained by visually separating source evidence from system-generated interpretation.

The project also continues lessons from the earlier Energy Lens artifact without forcing the energy domain into the new topic. Energy Lens showed that different questions require different visual idioms and that derived values, such as total versus per-capita measures, should not be presented as neutral facts. Here, the same governance principle distinguishes recorded prompt text, deterministic word differences, regenerated images, historical upscale actions, and AI summaries.

Field observations provide two transferable design cues. The Tencent industry panel demonstrated how coordinated views can connect an overview with focused evidence, motivating the graph-plus-inspector structure. The museum public panel showed that visual form should follow the audience’s question, motivating a compact comparison view for novice users. **[Replace these sentences with the exact field-panel titles and photo numbers.]** An earlier teammate observation—**[insert the teammate’s exact insight]**—should be added here rather than reconstructed from memory.

The intended community is provisionally defined as DKU students and novice digital creators in Kunshan who use generative AI for coursework, design, or creative experimentation. Their need for provenance-aware comparison remains a hypothesis to be tested, not an established community claim. Missing voices include art and design students, professional creators, instructors, and people who avoid generative AI. The project relates narrowly to **SDG Target 4.4**, which concerns relevant technical skills and ICT capability [3]: provenance-labeled comparison may support AI-literacy practice, with correct evidence–interpretation classification as an observable outcome. It does not claim that one prototype achieves SDG 4.

## 2. Critical Evaluation and Governance

### 2.1 Four-level validation

Table 1 applies Munzner’s nested model [4]. A limitation means that the published evidence does not validate my new audience or question; it does not mean the original authors failed to perform their stated work.

**Table 1. Four-level validation of PrompTHis and resulting redesign consequences.**

| Level | Evidence-based assessment of PrompTHis | Evidence location | Design consequence |
|---|---|---|---|
| **Domain** | **Strength:** requirements were developed through interviews and observation with two artists, and evaluation included amateurs and professionals. **Boundary:** the stated target was professional artists; provenance comprehension among novice student creators was not the evaluated domain. | Sec. III-A–B, pp. 3–4; Sec. VI-A–B, pp. 8–10 [1] | Treat DKU novice creators as a prospective proxy audience and test comprehension rather than claiming professional-workflow improvement. |
| **Data/task** | **Strength:** prompt–image histories support review, pair comparison, model sensemaking, and planning (R1–R4). **Boundary:** the paper later identifies seed images, parameters, editing, and cross-tool histories as context still needing fuller capture. | Sec. III-B, p. 4; Sec. VI-B.4, pp. 10–11 [1] | Add one real iterative thread and a narrow task: identify an edit and classify the provenance of displayed claims. Do not infer creator intention. |
| **Idiom** | **Strength:** image nodes, word-change edges, clustering, and projection make semantic history inspectable. **Boundary:** participants reported that dense nodes/edges could distract attention and requested more textual information for some tasks. | Sec. IV-B, p. 5; Sec. VI-B.4, p. 10 [1] | Retain a small attributed graph for history, then add a focused side-by-side Influence Inspector instead of replacing the graph. |
| **Algorithm** | **Strength:** PrompTHis documents Myers word alignment, CLIP text/image embeddings, t-SNE with cosine distance, Procrustes alignment, agglomerative clustering, and edge weighting/filtering. **Reproducibility boundary:** results depend on thresholds and embedding/layout choices; the repository states that hosted backends may be inaccessible and local-backend instructions were still forthcoming. | Sec. IV-C–D, pp. 5–7 [1]; project README [5] | Do not claim to reproduce PrompTHis influence scores. Use a static no-build artifact, store exact records and interpretations locally, and expose missing/failure states. |

This critique preserves PrompTHis’s strongest contribution—the graph’s overview of branching provenance—while changing the analytical contract. The redesign does not answer “Which word objectively caused this image?” It answers “What is recorded, regenerated, missing, or interpreted in this selected comparison?”

### 2.2 Open science and data governance

The baseline is an attributed reconstruction informed by the paper and repository, not exported PrompTHis session data. Complementary data come from **Midjourney Threads**, whose repository provides nine CSV files and documents fields including prompt text, generation arguments, anonymous user ID, timestamp, unique record ID, image URL, thread ID, BLIP-2 captions, and a Boolean label indicating whether an output was upscaled [2,6]. The prototype uses three consecutive rows from `threads_0.csv`, `thread_id=2231`, with record IDs stored in `data/prototype.json`.

Following FAIR principles [7] and Datasheets for Datasets [8], the repository records source URLs, file and thread identifiers, selection logic, transformations, missingness, and claim boundaries. Exact prompts, timestamps, parameters, and upscale labels are **source records**. Added/removed terms are **derived values**. The three displayed pictures are **newly generated demonstrations**, and visual tags/summaries are **AI interpretations**. These categories use persistent color labels in the interface.

The central governance problem is evidence substitution. All three historical Discord image URLs returned HTTP 404 on 13 September 2026. Replacing them silently would falsely imply that new images were historical evidence. The interface therefore shows the unavailable state next to the regenerated pair and states that independent generation cannot isolate causal prompt effects. Likewise, upscale is presented only as a behavioral trace concerning the unavailable historical output—not as explicit preference or aesthetic quality.

Two consequential data gaps remain: the creator’s intention behind each edit and an explicit preference judgment. No suitable open record was identified for either in this selected thread, so the prototype does not infer them. The dataset repository documents access and fields but does not display a separate data license; redistribution and reuse conditions therefore require further confirmation before expanding beyond the minimal research sample. CARE is not applied as an Indigenous-data claim because no Indigenous community or authority is identified in this sample; community benefit remains a hypothesis requiring dialogue with the proposed DKU/Kunshan users.

> **Design objective:** Enable novice creators to identify a recorded prompt edit and correctly distinguish source records, derived differences, regenerated visual evidence, missing originals, historical action, and AI interpretation.

## 3. Integrated Redesign and Demo

The redesign combines **additional data** and **emerging technology** to support a new, bounded capability. Midjourney Threads supplies a real three-step prompting sequence, including exact prompts, timestamps, generation arguments, record IDs, and whether an output was upscaled. Prompt-conditioned image generation supplies replacement comparison images when the recorded CDN images are unavailable, while multimodal reasoning produces a concise visual-change summary. Together, they let users inspect a real revision record without treating regenerated content or polished AI language as historical fact.

The working interaction is an edge selection. A user switches between Baseline and Redesign and clicks either word-difference edge in the Image Variant Graph. Baseline shows the graph, adjacent prompts, and regenerated images. Redesign opens the **Influence Inspector**, which coordinates four layers: (1) recorded prompts plus a derived word diff; (2) side-by-side regenerated images and the missing-original warning; (3) the later step’s historical upscale action; and (4) model-derived tags and explanation. A persistent legend maps blue to recorded evidence, green to regenerated demonstration, amber to interpretation, and red to unavailable evidence.

**Figure 2. Same task before and after redesign.** *(Insert two matched screenshots.)* The Baseline preserves an attributed PrompTHis-style history graph. The Redesign adds a focused inspector that separates recorded source data, regenerated images, historical action, missing evidence, and AI interpretation.

Three consequential human decisions shaped the artifact:

1. **Retain the graph rather than replace it with cards.** The graph continues to communicate revision sequence and provenance; the inspector answers the new focused-comparison question.
2. **Do not convert upscale into ranking, node size, or “quality.”** The label remains contextual text because an action does not reveal a universal aesthetic judgment.
3. **Separate evidence from interpretation and expose failure.** Generated pictures and AI summaries receive different colors from recorded data, while HTTP 404 originals remain visible as missing evidence.

The emerging technology is intentionally pre-generated rather than called through a live API. Each image, interpretation, generation prompt, and verification note is stored in the repository. This reduces deployment failure and makes the preliminary demonstration inspectable, although it does not remove model error or randomness.

## 4. Evaluation and Provisional Findings Structure

The evaluation compares the same analytical contract across modes:

> **Task:** Identify which recorded prompt edit corresponds most clearly to a visible contextual change, explain the change, and distinguish recorded evidence from regenerated or AI-generated material.

Four to six DKU student proxies are planned. Participants complete one Baseline and one Redesign comparison, with mode and edge order counterbalanced. Measures are edit-identification accuracy, completion time, explanation quality, confidence (1–5), provenance classification, and whether the participant incorrectly equates upscale with preference. Student proxies are not treated as representative of professional artists.

The planned success criterion is that at least four of five participants identify the relevant edit, distinguish recorded from generated material, and reject upscale as an objective preference score without a substantial increase in median completion time.

**Table 2. Provisional reporting scaffold—simulated values, not participant findings.**

| Measure | Baseline draft | Redesign draft |
|---|---:|---:|
| Fully correct edit identification | 2/4 | 4/4 |
| Correct provenance distinction | 0/4 | 4/4 |
| Median completion time | 87.5 s | 66.5 s |
| Median confidence | 3.5/5 | 4.5/5 |
| Correct upscale interpretation | Not exposed | 4/4 |

These values currently demonstrate how results will be reported; they must be replaced after testing. The draft analysis anticipates four questions: whether explicit diffs reduce missed deletions; whether provenance labels prevent regenerated images being mistaken for historical outputs; whether the claim-limit message prevents preference overclaiming; and whether generation variability remains confusing. Only patterns supported by real records will become findings.

## 5. Contribution, Limitations, and Next Step

The intellectual contribution is a **provenance-layered comparison pattern** for generative-AI visualization. Rather than presenting source records, regenerated media, behavioral traces, and AI explanations as one seamless account, the design makes their different evidentiary roles inspectable. The practical contribution is a static GitHub/Vercel demonstration with no backend or API key, exact sample identifiers, locally stored images and summaries, keyboard-accessible controls, and explicit loading/failure states.

The prototype does not recover the historical Midjourney images, determine the creator’s intention, prove causal prompt effects, or convert upscale into preference. Its sample contains one three-step thread, and independent regeneration introduces uncontrolled variation. The attributed Baseline is not a full PrompTHis replication. The planned student sample is small and cannot establish general effectiveness.

After replacing Table 2 with real observations, the immediate design step is to test the revised legend and claim-limit messages with art/design students and other novice creators. A later system could collect creator-authored intention annotations and compare multiple generation models, but only with explicit provenance and reuse conditions.

## Current placement plan

- **Figure 1:** selected PrompTHis Image Variant Graph/system view, with attribution.
- **Figure 2:** the same comparison task in Baseline and Redesign modes.
- **Table 1:** four-level validation: domain, data/task, idiom, algorithm.
- Draft compression target: retain the research question, Tables 1–2, Figure 2, the design objective, three human decisions, and bounded conclusion in the two-page body; migrate supporting detail to Appendix A.

## References used in this draft

[1] Y. Guo, H. Shao, C. Liu, K. Xu, and X. Yuan. “PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation.” *IEEE Transactions on Visualization and Computer Graphics*, 2024. https://arxiv.org/abs/2403.09615

[2] S. Don-Yehiya, L. Choshen, and O. Abend. “Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney.” *Proceedings of EMNLP 2023*, pp. 4146–4161. https://aclanthology.org/2023.emnlp-main.253/

[3] United Nations Department of Economic and Social Affairs. “Goal 4: Quality Education—Target 4.4.” https://sdgs.un.org/goals/goal4

[4] T. Munzner. *Visualization Analysis and Design*. CRC Press, 2014.

[5] Vis4Sense. “PrompTHis” source repository and setup notes. https://github.com/Vis4Sense/prompthis

[6] S. Don-Yehiya et al. “Mid-Journey-to-alignment” dataset repository. https://github.com/shachardon/Mid-Journey-to-alignment

[7] M. D. Wilkinson et al. “The FAIR Guiding Principles for scientific data management and stewardship.” *Scientific Data*, 2016.

[8] T. Gebru et al. “Datasheets for Datasets.” *Communications of the ACM*, 2021.
