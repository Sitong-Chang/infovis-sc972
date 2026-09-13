# Formative Evaluation Record

This document records a small formative evaluation comparing the Baseline and Redesign versions of the Prompt Influence Inspector. The purpose of the evaluation is not to establish general effectiveness, but to examine whether provenance labels, explicit prompt diffs, and claim-limit messages help novice users interpret prompt revisions more carefully.

## Primary Task

Participants were asked to identify which recorded prompt edit most clearly corresponded to a visible contextual change in the regenerated comparison, briefly explain what changed, and distinguish recorded evidence from regenerated or AI-generated material.

They were also asked to interpret the historical “upscaled” label and explain what could and could not be concluded from it.

## Participants

Four DKU student proxies participated in the formative evaluation.

All participants had at least some familiarity with generative AI or text-to-image systems, but they were not treated as representative of professional artists or broader creator communities.

Participants are anonymized as P1–P4.

## Procedure

A counterbalanced order was used so that two participants completed Baseline first and two completed Redesign first.

* P1: Baseline → Redesign
* P2: Redesign → Baseline
* P3: Baseline → Redesign
* P4: Redesign → Baseline

Each participant completed one comparison task in each interface condition.

For each condition, the following were recorded:

1. Completion time
2. Prompt-edit identification
3. Short visual explanation
4. Confidence on a 1–5 scale
5. Provenance understanding
6. Interpretation of the historical upscale label
7. Comments, confusion, or suggested changes

Because participants did not inspect exactly the same edit pair in both conditions, the quantitative results should be interpreted descriptively rather than as controlled causal evidence.

## Measures

| Measure                  | Recording method                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Task accuracy            | Whether the participant identified all relevant prompt additions and removals                               |
| Completion time          | Seconds from task start to final answer                                                                     |
| Explanation quality      | Whether the participant connected prompt changes with visible image changes while acknowledging uncertainty |
| Provenance comprehension | Whether source data, regenerated images, and AI interpretation were correctly distinguished                 |
| Claim calibration        | Whether the participant avoided equating upscale with explicit preference or objective quality              |
| Confidence               | 1–5 self-report after each task                                                                             |

---

# Participant Records

## P1 — Baseline → Redesign

### Baseline task: Step 1 → Step 2

* Completion time: **96 seconds**
* Confidence: **3/5**
* Prompt edit: Correctly identified the addition of “HD,” but initially overlooked the removal of “surreal.”
* Visual explanation: “The second one looks cleaner and less dreamlike, but the feather also moved, so I’m not sure whether that came from the prompt.”
* Provenance understanding: **Partial.** P1 initially assumed that the displayed images were the original dataset images.
* Observation: P1 mainly examined the pictures and did not immediately read the smaller status labels.

### Redesign task: Step 2 → Step 3

* Completion time: **72 seconds**
* Confidence: **4/5**
* Prompt edit: Correctly identified “forrest” as added and “front view” as removed.
* Visual explanation: “The background clearly becomes a forest, and the envelope is no longer completely straight toward me.”
* Provenance understanding: **Correct.** P1 correctly separated the recorded prompt, regenerated images, and AI summary.
* Upscale interpretation: “It shows that the user did something with that result, but it doesn’t necessarily mean they thought the prompt was better.”
* Suggested change: Make the “regenerated demonstration” label more visually prominent.

---

## P2 — Redesign → Baseline

### Redesign task: Step 1 → Step 2

* Completion time: **61 seconds**
* Confidence: **5/5**
* Prompt edit: Correctly identified both changes.
* Visual explanation: “The surreal feeling is reduced, although there are also composition changes that cannot be explained by removing one word.”
* Provenance understanding: **Correct.**
* Upscale interpretation: P2 described upscale as “a useful behavioral signal, but not a direct rating.”
* Observation: P2 relied heavily on the warning about generation variability.

### Baseline task: Step 2 → Step 3

* Completion time: **79 seconds**
* Confidence: **4/5**
* Prompt edit: Correctly identified both changes.
* Visual explanation: “The forest change is obvious, and the camera angle is slightly different.”
* Provenance understanding: **Partial.** Without the redesign labels, P2 said the relationship between the dataset and the images was less clear.
* Comment: “I can complete the comparison, but I don’t know how much I should trust the pictures.”

---

## P3 — Baseline → Redesign

### Baseline task: Step 2 → Step 3

* Completion time: **128 seconds**
* Confidence: **2/5**
* Prompt edit: Identified “forrest,” but did not initially notice that “front view” had been removed.
* Visual explanation: “It moved from a castle-like background to a forest.”
* Provenance understanding: **Incorrect at first.** P3 assumed that all visible content came directly from the selected dataset.
* Observation: P3 asked whether “upscaled” meant that the image received more votes.

### Redesign task: Step 1 → Step 2

* Completion time: **91 seconds**
* Confidence: **4/5**
* Prompt edit: Correct after rereading the displayed diff.
* Visual explanation: “The second image is less surreal, but the layout also changes, so the edit is probably not the only reason.”
* Provenance understanding: **Correct.** P3 correctly identified the prompts and upscale label as recorded data.
* Upscale interpretation: “It records an action, not a clear statement saying ‘I prefer this.’”
* Suggested change: Replace some explanatory sentences with shorter bullet points.

---

## P4 — Redesign → Baseline

### Redesign task: Step 2 → Step 3

* Completion time: **48 seconds**
* Confidence: **5/5**
* Prompt edit: **Correct.**
* Visual explanation: “The strongest change is the explicit forest setting. Removing ‘front view’ also corresponds to the more angled composition.”
* Provenance understanding: **Correct.**
* Upscale interpretation: Correctly rejected the claim that upscale equals objective preference.
* Comment: “The separation is useful because otherwise the AI explanation looks as authoritative as the dataset.”

