import { Flame, Zap, Target } from "lucide-react";
import { getSessionUser } from "@/lib/session";
import { getDashboardData } from "@/lib/queries";
import { getLevelInfo } from "@/lib/levels";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { RecommendedSession } from "@/components/dashboard/recommended-session";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ConceptStrip } from "@/components/dashboard/concept-strip";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) return null; // handled by layout
  const data = await getDashboardData(user.id);
  const level = getLevelInfo(user.xp);

  const firstName = (user.display_name ?? "there").split(" ")[0];

  return (
    <div className="container space-y-10 py-8">
      {/* Greeting */}
      <header>
        <h1 className="heading-2">Welcome back, {firstName} 👋</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s your snapshot. Keep the momentum going.
        </p>
      </header>

      {/* Top stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border bg-surface p-5 shadow-card">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Flame className="h-6 w-6" />
          </span>
          <div>
            <div className="text-2xl font-extrabold">{user.streak_days}</div>
            <div className="text-sm text-muted-foreground">
              day{user.streak_days === 1 ? "" : "s"} streak
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-surface p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" /> Level {level.level}
            </span>
            <span className="text-sm font-semibold">{user.xp.toLocaleString()} XP</span>
          </div>
          <div className="mt-1 font-bold">{level.name}</div>
          <Progress value={Math.round(level.progress * 100)} className="mt-3" />
          <div className="mt-1.5 text-xs text-muted-foreground">
            {level.xpForLevel - level.xpIntoLevel} XP to level {level.level + 1}
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border bg-surface p-5 shadow-card sm:col-span-2 lg:col-span-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Target className="h-6 w-6" />
          </span>
          <div>
            <div className="text-2xl font-extrabold">{data.recommended.dueCount}</div>
            <div className="text-sm text-muted-foreground">cards ready to review</div>
          </div>
        </div>
      </section>

      {/* Progress rings */}
      <section aria-labelledby="tracks-heading">
        <h2 id="tracks-heading" className="heading-3 mb-4">
          Track progress
        </h2>
        <div className="grid grid-cols-2 gap-4 rounded-xl border bg-surface p-6 shadow-card md:grid-cols-4">
          {data.trackProgress.map((t) => (
            <ProgressRing
              key={t.track}
              percent={t.percent}
              label={t.label}
              sublabel={`${t.completed}/${t.total} complete`}
            />
          ))}
        </div>
      </section>

      {/* Recommended session */}
      <RecommendedSession
        flashcardTopic={data.recommended.flashcardTopic}
        dueCount={data.recommended.dueCount}
        quizTopic={data.recommended.quizTopic}
        challenge={data.recommended.challenge}
      />

      {/* Recent activity + concept strip */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="activity-heading">
          <h2 id="activity-heading" className="heading-3 mb-3">
            Recent activity
          </h2>
          <ActivityFeed items={data.recentActivity} />
        </section>
        <ConceptStrip />
      </div>
    </div>
  );
}
