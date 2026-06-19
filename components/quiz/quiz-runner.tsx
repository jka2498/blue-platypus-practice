"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, BookMarked, Clock, X } from "lucide-react";
import type { QuizQuestion } from "@/types";
import { submitQuiz } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/quiz/question-card";
import { QuizSummary } from "@/components/quiz/quiz-summary";

interface QuizRunnerProps {
  questions: QuizQuestion[];
  topicId: string | null;
  timed: boolean;
  onExit: () => void;
  onRetryWrong?: (wrongQs: QuizQuestion[]) => void;
  /** When true, show a review-mode banner and skip the timer. */
  isReview?: boolean;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
}

export function QuizRunner({ questions, topicId, timed, onExit, onRetryWrong, isReview }: QuizRunnerProps) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null));
  const [revealed, setRevealed] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState<{ score: number; xp: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);

  const current = questions[index];

  const select = useCallback(
    (i: number) => {
      if (revealed) return;
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = i;
        return next;
      });
      setRevealed(true);
    },
    [index, revealed],
  );

  const finish = useCallback(
    async (finalAnswers: (number | null)[]) => {
      setSubmitting(true);
      const filled = finalAnswers.map((a) => (a === null ? -1 : a));
      try {
        const res = await submitQuiz({
          topicId,
          questionIds: questions.map((q) => q.id),
          answers: filled,
        });
        setSummary({ score: res.score, xp: res.xpAwarded });
      } catch {
        // Fallback: score locally if persistence failed.
        const score = questions.reduce(
          (acc, q, i) => acc + (finalAnswers[i] === q.correct_index ? 1 : 0),
          0,
        );
        setSummary({ score, xp: 0 });
      }
      setFinished(true);
      setSubmitting(false);
    },
    [questions, topicId],
  );

  const next = useCallback(() => {
    if (!revealed) return;
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setRevealed(false);
    } else {
      void finish(answers);
    }
  }, [revealed, index, total, finish, answers]);

  // Keyboard: 1-4 select, Enter next.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        const i = Number(e.key) - 1;
        if (current && i < current.options.length) select(i);
      } else if (e.key === "Enter") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, select, next, finished]);

  if (finished && summary) {
    return (
      <QuizSummary
        score={summary.score}
        total={total}
        xpAwarded={summary.xp}
        seconds={seconds}
        questions={questions}
        answers={answers}
        onRestart={onExit}
        onRetryWrong={onRetryWrong}
        isReview={isReview}
      />
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-5">
      {isReview && (
        <div className="flex items-center gap-2 rounded-lg border border-medium/30 bg-medium/5 px-3 py-2 text-sm font-medium text-medium">
          <BookMarked className="h-4 w-4" /> Review mode — get these right to clear them from your queue
        </div>
      )}
      <div className="flex items-center gap-4">
        <Progress value={(index / total) * 100} className="flex-1" />
        {timed && !isReview ? (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Clock className="h-4 w-4" /> {fmtTime(seconds)}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" /> Quit
        </button>
      </div>

      <QuestionCard
        question={current}
        questionNumber={index + 1}
        total={total}
        selected={answers[index] ?? null}
        revealed={revealed}
        onSelect={select}
      />

      <div className="flex justify-end">
        <Button onClick={next} disabled={!revealed || submitting}>
          {index < total - 1 ? (
            <>
              Next <ArrowRight className="h-4 w-4" />
            </>
          ) : submitting ? (
            "Scoring…"
          ) : (
            "Finish"
          )}
        </Button>
      </div>
    </div>
  );
}
