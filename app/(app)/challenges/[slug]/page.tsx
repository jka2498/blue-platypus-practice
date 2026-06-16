import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSessionUser } from "@/lib/session";
import { getChallengeDetail } from "@/lib/queries";
import { ChallengeWorkspace } from "@/components/challenges/challenge-workspace";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const user = await getSessionUser();
  if (!user) return { title: "Challenge" };
  const detail = await getChallengeDetail(params.slug, user.id);
  return { title: detail?.challenge.title ?? "Challenge" };
}

export default async function ChallengePage({ params }: PageProps) {
  const user = await getSessionUser();
  if (!user) return null;
  const detail = await getChallengeDetail(params.slug, user.id);
  if (!detail) notFound();

  return (
    <div>
      <div className="border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-11 items-center">
          <Link
            href="/challenges"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All challenges
          </Link>
        </div>
      </div>
      <ChallengeWorkspace detail={detail} />
    </div>
  );
}