### Baseline task: Step 1 → Step 2

* Completion time: **67 seconds**
* Confidence: **4/5**
* Prompt edit: **Correct.**
* Visual explanation: “The mood becomes less surreal, but several visual details change at the same time.”
* Provenance understanding: **Partial.** P4 understood that the interface was a reconstruction but wanted the regenerated-image status closer to the thumbnails.
* Suggested change: Use a small legend that consistently maps colors to source, generated material, and interpretation.

---

# Results

## Aggregate Results

| Participant | Baseline time | Redesign time | Baseline provenance | Redesign provenance | Correct upscale interpretation |
| ----------- | ------------: | ------------: | ------------------- | ------------------- | ------------------------------ |
| P1          |          96 s |          72 s | Partial             | Correct             | Yes                            |
| P2          |          79 s |          61 s | Partial             | Correct             | Yes                            |
| P3          |         128 s |          91 s | Incorrect           | Correct             | Yes                            |
| P4          |          67 s |          48 s | Partial             | Correct             | Yes                            |
| **Median**  |    **87.5 s** |    **66.5 s** | —                   | —                   | **4/4**                        |

Additional descriptive results:

* Fully correct prompt-edit identification:

  * Baseline: **2/4**
  * Redesign: **4/4**
* Fully correct provenance distinction:

  * Baseline: **0/4**
  * Redesign: **4/4**
* Correct interpretation of upscale:

  * Redesign: **4/4**
* Median completion time:

  * Baseline: **87.5 seconds**
  * Redesign: **66.5 seconds**
* Median confidence:

  * Baseline: **3.5/5**
  * Redesign: **4.5/5**

---

# Formative Findings

Four main patterns emerged from the evaluation.

## 1. Explicit prompt diffs helped participants notice removals

The explicit word-level diff appeared to make deleted terms easier to notice.

In the Baseline condition, P1 initially overlooked the removal of “surreal,” while P3 did not initially notice that “front view” had been removed.

In the Redesign condition, all four participants ultimately identified the complete prompt edit.

This suggests that visually separating additions and removals may help users inspect prompt revision more systematically.

## 2. Provenance labels reduced confusion about evidence status

Provenance misunderstanding was common in the Baseline condition.

P1 initially assumed that the regenerated demonstration images were the original dataset images. P3 also assumed that all visible material came directly from the selected dataset. P2 could complete the task but explicitly questioned how much the images should be trusted.

In contrast, all four participants correctly distinguished recorded data from regenerated and AI-generated material in the Redesign condition.

This was one of the clearest patterns in the small evaluation.

## 3. Claim-limit language helped calibrate interpretation of upscale

All four participants correctly rejected the idea that an upscale action should be treated as direct evidence of preference or objective image quality.

Participants instead described upscale as:

* a historical action,
* a behavioral signal,
* or evidence that the user interacted with the result.

This supports keeping the upscale label as contextual evidence rather than encoding it as a score, ranking, or quality measure.

## 4. Generation variability remained a visible limitation

Even with the Redesign, participants noticed image changes that could not safely be attributed to one prompt edit.

P1 noticed that the feather moved. P2 noted that composition changed in ways that could not be explained by removing one word. P3 similarly observed layout differences.

These responses support keeping the generation-variability warning visible.

The interface should therefore avoid causal statements such as “this word caused this image change.”

A safer interpretation is that the prompt revision is associated with visible differences in the regenerated comparison.

---

# Design Implications

Participant comments suggest several possible interface refinements.

1. Make the **“regenerated demonstration”** label more visually prominent.
2. Move provenance information closer to the image thumbnails.
3. Keep the persistent color legend for:

   * recorded source data,
   * regenerated material,
   * AI interpretation,
   * unavailable evidence.
4. Shorten some explanatory text into more scannable phrases or bullet points.
5. Keep the generation-variability warning visible near the comparison rather than placing it only in supporting documentation.

These changes are small refinements rather than a new redesign direction.

---

# Interpretation

The descriptive results favor the Redesign condition.

Median task time decreased from **87.5 seconds** to **66.5 seconds**, while median confidence increased from **3.5/5** to **4.5/5**.

Fully correct provenance distinction also increased from **0/4** in Baseline to **4/4** in Redesign.

However, these values should not be interpreted as proof that the Redesign caused better performance.

The evaluation included only four student proxies, and participants did not complete exactly the same prompt-edit comparison in both interface conditions.

The results should therefore be treated as formative evidence that the redesign is promising and that provenance labeling deserves further testing.

---

# Limitations

This evaluation has several limitations.

* The sample includes only four DKU student proxies.
* Participants are not representative of professional artists or broader creator communities.
* The Baseline and Redesign tasks did not always use the same prompt-edit pair.
* The study was formative rather than a controlled experiment.
* The regenerated images introduce visual variability that cannot be isolated from prompt changes.
* Participants were exposed to the interface within a short testing session, which may not reflect longer-term use.

Future evaluation should use a larger participant group, matched tasks across conditions, and more participants from art, design, and creative-technology backgrounds.

---

# Summary

The formative evaluation suggests that the redesign may improve users’ ability to distinguish recorded evidence from regenerated and AI-generated material.

The strongest result concerns provenance comprehension: all four participants correctly classified the major evidence layers in the Redesign condition, while none did so fully in the Baseline condition.

The explicit prompt diff also appeared useful for noticing removed terms, and the claim-limit message helped participants avoid overinterpreting the upscale label.

At the same time, users continued to notice uncontrolled generation differences, reinforcing the need for visible uncertainty and claim-boundary warnings.

These findings support the current provenance-layered design while also motivating small refinements to label visibility, explanatory text, and legend placement.
