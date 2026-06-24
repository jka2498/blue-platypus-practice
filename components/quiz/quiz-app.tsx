"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Shuffle, Timer, BrainCircuit, Loader2, ArrowRight, BookMarked } from "lucide-react";
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
  | { kind: "interview"; questions: QuizQuestion[]; challenge: Challenge | null }
  | { kind: "review"; questions: QuizQuestion[] };

export function QuizApp({
  topics,
  reviewQuestions,
  reviewCount,
  questionKind = "text",
  showInterview = true,
  codePageHref,
}: {
  topics: QuizTopicOption[];
  reviewQuestions: QuizQuestion[];
  reviewCount: number;
  questionKind?: QuizQuestion["question_kind"];
  showInterview?: boolean;
  codePageHref?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>({ kind: "select" });
  const [timed, setTimed] = useState(true);
  const [pending, startTransition] = useTransition();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const startQuiz = (topicId: string | null, key: string) => {
    setLoadingKey(key);
    startTransition(async () => {
      const questions = await fetchQuizSession(topicId, 10, questionKind);
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

  const startReview = useCallback(() => {
    if (reviewQuestions.length > 0) setMode({ kind: "review", questions: reviewQuestions });
  }, [reviewQuestions]);

  /** Called from QuizSummary's "Retry wrong answers" button. */
  const retryWrong = useCallback((wrongQs: QuizQuestion[]) => {
    if (wrongQs.length > 0) setMode({ kind: "review", questions: wrongQs });
  }, []);

  const reset = useCallback(() => {
    setMode({ kind: "select" });
    // Refresh server data so the review count badge updates.
    router.refresh();
  }, [router]);

  if (mode.kind === "quiz") {
    return (
      <QuizRunner
        questions={mode.questions}
        topicId={mode.topicId}
        timed={mode.timed}
        onExit={reset}
        onRetryWrong={retryWrong}
      />
    );
  }
  if (mode.kind === "review") {
    return (
      <QuizRunner
        questions={mode.questions}
        topicId={null}
        timed={false}
        onExit={reset}
        onRetryWrong={retryWrong}
        isReview
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
      {/* Top row: Interview simulation + Review queue + options */}
      <div className={cn("grid gap-4", showInterview ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {showInterview ? (
          <div className="flex flex-col justify-between rounded-2xl border border-accent/30 bg-accent/5 p-6">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <h2 className="heading-3 mt-3">Interview Simulation</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                30 minutes · 5 conceptual MCQs + 1 coding challenge, scored together.
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
        ) : null}

        <div className="flex flex-col justify-between rounded-2xl border bg-surface p-6 shadow-card">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted-hover text-foreground">
              <Shuffle className="h-5 w-5" />
            </span>
            <h2 className="heading-3 mt-3">
              {questionKind === "code" ? "Quick mixed code quiz" : "Quick mixed quiz"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {questionKind === "code"
                ? "10 code-snippet questions drawn from every topic."
                : "10 questions drawn from every topic. Great for a daily warm-up."}
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

        {/* Review queue card */}
        <div
          className={cn(
            "flex flex-col justify-between rounded-2xl border p-6 shadow-card",
            reviewCount > 0
              ? "border-medium/30 bg-medium/5"
              : "bg-surface opacity-70",
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  reviewCount > 0 ? "bg-medium text-white" : "bg-muted-hover text-foreground",
                )}
              >
                <BookMarked className="h-5 w-5" />
              </span>
              {reviewCount > 0 && (
                <Badge variant="medium">{reviewCount} to review</Badge>
              )}
            </div>
            <h2 className="heading-3 mt-3">Review Queue</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {reviewCount > 0
                ? `${reviewCount} question${reviewCount === 1 ? "" : "s"} you've gotten wrong. Practice them until you get them right.`
                : "No questions in your review queue. Get some wrong and they'll appear here!"}
            </p>
          </div>
          <Button
            className="mt-4 self-start"
            variant={reviewCount > 0 ? "primary" : "secondary"}
            onClick={startReview}
            disabled={reviewCount === 0 || pending}
          >
            <BookMarked className="h-4 w-4" />
            {reviewCount > 0 ? "Practice review queue" : "Queue is empty"}
          </Button>
        </div>
      </div>

      {codePageHref ? (
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Code Snippet MCQs</h2>
              <p className="text-sm text-muted-foreground">
                Code-answer questions are now in their own page for focused practice.
              </p>
            </div>
            <Button asChild>
              <Link href={codePageHref}>Open code quiz</Link>
            </Button>
          </div>
        </div>
      ) : null}

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
