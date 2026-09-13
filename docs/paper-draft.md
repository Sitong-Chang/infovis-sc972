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

## Current placement plan

- **Figure 1:** selected PrompTHis Image Variant Graph/system view, with attribution.
- **Figure 2:** the same comparison task in Baseline and Redesign modes.
- **Table 1:** four-level validation: domain, data/task, idiom, algorithm.
- Remaining main-text sections: Critical Evaluation and Governance; Integrated Redesign; Evaluation and Findings; Contribution and Limitations.

## References used in this draft

[1] Y. Guo, H. Shao, C. Liu, K. Xu, and X. Yuan. “PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation.” *IEEE Transactions on Visualization and Computer Graphics*, 2024. https://arxiv.org/abs/2403.09615

[2] S. Don-Yehiya, L. Choshen, and O. Abend. “Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney.” *Proceedings of EMNLP 2023*, pp. 4146–4161. https://aclanthology.org/2023.emnlp-main.253/

[3] United Nations Department of Economic and Social Affairs. “Goal 4: Quality Education—Target 4.4.” https://sdgs.un.org/goals/goal4
