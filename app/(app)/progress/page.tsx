import { Zap, Flame, Code2, Target, Layers3 } from "lucide-react";
import { getSessionUser } from "@/lib/session";
import { getProgressData } from "@/lib/queries";
import { Progress } from "@/components/ui/progress";
import { Heatmap } from "@/components/progress/heatmap";
import { MasteryBars } from "@/components/progress/mastery-bars";
import { WeakAreas } from "@/components/progress/weak-areas";
import { levelName } from "@/lib/levels";

export const metadata = { title: "Progress" };

const TIER_SEQUENCE = "Apprentice → Practitioner → Engineer → Senior → Architect";

export default async function ProgressPage() {
  const user = await getSessionUser();
  if (!user) return null;
  const data = await getProgressData(user.id, user.xp, user.streak_days);
  const { level, stats } = data;

  const statCards = [
    { icon: Zap, label: "Total XP", value: stats.totalXp.toLocaleString() },
    { icon: Flame, label: "Day streak", value: stats.streak },
    { icon: Code2, label: "Challenges solved", value: stats.challengesCompleted },
    { icon: Target, label: "Quiz accuracy", value: `${stats.quizAccuracy}%` },
    { icon: Layers3, label: "Cards reviewed", value: stats.flashcardsReviewed },
  ];

  return (
    <div className="container space-y-8 py-8">
      <header>
        <h1 className="heading-2">Progress</h1>
        <p className="mt-1 text-muted-foreground">
          Your trajectory toward a React role — at a glance.
        </p>
      </header>

      {/* Level progression */}
      <section className="rounded-xl border bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-muted-foreground">
              Level {level.level}
            </div>
            <div className="heading-2">{level.name}</div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {level.xpIntoLevel}/{level.xpForLevel} XP ·{" "}
            <span className="font-semibold text-foreground">
              {level.xpForLevel - level.xpIntoLevel} to level {level.level + 1}
            </span>
          </div>
        </div>
        <Progress value={Math.round(level.progress * 100)} className="mt-4 h-3" />
        <div className="mt-2 text-xs text-muted-foreground">
          Mastery path: {TIER_SEQUENCE} · next up:{" "}
          <span className="font-medium text-foreground">{levelName(level.level + 1)}</span>
        </div>
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border bg-surface p-4 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <s.icon className="h-4 w-4" />
            </span>
            <div className="mt-3 text-2xl font-extrabold tabular-nums">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Heatmap */}
      <Heatmap days={data.heatmap} />

      {/* Mastery + weak areas */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <MasteryBars mastery={data.mastery} />
        <WeakAreas areas={data.weakAreas} />
      </div>
    </div>
  );
}
