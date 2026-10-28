import { NextResponse } from "next/server";
import a2 from "../../../shared-content/verb-library/A2.json";
import b1 from "../../../shared-content/verb-library/B1.json";
import b2 from "../../../shared-content/verb-library/B2.json";
import c1 from "../../../shared-content/verb-library/C1.json";

// The exact, unmodified shared-content JSON remains the source of truth.
// Send one level at a time rather than embedding every dataset in initial page HTML.
const library = { A2: a2, B1: b1, B2: b2, C1: c1 };
type Level = keyof typeof library;

export function GET(request: Request) {
  const level = new URL(request.url).searchParams.get("level");

  if (!level || !Object.prototype.hasOwnProperty.call(library, level)) {
    return NextResponse.json(
      { error: "Choose one of A2, B1, B2 or C1." },
      { status: 400 }
    );
  }

  const selectedLevel = level as Level;
  const rows = library[selectedLevel];
  const entries = rows.map((row, index) => ({
    id: `${selectedLevel}-${index}`,
    verb: row.v,
    meaning: row.meaning,
    forms: row.forms
  }));

  // Index-based IDs distinguish separate senses sharing the same lemma, e.g. sticka.
  return NextResponse.json(
    { level: selectedLevel, count: entries.length, entries },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
  );
}
