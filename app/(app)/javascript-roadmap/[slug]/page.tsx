import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ChapterLearningPath } from "@/components/javascript-roadmap/chapter-learning-path";
import { getSessionUser } from "@/lib/session";
import { getJavascriptRoadmapChapterBySlug } from "@/lib/queries";

export default async function JavascriptRoadmapChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSessionUser();
  if (!user) return null;

  const chapter = await getJavascriptRoadmapChapterBySlug(params.slug);
  if (!chapter) notFound();

  const challenge = chapter.challenges[0] ?? null;

  return (
    <div className="container space-y-8 py-8">
      <div>
        <Link
          href="/javascript-roadmap"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to JS Roadmap
        </Link>
      </div>

      <ChapterLearningPath
        title={chapter.topic.name}
        summary={chapter.summary}
        mcqs={chapter.mcqs}
        challenge={challenge}
      />
    </div>
  );
}
