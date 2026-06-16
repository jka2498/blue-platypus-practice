import type { TopicMastery } from "@/types";
import { cn } from "@/lib/utils";

function barTone(pct: number): string {
  if (pct >= 70) return "bg-success";
  if (pct >= 40) return "bg-medium";
  return "bg-accent";
}

function Dimension({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground" title={`${label}: ${value}%`}>
      <span className="font-medium">{label}</span>
      <span className="tabular-nums">{value}%</span>
    </div>
  );
}

export function MasteryBars({ mastery }: { mastery: TopicMastery[] }) {
  const withContent = mastery.filter(
    (m) => m.flashcardScore + m.quizScore + m.challengeScore > 0 || m.overall > 0,
  );
  const rows = withContent.length > 0 ? withContent : mastery;

  return (
    <div className="rounded-xl border bg-surface p-6 shadow-card">
      <h3 className="heading-3 mb-4">Topic mastery</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Start studying to build your mastery profile.
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((m) => (
            <li key={m.topicId}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{m.topicName}</span>
                <span className="text-sm font-bold tabular-nums">{m.overall}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#EEE9E5]">
                <div
                  className={cn("h-full rounded-full transition-all", barTone(m.overall))}
                  style={{ width: `${m.overall}%` }}
                />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5">
                <Dimension label="Cards" value={m.flashcardScore} />
                <Dimension label="Quiz" value={m.quizScore} />
                <Dimension label="Challenges" value={m.challengeScore} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
