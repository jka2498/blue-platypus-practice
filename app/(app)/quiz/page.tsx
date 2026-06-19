import { getSessionUser } from "@/lib/session";
import { getQuizTopics, getReviewQueueData } from "@/lib/queries";
import { QuizApp } from "@/components/quiz/quiz-app";

export const metadata = { title: "Quiz" };

export default async function QuizPage() {
  const user = await getSessionUser();
  if (!user) return null;
  const [topics, reviewData] = await Promise.all([
    getQuizTopics(),
    getReviewQueueData(user.id),
  ]);

  return (
    <div className="container space-y-6 py-8">
      <header>
        <h1 className="heading-2">Quiz</h1>
        <p className="mt-1 text-muted-foreground">
          Interview-style multiple choice with instant explanations. Or run a full timed
          interview simulation.
        </p>
      </header>
      <QuizApp topics={topics} reviewQuestions={reviewData.questions} reviewCount={reviewData.count} />
    </div>
  );
}
