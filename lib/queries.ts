// ─────────────────────────────────────────────────────────────────────────────
// Server-side read layer. SERVER ONLY (uses the service-role client).
//
// Every user-scoped query filters explicitly by user_id. Aggregations for the
// dashboard / progress views are computed in JS because a single user's dataset
// is small and this keeps the SQL trivial.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  ActivityFeedItem,
  Challenge,
  ChallengeAttempt,
  ChallengeStatus,
  Flashcard,
  FlashcardProgress,
  HeatmapDay,
  QuizQuestion,
  Topic,
  TopicMastery,
  TrackProgress,
  WeakArea,
} from "@/types";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getLevelInfo } from "@/lib/levels";
import { LEARNING_TRACKS } from "@/lib/content-config";
import { isDue } from "@/lib/sm2";
import { getSessionUser } from "@/lib/session";
import { todayISO, addDays, clamp } from "@/lib/utils";
import {
  generateFallbackMcqs,
  generatePracticeChallenges,
  getRoadmapPhaseMeta,
  getTopicLesson,
  getTopicSummary,
  type RoadmapPracticeChallenge,
} from "@/lib/javascript-roadmap";

// ── Topics ────────────────────────────────────────────────────────────────────

export async function getTopics(): Promise<Topic[]> {
  const { data } = await getSupabaseAdmin()
    .from("topics")
    .select("*")
    .order("order_index", { ascending: true });
  return (data ?? []) as Topic[];
}

// ── JavaScript roadmap chapter learning path ────────────────────────────────

export interface JsRoadmapChapterItem {
  topic: Topic;
  summary: string;
  quizCount: number;
  challengeCount: number;
  phaseId: "foundations" | "applied-core" | "interview-readiness";
  phaseTitle: string;
  phaseDescription: string;
  phaseOrder: number;
  stepInPhase: number;
  sequenceOrder: number;
}

export interface JsRoadmapChapterChallenge {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  source: "database" | "generated";
  slug?: string;
}

export interface JsRoadmapChapterData {
  topic: Topic;
  summary: string;
  mcqs: QuizQuestion[];
  challenges: JsRoadmapChapterChallenge[];
}

export async function getJavascriptRoadmapChapters(): Promise<JsRoadmapChapterItem[]> {
  const supabase = getSupabaseAdmin();
  const [{ data: topicsData }, { data: quizData }, { data: challengesData }] =
    await Promise.all([
      supabase.from("topics").select("*").eq("track", "javascript").order("order_index"),
      supabase.from("quiz_questions").select("topic_id"),
      supabase.from("challenges").select("topic_id, type"),
    ]);

  const topics = (topicsData ?? []) as Topic[];
  const quizCounts = new Map<string, number>();
  const challengeCounts = new Map<string, number>();

  for (const q of (quizData ?? []) as { topic_id: string | null }[]) {
    if (!q.topic_id) continue;
    quizCounts.set(q.topic_id, (quizCounts.get(q.topic_id) ?? 0) + 1);
  }

  for (const c of (challengesData ?? []) as { topic_id: string | null; type: string }[]) {
    if (!c.topic_id) continue;
    if (c.type !== "js") continue;
    challengeCounts.set(c.topic_id, (challengeCounts.get(c.topic_id) ?? 0) + 1);
  }

  return topics
    .map((topic) => {
      const phaseMeta = getRoadmapPhaseMeta(topic.slug);
      return {
        topic,
        summary: getTopicSummary(topic.slug, topic.name),
        quizCount: quizCounts.get(topic.id) ?? 0,
        challengeCount: challengeCounts.get(topic.id) ?? 0,
        ...phaseMeta,
      };
    })
    .sort((a, b) => a.sequenceOrder - b.sequenceOrder);
}

