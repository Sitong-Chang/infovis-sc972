#!/usr/bin/env python3
"""Build the browser-ready analysis sample from Midjourney Threads.

Usage:
    python scripts/build_analysis.py ../source-data/data/threads_0.csv

The output is deterministic. It keeps only English, consecutive records whose
prompt-token Jaccard similarity is at least 0.35, then selects an evenly spaced
sample of qualifying threads while always retaining the paper case (2231).
"""

from __future__ import annotations

import csv
import json
import math
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

TOKEN_RE = re.compile(r"[a-z0-9]+(?:[-'][a-z0-9]+)?", re.I)
STOPWORDS = {
    "a", "an", "and", "as", "at", "by", "for", "from", "in", "into",
    "is", "of", "on", "or", "the", "to", "with"
}

SEMANTIC_LEXICONS = {
    "Quality / rendering": {
        "4k", "8k", "16k", "hd", "high", "quality", "detailed", "detail",
        "realistic", "photorealistic", "render", "rendered", "resolution",
        "sharp", "ultra", "unreal", "octane"
    },
    "Style / mood": {
        "anime", "art", "artistic", "beautiful", "cinematic", "concept",
        "dark", "dramatic", "dreamy", "fantasy", "gothic", "illustration",
        "minimalist", "painting", "surreal", "vintage", "watercolor"
    },
    "Camera / composition": {
        "angle", "close", "closeup", "composition", "depth", "front", "lens",
        "macro", "perspective", "portrait", "shot", "side", "view", "wide"
    },
    "Color / lighting": {
        "backlight", "black", "blue", "bright", "color", "colour", "gold",
        "green", "light", "lighting", "neon", "orange", "pink", "red",
        "shadow", "white", "yellow"
    },
    "Environment": {
        "background", "beach", "city", "desert", "environment", "forest",
        "forrest", "landscape", "mountain", "ocean", "room", "sky", "space",
        "street", "studio", "underwater"
    }
}


def tokens(value: str) -> list[str]:
    return [token.lower() for token in TOKEN_RE.findall(value or "")]


def multiset_diff(before: list[str], after: list[str]) -> tuple[list[str], list[str]]:
    before_counts = Counter(before)
    after_counts = Counter(after)
    added = list((after_counts - before_counts).elements())
    removed = list((before_counts - after_counts).elements())
    return added, removed


def jaccard_distance(left: list[str], right: list[str]) -> float:
    a, b = set(left), set(right)
    if not a and not b:
        return 0.0
    return 1 - len(a & b) / len(a | b)


def edit_type(added: list[str], removed: list[str]) -> str:
    if added and not removed:
        return "Addition"
    if removed and not added:
        return "Removal"
    if added and removed:
        return "Mixed / replacement"
    return "Parameter-only"


def focus_for(words: list[str]) -> list[str]:
    content = {word for word in words if word not in STOPWORDS}
    focuses = [label for label, lexicon in SEMANTIC_LEXICONS.items() if content & lexicon]
    if content and not focuses:
        focuses.append("Subject / other")
    return focuses or ["No lexical change"]


def clean_row(row: dict[str, str]) -> dict[str, object]:
    captions = [row.get(f"caption_{index}", "") for index in range(4)]
    return {
        "id": row["id"],
        "timestamp": row["timestamp"],
        "prompt": row["text"],
        "args": row.get("args", ""),
        "upscaled": row.get("label", "").lower() == "true",
        "word_len": int(float(row.get("word_len") or 0)),
        "captions": captions,
        "source_image_url": row.get("url_png", ""),
    }


def transition(before: dict[str, object], after: dict[str, object], thread_id: str, index: int) -> dict[str, object]:
    before_tokens = tokens(str(before["prompt"]))
    after_tokens = tokens(str(after["prompt"]))
    added, removed = multiset_diff(before_tokens, after_tokens)
    caption_before = tokens(" ".join(before["captions"]))
    caption_after = tokens(" ".join(after["captions"]))
    prompt_change = jaccard_distance(before_tokens, after_tokens)
    return {
        "id": f"t{thread_id}-{index}",
        "thread_id": int(thread_id),
        "from": before["id"],
        "to": after["id"],
        "added": added,
        "removed": removed,
        "edit_type": edit_type(added, removed),
        "focus": focus_for(added + removed),
        "prompt_change": round(prompt_change, 3),
        "prompt_similarity": round(1 - prompt_change, 3),
        "caption_change": round(jaccard_distance(caption_before, caption_after), 3),
        "later_upscaled": bool(after["upscaled"]),
    }


