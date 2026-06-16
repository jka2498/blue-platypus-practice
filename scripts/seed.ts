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
  const quizRows = QUIZ_QUESTIONS.map((q) => ({
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
  console.log(`  ✓ ${quizRows.length} quiz questions`);

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
