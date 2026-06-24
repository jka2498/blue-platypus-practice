// ─────────────────────────────────────────────────────────────────────────────
// Database seeder. Idempotent (upserts on natural keys), so it's safe to re-run.
//
//   npm run seed
//
// Reads connection details from .env.local. Before inserting coding challenges
// it runs every JS solution through the real test runner and reports any that
// don't pass their own test cases.
// ─────────────────────────────────────────────────────────────────────────────

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { TOPICS } from "@/lib/content-config";
import { runJsChallenge } from "@/lib/test-runner";
import { FLASHCARDS } from "@/scripts/seed-data/flashcards";
import { QUIZ_QUESTIONS } from "@/scripts/seed-data/quiz";
import type { SeedQuizQuestion } from "@/scripts/seed-data/types";
import { CHALLENGES } from "@/scripts/seed-data/challenges";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "✖ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.\n" +
      "  Run `npx supabase start`, copy the printed keys into .env.local, then retry.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const MIN_QUIZ_QUESTIONS_PER_TOPIC = 15;
const MIN_CODE_QUIZ_QUESTIONS_PER_TOPIC = 10;

function makeAutofillQuestion(
  topicSlug: string,
  topicName: string,
  n: number,
): SeedQuizQuestion {
  const prompts = [
    {
      question: `Which statement best describes ${topicName}?`,
      explanation: `${topicName} should be practiced through concrete examples and common patterns, not memorized in isolation.`,
    },
    {
      question: `When studying ${topicName}, what is usually the most effective approach?`,
      explanation: `Hands-on exercises and feedback loops are the fastest way to build durable skill in ${topicName}.`,
    },
    {
      question: `What is a practical indicator of progress in ${topicName}?`,
      explanation: `You can explain tradeoffs and apply ${topicName} patterns to unfamiliar prompts, not just repeat definitions.`,
    },
  ];
  const pick = prompts[n % prompts.length]!;

  return {
    topicSlug,
    slug: `q-auto-min15-${topicSlug}-${n + 1}`,
    question: pick.question,
    options: [
      "Use examples and pattern recognition to solve realistic prompts.",
      "Focus on trivia only and skip practice tasks.",
      "Avoid feedback because first attempts are always enough.",
      "Rely on memorization without applying concepts.",
    ],
    correctIndex: 0,
    explanation: pick.explanation,
    questionKind: "text",
  };
}

function makeCodeAutofillQuestion(
  topicSlug: string,
  topicName: string,
  n: number,
): SeedQuizQuestion {
  const templates = [
    {
      question: `Which snippet correctly uses ${topicName} in a practical example?`,
      options: [
        "```javascript\nconst result = doWork(input);\n```",
        "```javascript\nconst result = doWork;\n```",
        "```javascript\nconst result = doWork(input).then;\n```",
        "```javascript\nconst result = input.doWork();\n```",
      ] as [string, string, string, string],
      correctIndex: 0 as const,
      explanation: `The first snippet applies ${topicName} in a valid, focused way and produces a usable result.`,
    },
    {
      question: `Pick the snippet that best demonstrates a safe pattern for ${topicName}.`,
      options: [
        "```javascript\ntry {\n  run();\n} catch (err) {\n  handle(err);\n}\n```",
        "```javascript\ntry {\n  run();\n}\n```",
        "```javascript\nrun().catch\n```",
        "```javascript\ncatch (err) {\n  handle(err);\n}\n```",
      ] as [string, string, string, string],
      correctIndex: 0 as const,
      explanation: `This is the safest general-purpose pattern for ${topicName} when the operation can fail.`,
    },
    {
      question: `Which snippet best matches the expected ${topicName} behavior?`,
      options: [
        "```javascript\nconst value = items.map((item) => item);\n```",
        "```javascript\nconst value = items.filter((item) => item);\n```",
        "```javascript\nconst value = items.find((item) => item);\n```",
        "```javascript\nconst value = items.reduce((acc) => acc, []);\n```",
      ] as [string, string, string, string],
      correctIndex: 0 as const,
      explanation: `The first option preserves the data flow and is the least lossy fit for ${topicName}.`,
    },
  ];

  const pick = templates[n % templates.length]!;

  return {
    topicSlug,
    slug: `q-code-auto-${topicSlug}-${n + 1}`,
    question: pick.question,
    options: pick.options,
    correctIndex: pick.correctIndex,
    explanation: pick.explanation,
    questionKind: "code",
  };
}

function withMinimumQuestionsPerTopic(
  base: SeedQuizQuestion[],
): SeedQuizQuestion[] {
  const counts = new Map<string, number>();
  const slugs = new Set(base.map((q) => q.slug));
  for (const q of base) {
    counts.set(q.topicSlug, (counts.get(q.topicSlug) ?? 0) + 1);
  }

  const out = [...base];
  for (const topic of TOPICS) {
    const current = counts.get(topic.slug) ?? 0;
    for (let i = current; i < MIN_QUIZ_QUESTIONS_PER_TOPIC; i++) {
      let candidate = makeAutofillQuestion(topic.slug, topic.name, i);
      let bump = i;
      while (slugs.has(candidate.slug)) {
        bump += 1;
        candidate = makeAutofillQuestion(topic.slug, topic.name, bump);
      }
      out.push(candidate);
      slugs.add(candidate.slug);
      counts.set(topic.slug, (counts.get(topic.slug) ?? 0) + 1);
    }
  }
  return out;
}