export async function getJavascriptRoadmapChapterBySlug(
  slug: string,
): Promise<JsRoadmapChapterData | null> {
  const supabase = getSupabaseAdmin();
  const { data: topicData } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", slug)
    .eq("track", "javascript")
    .maybeSingle();

  if (!topicData) return null;
  const topic = topicData as Topic;

  const [{ data: mcqData }, { data: challengeData }] = await Promise.all([
    supabase
      .from("quiz_questions")
      .select("*")
      .eq("topic_id", topic.id)
      .limit(40),
    supabase
      .from("challenges")
      .select("id, slug, title, difficulty, description, type")
      .eq("topic_id", topic.id)
      .eq("type", "js")
      .order("order_index")
      .limit(20),
  ]);

  const realMcqs = (mcqData ?? []) as QuizQuestion[];
  // Fisher-Yates shuffle for random question order each visit
  for (let i = realMcqs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = realMcqs[i]!;
    realMcqs[i] = realMcqs[j]!;
    realMcqs[j] = tmp;
  }
  const mcqs = realMcqs.length > 0 ? realMcqs.slice(0, 12) : generateFallbackMcqs(topic.name);

  const realChallenges: JsRoadmapChapterChallenge[] = (
    (challengeData ?? []) as {
      id: string;
      slug: string;
      title: string;
      difficulty: "easy" | "medium" | "hard";
      description: string;
      type: "js";
    }[]
  ).map((c) => ({
    id: c.id,
    title: c.title,
    difficulty: c.difficulty,
    prompt: c.description,
    source: "database",
    slug: c.slug,
  }));

  const generated: RoadmapPracticeChallenge[] = generatePracticeChallenges(topic.slug, topic.name);
  const needed = Math.max(0, 5 - realChallenges.length);
  const fillChallenges: JsRoadmapChapterChallenge[] = generated.slice(0, needed).map((c) => ({
    id: c.id,
    title: c.title,
    difficulty: c.difficulty,
    prompt: c.prompt,
    source: c.source,
    slug: c.slug,
  }));

  return {
    topic,
    summary: getTopicLesson(topic.slug, topic.name),
    mcqs,
    challenges: [...realChallenges, ...fillChallenges].slice(0, 5),
  };
}

// ── Flashcards ──────────────────────────────────────────────────────────────

export interface FlashcardWithProgress extends Flashcard {
  progress: FlashcardProgress | null;
  due: boolean;
}

export interface FlashcardTopicGroup {
  topic: Topic;
  total: number;
  due: number;
  mastered: number;
}

export interface FlashcardStudyData {
  topics: FlashcardTopicGroup[];
  cards: FlashcardWithProgress[];
}

/**
 * Build a study session. Cards are ordered due-first (oldest next_review_date
 * first), then never-seen cards, then the rest. Optionally scoped to a topic.
 */
