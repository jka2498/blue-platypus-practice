import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ChapterLearningPath } from "@/components/javascript-roadmap/chapter-learning-path";
import { getSessionUser } from "@/lib/session";
import {
  getChallengeDetail,
  getChallengeList,
  getJavascriptRoadmapChapterBySlug,
} from "@/lib/queries";

export default async function JavascriptRoadmapChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSessionUser();
  if (!user) return null;

  const chapter = await getJavascriptRoadmapChapterBySlug(params.slug);
  if (!chapter) notFound();

  const allTopicChallenges = (await getChallengeList(user.id)).filter(
    (item) => item.challenge.type === "js" && item.topic?.slug === params.slug,
  );

  const challengeItems =
    params.slug === "array-methods"
      ? allTopicChallenges
          .filter((item) =>
            item.challenge.slug.startsWith("array-method-fundamentals-"),
          )
          .sort((a, b) => a.challenge.slug.localeCompare(b.challenge.slug))
      : allTopicChallenges;

  const activeChallengeItem =
    challengeItems.find((item) => item.status !== "passed") ??
    challengeItems[0] ??
    null;

  const challengeDetail = activeChallengeItem
    ? await getChallengeDetail(activeChallengeItem.challenge.slug, user.id)
    : null;

  const fallbackChallenge = chapter.challenges[0] ?? null;
  const challenge = activeChallengeItem
    ? {
        id: activeChallengeItem.challenge.id,
        title: activeChallengeItem.challenge.title,
        difficulty: activeChallengeItem.challenge.difficulty,
        prompt: activeChallengeItem.challenge.description,
        source: "database" as const,
        slug: activeChallengeItem.challenge.slug,
      }
    : fallbackChallenge;

  const challengeTrack = challengeItems.map((item) => ({
    id: item.challenge.id,
    slug: item.challenge.slug,
    title: item.challenge.title,
    difficulty: item.challenge.difficulty,
    status: item.status,
  }));

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
        chapterSlug={chapter.topic.slug}
        title={chapter.topic.name}
        summary={chapter.summary}
        mcqs={chapter.mcqs}
        challenge={challenge}
        challengeDetail={challengeDetail}
        challengeTrack={challengeTrack}
        activeChallengeSlug={activeChallengeItem?.challenge.slug ?? null}
      />
    </div>
  );
}
