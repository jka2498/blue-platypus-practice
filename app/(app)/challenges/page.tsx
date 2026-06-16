import { getSessionUser } from "@/lib/session";
import { getChallengeList } from "@/lib/queries";
import { ChallengeList } from "@/components/challenges/challenge-list";

export const metadata = { title: "Challenges" };

export default async function ChallengesPage() {
  const user = await getSessionUser();
  if (!user) return null;
  const items = await getChallengeList(user.id);

  return (
    <div className="container space-y-6 py-8">
      <header>
        <h1 className="heading-2">Coding challenges</h1>
        <p className="mt-1 text-muted-foreground">
          Implement real functions and components. JS challenges are auto-graded; React
          challenges run live with a verification checklist.
        </p>
      </header>
      <ChallengeList items={items} />
    </div>
  );
}
