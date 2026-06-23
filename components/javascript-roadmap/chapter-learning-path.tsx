"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Code2,
  ListChecks,
  Lock,
  PlayCircle,
} from "lucide-react";
import { Markdown } from "@/components/markdown";
import { ChallengeWorkspace } from "@/components/challenges/challenge-workspace";
import { QuestionCard } from "@/components/quiz/question-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { ChallengeDetail } from "@/lib/queries";
import type { QuizQuestion } from "@/types";

type ChapterChallenge = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  source: "database" | "generated";
  slug?: string;
};

type Stage = "summary" | "mcq" | "challenge";

type ChallengeTrackItem = {
  id: string;
  slug: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  status: "passed" | "attempted" | "failed" | "not_started";
};

export function ChapterLearningPath({
  chapterSlug,
  title,
  summary,
  mcqs,
  challenge,
  challengeDetail,
  challengeTrack,
  activeChallengeSlug,
}: {
  chapterSlug: string;
  title: string;
  summary: string;
  mcqs: QuizQuestion[];
  challenge: ChapterChallenge | null;
  challengeDetail: ChallengeDetail | null;
  challengeTrack: ChallengeTrackItem[];
  activeChallengeSlug: string | null;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("summary");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const storageKey = `js-roadmap-progress:${chapterSlug}`;

  const totalQuestions = mcqs.length;
  const currentQuestion = mcqs[questionIndex] ?? null;
  const answeredCount = questionIndex;
  const progressValue =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
  const isLastQuestion = questionIndex >= totalQuestions - 1;
  const canCheck = selectedOption !== null && !revealed;
  const allMcqsDone =
    totalQuestions === 0 ||
    (questionIndex >= totalQuestions && !currentQuestion);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        stage?: Stage;
        questionIndex?: number;
        correctCount?: number;
      };

      if (
        parsed.stage === "summary" ||
        parsed.stage === "mcq" ||
        parsed.stage === "challenge"
      ) {
        setStage(parsed.stage);
      }
      if (typeof parsed.questionIndex === "number") {
        const clampedIndex = Math.max(
          0,
          Math.min(totalQuestions, Math.floor(parsed.questionIndex)),
        );
        setQuestionIndex(clampedIndex);
      }
      if (typeof parsed.correctCount === "number") {
        const safeCorrect = Math.max(
          0,
          Math.min(totalQuestions, Math.floor(parsed.correctCount)),
        );
        setCorrectCount(safeCorrect);
      }
    } catch {
      // Ignore invalid local storage payloads.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, totalQuestions]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          stage,
          questionIndex,
          correctCount,
        }),
      );
    } catch {
      // Ignore write failures (private mode/storage limits).
    }
  }, [storageKey, stage, questionIndex, correctCount]);

  const difficultyVariant = useMemo(() => {
    if (!challenge) return "outline" as const;
    if (challenge.difficulty === "easy") return "easy" as const;
    if (challenge.difficulty === "medium") return "medium" as const;
    return "hard" as const;
  }, [challenge]);

  function handleCheckAnswer() {
    if (!currentQuestion || selectedOption === null || revealed) return;
    if (selectedOption === currentQuestion.correct_index) {
      setCorrectCount((v) => v + 1);
    }
    setRevealed(true);
  }

  function handleNextQuestion() {
    if (!currentQuestion) return;
    if (!revealed) return;

    if (isLastQuestion) {
      setQuestionIndex(totalQuestions);
      setSelectedOption(null);
      setRevealed(false);
      return;
    }

    setQuestionIndex((v) => v + 1);
    setSelectedOption(null);
    setRevealed(false);
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="heading-2">{title}</h1>
      </header>

      <ol className="grid gap-2 rounded-xl border bg-surface p-3 text-sm shadow-card sm:grid-cols-3">
        <li
          className={cn(
            "rounded-lg border px-3 py-2",
            stage === "summary"
              ? "border-accent bg-accent/10 text-accent"
              : "border-success/40 bg-success/10 text-success",
          )}
        >
          <span className="inline-flex items-center gap-1.5 font-semibold">
            {stage === "summary" ? (
              <PlayCircle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Lesson
          </span>
        </li>
        <li
          className={cn(
            "rounded-lg border px-3 py-2",
            stage === "mcq" && "border-accent bg-accent/10 text-accent",
            stage === "challenge" &&
              "border-success/40 bg-success/10 text-success",
            stage === "summary" && "border-border text-muted-foreground",
          )}
        >
          <span className="inline-flex items-center gap-1.5 font-semibold">
            {stage === "summary" ? (
              <Lock className="h-4 w-4" />
            ) : stage === "mcq" ? (
              <PlayCircle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            MCQ Checkpoint
          </span>
        </li>
        <li
          className={cn(
            "rounded-lg border px-3 py-2",
            stage === "challenge"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted-foreground",
          )}
        >
          <span className="inline-flex items-center gap-1.5 font-semibold">
            {stage === "challenge" ? (
              <PlayCircle className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Coding Challenge
          </span>
        </li>
      </ol>

      {stage === "summary" ? (
        <section
          className="space-y-4"
          aria-labelledby="chapter-summary-heading"
        >
          <h2 id="chapter-summary-heading" className="heading-3">
            Chapter Summary
          </h2>
          <div className="rounded-xl border bg-surface p-5 shadow-card">
            <Markdown>{summary}</Markdown>
          </div>
          <Button type="button" onClick={() => setStage("mcq")}>
            Start MCQs
          </Button>
        </section>
      ) : null}

      {stage === "mcq" ? (
        <section className="space-y-4" aria-labelledby="chapter-mcqs-heading">
          <h2
            id="chapter-mcqs-heading"
            className="heading-3 inline-flex items-center gap-2"
          >
            <ListChecks className="h-5 w-5 text-accent" />
            MCQ Checkpoint
          </h2>

          {totalQuestions === 0 ? (
            <div className="space-y-4 rounded-xl border bg-surface p-5 shadow-card">
              <p className="text-sm text-muted-foreground">
                No MCQs are available for this chapter yet.
              </p>
              <Button type="button" onClick={() => setStage("challenge")}>
                Continue to Coding Challenge
              </Button>
            </div>
          ) : allMcqsDone ? (
            <div className="space-y-4 rounded-xl border bg-surface p-5 shadow-card">
              <div className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <CheckCircle2 className="h-4 w-4" />
                MCQ checkpoint complete
              </div>
              <p className="text-sm text-muted-foreground">
                You scored {correctCount} / {totalQuestions}. Ready for a
                topic-specific coding challenge?
              </p>
              <Button type="button" onClick={() => setStage("challenge")}>
                Continue to Coding Challenge
              </Button>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-4 rounded-xl border bg-surface p-5 shadow-card">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>
                    Question {questionIndex + 1} of {totalQuestions}
                  </span>
                  <span>{Math.round(progressValue)}% complete</span>
                </div>
                <Progress value={progressValue} />
              </div>

              <QuestionCard
                question={currentQuestion}
                questionNumber={questionIndex + 1}
                total={totalQuestions}
                selected={selectedOption}
                revealed={revealed}
                onSelect={setSelectedOption}
              />

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={!canCheck}
                >
                  Check Answer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleNextQuestion}
                  disabled={!revealed}
                >
                  {isLastQuestion ? "Finish MCQs" : "Next Question"}
                </Button>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {stage === "challenge" ? (
        challengeDetail ? (
          <section
            className="space-y-4"
            aria-labelledby="chapter-challenge-heading"
          >
            <h2
              id="chapter-challenge-heading"
              className="heading-3 inline-flex items-center gap-2"
            >
              <Code2 className="h-5 w-5 text-accent" />
              Coding Challenge Path
            </h2>

            {challengeTrack.length > 0 ? (
              <ol className="grid gap-2 rounded-xl border bg-surface p-3 shadow-card sm:grid-cols-2 lg:grid-cols-5">
                {challengeTrack.map((item, index) => {
                  const isActive = item.slug === activeChallengeSlug;
                  const isPassed = item.status === "passed";
                  const isLocked =
                    index > 0 && challengeTrack[index - 1]?.status !== "passed";

                  return (
                    <li
                      key={item.id}
                      className={cn(
                        "rounded-lg border px-3 py-2",
                        isActive && "border-accent bg-accent/10",
                        isPassed && "border-success/40 bg-success/10",
                        isLocked && "border-border opacity-65",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Challenge {index + 1}
                        </span>
                        {isPassed ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : isLocked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : null}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold">
                        {item.title}
                      </p>
                      <div className="mt-2">
                        <Badge variant={item.difficulty}>
                          {item.difficulty}
                        </Badge>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : null}

            <ChallengeWorkspace
              detail={challengeDetail}
              onSolve={() => router.refresh()}
            />
          </section>
        ) : (
          <section
            className="space-y-4"
            aria-labelledby="chapter-challenge-heading"
          >
            <h2
              id="chapter-challenge-heading"
              className="heading-3 inline-flex items-center gap-2"
            >
              <Code2 className="h-5 w-5 text-accent" />
              Coding Challenge
            </h2>

            {challenge ? (
              <article className="space-y-4 rounded-xl border bg-surface p-5 shadow-card">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold tracking-tight">
                    {challenge.title}
                  </h3>
                  <Badge variant={difficultyVariant}>
                    {challenge.difficulty}
                  </Badge>
                  {challenge.source === "database" ? (
                    <Badge variant="success">Graded</Badge>
                  ) : (
                    <Badge variant="outline">Practice</Badge>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  {challenge.source === "database" ? (
                    <Markdown>{challenge.prompt}</Markdown>
                  ) : (
                    <p>{challenge.prompt}</p>
                  )}
                </div>

                {challenge.slug ? (
                  <div>
                    <Link
                      href={`/challenges/${challenge.slug}`}
                      className="text-sm font-semibold text-accent hover:underline"
                    >
                      Open challenge workspace
                    </Link>
                  </div>
                ) : null}
              </article>
            ) : (
              <div className="rounded-xl border bg-surface p-5 text-sm text-muted-foreground shadow-card">
                No coding challenge is available for this chapter yet.
              </div>
            )}
          </section>
        )
      ) : null}
    </div>
  );
}
