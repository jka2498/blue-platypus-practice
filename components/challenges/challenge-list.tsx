"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, CircleDot, Search, Code2 } from "lucide-react";
import type { ChallengeListItem } from "@/lib/queries";
import type { Difficulty } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const difficultyVariant = { easy: "easy", medium: "medium", hard: "hard" } as const;
const DIFFICULTIES: (Difficulty | "all")[] = ["all", "easy", "medium", "hard"];
const STATUSES = [
  { id: "all", label: "All" },
  { id: "not_started", label: "Not started" },
  { id: "attempted", label: "Attempted" },
  { id: "completed", label: "Completed" },
] as const;

type StatusFilter = (typeof STATUSES)[number]["id"];

export function ChallengeList({ items }: { items: ChallengeListItem[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [topicId, setTopicId] = useState<string>("all");

  const topics = useMemo(() => {
    const map = new Map<string, string>();
    for (const it of items) if (it.topic) map.set(it.topic.id, it.topic.name);
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (difficulty !== "all" && it.challenge.difficulty !== difficulty) return false;
      if (topicId !== "all" && it.topic?.id !== topicId) return false;
      if (status === "completed" && it.status !== "passed") return false;
      if (status === "attempted" && !(it.status === "attempted" || it.status === "failed"))
        return false;
      if (status === "not_started" && it.status !== "not_started") return false;
      if (query && !it.challenge.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, difficulty, topicId, status, query]);

  const completed = items.filter((i) => i.status === "passed").length;

  return (
    <div className="space-y-5">
      {/* Stat line */}
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{completed}</span> of {items.length}{" "}
        challenges solved
      </p>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border bg-surface p-4 shadow-card sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges…"
            aria-label="Search challenges"
            className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>

        <FilterGroup label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <FilterChip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
              {d}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup label="Status">
          {STATUSES.map((s) => (
            <FilterChip key={s.id} active={status === s.id} onClick={() => setStatus(s.id)}>
              {s.label}
            </FilterChip>
          ))}
        </FilterGroup>

        {topics.length > 0 ? (
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            aria-label="Filter by topic"
            className="h-9 rounded-lg border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <option value="all">All topics</option>
            {topics.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border bg-surface p-10 text-center shadow-card">
          <Code2 className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No challenges match these filters.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {filtered.map(({ challenge, topic, status: st }) => (
            <li key={challenge.id}>
              <Link
                href={`/challenges/${challenge.slug}`}
                className="group flex items-center gap-4 rounded-xl border bg-surface p-4 shadow-card transition-shadow hover:shadow-elevated"
              >
                <StatusIcon status={st} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold group-hover:text-accent">
                    {challenge.title}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    {topic ? <span>{topic.name}</span> : null}
                    <span>·</span>
                    <span>{challenge.type === "react" ? "React" : "JavaScript"}</span>
                  </div>
                </div>
                <Badge variant={difficultyVariant[challenge.difficulty]}>
                  {challenge.difficulty}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: ChallengeListItem["status"] }) {
  if (status === "passed")
    return <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-label="Completed" />;
  if (status === "attempted" || status === "failed")
    return <CircleDot className="h-5 w-5 shrink-0 text-medium" aria-label="Attempted" />;
  return <Circle className="h-5 w-5 shrink-0 text-muted-foreground" aria-label="Not started" />;
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors",
        active ? "bg-accent text-white" : "bg-[#F1ECE8] text-muted-foreground hover:bg-[#E7E1DC]",
      )}
    >
      {children}
    </button>
  );
}
