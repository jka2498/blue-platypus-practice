import type { HeatmapDay } from "@/types";
import { cn } from "@/lib/utils";

const LEVEL_CLASS: Record<HeatmapDay["level"], string> = {
  0: "bg-border",
  1: "bg-accent/25",
  2: "bg-accent/45",
  3: "bg-accent/70",
  4: "bg-accent",
};

function weekday(iso: string): number {
  return new Date(`${iso}T00:00:00`).getDay(); // 0=Sun
}

/**
 * GitHub-style 90-day activity heatmap. Columns are weeks (7 rows, Sun→Sat);
 * the first column is padded so days align to their weekday.
 */
export function Heatmap({ days }: { days: HeatmapDay[] }) {
  const first = days[0];
  const pad = first ? weekday(first.date) : 0;
  const cells: (HeatmapDay | null)[] = [...Array<null>(pad).fill(null), ...days];

  const total = days.reduce((a, d) => a + d.xp, 0);
  const activeDays = days.filter((d) => d.xp > 0).length;

  return (
    <div className="rounded-xl border bg-surface p-6 shadow-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="heading-3">Activity — last 90 days</h3>
        <span className="text-sm text-muted-foreground">
          {activeDays} active days · {total.toLocaleString()} XP
        </span>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid grid-flow-col gap-1"
          style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
          role="img"
          aria-label={`Activity heatmap: ${activeDays} active days in the last 90 days`}
        >
          {cells.map((cell, i) =>
            cell ? (
              <div
                key={cell.date}
                title={`${cell.date}: ${cell.xp} XP`}
                className={cn("h-3.5 w-3.5 rounded-[3px]", LEVEL_CLASS[cell.level])}
              />
            ) : (
              <div key={`pad-${i}`} className="h-3.5 w-3.5" />
            ),
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as const).map((l) => (
          <span key={l} className={cn("h-3 w-3 rounded-[3px]", LEVEL_CLASS[l])} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
