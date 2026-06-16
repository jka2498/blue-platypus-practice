import Link from "next/link";
import { ArrowRight, BookOpen, Code2, LineChart, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authMode } from "@/lib/auth";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Spaced-repetition flashcards",
    body: "60+ cards across the JavaScript and React roadmap, scheduled with the SM-2 algorithm so you review exactly what you're about to forget.",
  },
  {
    icon: Code2,
    title: "A real coding environment",
    body: "Monaco + Sandpack split-pane IDE. Implement debounce, build a useFetch hook, write a Redux-like store — graded against real test cases.",
  },
  {
    icon: LineChart,
    title: "Progress you can feel",
    body: "XP, streaks, a 90-day heatmap, per-topic mastery, and auto-detected weak areas. Know precisely where you stand for interviews.",
  },
] as const;

export default function LandingPage() {
  // CTA target depends on auth mode: local users go straight in; Auth0 users log in.
  const startHref = authMode() === "auth0" ? "/api/auth/login?returnTo=/dashboard" : "/dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
              <Layers className="h-4 w-4" />
            </span>
            DevPath
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/migration-guide">Angular → React guide</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={startHref}>Start Learning</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container flex flex-col items-center gap-6 pb-16 pt-20 text-center md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Built for Angular developers
          </span>
          <h1 className="heading-1 max-w-3xl text-balance">
            The fastest way to go from{" "}
            <span className="text-accent">Angular to React.</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Flashcards, quizzes, and a real coding environment — built around the
            JavaScript and React roadmap.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={startHref}>
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/migration-guide">Browse the migration guide</Link>
            </Button>
          </div>
        </section>

        {/* Feature callouts */}
        <section className="container grid gap-6 pb-24 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border bg-surface p-6 shadow-card">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="heading-3 mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex h-16 items-center justify-between text-sm text-muted-foreground">
          <span>DevPath — your personal React study platform.</span>
          <span>Built around roadmap.sh/javascript &amp; roadmap.sh/react</span>
        </div>
      </footer>
    </div>
  );
}
