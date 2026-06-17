"use client";

import { Trophy, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import type { QuizQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

interface QuizSummaryProps {
  score: number;
  total: number;
  xpAwarded: number;
  seconds: number;
  questions: QuizQuestion[];
  answers: (number | null)[];
  onRestart: () => void;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function QuizSummary({
  score,
  total,
  xpAwarded,
  seconds,
  questions,
  answers,
  onRestart,
}: QuizSummaryProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const wrong = questions
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => answers[i] !== q.correct_index);

  const tone = pct >= 80 ? "text-success" : pct >= 50 ? "text-medium" : "text-error";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-surface p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Trophy className="h-7 w-7" />
        </span>
        <h2 className="heading-2 mt-4">
          You scored <span className={tone}>{score}</span>/{total}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {pct}% correct · {fmtTime(seconds)} taken
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
          <Sparkles className="h-4 w-4" /> +{xpAwarded} XP
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={onRestart} variant="secondary">
            <RefreshCw className="h-4 w-4" /> New quiz
          </Button>
        </div>
      </div>

      {wrong.length > 0 ? (
        <div>
          <h3 className="heading-3 mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-medium" /> Review these ({wrong.length})
          </h3>
          <ul className="space-y-3">
            {wrong.map(({ q, i }) => (
              <li key={q.id} className="rounded-xl border bg-surface p-4 shadow-card">
                <Markdown className="[&_p:first-child]:mt-0 [&_p]:font-semibold">
                  {q.question}
                </Markdown>
                <div className="mt-2 grid gap-1 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Your answer:</span>
                    <span className="font-medium text-error">
                      {answers[i] !== null && answers[i] !== undefined
                        ? q.options[answers[i] as number]
                        : "Skipped"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">Correct:</span>
                    <span className={cn("font-medium text-success")}>
                      {q.options[q.correct_index]}
                    </span>
                  </div>
                </div>
                {q.explanation ? (
                  <Markdown className="mt-2 [&_p]:text-sm [&_p]:text-muted-foreground">
                    {q.explanation}
                  </Markdown>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl border border-success/30 bg-success/5 p-5 text-center text-sm font-medium text-success">
          Perfect run — every answer correct. 🎯
        </div>
      )}
    </div>
  );
}
