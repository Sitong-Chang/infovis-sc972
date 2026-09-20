# Formative Evaluation Record

## Scope and claim boundary

This record documents a small formative evaluation of the **first one-thread provenance redesign** of Prompt Influence Inspector. It does not evaluate the final multi-thread Prompt Influence Explorer.

Four anonymized DKU student participants completed related inspection tasks. Because the tasks differed by participant and there was no controlled baseline, the results are used to identify interpretation problems and guide redesign—not to claim comparative effectiveness or population-level benefit.

## Research task

Participants explored one prompt revision and explained:

1. what changed in the recorded prompt;
2. what visible difference they observed;
3. which evidence came from the source dataset;
4. what could and could not be concluded from regenerated images, AI interpretation, and historical actions.

The evaluation recorded completion time, confidence, observed behavior, participant comments, and a possible redesign implication.

## Participants

| Participant | Background | Time | Confidence |
|---|---|---:|---:|
| P1 | DKU student familiar with AI image generation but not an extensive Midjourney user | 68 s | 4/5 |
| P2 | Design student with visualization experience and limited diffusion-model knowledge | 91 s | 3/5 |
| P3 | Computer science student who frequently uses generative-AI tools | 74 s | 4/5 |
| P4 | Student with little generative-AI experience and basic visualization familiarity | 112 s | 3/5 |

Median completion time was **82.5 seconds** and median confidence was **3.5/5**.

---

## P1 — Understood the revision but initially missed provenance

**Task.** Explore one adjacent prompt revision and explain the recorded change, the visible difference, and which evidence came from the original dataset.

**Observed behavior.** P1 clicked directly between two nodes and correctly identified the added and removed prompt terms. They initially described the regenerated image as “the result produced by the original user.” After noticing the **Generated demonstration** label, they corrected the classification and distinguished it from recorded source data.

> “At first I thought these were the original images. The label helped, but I only noticed it after I started comparing them.”

**What worked.** The prompt diff and side-by-side comparison made the revision easy to understand. P1 recognized that the AI interpretation was an explanation rather than raw evidence.

**Problem revealed.** Provenance was understandable after the label was noticed, but the label did not attract attention before image inspection began.

**Design response.** Place a visually stronger provenance label directly beside each displayed image.

## P2 — Explored the graph but misread the edges

**Task.** Use the Image Variant Graph to reconstruct the revision sequence, then select one transition for close inspection.

**Observed behavior.** P2 understood that nodes represented prompt versions but initially read the connecting line as image similarity rather than chronological revision. Timestamps and prompt changes clarified that the graph represented revision history. P2 then actively switched among revisions instead of reading the page linearly.

> “I like being able to move through the versions, but at first I didn’t know whether the line meant time, similarity, or influence.”

**What worked.** Once the structure was understood, the graph supported exploration rather than presentation alone.

**Problem revealed.** The edge encoding did not explain its own meaning.

**Design response.** Add an explicit **Earlier → Later** cue and label the graph as a prompt-revision sequence.

## P3 — Distinguished evidence but over-interpreted upscale

**Task.** Inspect one revision and explain what could and could not be concluded from the available evidence.

**Observed behavior.** P3 correctly distinguished recorded prompt text, regenerated images, and model-derived summaries. They nevertheless interpreted an upscale action as evidence that the user liked the version more. After reading the claim-limit text, they revised the conclusion: the record shows only that an upscale operation occurred.

> “I automatically assumed upscale meant preference. The warning made me realize that the data doesn’t actually tell us why they clicked it.”

**What worked.** The claim-limit annotation prevented a stronger unsupported conclusion.

**Problem revealed.** Even an experienced generative-AI user converted a behavioral trace into inferred intention.

**Design response.** Present **Observed: upscale action** beside **Unknown: reason / preference**.

## P4 — Explored carefully but gave AI interpretation excessive authority

**Task.** Compare one revision using all four evidence sections and explain which conclusions they trusted most.

**Observed behavior.** P4 repeatedly moved between the images, prompt diff, and AI interpretation. They initially treated the concise AI explanation as the answer to what caused the visual change. After checking the evidence labels, they recognized that the explanation was model-derived and the regenerated images could not establish causal effects.

> “The AI summary feels convincing because it explains everything in one sentence. Without the label, I would probably trust it more than the raw comparison.”

**What worked.** Separating evidence types prompted P4 to reconsider the strength of different claims.

**Problem revealed.** AI interpretation carried rhetorical authority even when provenance was labeled.

**Design response.** Place AI interpretation after recorded evidence, use a lighter visual hierarchy, and retain **Model-derived / verify against images**.

---

## Aggregate descriptive findings

| Measure | Result | Interpretation |
|---|---:|---|
| Task completion | 4/4 | All participants completed their assigned inspection task |
| Completion time | 68–112 s; median 82.5 s | Tasks differed, so times are not comparative performance measures |
| Confidence | 3–4/5; median 3.5/5 | Moderate-to-high self-reported confidence |
| Initial ambiguity | 4/4 | Each participant revealed a different evidence or encoding problem |
| Correction after cue | 4/4 | A label, warning, timestamp, or prompt difference supported revision |

The main result is not that the interface “performed better.” The useful result is that the sessions exposed four recurring risks:

1. provenance labels can be noticed too late;
2. graph edges can be assigned the wrong semantic meaning;
3. historical actions can be converted into inferred preference;
4. concise AI explanations can appear more authoritative than recorded evidence.

## Revision priorities

1. Attach provenance directly to images rather than depending primarily on a legend.
2. Mark the revision direction as **Earlier → Later**.
3. Pair observed behavioral traces with the unavailable intention they cannot establish.
4. Visually subordinate AI interpretation and retain an explicit verification warning.

## Limitations and next study

This evaluation used four convenience-sampled DKU students, heterogeneous tasks, a short session, and no controlled baseline. It tested the first one-thread provenance redesign rather than the final multi-thread Explorer. Regenerated demonstrations also contain uncontrolled model variation.

The next study should compare the one-thread interface and final Explorer with matched tasks, recruit a larger art/design/creative-technology sample, and separately assess the accuracy and neutrality of BLIP-2 captions.
