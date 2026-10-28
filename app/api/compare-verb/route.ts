import { NextResponse } from "next/server";
import a2 from "../../../shared-content/verb-library/A2.json";
import b1 from "../../../shared-content/verb-library/B1.json";
import b2 from "../../../shared-content/verb-library/B2.json";
import c1 from "../../../shared-content/verb-library/C1.json";

const library = { A2: a2, B1: b1, B2: b2, C1: c1 };
type Level = keyof typeof library;
const levels: Level[] = ["A2", "B1", "B2", "C1"];

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const verb = params.get("verb") ?? "";
  const meaning = params.get("meaning") ?? "";
  if (!verb.trim() || !meaning.trim() || verb.length > 100 || meaning.length > 250) {
    return NextResponse.json({ error: "A verb and its English meaning are required." }, { status: 400 });
  }

  // Use both lemma and meaning to distinguish separate sticka senses.
  const matches = Object.fromEntries(levels.map((level) => {
    const index = library[level].findIndex((row) => row.v === verb && row.meaning === meaning);
    if (index < 0) return [level, null];
    const row = library[level][index];
    return [level, { id: `${level}-${index}`, verb: row.v, meaning: row.meaning, forms: row.forms }];
  }));

  if (levels.every((level) => matches[level] === null)) {
    return NextResponse.json({ error: "The requested verb meaning was not found." }, { status: 404 });
  }
  return NextResponse.json(
    { verb, meaning, matches },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } }
  );
}