export async function getFlashcardStudyData(
  userId: string,
  topicSlug?: string,
): Promise<FlashcardStudyData> {
  const supabase = getSupabaseAdmin();
  const today = todayISO();

  const [{ data: topicsData }, { data: cardsData }, { data: progressData }] =
    await Promise.all([
      supabase.from("topics").select("*").order("order_index"),
      supabase.from("flashcards").select("*"),
      supabase.from("flashcard_progress").select("*").eq("user_id", userId),
    ]);

  const topics = (topicsData ?? []) as Topic[];
  const cards = (cardsData ?? []) as Flashcard[];
  const progress = (progressData ?? []) as FlashcardProgress[];
  const progressByCard = new Map(progress.map((p) => [p.flashcard_id, p]));

  const enriched: FlashcardWithProgress[] = cards.map((c) => {
    const p = progressByCard.get(c.id) ?? null;
    return { ...c, progress: p, due: isDue(p?.next_review_date ?? null, today) };
  });

  // Topic groupings (counts) for the sidebar.
  const groups: FlashcardTopicGroup[] = topics.map((topic) => {
    const inTopic = enriched.filter((c) => c.topic_id === topic.id);
    const mastered = inTopic.filter(
      (c) => c.progress && (c.progress.last_rating === "good" || c.progress.last_rating === "easy"),
    ).length;
    return {
      topic,
      total: inTopic.length,
      due: inTopic.filter((c) => c.due).length,
      mastered,
    };
  });

  // Build the ordered session.
  let pool = enriched;
  if (topicSlug) {
    const topic = topics.find((t) => t.slug === topicSlug);
    pool = topic ? enriched.filter((c) => c.topic_id === topic.id) : [];
  }

  const rank = (c: FlashcardWithProgress) => {
    if (c.due && c.progress) return 0; // due & previously seen → first
    if (!c.progress) return 1; // never seen → next
    return 2; // not yet due
  };
  const sorted = [...pool].sort((a, b) => {
    const r = rank(a) - rank(b);
    if (r !== 0) return r;
    const an = a.progress?.next_review_date ?? "9999-12-31";
    const bn = b.progress?.next_review_date ?? "9999-12-31";
    return an.localeCompare(bn);
  });

  return { topics: groups.filter((g) => g.total > 0), cards: sorted };
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

export interface QuizTopicOption {
  topic: Topic;
  questionCount: number;
}

export async function getQuizTopics(): Promise<QuizTopicOption[]> {
  const supabase = getSupabaseAdmin();
  const [{ data: topicsData }, { data: questionsData }] = await Promise.all([
    supabase.from("topics").select("*").order("order_index"),
    supabase.from("quiz_questions").select("topic_id"),
  ]);
  const topics = (topicsData ?? []) as Topic[];
  const questions = (questionsData ?? []) as { topic_id: string | null }[];
  const counts = new Map<string, number>();
  for (const q of questions) {
    if (!q.topic_id) continue;
    counts.set(q.topic_id, (counts.get(q.topic_id) ?? 0) + 1);
  }
  return topics
    .map((topic) => ({ topic, questionCount: counts.get(topic.id) ?? 0 }))
    .filter((o) => o.questionCount > 0);
}

// ── Quiz review queue ───────────────────────────────────────────────────────

export interface ReviewQueueData {
  count: number;
  questions: QuizQuestion[];
}

/** Fetch all questions the user has previously answered incorrectly. */
export async function getReviewQueueData(userId: string): Promise<ReviewQueueData> {
  const supabase = getSupabaseAdmin();
  const { data: queueData } = await supabase
    .from("quiz_review_queue")
    .select("question_id")
    .eq("user_id", userId)
    .order("added_at", { ascending: true });

  const questionIds = ((queueData ?? []) as { question_id: string }[]).map(
    (r) => r.question_id,
  );
  if (questionIds.length === 0) return { count: 0, questions: [] };

  const { data } = await supabase
    .from("quiz_questions")
    .select("*")
    .in("id", questionIds);

  const questions = (data ?? []) as QuizQuestion[];
  // Preserve the order from the queue (oldest added first).
  const orderMap = new Map(questionIds.map((id, i) => [id, i]));
  questions.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0));

  return { count: questions.length, questions };
}

/** Fetch up to `limit` questions, shuffled. `topicId === null` → mixed. */
export async function getQuizQuestions(
  topicId: string | null,
  limit = 10,
): Promise<QuizQuestion[]> {
  let query = getSupabaseAdmin().from("quiz_questions").select("*");
  if (topicId) query = query.eq("topic_id", topicId);
  const { data } = await query;
  const all = (data ?? []) as QuizQuestion[];
  // Fisher–Yates shuffle, then slice.
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = all[i]!;
    all[i] = all[j]!;
    all[j] = tmp;
  }
  return all.slice(0, limit);
}

// ── Challenges ────────────────────────────────────────────────────────────────

export interface ChallengeListItem {
  challenge: Challenge;
  topic: Topic | null;
  status: ChallengeStatus | "not_started";
}

