"use client";

import { cn } from "@/lib/utils";
import type { FlashcardTopicGroup } from "@/lib/queries";

interface TopicListProps {
  groups: FlashcardTopicGroup[];
  totalCards: number;
  totalDue: number;
  selectedTopicId: string | null;
  onSelect: (topicId: string | null) => void;
}

export function TopicList({
  groups,
  totalCards,
  totalDue,
  selectedTopicId,
  onSelect,
}: TopicListProps) {
  const Row = ({
    id,
    name,
    total,
    due,
    mastered,
  }: {
    id: string | null;
    name: string;
    total: number;
    due: number;
    mastered: number;
  }) => {
    const active = selectedTopicId === id;
    const pct = total === 0 ? 0 : Math.round((mastered / total) * 100);
    return (
      <button
        type="button"
        onClick={() => onSelect(id)}
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex w-full flex-col gap-1 rounded-lg px-3 py-2 text-left text-sm transition-colors",
          active ? "bg-accent/10 text-accent" : "hover:bg-[#F1ECE8]",
        )}
      >
        <span className="flex items-center justify-between gap-2">
          <span className="truncate font-medium">{name}</span>
          {due > 0 ? (
            <span className="shrink-0 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
              {due}
            </span>
          ) : null}
        </span>
        <span className="text-xs text-muted-foreground">
          {mastered}/{total} mastered · {pct}%
        </span>
      </button>
    );
  };

  return (
    <nav aria-label="Flashcard topics" className="flex flex-col gap-1">
      <Row
        id={null}
        name="All topics"
        total={totalCards}
        due={totalDue}
        mastered={groups.reduce((a, g) => a + g.mastered, 0)}
      />
      <div className="my-1 h-px bg-border" />
      {groups.map((g) => (
        <Row
          key={g.topic.id}
          id={g.topic.id}
          name={g.topic.name}
          total={g.total}
          due={g.due}
          mastered={g.mastered}
        />
      ))}
    </nav>
  );
}
