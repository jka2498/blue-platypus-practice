// ─────────────────────────────────────────────────────────────────────────────
// Sandboxed JS test runner.
//
// Executes user-submitted code inside a `Function()` wrapper, calls the exported
// solution against each test case, deep-compares the result with the expected
// output, captures console output, and catches/normalises errors. There is no
// Node `require`/`process` in scope — the only globals available are the ones we
// explicitly inject.
//
// NOTE: This is a learning sandbox, not a security boundary. It runs client-side
// in the browser (and is also reused by the logic-test script). It does not
// protect against infinite loops beyond a soft step guard, so challenge code is
// expected to be cooperative.
// ─────────────────────────────────────────────────────────────────────────────

import type { RunOutput, TestCase, TestResult } from "@/types";
import { deepEqual, formatValue } from "@/lib/utils";

/**
 * The user's code must define a function. We try, in order:
 *   1. `module.exports` / `exports.default`
 *   2. a `return`ed value from the wrapper
 *   3. a bare function declaration matching `expectedFnName`
 */
function buildSolution(
  userCode: string,
  expectedFnName: string,
  logs: string[],
): (...args: unknown[]) => unknown {
  const sandboxConsole = {
    log: (...args: unknown[]) => logs.push(args.map(stringify).join(" ")),
    info: (...args: unknown[]) => logs.push(args.map(stringify).join(" ")),
    warn: (...args: unknown[]) => logs.push(`⚠ ${args.map(stringify).join(" ")}`),
    error: (...args: unknown[]) => logs.push(`✖ ${args.map(stringify).join(" ")}`),
  };

  const factory = new Function(
    "console",
    "module",
    "exports",
    `"use strict";
     ${userCode}
     ;
     // Resolution order: explicit export → named declaration → undefined.
     if (module && module.exports && (typeof module.exports === "function")) return module.exports;
     if (module && module.exports && typeof module.exports.default === "function") return module.exports.default;
     try { if (typeof ${expectedFnName} === "function") return ${expectedFnName}; } catch (e) {}
     return undefined;`,
  );

  const moduleObj: { exports: unknown } = { exports: {} };
  const result = factory(sandboxConsole, moduleObj, moduleObj.exports);
  const fn = (result ?? moduleObj.exports) as unknown;
  if (typeof fn !== "function") {
    throw new Error(
      `Could not find a function named "${expectedFnName}". Make sure you define it (or export it).`,
    );
  }
  return fn as (...args: unknown[]) => unknown;
}

function stringify(v: unknown): string {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

/**
 * Run user code against a set of test cases.
 *
 * @param userCode      Submitted source. May export a fn or declare it by name.
 * @param fnName        The function name to call (from challenge metadata).
 * @param testCases     Assertions to run.
 */
export async function runJsChallenge(
  userCode: string,
  fnName: string,
  testCases: TestCase[],
): Promise<RunOutput> {
  const started = Date.now();
  const logs: string[] = [];
  const results: TestResult[] = [];

  let fn: (...args: unknown[]) => unknown;
  try {
    fn = buildSolution(userCode, fnName, logs);
  } catch (err) {
    return {
      passed: false,
      results: [],
      logs,
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - started,
    };
  }

  for (const tc of testCases) {
    try {
      // Support async solutions transparently.
      const raw = fn(...tc.input);
      const received = raw instanceof Promise ? await raw : raw;
      const passed = deepEqual(received, tc.expected_output);
      results.push({
        description: tc.description,
        passed,
        expected: formatValue(tc.expected_output),
        received: formatValue(received),
      });
    } catch (err) {
      results.push({
        description: tc.description,
        passed: false,
        expected: formatValue(tc.expected_output),
        received: "—",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return {
    passed: results.length > 0 && results.every((r) => r.passed),
    results,
    logs,
    durationMs: Date.now() - started,
  };
}