export async function getChallengeList(userId: string): Promise<ChallengeListItem[]> {
  const supabase = getSupabaseAdmin();
  const [{ data: challengesData }, { data: topicsData }, { data: attemptsData }] =
    await Promise.all([
      supabase.from("challenges").select("*").order("order_index"),
      supabase.from("topics").select("*"),
      supabase.from("challenge_attempts").select("challenge_id, status").eq("user_id", userId),
    ]);

  const challenges = (challengesData ?? []) as Challenge[];
  const topics = (topicsData ?? []) as Topic[];
  const attempts = (attemptsData ?? []) as { challenge_id: string; status: ChallengeStatus }[];
  const topicById = new Map(topics.map((t) => [t.id, t]));

  // Best status per challenge: passed > attempted/failed > not_started.
  const statusByChallenge = new Map<string, ChallengeStatus>();
  for (const a of attempts) {
    const cur = statusByChallenge.get(a.challenge_id);
    if (a.status === "passed" || !cur) statusByChallenge.set(a.challenge_id, a.status);
  }

  return challenges.map((challenge) => ({
    challenge,
    topic: challenge.topic_id ? topicById.get(challenge.topic_id) ?? null : null,
    status: statusByChallenge.get(challenge.id) ?? "not_started",
  }));
}

export interface ChallengeDetail {
  challenge: Challenge;
  topic: Topic | null;
  attempts: ChallengeAttempt[];
  failedCount: number;
  solved: boolean;
}

export async function getChallengeDetail(
  slug: string,
  userId: string,
): Promise<ChallengeDetail | null> {
  const supabase = getSupabaseAdmin();
  const { data: challengeData } = await supabase
    .from("challenges")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!challengeData) return null;
  const challenge = challengeData as Challenge;

  const [{ data: topicData }, { data: attemptsData }] = await Promise.all([
    challenge.topic_id
      ? supabase.from("topics").select("*").eq("id", challenge.topic_id).maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from("challenge_attempts")
      .select("*")
      .eq("user_id", userId)
      .eq("challenge_id", challenge.id)
      .order("attempted_at", { ascending: false }),
  ]);

  const attempts = (attemptsData ?? []) as ChallengeAttempt[];
  return {
    challenge,
    topic: (topicData as Topic | null) ?? null,
    attempts,
    failedCount: attempts.filter((a) => a.status === "failed").length,
    solved: attempts.some((a) => a.status === "passed"),
  };
}

