import { getSessionUser } from "@/lib/session";
import { getQuizTopics, getReviewQueueData } from "@/lib/queries";
import { QuizApp } from "@/components/quiz/quiz-app";

export const metadata = { title: "Code Snippet Quiz" };

export default async function CodeQuizPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const [topics, reviewData] = await Promise.all([
    getQuizTopics("code"),
    getReviewQueueData(user.id, "code"),
  ]);

  return (
    <div className="container space-y-6 py-8">
      <header>
        <h1 className="heading-2">Code Snippet Quiz</h1>
        <p className="mt-1 text-muted-foreground">
          Multiple-choice where every answer option is code. Choose the snippet
          that correctly solves the prompt.
        </p>
      </header>

      <QuizApp
        topics={topics}
        reviewQuestions={reviewData.questions}
        reviewCount={reviewData.count}
        questionKind="code"
        showInterview={false}
      />
    </div>
  );
}
