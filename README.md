# Prompt Influence Inspector

An evidence-aware extension of a PrompTHis-inspired Image Variant Graph for INFOSCI 301. This preliminary artifact helps novice creators compare a prompt edit, its visible output change, available preference evidence, and a clearly labeled AI interpretation.

> Status: **working v0.1 prototype**. The current images and preference record are illustrative scaffolding, not empirical Pick-a-Pic records. They must be replaced with a traceable public-data subset before evaluation.

## Research question

**Can preference-aware, multimodal comparison help novice creators identify and explain meaningful prompt influence?**

## Selected IEEE VIS paper

The project builds on **PrompTHis: Visualizing the Process and Influence of Prompt Editing during Text-to-Image Creation**. The original work uses an Image Variant Graph to make prompt-editing history and generated variants inspectable.

- Paper record: https://ieeevis.org/year/2024/program/paper_v-tvcg-20243408255.html
- Open-source repository: https://github.com/Vis4Sense/prompthis

This repository does not reproduce or claim to be the original PrompTHis system. Its baseline is an attributed, simplified reconstruction for a focused comparison task.

## Original system / baseline

Baseline mode shows:

- generated-image variants as nodes;
- prompt edits as connecting edges;
- adjacent prompt and image evidence.

It intentionally hides human-preference context and interpretive summaries.

## Redesign contribution

Redesign mode adds an **Influence Inspector** with four explicit layers:

1. recorded prompt change;
2. side-by-side visual evidence;
3. available human-preference evidence;
4. model-derived visual-change interpretation.

The interface visually separates evidence from interpretation so polished AI text is not presented as empirical fact.

## Additional data

The intended complementary source is a small, inspectable subset of **Pick-a-Pic v2** pairwise human-preference records. The final subset should contain only records that can be redistributed and traced to their exact dataset version and row identifiers.

Current `data/prototype.json` values are explicitly labeled **illustrative**. They test the interaction and failure states only. No current value should be cited as a research finding.

## Emerging technology

The proposed capability is multimodal vision-language comparison: jointly inspect two prompts and two images, then produce a concise description of visible changes associated with the edit. For reproducibility and safety, summaries in this static prototype are pre-generated, manually checked, and stored with the data rather than generated live.

## Data provenance and governance

| Layer | Interface treatment | Claim boundary |
|---|---|---|
| Prompt text and images | Blue “recorded/observed evidence” labels | Shows only the selected example |
| Pairwise preference | Blue evidence label or explicit unavailable state | Not a universal aesthetic-quality score |
| Semantic tags and summary | Amber “model-derived” label | Interpretation may be incomplete or wrong |
| Creator intention | Not inferred | Requires direct creator annotation or dialogue |

## Working interaction

1. Switch between **Baseline** and **Redesign**.
2. Select an edit edge in the Image Variant Graph.
3. Compare before/after prompts and images.
4. In redesign mode, inspect preference availability and the labeled AI summary.
5. Select `+ watercolor texture` to see an explicit missing-preference state.

## Run locally

Because the page loads JSON with `fetch`, serve the repository through a local HTTP server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. No build step, package manager, API key, or backend is required.

## Evaluation

The planned comparison task is:

> Identify which prompt edit most strongly changed the visual mood while preserving the main subject, and explain what changed.

The formative plan, measures, success criterion, and empty results section are in [`docs/evaluation-record.md`](docs/evaluation-record.md). Results have not yet been collected.

## Limitations

- The baseline is a simplified attributed reconstruction, not a full replication.
- The current dataset and images are illustrative.
- Pairwise preference does not establish universal quality.
- AI summaries can overlook or overstate visual differences.
- Student proxy testing cannot represent professional artists or the wider community.

## AI assistance and human verification

AI assistance was used to scaffold front-end code, illustrative SVG variants, placeholder comparison text, and documentation. The project author must verify every final prompt-image pair, provenance field, visual summary, and evaluative claim before submission. AI-generated interpretation remains visually labeled in the interface.

## Project links

- Project repository: https://github.com/dku-infosci301-Autumn2026/infovis-sc972
- Live website: _add the assigned Vercel production URL after deployment_

## License

Code in this repository is released under the MIT License. External datasets and referenced projects retain their own licenses and terms.