/** A random JS challenge (easy/medium) for the interview simulation coding round. */
export async function getRandomJsChallenge(): Promise<Challenge | null> {
  const { data } = await getSupabaseAdmin()
    .from("challenges")
    .select("*")
    .eq("type", "js")
    .in("difficulty", ["easy", "medium"]);
  const list = (data ?? []) as Challenge[];
  if (list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)] ?? null;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export interface DashboardData {
  trackProgress: TrackProgress[];
  recentActivity: ActivityFeedItem[];
  recommended: {
    flashcardTopic: Topic | null;
    dueCount: number;
    quizTopic: Topic | null;
    challenge: Challenge | null;
  };
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const supabase = getSupabaseAdmin();
  const today = todayISO();

  const [
    { data: topicsData },
    { data: flashcardsData },
    { data: fpData },
    { data: challengesData },
    { data: caData },
    { data: qaData },
  ] = await Promise.all([
    supabase.from("topics").select("*"),
    supabase.from("flashcards").select("id, topic_id"),
    supabase.from("flashcard_progress").select("*").eq("user_id", userId),
    supabase.from("challenges").select("*").order("order_index"),
    supabase
      .from("challenge_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("attempted_at", { ascending: false }),
    supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false }),
  ]);

  const topics = (topicsData ?? []) as Topic[];
  const topicById = new Map(topics.map((t) => [t.id, t]));
  const topicBySlug = new Map(topics.map((t) => [t.slug, t]));
  const flashcards = (flashcardsData ?? []) as { id: string; topic_id: string | null }[];
  const fp = (fpData ?? []) as FlashcardProgress[];
  const challenges = (challengesData ?? []) as Challenge[];
  const ca = (caData ?? []) as ChallengeAttempt[];
  const qa = (qaData ?? []) as {
    id: string;
    topic_id: string | null;
    score: number;
    total: number;
    completed_at: string;
  }[];

  // Progress rings.
  const masteredCardIds = new Set(
    fp.filter((p) => p.last_rating === "good" || p.last_rating === "easy").map((p) => p.flashcard_id),
  );
  const passedChallengeIds = new Set(
    ca.filter((a) => a.status === "passed").map((a) => a.challenge_id),
  );

  const trackProgress: TrackProgress[] = LEARNING_TRACKS.map((lt) => {
    const topicIds = new Set(
      lt.topicSlugs.map((s) => topicBySlug.get(s)?.id).filter((x): x is string => Boolean(x)),
    );
    const cardsInTrack = flashcards.filter((c) => c.topic_id && topicIds.has(c.topic_id));
    const challengesInTrack = challenges.filter((c) => c.topic_id && topicIds.has(c.topic_id));
    const total = cardsInTrack.length + challengesInTrack.length;
    const completed =
      cardsInTrack.filter((c) => masteredCardIds.has(c.id)).length +
      challengesInTrack.filter((c) => passedChallengeIds.has(c.id)).length;
    return {
      track: lt.id,
      label: lt.label,
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  });

  // Recent activity feed (merge + sort + top 5).
  const feed: ActivityFeedItem[] = [];
  const challengeById = new Map(challenges.map((c) => [c.id, c]));
  for (const a of ca.slice(0, 8)) {
    const ch = challengeById.get(a.challenge_id);
    feed.push({
      id: `ca-${a.id}`,
      kind: "challenge",
      title: ch?.title ?? "Coding challenge",
      detail: a.status === "passed" ? "All tests passed" : "Tests run",
      passed: a.status === "passed",
      at: a.attempted_at,
    });
  }
  for (const a of qa.slice(0, 8)) {
    const t = a.topic_id ? topicById.get(a.topic_id) : null;
    feed.push({
      id: `qa-${a.id}`,
      kind: "quiz",
      title: `${t?.name ?? "Mixed"} quiz`,
      detail: `Scored ${a.score}/${a.total}`,
      passed: a.total > 0 ? a.score / a.total >= 0.6 : null,
      at: a.completed_at,
    });
  }
  feed.sort((a, b) => b.at.localeCompare(a.at));

  // Recommendations.
  const dueCount = fp.filter((p) => isDue(p.next_review_date, today)).length;
  const neverSeen = flashcards.length - fp.length;
  const flashcardTopic =
    topics.find((t) => flashcards.some((c) => c.topic_id === t.id)) ?? null;

  // Weakest quiz topic, else first quiz topic.
  const quizTopic = pickQuizFocus(qa, topicById) ?? topics[0] ?? null;

  // First not-passed challenge, easiest first.
  const order: Record<string, number> = { easy: 0, medium: 1, hard: 2 };
  const recommendedChallenge =
    [...challenges]
      .filter((c) => !passedChallengeIds.has(c.id))
      .sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1))[0] ??
    challenges[0] ??
    null;

  return {
    trackProgress,
    recentActivity: feed.slice(0, 5),
    recommended: {
      flashcardTopic,
      dueCount: dueCount > 0 ? dueCount : neverSeen,
      quizTopic,
      challenge: recommendedChallenge,
    },
  };
}

function pickQuizFocus(
  attempts: { topic_id: string | null; score: number; total: number }[],
  topicById: Map<string, Topic>,
): Topic | null {
  const acc = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    if (!a.topic_id) continue;
    const cur = acc.get(a.topic_id) ?? { correct: 0, total: 0 };
    cur.correct += a.score;
    cur.total += a.total;
    acc.set(a.topic_id, cur);
  }
  let worst: { id: string; ratio: number } | null = null;
  for (const [id, v] of acc) {
    const ratio = v.total > 0 ? v.correct / v.total : 1;
    if (!worst || ratio < worst.ratio) worst = { id, ratio };
  }
  return worst ? topicById.get(worst.id) ?? null : null;
}

// ── Progress page ─────────────────────────────────────────────────────────────

export interface ProgressData {
  level: ReturnType<typeof getLevelInfo>;
  stats: {
    totalXp: number;
    streak: number;
    challengesCompleted: number;
    quizAccuracy: number; // 0..100
    flashcardsReviewed: number;
  };
  heatmap: HeatmapDay[];
  mastery: TopicMastery[];
  weakAreas: WeakArea[];
}

