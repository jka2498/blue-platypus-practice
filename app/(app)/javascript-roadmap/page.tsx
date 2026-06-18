import Link from "next/link";
import { ArrowRight, Code2, ListChecks } from "lucide-react";
import { getSessionUser } from "@/lib/session";
import { getJavascriptRoadmapChapters } from "@/lib/queries";

export const metadata = { title: "JavaScript Roadmap" };

export default async function JavascriptRoadmapPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const chapters = await getJavascriptRoadmapChapters();
  const phases = chapters.reduce(
    (acc, chapter) => {
      const existing = acc.find((p) => p.id === chapter.phaseId);
      if (existing) {
        existing.items.push(chapter);
        return acc;
      }
      acc.push({
        id: chapter.phaseId,
        title: chapter.phaseTitle,
        description: chapter.phaseDescription,
        order: chapter.phaseOrder,
        items: [chapter],
      });
      return acc;
    },
    [] as {
      id: string;
      title: string;
      description: string;
      order: number;
      items: (typeof chapters)[number][];
    }[],
  );

  phases.sort((a, b) => a.order - b.order);

  return (
    <div className="container space-y-8 py-8">
      <header>
        <h1 className="heading-2">JavaScript Roadmap Learning Path</h1>
        <p className="mt-1 text-muted-foreground">
          Progressive path from easier fundamentals to harder interview-ready topics. Each chapter
          follows: lesson summary, MCQ checkpoint, then one topic-specific coding challenge.
        </p>
      </header>

      <section className="space-y-5">
        {phases.map((phase, phaseIndex) => (
          <article key={phase.id} className="rounded-2xl border bg-surface p-4 shadow-card sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <h2 className="text-lg font-bold tracking-tight">{phase.title}</h2>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
              <span className="rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {phase.items.length} topics
              </span>
            </div>

            <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
              {phase.items.map((chapter, stepIndex) => (
                <Link
                  key={chapter.topic.id}
                  href={`/javascript-roadmap/${chapter.topic.slug}`}
                  className="group rounded-xl border bg-background p-4 transition hover:border-accent/40 hover:shadow-elevated"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1 text-xs font-bold text-muted-foreground">
                        {phaseIndex + 1}.{stepIndex + 1}
                      </span>
                      <h3 className="font-semibold leading-tight">{chapter.topic.name}</h3>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
                  </div>

                  <p className="line-clamp-3 text-sm text-muted-foreground">{chapter.summary}</p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <ListChecks className="h-3.5 w-3.5" /> {chapter.quizCount} MCQs
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Code2 className="h-3.5 w-3.5" /> {Math.max(1, chapter.challengeCount)} challenge
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