def evenly_spaced(items: list[dict[str, object]], count: int) -> list[dict[str, object]]:
    if len(items) <= count:
        return items
    chosen = []
    used = set()
    for index in range(count):
        position = round(index * (len(items) - 1) / (count - 1))
        key = items[position]["thread_id"]
        if key not in used:
            chosen.append(items[position])
            used.add(key)
    return chosen


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Provide the path to threads_0.csv")

    source_path = Path(sys.argv[1])
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    source_rows = 0
    with source_path.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            source_rows += 1
            grouped[row["thread_id"]].append(row)

    qualifying_threads = []
    all_qualifying_transitions = []
    for thread_id, raw_rows in grouped.items():
        if len(raw_rows) < 2 or any(row.get("lang") != "en" for row in raw_rows):
            continue
        rows = [clean_row(row) for row in sorted(raw_rows, key=lambda item: item["timestamp"])]
        transitions = [transition(rows[i], rows[i + 1], thread_id, i + 1) for i in range(len(rows) - 1)]
        retained = [item for item in transitions if item["prompt_similarity"] >= 0.35]
        if not retained:
            continue
        thread = {
            "thread_id": int(thread_id),
            "records": rows,
            "transitions": transitions,
            "retained_transition_ids": [item["id"] for item in retained],
            "mean_prompt_change": round(sum(float(item["prompt_change"]) for item in retained) / len(retained), 3),
            "upscale_count": sum(bool(row["upscaled"]) for row in rows),
        }
        qualifying_threads.append(thread)
        all_qualifying_transitions.extend(retained)

    qualifying_threads.sort(key=lambda item: int(item["thread_id"]))
    selected = evenly_spaced(qualifying_threads, 59)
    case = next((item for item in qualifying_threads if item["thread_id"] == 2231), None)
    if case and all(item["thread_id"] != 2231 for item in selected):
        selected.append(case)
    selected.sort(key=lambda item: int(item["thread_id"]))

    selected_transition_ids = {
        transition_id for item in selected for transition_id in item["retained_transition_ids"]
    }
    selected_transitions = [
        transition_item
        for item in selected
        for transition_item in item["transitions"]
        if transition_item["id"] in selected_transition_ids
    ]

    type_counts = Counter(item["edit_type"] for item in all_qualifying_transitions)
    focus_counts = Counter(focus for item in all_qualifying_transitions for focus in item["focus"])
    mean_prompt_change = sum(float(item["prompt_change"]) for item in all_qualifying_transitions) / len(all_qualifying_transitions)
    mean_caption_change = sum(float(item["caption_change"]) for item in all_qualifying_transitions) / len(all_qualifying_transitions)

    output = {
        "version": "1.0",
        "method": {
            "source": "Midjourney Threads: threads_0.csv",
            "source_rows": source_rows,
            "source_threads": len(grouped),
            "filter": "English consecutive records with prompt-token Jaccard similarity >= 0.35.",
            "qualifying_threads": len(qualifying_threads),
            "qualifying_transitions": len(all_qualifying_transitions),
            "display_sample": "59 evenly spaced qualifying threads plus thread 2231 when needed.",
            "display_threads": len(selected),
            "display_transitions": len(selected_transitions),
            "caption_note": "Caption change compares BLIP-2 captions supplied in the dataset; it is model-derived interpretation, not direct visual ground truth.",
            "semantic_note": "Edit focus uses a disclosed keyword heuristic and is derived, not manually coded ground truth."
        },
        "aggregate": {
            "edit_type_counts": dict(type_counts),
            "focus_counts": dict(focus_counts),
            "mean_prompt_change": round(mean_prompt_change, 3),
            "mean_caption_change": round(mean_caption_change, 3),
            "upscaled_later_count": sum(bool(item["later_upscaled"]) for item in all_qualifying_transitions),
        },
        "threads": selected,
    }

    output_path = Path(__file__).resolve().parents[1] / "data" / "analysis.json"
    output_path.write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {output_path} with {len(selected)} threads and {len(selected_transitions)} transitions")


if __name__ == "__main__":
    main()
