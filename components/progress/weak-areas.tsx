import Link from "next/link";
import { AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import type { WeakArea } from "@/types";

export function WeakAreas({ areas }: { areas: WeakArea[] }) {
  return (
    <div className="rounded-xl border bg-surface p-6 shadow-card">
      <h3 className="heading-3 mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-medium" /> Weak areas
      </h3>
      {areas.length === 0 ? (
        <div className="flex items-center gap-2 rounded-lg bg-success/5 p-4 text-sm text-success">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          Nothing flagged yet. Keep practising to surface your soft spots.
        </div>
      ) : (
        <ul className="space-y-3">
          {areas.map((a) => (
            <li
              key={a.topicId}
              className="flex items-center justify-between gap-3 rounded-lg border border-medium/30 bg-medium/5 p-3"
            >
              <div className="min-w-0">
                <div className="font-semibold">{a.topicName}</div>
                <div className="text-xs text-muted-foreground">{a.reason}</div>
              </div>
              <Link
                href="/flashcards"
                className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                Review <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