export async function getProgressData(
  userId: string,
  xp: number,
  streak: number,
): Promise<ProgressData> {
  const supabase = getSupabaseAdmin();
  const today = todayISO();

  const [
    { data: topicsData },
    { data: flashcardsData },
    { data: fpData },
    { data: challengesData },
    { data: caData },
    { data: qaData },
    { data: alData },
  ] = await Promise.all([
    supabase.from("topics").select("*"),
    supabase.from("flashcards").select("id, topic_id"),
    supabase.from("flashcard_progress").select("*").eq("user_id", userId),
    supabase.from("challenges").select("id, topic_id"),
    supabase.from("challenge_attempts").select("*").eq("user_id", userId),
    supabase.from("quiz_attempts").select("*").eq("user_id", userId),
    supabase.from("activity_log").select("*").eq("user_id", userId),
  ]);

  const topics = (topicsData ?? []) as Topic[];
  const flashcards = (flashcardsData ?? []) as { id: string; topic_id: string | null }[];
  const fp = (fpData ?? []) as FlashcardProgress[];
  const challenges = (challengesData ?? []) as { id: string; topic_id: string | null }[];
  const ca = (caData ?? []) as ChallengeAttempt[];
  const qa = (qaData ?? []) as { topic_id: string | null; score: number; total: number }[];
  const al = (alData ?? []) as { activity_date: string; xp_earned: number }[];

  // Stats.
  const passedChallengeIds = new Set(
    ca.filter((a) => a.status === "passed").map((a) => a.challenge_id),
  );
  const quizTotals = qa.reduce(
    (acc, a) => ({ correct: acc.correct + a.score, total: acc.total + a.total }),
    { correct: 0, total: 0 },
  );

  // Heatmap (last 90 days).
  const xpByDay = new Map(al.map((r) => [r.activity_date, r.xp_earned]));
  const heatmap: HeatmapDay[] = [];
  for (let i = 89; i >= 0; i--) {
    const date = addDays(today, -i);
    const dayXp = xpByDay.get(date) ?? 0;
    heatmap.push({ date, xp: dayXp, level: intensity(dayXp) });
  }

  // Per-topic mastery.
  const fpByCard = new Map(fp.map((p) => [p.flashcard_id, p]));
  const quizByTopic = new Map<string, { correct: number; total: number }>();
  for (const a of qa) {
    if (!a.topic_id) continue;
    const cur = quizByTopic.get(a.topic_id) ?? { correct: 0, total: 0 };
    cur.correct += a.score;
    cur.total += a.total;
    quizByTopic.set(a.topic_id, cur);
  }
  const passedByTopicChallenges = new Map<string, { passed: number; total: number }>();
  for (const c of challenges) {
    if (!c.topic_id) continue;
    const cur = passedByTopicChallenges.get(c.topic_id) ?? { passed: 0, total: 0 };
    cur.total += 1;
    if (passedChallengeIds.has(c.id)) cur.passed += 1;
    passedByTopicChallenges.set(c.topic_id, cur);
  }

  const mastery: TopicMastery[] = topics
    .map((topic) => {
      const cards = flashcards.filter((c) => c.topic_id === topic.id);
      const seen = cards.map((c) => fpByCard.get(c.id)).filter(Boolean) as FlashcardProgress[];
      const good = seen.filter((p) => p.last_rating === "good" || p.last_rating === "easy").length;
      const flashcardScore = cards.length === 0 ? 0 : Math.round((good / cards.length) * 100);

      const quiz = quizByTopic.get(topic.id);
      const quizScore = quiz && quiz.total > 0 ? Math.round((quiz.correct / quiz.total) * 100) : 0;

      const chall = passedByTopicChallenges.get(topic.id);
      const challengeScore = chall && chall.total > 0 ? Math.round((chall.passed / chall.total) * 100) : 0;

      // Overall = average of the dimensions that have content.
      const dims: number[] = [];
      if (cards.length) dims.push(flashcardScore);
      if (quiz && quiz.total) dims.push(quizScore);
      if (chall && chall.total) dims.push(challengeScore);
      const overall = dims.length ? Math.round(dims.reduce((a, b) => a + b, 0) / dims.length) : 0;

      return {
        topicId: topic.id,
        topicName: topic.name,
        track: topic.track,
        flashcardScore,
        quizScore,
        challengeScore,
        overall,
      };
    })
    .sort((a, b) => b.overall - a.overall);

  // Weak areas — topics with some activity but low mastery.
  const weakAreas: WeakArea[] = mastery
    .filter((m) => hasActivity(m, quizByTopic, fp, flashcards) && m.overall < 60)
    .slice(0, 5)
    .map((m) => ({
      topicId: m.topicId,
      topicName: m.topicName,
      reason:
        m.quizScore > 0 && m.quizScore < 60
          ? `Quiz accuracy ${m.quizScore}% — review the fundamentals`
          : `Only ${m.overall}% mastered — keep drilling`,
      score: m.overall,
    }));

  return {
    level: getLevelInfo(xp),
    stats: {
      totalXp: xp,
      streak,
      challengesCompleted: passedChallengeIds.size,
      quizAccuracy:
        quizTotals.total > 0 ? Math.round((quizTotals.correct / quizTotals.total) * 100) : 0,
      flashcardsReviewed: fp.length,
    },
    heatmap,
    mastery,
    weakAreas,
  };
}

