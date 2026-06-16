import { CheckCircle2, XCircle, Circle, Layers3, ListChecks, Code2 } from "lucide-react";
import type { ActivityFeedItem } from "@/types";

const KIND_ICON = {
  flashcard: Layers3,
  quiz: ListChecks,
  challenge: Code2,
} as const;

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export function ActivityFeed({ items }: { items: ActivityFeedItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-surface p-6 text-center shadow-card">
        <p className="text-sm text-muted-foreground">
          No activity yet. Complete a flashcard, quiz, or challenge to see it here.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y rounded-xl border bg-surface shadow-card">
      {items.map((item) => {
        const Icon = KIND_ICON[item.kind];
        const Status =
          item.passed === null ? Circle : item.passed ? CheckCircle2 : XCircle;
        const statusColor =
          item.passed === null
            ? "text-muted-foreground"
            : item.passed
              ? "text-success"
              : "text-error";
        return (
          <li key={item.id} className="flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1ECE8] text-muted-foreground">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{item.title}</div>
              <div className="truncate text-xs text-muted-foreground">{item.detail}</div>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {relativeTime(item.at)}
            </span>
            <Status className={`h-5 w-5 shrink-0 ${statusColor}`} aria-hidden />
          </li>
        );
      })}
    </ul>
  );
}
