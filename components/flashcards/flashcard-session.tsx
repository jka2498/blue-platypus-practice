"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw, Sparkles, Keyboard } from "lucide-react";
import type { FlashcardRating } from "@/types";
import type { FlashcardStudyData } from "@/lib/queries";
import { rateFlashcard } from "@/app/actions/flashcards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Markdown } from "@/components/markdown";
import { TopicList } from "@/components/flashcards/topic-list";
import { cn } from "@/lib/utils";

const RATINGS: { key: FlashcardRating; label: string; hint: string; cls: string }[] = [
  { key: "again", label: "Again", hint: "1", cls: "border-error/40 text-error hover:bg-error hover:text-white" },
  { key: "hard", label: "Hard", hint: "2", cls: "border-medium/40 text-medium hover:bg-medium hover:text-white" },
  { key: "good", label: "Good", hint: "3", cls: "border-accent/40 text-accent hover:bg-accent hover:text-white" },
  { key: "easy", label: "Easy", hint: "4", cls: "border-success/40 text-success hover:bg-success hover:text-white" },
];

export function FlashcardSession({ data }: { data: FlashcardStudyData }) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const [, startTransition] = useTransition();

  const topicNameById = useMemo(
    () => new Map(data.topics.map((g) => [g.topic.id, g.topic.name])),
    [data.topics],
  );

  const sessionCards = useMemo(() => {
    if (!selectedTopicId) return data.cards;
    return data.cards.filter((c) => c.topic_id === selectedTopicId);
  }, [data.cards, selectedTopicId]);

  const totalDue = data.topics.reduce((a, g) => a + g.due, 0);
  const card = sessionCards[index];
  const done = index >= sessionCards.length;

  const selectTopic = useCallback((id: string | null) => {
    setSelectedTopicId(id);
    setIndex(0);
    setFlipped(false);
  }, []);

  const rate = useCallback(
    (rating: FlashcardRating) => {
      if (!card) return;
      const cardId = card.id;
      setReviewed((r) => r + 1);
      setIndex((i) => i + 1);
      setFlipped(false);
      startTransition(async () => {
        try {
          const res = await rateFlashcard(cardId, rating);
          if (res.xpAwarded > 0) setSessionXp((x) => x + res.xpAwarded);
        } catch {
          // Non-fatal: the card simply isn't recorded; UI already advanced.
        }
      });
    },
    [card],
  );

  const restart = useCallback(() => {
    setIndex(0);
    setFlipped(false);
  }, []);

  // Keyboard shortcuts: Space flips; 1-4 rate when revealed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (done) return;
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        const r = RATINGS[Number(e.key) - 1];
        if (r) rate(r.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, done, rate]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border bg-surface p-3 shadow-card">
          <TopicList
            groups={data.topics}
            totalCards={data.cards.length}
            totalDue={totalDue}
            selectedTopicId={selectedTopicId}
            onSelect={selectTopic}
          />
        </div>
      </aside>

      {/* Study area */}
      <div className="flex flex-col gap-4">
        {/* Progress + session XP */}
        <div className="flex items-center gap-4">
          <Progress
            value={sessionCards.length ? (Math.min(index, sessionCards.length) / sessionCards.length) * 100 : 0}
            className="flex-1"
          />
          <span className="shrink-0 text-sm font-semibold text-muted-foreground">
            {Math.min(index, sessionCards.length)}/{sessionCards.length}
          </span>
          {sessionXp > 0 ? (
            <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-accent">
              <Sparkles className="h-4 w-4" /> +{sessionXp} XP
            </span>
          ) : null}
        </div>

        {done ? (
          <CompleteState reviewed={reviewed} xp={sessionXp} onRestart={restart} empty={sessionCards.length === 0} />
        ) : card ? (
          <>
            {/* Flip card */}
            <div className="[perspective:1600px]">
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-label={flipped ? "Show question" : "Reveal answer"}
                className="relative block min-h-[320px] w-full text-left"
              >
                <motion.div
                  className="relative h-full min-h-[320px] w-full [transform-style:preserve-3d]"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Front */}
                  <CardFace>
                    <FaceHeader
                      topic={card.topic_id ? topicNameById.get(card.topic_id) ?? null : null}
                      difficulty={card.difficulty}
                      side="Question"
                    />
                    <div className="flex flex-1 items-center justify-center px-2 py-6 text-center">
                      <p className="text-xl font-semibold leading-snug md:text-2xl">{card.front}</p>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      Click or press <Kbd>Space</Kbd> to flip
                    </p>
                  </CardFace>

                  {/* Back */}
                  <CardFace back>
                    <FaceHeader
                      topic={card.topic_id ? topicNameById.get(card.topic_id) ?? null : null}
                      difficulty={card.difficulty}
                      side="Answer"
                    />
                    <div className="flex-1 overflow-y-auto px-2 py-4">
                      <Markdown>{card.back}</Markdown>
                    </div>
                  </CardFace>
                </motion.div>
              </button>
            </div>

            {/* Rating */}
            <div
              className={cn(
                "grid grid-cols-2 gap-3 transition-opacity sm:grid-cols-4",
                flipped ? "opacity-100" : "pointer-events-none opacity-40",
              )}
              aria-hidden={!flipped}
            >
              {RATINGS.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  disabled={!flipped}
                  onClick={() => rate(r.key)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-lg border bg-surface py-3 font-semibold transition-colors",
                    r.cls,
                  )}
                >
                  {r.label}
                  <span className="text-xs opacity-60">press {r.hint}</span>
                </button>
              ))}
            </div>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Keyboard className="h-3.5 w-3.5" />
              <Kbd>Space</Kbd> flip · <Kbd>1</Kbd>–<Kbd>4</Kbd> rate
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function CardFace({ children, back = false }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col rounded-2xl border bg-surface p-6 shadow-elevated [backface-visibility:hidden]",
        back && "[transform:rotateY(180deg)]",
      )}
    >
      {children}
    </div>
  );
}

function FaceHeader({
  topic,
  difficulty,
  side,
}: {
  topic: string | null;
  difficulty: "easy" | "medium" | "hard";
  side: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {topic ? <Badge variant="accent">{topic}</Badge> : null}
        <Badge variant={difficulty}>{difficulty}</Badge>
      </div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {side}
      </span>
    </div>
  );
}

function CompleteState({
  reviewed,
  xp,
  onRestart,
  empty,
}: {
  reviewed: number;
  xp: number;
  onRestart: () => void;
  empty: boolean;
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border bg-surface p-10 text-center shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
        <Check className="h-6 w-6" />
      </span>
      <h2 className="heading-3">{empty ? "No cards here yet" : "Session complete!"}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {empty
          ? "Pick another topic from the sidebar to start studying."
          : `You reviewed ${reviewed} card${reviewed === 1 ? "" : "s"} and earned ${xp} XP. Spaced repetition will resurface them right on time.`}
      </p>
      {!empty ? (
        <Button onClick={onRestart} variant="secondary">
          <RotateCcw className="h-4 w-4" /> Review again
        </Button>
      ) : null}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border bg-muted-hover px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">
      {children}
    </kbd>
  );
}
