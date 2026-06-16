// Lightweight, dependency-free sanity checks for the pure logic libraries.
// Run with `npm run test:logic`. Not a substitute for a full test suite, but
// enough to catch regressions in SM-2, levels, XP, and the JS test runner.

import assert from "node:assert/strict";
import { applySm2, DEFAULT_SM2_STATE, isDue } from "@/lib/sm2";
import { getLevelInfo, levelName } from "@/lib/levels";
import { runJsChallenge } from "@/lib/test-runner";
import { deepEqual, addDays, daysBetween } from "@/lib/utils";

let passed = 0;
function test(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      passed += 1;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      console.error(`  ✗ ${name}`);
      console.error(err);
      process.exitCode = 1;
    });
}

async function main() {
  console.log("SM-2");
  await test("good rating advances interval and repetitions", () => {
    const r1 = applySm2(DEFAULT_SM2_STATE, "good", "2026-01-01");
    assert.equal(r1.repetitions, 1);
    assert.equal(r1.interval_days, 1);
    const r2 = applySm2(r1, "good", "2026-01-02");
    assert.equal(r2.repetitions, 2);
    assert.equal(r2.interval_days, 6);
    const r3 = applySm2(r2, "good", "2026-01-08");
    assert.equal(r3.repetitions, 3);
    assert.ok(r3.interval_days >= 14, `expected >=14, got ${r3.interval_days}`);
  });

  await test("again rating resets repetitions and shortens interval", () => {
    const r1 = applySm2({ ease_factor: 2.5, interval_days: 30, repetitions: 5 }, "again");
    assert.equal(r1.repetitions, 0);
    assert.equal(r1.interval_days, 1);
    assert.ok(r1.ease_factor < 2.5);
  });

  await test("ease factor never drops below 1.3", () => {
    let s = DEFAULT_SM2_STATE;
    for (let i = 0; i < 10; i++) s = applySm2(s, "again");
    assert.ok(s.ease_factor >= 1.3);
  });

  await test("isDue handles never-reviewed and future dates", () => {
    assert.equal(isDue(null, "2026-01-01"), true);
    assert.equal(isDue("2026-01-01", "2026-01-02"), true);
    assert.equal(isDue("2026-01-03", "2026-01-02"), false);
  });

  console.log("Levels");
  await test("level math at thresholds", () => {
    assert.equal(getLevelInfo(0).level, 1);
    assert.equal(getLevelInfo(99).level, 1);
    assert.equal(getLevelInfo(100).level, 2);
    assert.equal(getLevelInfo(250).level, 3);
    assert.equal(getLevelInfo(250).xpIntoLevel, 50);
    assert.ok(levelName(1).includes("Apprentice"));
    assert.ok(levelName(5).includes("Architect"));
  });

  console.log("Utils");
  await test("deepEqual on nested structures", () => {
    assert.equal(deepEqual([1, [2, 3]], [1, [2, 3]]), true);
    assert.equal(deepEqual({ a: 1 }, { a: 1 }), true);
    assert.equal(deepEqual({ a: 1 }, { a: 2 }), false);
    assert.equal(deepEqual([1, 2], [1, 2, 3]), false);
  });
  await test("date helpers", () => {
    assert.equal(addDays("2026-01-30", 2), "2026-02-01");
    assert.equal(daysBetween("2026-01-01", "2026-01-08"), 7);
  });

  console.log("JS test runner");
  await test("grades a correct named-function solution", async () => {
    const out = await runJsChallenge(
      "function add(a, b) { return a + b; }",
      "add",
      [
        { input: [1, 2], expected_output: 3, description: "1 + 2" },
        { input: [-1, 1], expected_output: 0, description: "-1 + 1" },
      ],
    );
    assert.equal(out.passed, true);
    assert.equal(out.results.length, 2);
  });

  await test("reports a failing assertion", async () => {
    const out = await runJsChallenge(
      "function add(a, b) { return a - b; }",
      "add",
      [{ input: [1, 2], expected_output: 3, description: "1 + 2" }],
    );
    assert.equal(out.passed, false);
    assert.equal(out.results[0]?.passed, false);
  });

  await test("supports module.exports and async solutions", async () => {
    const out = await runJsChallenge(
      "module.exports = async (x) => x * 2;",
      "solution",
      [{ input: [21], expected_output: 42, description: "doubles" }],
    );
    assert.equal(out.passed, true);
  });

  await test("captures fatal errors without throwing", async () => {
    const out = await runJsChallenge("this is not valid js", "solution", []);
    assert.equal(out.passed, false);
    assert.ok(out.error);
  });

  console.log("Seed content");
  const { FLASHCARDS } = await import("@/scripts/seed-data/flashcards");
  const { QUIZ_QUESTIONS } = await import("@/scripts/seed-data/quiz");
  const { CHALLENGES } = await import("@/scripts/seed-data/challenges");
  const { TOPICS } = await import("@/lib/content-config");

  await test("content meets minimum counts", () => {
    assert.ok(FLASHCARDS.length >= 60, `flashcards: ${FLASHCARDS.length}`);
    assert.ok(QUIZ_QUESTIONS.length >= 40, `quiz: ${QUIZ_QUESTIONS.length}`);
    assert.ok(CHALLENGES.length >= 20, `challenges: ${CHALLENGES.length}`);
  });

  await test("all seed slugs reference real topics", () => {
    const slugs = new Set(TOPICS.map((t) => t.slug));
    for (const f of FLASHCARDS) assert.ok(slugs.has(f.topicSlug), `flashcard ${f.slug}`);
    for (const q of QUIZ_QUESTIONS) assert.ok(slugs.has(q.topicSlug), `quiz ${q.slug}`);
    for (const c of CHALLENGES) assert.ok(slugs.has(c.topicSlug), `challenge ${c.slug}`);
  });

  await test("slugs are unique within each set", () => {
    const uniq = (arr: { slug: string }[]) => new Set(arr.map((x) => x.slug)).size === arr.length;
    assert.ok(uniq(FLASHCARDS), "flashcard slugs not unique");
    assert.ok(uniq(QUIZ_QUESTIONS), "quiz slugs not unique");
    assert.ok(uniq(CHALLENGES), "challenge slugs not unique");
  });

  await test("quiz correctIndex is in range and options are 4-tuples", () => {
    for (const q of QUIZ_QUESTIONS) {
      assert.equal(q.options.length, 4, `quiz ${q.slug} options`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3, `quiz ${q.slug} index`);
    }
  });

  await test("every JS challenge solution passes its own test cases", async () => {
    const failures: string[] = [];
    for (const c of CHALLENGES) {
      if (c.type !== "js") continue;
      const out = await runJsChallenge(c.solutionCode, c.fnName, c.testCases);
      if (!out.passed) failures.push(c.slug);
    }
    assert.equal(failures.length, 0, `failing JS solutions: ${failures.join(", ")}`);
  });

  await test("react challenges have a checklist and no JS test cases", () => {
    for (const c of CHALLENGES) {
      if (c.type !== "react") continue;
      assert.ok((c.reactChecklist?.length ?? 0) > 0, `react ${c.slug} checklist`);
      assert.equal(c.testCases.length, 0, `react ${c.slug} testCases`);
    }
  });

  console.log(`\n${passed} checks passed.`);
}

void main();
