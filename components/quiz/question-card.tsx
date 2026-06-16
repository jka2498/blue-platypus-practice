"use client";

import { Check, X } from "lucide-react";
import type { QuizQuestion } from "@/types";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  selected: number | null;
  revealed: boolean;
  onSelect: (index: number) => void;
}

const LETTERS = ["A", "B", "C", "D"];

export function QuestionCard({
  question,
  questionNumber,
  total,
  selected,
  revealed,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl border bg-surface p-6 shadow-card sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Question {questionNumber} of {total}
      </div>
      <h2 className="mt-2 text-xl font-bold tracking-tight">{question.question}</h2>

      <fieldset className="mt-6 space-y-3" aria-label="Answer options">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correct_index;
          const isSelected = i === selected;
          let state: "idle" | "correct" | "wrong" | "muted" = "idle";
          if (revealed) {
            if (isCorrect) state = "correct";
            else if (isSelected) state = "wrong";
            else state = "muted";
          } else if (isSelected) {
            state = "idle";
          }

          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              onClick={() => onSelect(i)}
              aria-pressed={isSelected}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                state === "idle" &&
                  (isSelected
                    ? "border-accent bg-accent/5"
                    : "hover:border-[#dcd6d1] hover:bg-[#F6F2EF]"),
                state === "correct" && "border-success bg-success/10",
                state === "wrong" && "border-error bg-error/10",
                state === "muted" && "opacity-55",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm font-bold",
                  state === "correct" && "border-success bg-success text-white",
                  state === "wrong" && "border-error bg-error text-white",
                  (state === "idle" || state === "muted") &&
                    (isSelected ? "border-accent text-accent" : "text-muted-foreground"),
                )}
              >
                {revealed && isCorrect ? (
                  <Check className="h-4 w-4" />
                ) : revealed && isSelected ? (
                  <X className="h-4 w-4" />
                ) : (
                  LETTERS[i]
                )}
              </span>
              <span className="text-sm font-medium">{opt}</span>
            </button>
          );
        })}
      </fieldset>

      {revealed && question.explanation ? (
        <div className="mt-5 rounded-xl border-l-2 border-accent bg-[#F6F2EF] p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-accent">
            {selected === question.correct_index ? "Correct" : "Explanation"}
          </div>
          <Markdown>{question.explanation}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
