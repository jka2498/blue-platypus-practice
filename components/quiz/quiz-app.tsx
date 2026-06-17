"use client";

import { useState, useTransition } from "react";
import { Shuffle, Timer, BrainCircuit, Loader2, ArrowRight } from "lucide-react";
import type { Challenge, QuizQuestion } from "@/types";
import type { QuizTopicOption } from "@/lib/queries";
import { fetchQuizSession, fetchInterviewSession } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { InterviewRunner } from "@/components/quiz/interview-runner";
import { cn } from "@/lib/utils";

type Mode =
  | { kind: "select" }
  | { kind: "quiz"; questions: QuizQuestion[]; topicId: string | null; timed: boolean }
  | { kind: "interview"; questions: QuizQuestion[]; challenge: Challenge | null };

export function QuizApp({ topics }: { topics: QuizTopicOption[] }) {
  const [mode, setMode] = useState<Mode>({ kind: "select" });
  const [timed, setTimed] = useState(true);
  const [pending, startTransition] = useTransition();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const startQuiz = (topicId: string | null, key: string) => {
    setLoadingKey(key);
    startTransition(async () => {
      const questions = await fetchQuizSession(topicId, 10);
      setLoadingKey(null);
      if (questions.length > 0) setMode({ kind: "quiz", questions, topicId, timed });
    });
  };

  const startInterview = () => {
    setLoadingKey("interview");
    startTransition(async () => {
      const { questions, challenge } = await fetchInterviewSession();
      setLoadingKey(null);
      setMode({ kind: "interview", questions, challenge });
    });
  };

  const reset = () => setMode({ kind: "select" });

  if (mode.kind === "quiz") {
    return (
      <QuizRunner
        questions={mode.questions}
        topicId={mode.topicId}
        timed={mode.timed}
        onExit={reset}
      />
    );
  }
  if (mode.kind === "interview") {
    return (
      <InterviewRunner questions={mode.questions} challenge={mode.challenge} onExit={reset} />
    );
  }

  return (
    <div className="space-y-8">
      {/* Interview simulation + options */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-2xl border border-accent/30 bg-accent/5 p-6">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <h2 className="heading-3 mt-3">Interview Simulation</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              30 minutes · 5 conceptual MCQs + 1 coding challenge, scored together. The closest
              thing to the real thing.
            </p>
          </div>
          <Button className="mt-4 self-start" onClick={startInterview} disabled={pending}>
            {loadingKey === "interview" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="h-4 w-4" />
            )}
            Start simulation
          </Button>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border bg-surface p-6 shadow-card">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted-hover text-foreground">
              <Shuffle className="h-5 w-5" />
            </span>
            <h2 className="heading-3 mt-3">Quick mixed quiz</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              10 questions drawn from every topic. Great for a daily warm-up.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={() => startQuiz(null, "mixed")} disabled={pending}>
              {loadingKey === "mixed" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shuffle className="h-4 w-4" />
              )}
              Start mixed
            </Button>
            <button
              type="button"
              onClick={() => setTimed((t) => !t)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                timed ? "border-accent bg-accent/10 text-accent" : "text-muted-foreground",
              )}
              aria-pressed={timed}
            >
              <Timer className="h-4 w-4" /> Timer {timed ? "on" : "off"}
            </button>
          </div>
        </div>
      </div>

      {/* Topic grid */}
      <div>
        <h2 className="heading-3 mb-3">Choose a topic</h2>
        {topics.length === 0 ? (
          <div className="rounded-xl border bg-surface p-8 text-center text-sm text-muted-foreground shadow-card">
            No quiz questions yet. Seed the database to get started.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ topic, questionCount }) => {
              const key = `t-${topic.id}`;
              return (
                <button
                  key={topic.id}
                  type="button"
                  disabled={pending}
                  onClick={() => startQuiz(topic.id, key)}
                  className="group flex items-center justify-between gap-2 rounded-xl border bg-surface p-4 text-left shadow-card transition-shadow hover:shadow-elevated disabled:opacity-60"
                >
                  <div className="min-w-0">
                    <div className="truncate font-semibold group-hover:text-accent">
                      {topic.name}
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {questionCount} questions
                    </Badge>
                  </div>
                  {loadingKey === key ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-accent" />
                  ) : (
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
