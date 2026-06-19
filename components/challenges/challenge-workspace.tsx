"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Send,
  Lightbulb,
  Eye,
  ChevronDown,
  X,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import type { ChallengeDetail } from "@/lib/queries";
import type { RunOutput } from "@/types";
import { runJsChallenge } from "@/lib/test-runner";
import { submitChallenge } from "@/app/actions/challenges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { CodeEditor } from "@/components/challenges/code-editor";
import { ReactSandbox } from "@/components/challenges/react-sandbox";
import { TestResults } from "@/components/challenges/test-results";
import { cn, formatValue } from "@/lib/utils";

const difficultyVariant = { easy: "easy", medium: "medium", hard: "hard" } as const;

export function ChallengeWorkspace({ detail, onSolve }: { detail: ChallengeDetail; onSolve?: () => void }) {
  const { challenge, topic } = detail;

  const [code, setCode] = useState(challenge.starter_code);
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [hintLevel, setHintLevel] = useState(0); // 0..3 revealed
  const [showSolution, setShowSolution] = useState(false);
  const [failCount, setFailCount] = useState(detail.failedCount);
  const [solved, setSolved] = useState(detail.solved);
  const [xpToast, setXpToast] = useState<number | null>(null);

  const isReact = challenge.type === "react";
  const solutionUnlocked = solved || failCount >= 3;
  const codeRef = useRef(code);
  codeRef.current = code;

  const run = useCallback(async () => {
    if (isReact) return;
    setRunning(true);
    setDrawerOpen(true);
    const out = await runJsChallenge(codeRef.current, challenge.fn_name, challenge.test_cases);
    setOutput(out);
    setRunning(false);
  }, [challenge.fn_name, challenge.test_cases, isReact]);

  const submit = useCallback(async () => {
    setRunning(true);
    setDrawerOpen(true);
    const out = isReact
      ? { passed: true, results: [], logs: [], durationMs: 0 }
      : await runJsChallenge(codeRef.current, challenge.fn_name, challenge.test_cases);
    if (!isReact) setOutput(out);

    const status = out.passed ? "passed" : "failed";
    try {
      const res = await submitChallenge({
        challengeId: challenge.id,
        status,
        code: codeRef.current,
        testResults: out.results,
      });
      if (res.firstSolve && res.xpAwarded > 0) {
        setXpToast(res.xpAwarded);
        setTimeout(() => setXpToast(null), 3500);
      }
    } catch {
      // ignore persistence failure; result still shown
    }
    if (out.passed) {
      setSolved(true);
      onSolve?.();
    } else {
      setFailCount((c) => c + 1);
    }
    setRunning(false);
  }, [challenge.fn_name, challenge.id, challenge.test_cases, isReact]);

  // Reset IDE state when a new challenge arrives (on challenge ID change).
  useEffect(() => {
    setCode(challenge.starter_code);
    setOutput(null);
    setDrawerOpen(false);
    setRunning(false);
    setHintLevel(0);
    setShowSolution(false);
    setFailCount(detail.failedCount);
    setSolved(detail.solved);
    setXpToast(null);
  }, [challenge.id, detail.failedCount, detail.solved]);

  // Cmd/Ctrl+Enter to run (also wired inside Monaco).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (isReact) void submit();
        else void run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run, submit, isReact]);

  return (
    <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[40%_60%]">
      {/* ── Left: problem ────────────────────────────────────────────── */}
      <div className="overflow-y-auto border-b lg:border-b-0 lg:border-r">
        <div className="space-y-6 p-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant={difficultyVariant[challenge.difficulty]}>
                {challenge.difficulty}
              </Badge>
              {topic ? <Badge variant="accent">{topic.name}</Badge> : null}
              <Badge variant="outline">{isReact ? "React" : "JavaScript"}</Badge>
              {solved ? (
                <Badge variant="success">
                  <CheckCircle2 className="h-3 w-3" /> Solved
                </Badge>
              ) : null}
            </div>
            <h1 className="heading-2">{challenge.title}</h1>
          </div>

          <Markdown>{challenge.description}</Markdown>

          {/* Test case preview */}
          {challenge.test_cases.length > 0 ? (
            <div>
              <h2 className="heading-3 mb-2">Example checks</h2>
              <ul className="space-y-2">
                {challenge.test_cases.slice(0, 3).map((tc, i) => (
                  <li key={i} className="rounded-lg border bg-surface p-3 font-mono text-xs">
                    <div className="text-muted-foreground">{tc.description}</div>
                    <div className="mt-1">
                      <span className="text-muted-foreground">{challenge.fn_name}(</span>
                      {tc.input.map(formatValue).join(", ")}
                      <span className="text-muted-foreground">) → </span>
                      <span className="text-success">{formatValue(tc.expected_output)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Hints */}
          <div className="rounded-xl border bg-surface p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <Lightbulb className="h-4 w-4 text-accent" /> Hints
              </span>
              {hintLevel < 3 ? (
                <Button size="sm" variant="ghost" onClick={() => setHintLevel((l) => l + 1)}>
                  {hintLevel === 0 ? "Show a hint" : "Next hint"}
                </Button>
              ) : null}
            </div>
            {hintLevel > 0 ? (
              <ol className="mt-3 space-y-2">
                {challenge.hints.levels.slice(0, hintLevel).map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="font-bold text-accent">{i + 1}.</span>
                    {h}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Stuck? Reveal up to three progressive hints.
              </p>
            )}
          </div>

          {/* Solution reveal */}
          <div className="rounded-xl border bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <Eye className="h-4 w-4 text-accent" /> Solution
              </span>
              <Button
                size="sm"
                variant="ghost"
                disabled={!solutionUnlocked}
                onClick={() => setShowSolution((s) => !s)}
              >
                {!solutionUnlocked ? (
                  <>
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </>
                ) : showSolution ? (
                  "Hide solution"
                ) : (
                  "View solution"
                )}
              </Button>
            </div>
            {!solutionUnlocked ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Unlocks after 3 attempts (or once you&apos;ve solved it). {3 - failCount > 0
                  ? `${3 - failCount} attempt${3 - failCount === 1 ? "" : "s"} to go.`
                  : ""}
              </p>
            ) : showSolution ? (
              <div className="mt-3 overflow-hidden rounded-lg">
                <Markdown>
                  {"```js\n" + (challenge.annotated_solution ?? challenge.solution_code) + "\n```"}
                </Markdown>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Right: editor ─────────────────────────────────────────────── */}
      <div className="relative flex min-h-[500px] flex-col bg-code-bg lg:min-h-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2">
          <span className="font-mono text-xs text-[#9b958f]">
            {isReact ? "App.js — React (Sandpack)" : `solution.js — ${challenge.fn_name}()`}
          </span>
          <div className="flex items-center gap-2">
            {!isReact ? (
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setCode(challenge.starter_code);
                  }}
                  title="Reset code"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="secondary" onClick={run} disabled={running}>
                  <Play className="h-3.5 w-3.5" /> Run
                </Button>
              </>
            ) : null}
            <Button size="sm" onClick={submit} disabled={running}>
              <Send className="h-3.5 w-3.5" /> {isReact ? "Mark complete" : "Submit"}
            </Button>
          </div>
        </div>

        {/* Editor / Sandbox */}
        <div className="relative flex-1">
          {isReact ? (
            <div className="h-full overflow-y-auto bg-background p-4">
              <ReactSandbox
                starterCode={challenge.starter_code}
                checklist={challenge.react_checklist ?? ["Render without errors", "Behaves as described"]}
              />
            </div>
          ) : (
            <CodeEditor value={code} onChange={setCode} onRunShortcut={run} />
          )}

          {/* Bottom drawer (slides up) */}
          <AnimatePresence>
            {drawerOpen && !isReact ? (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 bottom-0 z-10 max-h-[60%] overflow-y-auto rounded-t-xl border-t bg-surface shadow-elevated"
              >
                <div className="sticky top-0 flex items-center justify-between border-b bg-surface px-4 py-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <ChevronDown className="h-4 w-4" /> Results
                  </span>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close results"
                    className="rounded-md p-1 text-muted-foreground hover:bg-muted-hover"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  {running && !output ? (
                    <p className="text-sm text-muted-foreground">Running tests…</p>
                  ) : output ? (
                    <TestResults output={output} />
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* XP toast */}
          <AnimatePresence>
            {xpToast ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-bold text-white shadow-elevated"
              >
                <Sparkles className="h-4 w-4" /> +{xpToast} XP — solved!
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
