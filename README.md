# Prompt Influence Inspector

An evidence-aware extension of a PrompTHis-inspired Image Variant Graph for INFOSCI 301. This static research artifact lets novice creators inspect a real prompt-revision sequence while keeping recorded data, regenerated demonstrations, historical user action, and AI interpretation visibly separate.

> Status: **working v0.3 prototype**. The prompt records and upscale labels come from a public dataset. The displayed images are newly generated demonstrations because the recorded source-image URLs are no longer available.

## Research question

**How can provenance-labeled multimodal comparison help novice creators inspect real prompt revisions without confusing recorded interaction data, regenerated visual evidence, and AI interpretation?**

## Project links

- Project repository: https://github.com/dku-infosci301-Autumn2026/infovis-sc972
- Live website: https://infovis-sc972.vercel.app/

## Selected IEEE VIS paper

The project builds on **PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation**. PrompTHis already supports exploration of prompt-editing history and influence, so this redesign does not claim to invent prompt-image comparison.

- Paper: https://arxiv.org/abs/2403.09615
- Open-source repository: https://github.com/Vis4Sense/prompthis

This repository does not reproduce or claim to be the original system. Its baseline is an attributed, simplified reconstruction for a focused comparison task.

## Additional data

The complementary source is **Midjourney Threads**, released with *Human Learning by Model Feedback: The Dynamics of Iterative Prompting with Midjourney*.

- Paper: https://aclanthology.org/2023.emnlp-main.253/
- Dataset repository: https://github.com/shachardon/Mid-Journey-to-alignment
- Source file: `data/threads_0.csv`
- Selected thread: `thread_id = 2231`
- Selected records: `1071138984736084058`, `1071139569849880656`, and `1071140082511253515`

The three consecutive records were selected because they contain compact, inspectable revisions:

1. add “HD” and remove “surreal”;
2. add “forrest” and remove “front view.”

The misspelling “forrest” is preserved in the recorded prompt. The interpretation explains that it is read as “forest,” rather than silently altering the source.

Pick-a-Pic was considered but not used for this interaction because its records pair two images generated from the same prompt. Attaching that preference label to a prompt-edit edge would misrepresent what the data measure.

## Redesign contribution

Redesign mode adds a focused **Influence Inspector** with four layers:

1. recorded prompt text and a derived word-level diff;
2. newly generated images for visual comparison;
3. the historical upscale label for the later record;
4. a model-generated, manually checked visual summary.

The upscale label is treated as a behavioral trace, not an explicit preference judgment or objective quality score.

Version 0.3 adds a persistent provenance legend and shorter claim-limit messages. These changes follow an anticipated-usability walkthrough and must not be reported as participant-derived findings until real testing is completed.

## Provenance and claim boundaries

| Layer | Status in the interface | Claim boundary |
|---|---|---|
| Prompt, parameters, IDs, timestamps | Recorded source data | Describes only the selected historical thread |
| Added/removed terms | Deterministic derived data | Depends on token-level comparison |
| Displayed images | AI-generated demonstration | Not the historical Midjourney outputs; generation variability remains |
| Upscale label | Recorded historical action | Behavioral proxy, not explicit preference |
| Tags and visual summary | AI interpretation, manually checked | May be incomplete or wrong |
| Original images | Unavailable source evidence | All three recorded Discord CDN URLs returned HTTP 404 on 2026-09-13 |
| Creator intention | Unavailable | Not inferred |

## Emerging technology

The prototype uses prompt-conditioned image generation and multimodal comparison. For reproducibility, all images and summaries are stored locally rather than generated live. The exact generation record is in [`docs/image-generation-record.md`](docs/image-generation-record.md).

## Working interaction

1. Switch between **Baseline** and **Redesign**.
2. Select either edit in the Image Variant Graph.
3. Compare the exact before/after prompts and regenerated images.
4. In redesign mode, inspect the historical action and labeled AI summary.
5. Check the missing-source warning before drawing conclusions.

## Run locally

Because the page loads JSON with `fetch`, serve the repository through a local HTTP server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. No build step, package manager, API key, or backend is required.

## Evaluation

The planned task is:

> Identify which recorded prompt edit most clearly corresponds to a visible contextual change in the regenerated comparison, explain what changed, and identify which displayed claims are source records versus generated interpretation.

The formative plan and empty results section are in [`docs/evaluation-record.md`](docs/evaluation-record.md). Results have not yet been collected.

## Limitations

- The baseline is a simplified attributed reconstruction, not a full replication.
- The original historical images are unavailable, so the prototype cannot reconstruct their exact changes.
- Independently generated demonstrations do not isolate causal prompt effects.
- Upscaling may reflect several motivations and is not equivalent to preference.
- AI summaries can overlook or overstate visual differences.
- A three-record sample supports interface inspection, not population-level claims.
- Student proxy testing cannot represent professional artists or wider creator communities.

## AI assistance and human verification

AI assistance was used to scaffold code, generate the three demonstration images, draft comparison summaries, and revise documentation. The images were visually inspected for prompt consistency; the summaries were checked against the displayed images; and dataset fields were checked against the selected CSV rows. AI-generated material remains visibly labeled.

## License

Code in this repository is released under the MIT License. External datasets and referenced projects retain their own licenses and terms.
