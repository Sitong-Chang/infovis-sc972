# Prompt Influence Inspector

An evidence-aware extension of a PrompTHis-inspired Image Variant Graph for INFOSCI 301. This static research artifact helps novice creators inspect a real prompt-revision sequence while keeping recorded data, regenerated demonstrations, historical user action, unavailable evidence, and AI interpretation visibly separate.

> Status: **working evaluated prototype**. The prompt records and upscale labels come from a public dataset. The displayed images are newly generated demonstrations because the recorded historical image URLs are no longer available.

## Research Question

**How can provenance-labeled multimodal comparison help novice creators inspect real prompt revisions without confusing recorded interaction data, regenerated visual evidence, and AI interpretation?**

## Project Links

- Repository: https://github.com/dku-infosci301-Autumn2026/infovis-sc972
- Live website: https://infovis-sc972.vercel.app/
- Main condensed paper: [`docs/paper-main-condensed.md`](docs/paper-main-condensed.md)
- Appendix A — technical evidence, governance, continuity, and evaluation: [`docs/appendix-a.md`](docs/appendix-a.md)
- Appendix B — AI assistance and human verification: [`docs/appendix-b.md`](docs/appendix-b.md)
- Evaluation record: [`docs/evaluation-record.md`](docs/evaluation-record.md)
- Image-generation record: [`docs/image-generation-record.md`](docs/image-generation-record.md)
- Paper figures: [`assets/screenshots/`](assets/screenshots/)
- Field evidence: [`assets/field/`](assets/field/)

## Selected IEEE VIS Paper

The project builds on **PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation**.

PrompTHis already supports exploration of prompt-editing history and influence. This redesign therefore does not claim to invent prompt-image comparison or influence analysis. Instead, it adds a focused provenance-aware comparison layer for a different analytical question.

- Paper: https://arxiv.org/abs/2403.09615
- Open-source repository: https://github.com/Vis4Sense/prompthis

The Baseline in this repository is an attributed, simplified reconstruction rather than a full replication of the original system.

## Complementary Data

The additional data source is **Midjourney Threads**, released with *Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney*.

- Paper: https://aclanthology.org/2023.emnlp-main.253/
- Dataset repository: https://github.com/shachardon/Mid-Journey-to-alignment
- Source file: `data/threads_0.csv`
- Selected thread: `thread_id = 2231`
- Selected records:
  - `1071138984736084058`
  - `1071139569849880656`
  - `1071140082511253515`

The three consecutive records contain two compact revisions:

1. add “HD” and remove “surreal”;
2. add “forrest” and remove “front view.”

The misspelling “forrest” is preserved because it appears in the recorded source prompt.

Pick-a-Pic was considered but rejected for this task because its preference labels compare image alternatives associated with the same prompt rather than directly measuring prompt-edit transitions.

## Redesign Contribution

Redesign mode adds a focused **Influence Inspector** with four coordinated layers:

1. recorded before/after prompts and a derived word-level diff;
2. regenerated comparison images plus a missing-source warning;
3. the later record’s historical upscale action;
4. an AI-generated, manually checked visual summary.

A persistent provenance legend distinguishes:

- recorded source evidence;
- regenerated demonstration material;
- AI interpretation;
- unavailable historical evidence.

The interface deliberately avoids converting upscale into a preference score or quality measure.

## Provenance and Claim Boundaries

| Layer | Status | Claim boundary |
|---|---|---|
| Prompt, parameters, IDs, timestamps | Recorded source data | Describes only the selected historical thread |
| Added/removed terms | Derived data | Deterministic comparison of recorded prompt text |
| Displayed images | Regenerated demonstration | Not historical Midjourney outputs; generation variability remains |
| Upscale label | Recorded historical action | Behavioral trace, not explicit preference |
| Tags and summary | AI interpretation | May be incomplete or wrong |
| Original images | Unavailable evidence | Recorded image URLs returned HTTP 404 on September 13, 2026 |
| Creator intention | Unavailable | Not inferred |
| Explicit preference | Unavailable | Not inferred from upscale |

## Field Evidence and Continuity

The project also carries forward design lessons from earlier INFOSCI 301 work.

Week 1 explored transparency in recommendation ranking through a Zhouzhuang travel-recommendation prototype.

Week 2 developed **Energy Lens**, emphasizing that different analytical questions may require different visual idioms and that derived values should remain distinguishable from source data.

Two photographs taken at the Shanghai Science and Technology Museum on September 4, 2026 are stored in:

`assets/field/`

They are used as visual-design evidence rather than evidence about visitor comprehension.

## Emerging Technology

The artifact uses prompt-conditioned image generation and multimodal comparison.

For reproducibility, generated images and summaries are stored locally rather than generated through a live API at runtime.

The exact generation record is documented in:

[`docs/image-generation-record.md`](docs/image-generation-record.md)

## Working Interaction

1. Switch between **Baseline** and **Redesign**.
2. Select either prompt-edit edge in the Image Variant Graph.
3. Compare exact before/after prompts and regenerated images.
4. In Redesign, inspect provenance labels, historical action, missing-source status, and AI interpretation.
5. Read the generation-variability warning before drawing conclusions.

## Evaluation

A formative evaluation was conducted with four anonymized DKU student proxies.

Participants completed one Baseline task and one Redesign task in counterbalanced order.

### Descriptive results

| Measure | Baseline | Redesign |
|---|---:|---:|
| Fully correct prompt-edit identification | 2/4 | 4/4 |
| Fully correct provenance distinction | 0/4 | 4/4 |
| Median completion time | 87.5 s | 66.5 s |
| Median confidence | 3.5/5 | 4.5/5 |
| Correct upscale interpretation | — | 4/4 |

The clearest formative pattern concerned provenance comprehension: none of the four participants fully distinguished source, regenerated, and interpreted material in Baseline, while all four did so in Redesign.

The explicit word diff also appeared to help participants notice removed terms.

All four participants correctly rejected the interpretation that upscale represented objective quality or explicit preference.

However, participants continued to notice composition and layout differences caused by regeneration variability. The project therefore keeps its causal claim deliberately limited.

These results are formative rather than causal evidence because:

- the sample contains only four student proxies;
- tasks were not perfectly matched across conditions;
- and independently regenerated images contain uncontrolled variation.

Full records are in:

[`docs/evaluation-record.md`](docs/evaluation-record.md)

## Limitations

- The Baseline is a simplified attributed reconstruction rather than a full PrompTHis replication.
- Historical Midjourney images are unavailable.
- Regenerated demonstrations cannot isolate causal prompt effects.
- Creator intention is unavailable.
- Upscale does not establish explicit preference or objective quality.
- AI summaries may overlook or overstate visual differences.
- The sample includes only one three-step thread.
- Four student proxies cannot represent professional artists or broader creator communities.

## AI Assistance and Human Verification

AI assistance was used to:

- scaffold code;
- generate demonstration images;
- draft comparison summaries;
- help organize documentation;
- and assist with paper and evaluation structure.

Human verification included:

- checking selected dataset rows;
- preserving source prompt spelling;
- inspecting generated images;
- reviewing AI summaries;
- checking provenance labels;
- testing the deployed interaction;
- and supplying and verifying the participant evaluation records.

AI-generated content remains labeled as generated or interpreted material.

Full disclosure appears in:

[`docs/appendix-b.md`](docs/appendix-b.md)

## Run Locally

Because the page loads JSON using `fetch`, serve the repository through a local HTTP server:

```bash
python -m http.server 8000
