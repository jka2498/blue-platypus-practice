import { getSessionUser } from "@/lib/session";
import { getQuizTopics } from "@/lib/queries";
import { QuizApp } from "@/components/quiz/quiz-app";

export const metadata = { title: "Quiz" };

export default async function QuizPage() {
  const user = await getSessionUser();
  if (!user) return null;
  const topics = await getQuizTopics();

  return (
    <div className="container space-y-6 py-8">
      <header>
        <h1 className="heading-2">Quiz</h1>
        <p className="mt-1 text-muted-foreground">
          Interview-style multiple choice with instant explanations. Or run a full timed
          interview simulation.
        </p>
      </header>
      <QuizApp topics={topics} />
    </div>
  );
}
