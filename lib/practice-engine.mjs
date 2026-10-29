// V-004: deterministic quizzes drawn solely from existing Swedish source data.
const FORM_ORDER = ["Inf", "Imp", "Pres", "Pret", "Sup"];
const CLOZE_ORDER = ["Pres", "Pret", "Sup", "Imp", "Inf"];
const MEANING_CONTEXT_ORDER = ["Pres", "Inf", "Pret", "Sup", "Imp"];

// A dash or editorial marker is not a Swedish conjugation.
export function isAvailableFormWord(word) {
  return typeof word === "string" && Boolean(word.trim()) &&
    !/^(?:[—–−-]+|n\\/?a|not provided|none)$/iu.test(word.trim());
}

function wholeWordPattern(word) {
  const escaped = [...word].map((char) =>
    "\\^$.*+?()[]{}|".includes(char) ? "\\" + char : char
  ).join("");
  return new RegExp("(^|[^\\p{L}\\p{N}])" + escaped +
    "(?=$|[^\\p{L}\\p{N}])", "gu");
}

function meaningContext(entry) {
  // Use ONLY a source-authored bilingual example where the listed form
  // actually occurs as a complete word in that selected-sense sentence.
  for (const key of MEANING_CONTEXT_ORDER) {
    const form = entry.forms?.[key];
    const word = form?.word?.trim();
    const swedish = form?.sv?.trim();
    const english = form?.en?.trim();
    if (!isAvailableFormWord(word) || !swedish || !english) continue;
    if (wholeWordPattern(word).test(swedish)) {
      return { swedish, english, key };
    }
  }
  return null;
}

function hash(value) {
  let result = 2166136261;
  for (const char of value) {
    result ^= char.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function choices(correct, alternatives, seed, size = 4) {
  const candidates = [...new Set(alternatives.filter((value) =>
    typeof value === "string" && value.trim() && value !== correct
  ))];
  const chosen = [correct, ...candidates.sort((a, b) =>
    (hash(seed + ":" + a) - hash(seed + ":" + b)) || a.localeCompare(b)
  ).slice(0, size - 1)];
  return chosen.sort((a, b) =>
    (hash(seed + ":position:" + a) - hash(seed + ":position:" + b)) || a.localeCompare(b)
  );
}

function uniqueForms(entry) {
  const words = [];
  for (const key of FORM_ORDER) {
    const word = entry.forms?.[key]?.word?.trim();
    if (isAvailableFormWord(word) && !words.includes(word)) words.push(word);
  }
  return words;
}

function clozeFrom(entry) {
  const alternatives = uniqueForms(entry);
  if (alternatives.length < 3) return null;
  for (const key of CLOZE_ORDER) {
    const form = entry.forms?.[key];
    const word = form?.word?.trim();
    const example = form?.sv?.trim();
    const translation = form?.en?.trim();
    if (!isAvailableFormWord(word) || !example || !translation) continue;
    // Escape regexp special characters and blank only a complete Unicode word.
    const pattern = wholeWordPattern(word);
    const matches = [...example.matchAll(pattern)];
    if (matches.length !== 1) continue;
    const masked = example.replace(pattern, (_full, before) => before + "_____");
    if (masked === example) continue;
    return { word, masked, example, translation, alternatives };
  }
  return null;
}

export function makePracticeQuestions(entry, pool) {
  if (!entry || !entry.verb || !entry.meaning || !Array.isArray(pool)) return [];
  const seed = entry.verb + "|" + entry.meaning;
  const questions = [];

  const others = pool.filter((candidate) =>
    candidate.id !== entry.id && candidate.meaning !== entry.meaning
  );
  const sameLemma = others.filter((row) => row.verb === entry.verb).map((row) => row.meaning);
  const otherMeanings = others.map((row) => row.meaning);
  const meaningOptions = choices(entry.meaning,
    [...sameLemma, ...otherMeanings.sort((a, b) => hash(seed + a) - hash(seed + b))],
    seed + "|meaning"
  );
  const sourceContext = meaningContext(entry);
  // If a source-grounded context is unavailable, omit this ambiguous question.
  if (meaningOptions.length >= 3 && sourceContext) {
    const broadGloss = /[;,]/.test(entry.meaning);
    questions.push({
      id: "meaning",
      kind: "meaning",
      title: "Understand the meaning",
      prompt: 'Which English meaning best describes "' + entry.verb + '" as used in this Swedish sentence?',
      context: sourceContext.swedish,
      choices: meaningOptions,
      answer: entry.meaning,
      explanation: 'Source entry: "' + entry.verb + '" — "' + entry.meaning + '".' +
        '\\nSwedish: ' + sourceContext.swedish +
        '\\nEnglish: ' + sourceContext.english +
        (broadGloss ? '\\nThis source label includes multiple uses; the sentence illustrates one use, not every listed meaning.' : '')
    });
  }

  const present = entry.forms?.Pres?.word?.trim();
  const availableForms = uniqueForms(entry);
  if (isAvailableFormWord(present) && availableForms.length >= 3) {
    const options = choices(present, availableForms, seed + "|form");
    if (options.length >= 3) {
      questions.push({
        id: "form",
        kind: "form",
        title: "Choose the verb form",
        prompt: 'Which is the present-tense form of "' + entry.verb + '"?',
        context: "",
        choices: options,
        answer: present,
        explanation: 'The library lists "' + present + '" as the present-tense form.'
      });
    }
  }

  const cloze = clozeFrom(entry);
  if (cloze) {
    const options = choices(cloze.word, cloze.alternatives, seed + "|cloze");
    if (options.length >= 3) {
      questions.push({
        id: "cloze",
        kind: "cloze",
        title: "Complete the sentence",
        prompt: "Choose the missing verb form.",
        context: cloze.masked,
        choices: options,
        answer: cloze.word,
        explanation: "Original example: " + cloze.example + "\nEnglish: " + cloze.translation
      });
    }
  }
  return questions;
}

/** V-004-F01: only offer an explicit, opt-in reveal after a wrong answer. */
export function canRevealCorrectAnswer(selected, answer, revealed, solved) {
  return typeof selected === "string" &&
    selected !== answer &&
    !revealed &&
    !solved;
}
