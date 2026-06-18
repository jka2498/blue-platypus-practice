// ─────────────────────────────────────────────────────────────────────────────
// Canonical topic list (single source of truth for both the seeder and the app)
// plus the four "learning tracks" surfaced as progress rings on the dashboard.
//
// `track` is the roadmap.sh bucket ('javascript' | 'react'); `learningTrack`
// groups topics into the dashboard rings. Interview Prep deliberately overlaps
// other tracks — it's a motivational cross-section, not an exclusive bucket.
// ─────────────────────────────────────────────────────────────────────────────

import type { Track } from "@/types";

export type LearningTrackId =
  | "js-fundamentals"
  | "react-core"
  | "react-advanced"
  | "interview-prep";

export interface TopicConfig {
  name: string;
  slug: string;
  track: Track;
  order_index: number;
  learningTrack: Exclude<LearningTrackId, "interview-prep">;
}

export const TOPICS: TopicConfig[] = [
  // JavaScript
  { name: "Variables & Scope", slug: "variables-scope", track: "javascript", order_index: 1, learningTrack: "js-fundamentals" },
  { name: "Closures", slug: "closures", track: "javascript", order_index: 2, learningTrack: "js-fundamentals" },
  { name: "Prototypes & Inheritance", slug: "prototypes", track: "javascript", order_index: 3, learningTrack: "js-fundamentals" },
  { name: "The this Keyword", slug: "this-keyword", track: "javascript", order_index: 4, learningTrack: "js-fundamentals" },
  { name: "Event Loop & Async", slug: "event-loop", track: "javascript", order_index: 5, learningTrack: "js-fundamentals" },
  { name: "Promises & async/await", slug: "promises-async", track: "javascript", order_index: 6, learningTrack: "js-fundamentals" },
  { name: "Array Methods", slug: "array-methods", track: "javascript", order_index: 7, learningTrack: "js-fundamentals" },
  { name: "Destructuring", slug: "destructuring", track: "javascript", order_index: 8, learningTrack: "js-fundamentals" },
  { name: "ES Modules", slug: "es-modules", track: "javascript", order_index: 9, learningTrack: "js-fundamentals" },
  { name: "Error Handling", slug: "error-handling", track: "javascript", order_index: 10, learningTrack: "js-fundamentals" },
  { name: "Data Structures Basics", slug: "data-structures-basics", track: "javascript", order_index: 26, learningTrack: "js-fundamentals" },
  { name: "Recursion Fundamentals", slug: "recursion-fundamentals", track: "javascript", order_index: 27, learningTrack: "js-fundamentals" },
  { name: "String Algorithms", slug: "string-algorithms", track: "javascript", order_index: 28, learningTrack: "js-fundamentals" },
  { name: "Object & Map Patterns", slug: "object-map-patterns", track: "javascript", order_index: 29, learningTrack: "js-fundamentals" },
  { name: "Big-O Basics", slug: "big-o-basics", track: "javascript", order_index: 30, learningTrack: "js-fundamentals" },

  // React
  { name: "JSX", slug: "jsx", track: "react", order_index: 11, learningTrack: "react-core" },
  { name: "Props & State", slug: "props-state", track: "react", order_index: 12, learningTrack: "react-core" },
  { name: "useState", slug: "usestate", track: "react", order_index: 13, learningTrack: "react-core" },
  { name: "useEffect", slug: "useeffect", track: "react", order_index: 14, learningTrack: "react-core" },
  { name: "useRef", slug: "useref", track: "react", order_index: 15, learningTrack: "react-core" },
  { name: "Component Lifecycle", slug: "component-lifecycle", track: "react", order_index: 16, learningTrack: "react-core" },
  { name: "React Router", slug: "react-router", track: "react", order_index: 17, learningTrack: "react-core" },
  { name: "Lifting State", slug: "lifting-state", track: "react", order_index: 18, learningTrack: "react-core" },
  { name: "Controlled vs Uncontrolled Inputs", slug: "controlled-inputs", track: "react", order_index: 19, learningTrack: "react-core" },
  { name: "Forms", slug: "forms", track: "react", order_index: 20, learningTrack: "react-core" },
  { name: "useContext", slug: "usecontext", track: "react", order_index: 21, learningTrack: "react-advanced" },
  { name: "useReducer", slug: "usereducer", track: "react", order_index: 22, learningTrack: "react-advanced" },
  { name: "Custom Hooks", slug: "custom-hooks", track: "react", order_index: 23, learningTrack: "react-advanced" },
  { name: "Memoisation", slug: "memoisation", track: "react", order_index: 24, learningTrack: "react-advanced" },
  { name: "Keys & Reconciliation", slug: "keys-reconciliation", track: "react", order_index: 25, learningTrack: "react-advanced" },
];

export interface LearningTrackConfig {
  id: LearningTrackId;
  label: string;
  /** Topic slugs counted toward this ring. */
  topicSlugs: string[];
}

const bySlug = (predicate: (t: TopicConfig) => boolean) =>
  TOPICS.filter(predicate).map((t) => t.slug);

export const LEARNING_TRACKS: LearningTrackConfig[] = [
  {
    id: "js-fundamentals",
    label: "JavaScript Fundamentals",
    topicSlugs: bySlug((t) => t.learningTrack === "js-fundamentals"),
  },
  {
    id: "react-core",
    label: "React Core",
    topicSlugs: bySlug((t) => t.learningTrack === "react-core"),
  },
  {
    id: "react-advanced",
    label: "React Advanced",
    topicSlugs: bySlug((t) => t.learningTrack === "react-advanced"),
  },
  {
    id: "interview-prep",
    label: "Frontend Interview Prep",
    // A curated cross-section of classic interview topics (JS + React).
    topicSlugs: [
      "closures",
      "this-keyword",
      "event-loop",
      "promises-async",
      "prototypes",
      "usestate",
      "useeffect",
      "custom-hooks",
      "memoisation",
      "keys-reconciliation",
    ],
  },
];