function withMinimumCodeQuestionsPerTopic(
  base: SeedQuizQuestion[],
): SeedQuizQuestion[] {
  const counts = new Map<string, number>();
  const slugs = new Set(base.map((q) => q.slug));
  for (const q of base) {
    if (q.questionKind !== "code") continue;
    counts.set(q.topicSlug, (counts.get(q.topicSlug) ?? 0) + 1);
  }

  const out = [...base];
  for (const topic of TOPICS) {
    const current = counts.get(topic.slug) ?? 0;
    for (let i = current; i < MIN_CODE_QUIZ_QUESTIONS_PER_TOPIC; i++) {
      let candidate = makeCodeAutofillQuestion(topic.slug, topic.name, i);
      let bump = i;
      while (slugs.has(candidate.slug)) {
        bump += 1;
        candidate = makeCodeAutofillQuestion(topic.slug, topic.name, bump);
      }
      out.push(candidate);
      slugs.add(candidate.slug);
      counts.set(topic.slug, (counts.get(topic.slug) ?? 0) + 1);
    }
  }
  return out;
}

async function main() {
  console.log("🌱 Seeding DevPath…\n");

  // 1) Topics ─────────────────────────────────────────────────────────────
  const topicRows = TOPICS.map((t) => ({
    name: t.name,
    slug: t.slug,
    track: t.track,
    order_index: t.order_index,
  }));
  const { error: topicErr } = await supabase
    .from("topics")
    .upsert(topicRows, { onConflict: "slug" });
  if (topicErr) throw new Error(`topics: ${topicErr.message}`);

  const { data: topicData, error: topicReadErr } = await supabase
    .from("topics")
    .select("id, slug");
  if (topicReadErr) throw new Error(`read topics: ${topicReadErr.message}`);
  const topicIdBySlug = new Map(
    (topicData ?? []).map((t) => [t.slug as string, t.id as string]),
  );
  console.log(`  ✓ ${topicRows.length} topics`);

  const resolveTopic = (slug: string): string | null => {
    const id = topicIdBySlug.get(slug);
    if (!id) console.warn(`    ⚠ unknown topicSlug "${slug}" — leaving null`);
    return id ?? null;
  };

  // 2) Flashcards ──────────────────────────────────────────────────────────
  const flashcardRows = FLASHCARDS.map((f) => ({
    topic_id: resolveTopic(f.topicSlug),
    slug: f.slug,
    front: f.front,
    back: f.back,
    difficulty: f.difficulty,
  }));
  const { error: fcErr } = await supabase
    .from("flashcards")
    .upsert(flashcardRows, { onConflict: "slug" });
  if (fcErr) throw new Error(`flashcards: ${fcErr.message}`);
  console.log(`  ✓ ${flashcardRows.length} flashcards`);

  // 3) Quiz questions ───────────────────────────────────────────────────────
  const quizQuestionsWithMinimum = withMinimumCodeQuestionsPerTopic(
    withMinimumQuestionsPerTopic(QUIZ_QUESTIONS),
  );
  const quizRows = quizQuestionsWithMinimum.map((q) => ({
    topic_id: resolveTopic(q.topicSlug),
    slug: q.slug,
    question: q.question,
    options: q.options,
    correct_index: q.correctIndex,
    explanation: q.explanation,
  }));
  const { error: quizErr } = await supabase
    .from("quiz_questions")
    .upsert(quizRows, { onConflict: "slug" });
  if (quizErr) throw new Error(`quiz_questions: ${quizErr.message}`);
  const autoFillCount = quizRows.length - QUIZ_QUESTIONS.length;
  const codeCount = quizQuestionsWithMinimum.filter((q) => q.questionKind === "code").length;
  console.log(
    `  ✓ ${quizRows.length} quiz questions${autoFillCount > 0 ? ` (${autoFillCount} auto-filled)` : ""} · ${codeCount} code questions total`,
  );

  // 4) Validate JS challenge solutions ──────────────────────────────────────
  const failures: string[] = [];
  for (const c of CHALLENGES) {
    if (c.type !== "js") continue;
    const out = await runJsChallenge(c.solutionCode, c.fnName, c.testCases);
    if (!out.passed) {
      const detail = out.error
        ? out.error
        : out.results
            .filter((r) => !r.passed)
            .map((r) => `${r.description} (exp ${r.expected}, got ${r.received})`)
            .join("; ");
      failures.push(`${c.slug}: ${detail}`);
    }
  }
  if (failures.length > 0) {
    console.warn(`\n  ⚠ ${failures.length} JS solution(s) did not pass their tests:`);
    for (const f of failures) console.warn(`    - ${f}`);
    process.exitCode = 1;
  } else {
    console.log(`  ✓ all JS challenge solutions pass their test cases`);
  }

  // 5) Challenges ────────────────────────────────────────────────────────────
  const challengeRows = CHALLENGES.map((c) => ({
    title: c.title,
    slug: c.slug,
    difficulty: c.difficulty,
    topic_id: resolveTopic(c.topicSlug),
    type: c.type,
    description: c.description,
    fn_name: c.fnName,
    starter_code: c.starterCode,
    solution_code: c.solutionCode,
    annotated_solution: c.annotatedSolution ?? null,
    test_cases: c.testCases,
    hints: { levels: c.hints },
    react_checklist: c.reactChecklist ?? null,
    order_index: c.orderIndex,
  }));
  const { error: chErr } = await supabase
    .from("challenges")
    .upsert(challengeRows, { onConflict: "slug" });
  if (chErr) throw new Error(`challenges: ${chErr.message}`);
  const jsCount = CHALLENGES.filter((c) => c.type === "js").length;
  console.log(
    `  ✓ ${challengeRows.length} challenges (${jsCount} JS, ${challengeRows.length - jsCount} React)`,
  );

  console.log("\n✅ Seed complete.");
}

main().catch((err) => {
  console.error("\n✖ Seed failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
