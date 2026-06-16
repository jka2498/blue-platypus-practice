import Link from "next/link";
import { Layers3, ListChecks, Code2, ArrowRight } from "lucide-react";
import type { Challenge, Topic } from "@/types";
import { Badge } from "@/components/ui/badge";

interface RecommendedSessionProps {
  flashcardTopic: Topic | null;
  dueCount: number;
  quizTopic: Topic | null;
  challenge: Challenge | null;
}

const difficultyVariant = { easy: "easy", medium: "medium", hard: "hard" } as const;

export function RecommendedSession({
  flashcardTopic,
  dueCount,
  quizTopic,
  challenge,
}: RecommendedSessionProps) {
  return (
    <section aria-labelledby="today-heading">
      <h2 id="today-heading" className="heading-3 mb-3">
        Today&apos;s recommended session
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Flashcards */}
        <Link
          href="/flashcards"
          className="group flex flex-col rounded-xl border bg-surface p-5 shadow-card transition-shadow hover:shadow-elevated"
        >
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Layers3 className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Flashcard drill
          </span>
          <span className="mt-1 font-bold">
            {dueCount > 0 ? `${dueCount} card${dueCount === 1 ? "" : "s"} to review` : "Start a session"}
          </span>
          <span className="mt-1 text-sm text-muted-foreground">
            {flashcardTopic ? `Begin with ${flashcardTopic.name}` : "Spaced repetition"}
          </span>
          <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Review now <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        {/* Quiz */}
        <Link
          href="/quiz"
          className="group flex flex-col rounded-xl border bg-surface p-5 shadow-card transition-shadow hover:shadow-elevated"
        >
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <ListChecks className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quick quiz
          </span>
          <span className="mt-1 font-bold">10 questions</span>
          <span className="mt-1 text-sm text-muted-foreground">
            {quizTopic ? `Focus: ${quizTopic.name}` : "Mixed topics"}
          </span>
          <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Take quiz <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        {/* Challenge */}
        <Link
          href={challenge ? `/challenges/${challenge.slug}` : "/challenges"}
          className="group flex flex-col rounded-xl border bg-surface p-5 shadow-card transition-shadow hover:shadow-elevated"
        >
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Coding challenge
          </span>
          <span className="mt-1 line-clamp-1 font-bold">
            {challenge?.title ?? "Pick a challenge"}
          </span>
          <span className="mt-1">
            {challenge ? (
              <Badge variant={difficultyVariant[challenge.difficulty]}>
                {challenge.difficulty}
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">Sharpen your skills</span>
            )}
          </span>
          <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Solve it <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
