import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  LineChart,
  Layers,
  CheckSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  // Users go to dashboard; middleware will redirect to signin if not authenticated
  const startHref = "/dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
              <Layers className="h-4 w-4" />
            </span>
            DevPath
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href={startHref}>Start Learning</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container flex flex-col items-center gap-6 pb-16 pt-20 text-center md:pt-28">
          <h1 className="heading-1 max-w-3xl text-balance">
            Master <span className="text-accent">JS, TS & React</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Flashcards, quizzes, and a real coding environment — built around
            the JavaScript and React roadmap.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={startHref}>
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Feature callouts */}
        <section className="container grid gap-6 pb-24 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border bg-surface p-6 shadow-card"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="heading-3 mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </section>

        {/* Learning Paths Section */}
        <section className="container py-16">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4">Structured Learning Paths</h2>
            <p className="text-lg text-muted-foreground">
              Follow comprehensive roadmaps designed to build your JavaScript
              and React skills
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-surface p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="heading-3 mb-3">JavaScript Roadmap</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Master the fundamentals of JavaScript from variables and
                functions through advanced async patterns and ES6+ features.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/javascript-roadmap">Explore Roadmap</Link>
              </Button>
            </div>
            <div className="rounded-xl border bg-surface p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="heading-3 mb-3">Coding Challenges</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Write real code in a fully-featured editor with automated
                testing. Build utilities, hooks, and components while learning
                best practices.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/challenges">View Challenges</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Assessment Section */}
        <section className="container py-16">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4">Test Your Knowledge</h2>
            <p className="text-lg text-muted-foreground">
              Use multiple formats to assess your understanding and prepare for
              interviews
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-surface p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <CheckSquare className="h-6 w-6" />
              </div>
              <h3 className="heading-3 mb-3">Quiz Sessions</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Interview-style questions covering core concepts. Get instant
                feedback and track your improvement over time.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/quiz">Start Quiz</Link>
              </Button>
            </div>
            <div className="rounded-xl border bg-surface p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="heading-3 mb-3">Progress Dashboard</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                See your learning journey visualized. Heatmaps, mastery levels,
                and streak tracking keep you motivated.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/progress">View Progress</Link>
              </Button>
            </div>
            <div className="rounded-xl border bg-surface p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="heading-3 mb-3">Spaced Repetition</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Flashcard sessions optimized with the SM-2 algorithm. Review
                content exactly when you're about to forget it.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/flashcards">Start Flashcards</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-center gap-2 py-8 text-center text-sm text-muted-foreground">
          <p>
            DevPath — learn JavaScript and React through coding, quizzes, and
            spaced repetition
          </p>
          <p>
            Content built around{" "}
            <a
              href="https://roadmap.sh/javascript"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              roadmap.sh/javascript
            </a>{" "}
            and{" "}
            <a
              href="https://roadmap.sh/react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              roadmap.sh/react
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
