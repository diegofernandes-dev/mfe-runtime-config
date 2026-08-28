from __future__ import annotations

import argparse
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--template", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--set", action="append", default=[])
    args = parser.parse_args()

    values: dict[str, str] = {}
    for item in args.set:
        key, sep, value = item.partition("=")
        if not sep:
            raise SystemExit(f"invalid --set value: {item}")
        values[key] = value

    text = Path(args.template).read_text(encoding="utf-8")
    for key, value in values.items():
        text = text.replace(f"__{key}__", value)

    unresolved = sorted({part.split("__", 1)[0] for part in text.split("__")[1::2]})
    if unresolved:
        raise SystemExit(f"unresolved template tokens: {', '.join(unresolved)}")

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
