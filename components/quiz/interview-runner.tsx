"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Play,
  Flag,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import type { Challenge, QuizQuestion, RunOutput } from "@/types";
import { runJsChallenge } from "@/lib/test-runner";
import { submitQuiz } from "@/app/actions/quiz";
import { submitChallenge as recordChallenge } from "@/app/actions/challenges";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/quiz/question-card";
import { CodeEditor } from "@/components/challenges/code-editor";
import { TestResults } from "@/components/challenges/test-results";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

const DURATION = 30 * 60; // 30 minutes

interface InterviewRunnerProps {
  questions: QuizQuestion[];
  challenge: Challenge | null;
  onExit: () => void;
}

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
}

export function InterviewRunner({ questions, challenge, onExit }: InterviewRunnerProps) {
  const [phase, setPhase] = useState<"mcq" | "code" | "done">("mcq");
  const [mcqIndex, setMcqIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(questions.length).fill(null),
  );
  const [code, setCode] = useState(challenge?.starter_code ?? "");
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [result, setResult] = useState<{
    mcqScore: number;
    codePassed: boolean;
    xp: number;
  } | null>(null);

  const codeRef = useRef(code);
  codeRef.current = code;
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const finishedRef = useRef(false);

  const finish = useCallback(async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const mcqScore = questions.reduce(
      (acc, q, i) => acc + (answersRef.current[i] === q.correct_index ? 1 : 0),
      0,
    );

    let codePassed = false;
    let xp = 0;
    if (challenge) {
      const out = await runJsChallenge(codeRef.current, challenge.fn_name, challenge.test_cases);
      codePassed = out.passed;
      setOutput(out);
      try {
        const res = await recordChallenge({
          challengeId: challenge.id,
          status: out.passed ? "passed" : "failed",
          code: codeRef.current,
          testResults: out.results,
        });
        xp += res.xpAwarded;
      } catch {
        /* ignore */
      }
    }

    try {
      const res = await submitQuiz({
        topicId: null,
        questionIds: questions.map((q) => q.id),
        answers: answersRef.current.map((a) => (a === null ? -1 : a)),
      });
      xp += res.xpAwarded;
    } catch {
      /* ignore */
    }

    setResult({ mcqScore, codePassed, xp });
    setPhase("done");
  }, [challenge, questions]);

  // Countdown — auto-submit at zero.
  useEffect(() => {
    if (phase === "done") return;
    if (timeLeft <= 0) {
      void finish();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, phase, finish]);

  const runCode = useCallback(async () => {
    if (!challenge) return;
    const out = await runJsChallenge(codeRef.current, challenge.fn_name, challenge.test_cases);
    setOutput(out);
  }, [challenge]);

  const setAnswer = (i: number) =>
    setAnswers((prev) => {
      const n = [...prev];
      n[mcqIndex] = i;
      return n;
    });

  // ── Done ──────────────────────────────────────────────────────────────
  if (phase === "done" && result) {
    const totalScore = result.mcqScore + (result.codePassed ? 1 : 0);
    const maxScore = questions.length + (challenge ? 1 : 0);
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border bg-surface p-8 text-center shadow-card">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Trophy className="h-7 w-7" />
          </span>
          <h2 className="heading-2 mt-4">Interview complete</h2>
          <p className="mt-1 text-muted-foreground">
            Combined score {totalScore}/{maxScore} · {fmt(DURATION - timeLeft)} elapsed
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
            <Sparkles className="h-4 w-4" /> +{result.xp} XP
          </div>
          <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="text-sm text-muted-foreground">Conceptual MCQs</div>
              <div className="text-xl font-bold">
                {result.mcqScore}/{questions.length}
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-sm text-muted-foreground">Coding challenge</div>
              <div
                className={cn(
                  "flex items-center gap-1.5 text-xl font-bold",
                  result.codePassed ? "text-success" : "text-error",
                )}
              >
                {result.codePassed ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" /> Passed
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5" /> Failed
                  </>
                )}
              </div>
            </div>
          </div>
          <Button className="mt-6" variant="secondary" onClick={onExit}>
            Back to quiz menu
          </Button>
        </div>
        {output ? (
          <div className="rounded-2xl border bg-surface p-6 shadow-card">
            <h3 className="heading-3 mb-3">Your coding result</h3>
            <TestResults output={output} />
          </div>
        ) : null}
      </div>
    );
  }

  const totalSteps = questions.length + (challenge ? 1 : 0);
  const stepDone = phase === "mcq" ? mcqIndex : questions.length;
  const urgent = timeLeft < 120;

  return (
    <div className="space-y-5">
      {/* Sticky-ish header */}
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-surface px-4 py-3 shadow-card">
        <span className="text-sm font-semibold">
          Interview Simulation ·{" "}
          <span className="text-muted-foreground">
            {phase === "mcq" ? `Question ${mcqIndex + 1}/${questions.length}` : "Coding round"}
          </span>
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-sm font-bold",
            urgent ? "bg-error/10 text-error" : "bg-muted-hover text-foreground",
          )}
        >
          <Clock className="h-4 w-4" /> {fmt(timeLeft)}
        </span>
      </div>
      <Progress value={(stepDone / totalSteps) * 100} />

      {phase === "mcq" ? (
        <>
          <QuestionCard
            question={questions[mcqIndex]!}
            questionNumber={mcqIndex + 1}
            total={questions.length}
            selected={answers[mcqIndex] ?? null}
            revealed={false}
            onSelect={setAnswer}
          />
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => setMcqIndex((i) => Math.max(0, i - 1))}
              disabled={mcqIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {mcqIndex < questions.length - 1 ? (
              <Button onClick={() => setMcqIndex((i) => i + 1)}>
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => setPhase(challenge ? "code" : "mcq")} disabled={!challenge}>
                {challenge ? "To coding round" : "Finish"} <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          {!challenge ? (
            <div className="flex justify-end">
              <Button onClick={() => void finish()}>
                <Flag className="h-4 w-4" /> Submit interview
              </Button>
            </div>
          ) : null}
        </>
      ) : challenge ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-2xl border bg-surface p-6 shadow-card">
            <h2 className="heading-3">{challenge.title}</h2>
            <Markdown>{challenge.description}</Markdown>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-[360px] overflow-hidden rounded-xl border">
              <CodeEditor value={code} onChange={setCode} onRunShortcut={runCode} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button variant="secondary" onClick={runCode}>
                <Play className="h-3.5 w-3.5" /> Run
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setPhase("mcq")}>
                  <ArrowLeft className="h-4 w-4" /> MCQs
                </Button>
                <Button onClick={() => void finish()}>
                  <Flag className="h-4 w-4" /> Submit interview
                </Button>
              </div>
            </div>
            {output ? (
              <div className="rounded-xl border bg-surface p-4 shadow-card">
                <TestResults output={output} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