function hasActivity(
  m: TopicMastery,
  quizByTopic: Map<string, { correct: number; total: number }>,
  fp: FlashcardProgress[],
  flashcards: { id: string; topic_id: string | null }[],
): boolean {
  if ((quizByTopic.get(m.topicId)?.total ?? 0) > 0) return true;
  const cardIds = new Set(flashcards.filter((c) => c.topic_id === m.topicId).map((c) => c.id));
  return fp.some((p) => cardIds.has(p.flashcard_id));
}

function intensity(xp: number): HeatmapDay["level"] {
  if (xp <= 0) return 0;
  if (xp < 15) return 1;
  if (xp < 40) return 2;
  if (xp < 80) return 3;
  return 4;
}

export async function getActivityFeed(userId?: string): Promise<ActivityFeedItem[]> {
  const supabase = getSupabaseAdmin();
  if (!userId) {
    const user = await getSessionUser();
    if (!user) return [];
    userId = user.id;
  }

  const [{ data: topicsData }, { data: challengesData }, { data: caData }, { data: qaData }] =
    await Promise.all([
      supabase.from("topics").select("*"),
      supabase.from("challenges").select("*"),
      supabase
        .from("challenge_attempts")
        .select("*")
        .eq("user_id", userId)
        .order("attempted_at", { ascending: false })
        .limit(20),
      supabase
        .from("quiz_attempts")
        .select("*")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false })
        .limit(20),
    ]);

  const topics = (topicsData ?? []) as Topic[];
  const topicById = new Map(topics.map((t) => [t.id, t]));
  const challenges = (challengesData ?? []) as Challenge[];
  const challengeById = new Map(challenges.map((c) => [c.id, c]));
  const ca = (caData ?? []) as ChallengeAttempt[];
  const qa = (qaData ?? []) as {
    id: string;
    topic_id: string | null;
    score: number;
    total: number;
    completed_at: string;
  }[];

  const feed: ActivityFeedItem[] = [];

  for (const a of ca) {
    const ch = challengeById.get(a.challenge_id);
    feed.push({
      id: `ca-${a.id}`,
      kind: "challenge",
      title: ch?.title ?? "Coding challenge",
      detail: a.status === "passed" ? "All tests passed" : "Tests run",
      passed: a.status === "passed",
      at: a.attempted_at,
    });
  }

  for (const a of qa) {
    const t = a.topic_id ? topicById.get(a.topic_id) : null;
    feed.push({
      id: `qa-${a.id}`,
      kind: "quiz",
      title: `${t?.name ?? "Mixed"} quiz`,
      detail: `Scored ${a.score}/${a.total}`,
      passed: a.total > 0 ? a.score / a.total >= 0.6 : null,
      at: a.completed_at,
    });
  }

  feed.sort((a, b) => b.at.localeCompare(a.at));
  return feed;
}

export { clamp };
