import { getSessionUser } from "@/lib/session";
import { getFlashcardStudyData } from "@/lib/queries";
import { FlashcardSession } from "@/components/flashcards/flashcard-session";

export const metadata = { title: "Flashcards" };

export default async function FlashcardsPage() {
  const user = await getSessionUser();
  if (!user) return null;
  const data = await getFlashcardStudyData(user.id);

  return (
    <div className="container space-y-6 py-8">
      <header>
        <h1 className="heading-2">Flashcards</h1>
        <p className="mt-1 text-muted-foreground">
          Spaced repetition across the JavaScript &amp; React roadmap. Due cards come first.
        </p>
      </header>
      <FlashcardSession data={data} />
    </div>
  );
}
