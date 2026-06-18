import Link from "next/link";
import { ArrowLeft, Calendar, Flame, Zap, TrendingUp } from "lucide-react";
import { getSessionUser } from "@/lib/session";
import { getLevelInfo } from "@/lib/levels";
import { getActivityFeed } from "@/lib/queries";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) return null;

  const level = getLevelInfo(user.xp);
  const nextLevelXp = level.totalXp + (level.xpForLevel - level.xpIntoLevel);
  const activity = await getActivityFeed();

  const progressPercent = (level.progress * 100) | 0;
  const xpToNextLevel = level.xpForLevel - level.xpIntoLevel;

  return (
    <div className="container space-y-6 py-8">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Header with level donut */}
      <header className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="heading-2">{user.display_name ?? "Learner"}</h1>
            <p className="text-muted-foreground">{level.name}</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Level donut */}
            <div className="relative h-20 w-20">
              <svg className="h-full w-full" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" className="text-border" />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${Math.min(level.level * 2.8, 87.96)} 87.96`}
                  className="text-accent transition-all"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-foreground">{level.level}</span>
                <span className="text-xs text-muted-foreground">lvl</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-accent" />
                <span className="font-semibold">{level.totalXp.toLocaleString()}</span>
                <span className="text-muted-foreground">XP</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="h-4 w-4 text-accent" />
                <span className="font-semibold">{user.streak_days}</span>
                <span className="text-muted-foreground">day streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress to next level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progress to Level {level.level + 1}</span>
            <span className="text-muted-foreground">
              {level.xpIntoLevel} / {level.xpForLevel} XP
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {xpToNextLevel} XP remaining to next level
          </p>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Stats cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{level.totalXp.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">across all challenges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Flame className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.streak_days}</div>
            <p className="text-xs text-muted-foreground mt-1">consecutive days active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercent}%</div>
            <p className="text-xs text-muted-foreground mt-1">to level {level.level + 1}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest completions and progress</CardDescription>
        </CardHeader>
        <CardContent>
          {activity.length > 0 ? (
            <div className="space-y-3">
              {activity.slice(0, 15).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 rounded-lg border px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.detail}</span>
                    {item.passed === true && <span className="text-xs font-semibold text-success">✓ Passed</span>}
                    {item.passed === false && <span className="text-xs font-semibold text-error">✗ Failed</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No activity yet. Start learning!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
