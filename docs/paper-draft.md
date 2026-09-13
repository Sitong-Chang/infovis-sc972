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

## Current placement plan

- **Figure 1:** selected PrompTHis Image Variant Graph/system view, with attribution.
- **Figure 2:** the same comparison task in Baseline and Redesign modes.
- **Table 1:** four-level validation: domain, data/task, idiom, algorithm.
- Remaining main-text sections: Critical Evaluation and Governance; Integrated Redesign; Evaluation and Findings; Contribution and Limitations.

## References used in this draft

[1] Y. Guo, H. Shao, C. Liu, K. Xu, and X. Yuan. “PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation.” *IEEE Transactions on Visualization and Computer Graphics*, 2024. https://arxiv.org/abs/2403.09615

[2] S. Don-Yehiya, L. Choshen, and O. Abend. “Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney.” *Proceedings of EMNLP 2023*, pp. 4146–4161. https://aclanthology.org/2023.emnlp-main.253/

[3] United Nations Department of Economic and Social Affairs. “Goal 4: Quality Education—Target 4.4.” https://sdgs.un.org/goals/goal4

[4] T. Munzner. *Visualization Analysis and Design*. CRC Press, 2014.

[5] Vis4Sense. “PrompTHis” source repository and setup notes. https://github.com/Vis4Sense/prompthis

[6] S. Don-Yehiya et al. “Mid-Journey-to-alignment” dataset repository. https://github.com/shachardon/Mid-Journey-to-alignment

[7] M. D. Wilkinson et al. “The FAIR Guiding Principles for scientific data management and stewardship.” *Scientific Data*, 2016.

[8] T. Gebru et al. “Datasheets for Datasets.” *Communications of the ACM*, 2021.
