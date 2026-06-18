import type { Difficulty, QuizQuestion } from "@/types";

export interface JsRoadmapPhase {
  id: "foundations" | "applied-core" | "interview-readiness";
  title: string;
  description: string;
  slugs: string[];
}

export const JS_ROADMAP_PHASES: JsRoadmapPhase[] = [
  {
    id: "foundations",
    title: "Phase 1 - Foundations",
    description: "Core syntax and language fundamentals. Start here.",
    slugs: [
      "variables-scope",
      "array-methods",
      "destructuring",
      "error-handling",
    ],
  },
  {
    id: "applied-core",
    title: "Phase 2 - Applied Core",
    description: "Execution model and everyday async architecture.",
    slugs: [
      "this-keyword",
      "closures",
      "event-loop",
      "promises-async",
      "es-modules",
    ],
  },
  {
    id: "interview-readiness",
    title: "Phase 3 - Interview Readiness",
    description: "Data structures, algorithmic thinking, and deeper reasoning.",
    slugs: [
      "prototypes",
      "data-structures-basics",
      "object-map-patterns",
      "string-algorithms",
      "recursion-fundamentals",
      "big-o-basics",
    ],
  },
];

export function getRoadmapPhaseMeta(slug: string) {
  for (const [phaseIndex, phase] of JS_ROADMAP_PHASES.entries()) {
    const stepIndex = phase.slugs.indexOf(slug);
    if (stepIndex !== -1) {
      return {
        phaseId: phase.id,
        phaseTitle: phase.title,
        phaseDescription: phase.description,
        phaseOrder: phaseIndex,
        stepInPhase: stepIndex,
        sequenceOrder: phaseIndex * 100 + stepIndex,
      };
    }
  }

  return {
    phaseId: "interview-readiness" as const,
    phaseTitle: "Phase 3 - Interview Readiness",
    phaseDescription: "Data structures, algorithmic thinking, and deeper reasoning.",
    phaseOrder: JS_ROADMAP_PHASES.length,
    stepInPhase: 999,
    sequenceOrder: 9999,
  };
}

export interface RoadmapPracticeChallenge {
  id: string;
  title: string;
  prompt: string;
  difficulty: Difficulty;
  source: "database" | "generated";
  slug?: string;
}

export const JS_TOPIC_SUMMARIES: Record<string, string> = {
  "variables-scope":
    "Understand how JavaScript stores bindings across global, function, and block scope. Focus on `var` vs `let`/`const`, the temporal dead zone, and how lexical scope controls variable visibility.",
  closures:
    "Closures let functions retain access to outer variables even after the outer function returns. This powers private state, factories, and many async callback patterns.",
  prototypes:
    "JavaScript objects inherit behavior through the prototype chain. Learn property lookup order, constructor/prototype relationships, and why classes are syntax over prototype inheritance.",
  "this-keyword":
    "`this` is determined by call-site rules (or lexical capture in arrows). Master method calls, detached functions, explicit binding, and common pitfalls in callbacks.",
  "event-loop":
    "The event loop schedules sync work, microtasks, and macrotasks. Knowing this order is essential for promises, timers, and reasoning about perceived async timing.",
  "promises-async":
    "Promises model eventual values and async failures. Build fluency with chaining, `async/await`, error propagation, and utility combinators like `all`, `allSettled`, and `race`.",
  "array-methods":
    "Array methods enable expressive transformations: map/filter/reduce/find/some/every/sort. Pick the right method for intent and understand mutation vs immutable operations.",
  destructuring:
    "Destructuring extracts values from arrays/objects with concise syntax, defaults, renaming, and rest patterns. It improves readability and safer data handling.",
  "es-modules":
    "ES Modules provide file-level encapsulation with named/default exports and static imports. Learn live bindings, tree-shaking implications, and clean module boundaries.",
  "error-handling":
    "Handle failures intentionally with `try/catch/finally`, custom errors, and async rejection handling. Robust code makes error states explicit and recoverable.",
  "data-structures-basics":
    "Choose the right structure for the job: arrays for order, sets for uniqueness, maps/objects for keyed lookup, and stack/queue patterns for flow control.",
  "recursion-fundamentals":
    "Recursion solves problems by reducing them into smaller instances plus a base case. Understand stack behavior, termination, and when iterative alternatives are safer.",
  "string-algorithms":
    "String problems often use normalization, two-pointers, frequency counting, and sliding windows. These patterns turn brute-force checks into linear-time solutions.",
  "object-map-patterns":
    "Map/object accumulators are core interview tools for counting, grouping, caching, and fast lookups. Master update patterns and key-selection tradeoffs.",
  "big-o-basics":
    "Big-O estimates how runtime and memory scale with input size. Practice identifying dominant operations and choosing implementations that scale predictably.",
};

export const JS_TOPIC_LESSONS: Record<string, string> = {
  "variables-scope": `JavaScript variables are bindings between a name and a value. The important part is not just declaration syntax, but **where a binding lives** and **when it can be accessed**.

### Core ideas
- Use \`let\` for reassignable bindings and \`const\` for bindings that should not be reassigned.
- \`var\` is function-scoped (not block-scoped), which can leak values out of loops/blocks.
- A block scope is created by \`{ }\` (for \`if\`, \`for\`, and standalone blocks).

### Temporal Dead Zone (TDZ)
\`let\` and \`const\` exist from the start of their scope, but cannot be read before declaration.

### Practical rules
- Default to \`const\`; move to \`let\` only when reassignment is intentional.
- Keep variables close to where they are used.
- Prefer smaller scopes so accidental mutation is easier to spot.

### Common pitfalls
- Re-declaring a \`let\` in the same scope.
- Assuming \`const\` makes nested object properties immutable.
- Mixing \`var\` with modern code and expecting block behavior.`,

  closures: `A closure is a function that remembers variables from the scope where it was created, even after that outer scope has finished executing.

### Why this matters
- Closures power private state without classes.
- They are the foundation of callbacks, event handlers, and function factories.
- They explain why async handlers can still access earlier values.

### Mental model
Think of each function as carrying a tiny backpack of references to outer bindings.

### Useful patterns
- Factory functions that generate customized behavior.
- Encapsulation of counters/cache/state.
- Partial application and configuration wrappers.

### Common mistakes
- Capturing a changing loop variable unexpectedly.
- Keeping large closed-over objects alive longer than needed.
- Treating closure state as global when it is per-instance.`,

  prototypes: `JavaScript inheritance is prototype-based: objects delegate property lookups to another object via the prototype chain.

### Core lookup rule
When you access \`obj.key\`, JavaScript checks:
1. the object itself
2. its prototype
3. parent prototypes up the chain

### What classes do
\`class\` and \`extends\` are syntax on top of prototype delegation. Methods still live on prototypes.

### Good practice
- Put shared behavior on prototypes (or class methods), not inside each instance.
- Know the difference between instance properties and prototype methods.
- Avoid mutating built-in prototypes in app code.

### Common pitfalls
- Forgetting that methods can be shadowed by instance properties.
- Confusing \`__proto__\` inspection with production logic.
- Overusing inheritance where composition is clearer.`,

  "this-keyword": `\`this\` is not where a function is defined. It is usually determined by **how the function is called**.

### Call-site rules
- \`obj.method()\` -> \`this\` is \`obj\`.
- Plain function call -> \`this\` is \`undefined\` in strict mode.
- \`call/apply/bind\` explicitly set \`this\`.
- Arrow functions do not have their own \`this\`; they capture from outer scope.

### Practical strategy
- Use normal methods on objects/classes.
- Use arrows for callbacks when you want lexical \`this\`.
- Use \`bind\` when passing methods as standalone callbacks.

### Common pitfalls
- Passing \`obj.method\` directly and losing context.
- Using arrow functions as object methods when dynamic \`this\` is needed.
- Mixing patterns in the same module and making behavior unpredictable.`,

  "event-loop": `JavaScript runs on a single main thread for JS execution. The event loop coordinates when queued work gets a chance to run.

### Queue priority (high-level)
1. Current synchronous call stack finishes.
2. Microtasks run (for example, promise callbacks).
3. Macrotasks run (for example, \`setTimeout\`, I/O callbacks).

### Why this matters
- It explains why \`Promise.resolve().then(...)\` often runs before \`setTimeout(..., 0)\`.
- It helps avoid UI jank by splitting heavy work.
- It improves debugging of "out-of-order" logs.

### Practical tips
- Keep sync blocks short.
- Use batching/debouncing for rapid event streams.
- Be careful with recursive microtask scheduling that can starve rendering.`,

  "promises-async": `Promises represent eventual success or failure of async operations. \`async/await\` is syntax that makes promise code read more linearly.

### Essentials
- A promise has pending, fulfilled, or rejected state.
- \`await\` unwraps fulfilled values or throws rejected reasons.
- \`try/catch\` around \`await\` handles async failures.

### Composition tools
- \`Promise.all\`: fail-fast, all-or-nothing.
- \`Promise.allSettled\`: gather all outcomes.
- \`Promise.race\`: first settled wins.

### Good practice
- Return promises from async helpers consistently.
- Attach context to errors before rethrowing.
- Avoid sequential awaits when tasks can run in parallel.

### Common pitfalls
- Forgetting \`await\` and accidentally working with a promise object.
- Swallowing errors in broad \`catch\` blocks.
- Over-chaining then/catch while also using async/await.`,

  "array-methods": `Array methods let you express intent clearly: transform, filter, aggregate, search, and check conditions.

### Core method families
- Transform: \`map\`
- Filter/select: \`filter\`
- Aggregate: \`reduce\`
- Query: \`find\`, \`some\`, \`every\`
- Ordering: \`sort\` (mutates)

### Mutation awareness
- \`map\`, \`filter\`, \`slice\` return new arrays.
- \`push\`, \`splice\`, \`sort\`, \`reverse\` mutate in place.

### Practical habits
- Pick the method that matches your intention.
- Keep callbacks pure when possible.
- Prefer readability over clever chaining.

### Common pitfalls
- Using \`map\` when not using the returned array.
- Forgetting \`sort\` compares strings by default.
- Writing complex \`reduce\` logic where a loop is clearer.`,

  destructuring: `Destructuring pulls values out of arrays/objects into local bindings with concise syntax.

### Common forms
- Object: \`const { id, name } = user\`
- Array: \`const [first, second] = list\`
- Rename/default: \`const { role: userRole = "guest" } = user\`
- Rest capture: \`const { a, ...rest } = obj\`

### Why it helps
- Reduces repetitive property access.
- Makes function parameter expectations explicit.
- Encourages immutable-style updates with rest/spread.

### Cautions
- Destructuring \`undefined\`/\`null\` throws.
- Deep destructuring can hurt readability.
- Renaming too aggressively can hide original data shape.`,

  "es-modules": `ES Modules (ESM) provide standardized file-level encapsulation and dependency management.

### Core concepts
- \`export\` exposes values from a module.
- \`import\` consumes exports from another module.
- Imports are statically analyzable, enabling tree-shaking and better tooling.

### Named vs default
- Named exports are explicit and refactor-friendly.
- Default exports can be ergonomic for single primary values.

### Practical guidelines
- Prefer named exports for shared libraries.
- Keep module boundaries cohesive (single responsibility).
- Avoid circular dependencies where possible.

### Common pitfalls
- Mixing CommonJS and ESM assumptions.
- Relying on import execution order side effects.
- Over-centralizing everything in barrel files that hide coupling.`,

  "error-handling": `Error handling is about making failure states explicit, predictable, and diagnosable.

### Synchronous handling
- Use \`try/catch/finally\` around code that can throw.
- Throw specific error types/messages with context.

### Asynchronous handling
- Wrap awaited operations in \`try/catch\` when recovery is possible.
- For background tasks, ensure rejected promises are observed/logged.

### Design principles
- Fail fast on programmer errors.
- Return recoverable states where domain-appropriate.
- Add enough context so logs are actionable.

### Common pitfalls
- Empty \`catch\` blocks.
- Catching broadly and masking root causes.
- Throwing non-Error values that lose stack/context.`,

  "data-structures-basics": `Choosing the right data structure often matters more than micro-optimizing syntax.

### Quick selection guide
- Array: ordered data and indexed access.
- Object/Map: keyed lookup.
- Set: uniqueness checks.
- Stack/Queue patterns: controlled processing order.

### Map vs Object
- \`Map\` supports any key type and predictable iteration APIs.
- Objects are lightweight and ideal for plain records.

### Performance intuition
- Membership tests on \`Set\`/\`Map\` are typically faster than scanning arrays repeatedly.
- Data shape should match access pattern.

### Common pitfalls
- Using arrays for heavy lookup workloads.
- Converting structures repeatedly inside hot paths.
- Ignoring memory tradeoffs for cached structures.`,

  "recursion-fundamentals": `Recursion solves a problem by defining it in terms of smaller versions of itself.

### Three required parts
1. Base case (stopping condition)
2. Recursive step (smaller subproblem)
3. Progress toward base case

### When recursion is a good fit
- Tree/graph traversal
- Divide-and-conquer algorithms
- Nested data processing

### Practical cautions
- Deep recursion can overflow the call stack.
- Ensure each call reduces problem size.
- Memoization can remove repeated work in overlapping subproblems.

### Common pitfalls
- Missing/incorrect base case.
- Accidental exponential blowups.
- Hard-to-follow recursive state transitions without tracing.`,

  "string-algorithms": `String problems are often solved with a few repeatable patterns rather than complex theory.

### High-value patterns
- Two pointers for boundary movement/comparison.
- Frequency maps for anagrams/count checks.
- Sliding windows for substring constraints.
- Normalize case/whitespace when matching rules require it.

### Practical habits
- Clarify whether operations should be Unicode-aware.
- Track indices carefully in inclusive/exclusive ranges.
- Write edge tests for empty, repeated, and single-char inputs.

### Common pitfalls
- Rebuilding strings excessively inside loops.
- Off-by-one errors in window boundaries.
- Assuming ASCII-only behavior in real-world inputs.`,

  "object-map-patterns": `Object/Map accumulators are core tools for counting, grouping, indexing, and memoization.

### Canonical use cases
- Frequency counting: value -> count
- Grouping: key -> list of items
- Indexing: id -> entity
- Caching: input signature -> computed output

### Object vs Map choice
- Use objects for simple string-keyed dictionaries.
- Use \`Map\` for arbitrary keys, heavy updates, or clearer iteration semantics.

### Good practice
- Centralize key-generation logic.
- Initialize safely before increment/push.
- Keep accumulator updates small and explicit.

### Common pitfalls
- Key collisions from weak stringification.
- Forgetting to handle missing keys.
- Mutating shared accumulator references unexpectedly.`,

  "big-o-basics": `Big-O is a high-level model of how runtime or memory grows as input size grows.

### Practical interpretation
- O(1): constant work per operation
- O(n): scales linearly with input size
- O(n log n): common in efficient sorting/divide-and-conquer
- O(n^2): nested-loop growth

### How to estimate quickly
- Count dominant loops and repeated operations.
- Ignore constants and lower-order terms in asymptotic reasoning.
- Focus on worst-case for safety, average-case when behavior is known.

### Why developers care
- Better algorithm choices under scale.
- Better tradeoff decisions between time and memory.
- Cleaner performance discussions in reviews/interviews.

### Common pitfalls
- Treating Big-O as exact runtime.
- Ignoring data distribution and constants entirely.
- Optimizing prematurely without measuring bottlenecks.`,
};

const FALLBACK_MCQ_OPTIONS: [string, string, string, string] = [
  "Because it improves readability and correctness in common scenarios.",
  "Because JavaScript engines require it for all code.",
  "Because it only matters in Node.js, not browsers.",
  "Because it avoids needing tests.",
];

export function getTopicSummary(slug: string, topicName: string): string {
  return (
    JS_TOPIC_SUMMARIES[slug] ??
    `${topicName} focuses on practical JavaScript reasoning for interviews and production code. Learn the core mental model, common pitfalls, and apply it in short MCQs and coding exercises.`
  );
}

export function getTopicLesson(slug: string, topicName: string): string {
  return (
    JS_TOPIC_LESSONS[slug] ??
    `${topicName} is a core JavaScript topic.

### What to learn
- The mental model behind how it works.
- Common mistakes and edge cases.
- How to apply it in interview-style and production tasks.

### How to practice
- Predict outcomes before running code.
- Validate with tiny examples.
- Explain your reasoning in plain language.`
  );
}

export function generateFallbackMcqs(topicName: string): QuizQuestion[] {
  return [
    {
      id: `gen-mcq-1-${topicName}`,
      topic_id: null,
      question: `Which statement best describes why ${topicName} matters in day-to-day JavaScript work?`,
      options: FALLBACK_MCQ_OPTIONS,
      correct_index: 0,
      explanation:
        "This topic usually improves both code clarity and bug prevention, which has direct impact in real projects.",
    },
    {
      id: `gen-mcq-2-${topicName}`,
      topic_id: null,
      question: `When practicing ${topicName}, which approach helps most?`,
      options: [
        "Memorize syntax only",
        "Write tiny examples and explain outcomes",
        "Avoid edge cases",
        "Rely on framework defaults",
      ],
      correct_index: 1,
      explanation:
        "Small, targeted examples build transferable understanding much faster than memorization.",
    },
    {
      id: `gen-mcq-3-${topicName}`,
      topic_id: null,
      question: `A strong signal that you understand ${topicName} is:`,
      options: [
        "You can predict behavior before running code",
        "You never need debugging",
        "You avoid using the feature",
        "You only know one happy-path example",
      ],
      correct_index: 0,
      explanation:
        "Prediction and explanation of outcomes shows conceptual understanding.",
    },
  ];
}

const PRACTICE_TEMPLATES = [
  "Build a minimal utility that demonstrates the core idea of {topic} with clear input/output examples.",
  "Refactor a verbose snippet into a cleaner version using {topic} while keeping behavior identical.",
  "Write a bug-prone implementation and then fix it using proper {topic} reasoning.",
  "Implement a function with at least two edge-case tests that specifically exercise {topic} behavior.",
  "Create a tiny interview-style challenge that combines {topic} with another JS fundamental and solve it.",
];

export function generatePracticeChallenges(topicSlug: string, topicName: string): RoadmapPracticeChallenge[] {
  return PRACTICE_TEMPLATES.map((template, index) => ({
    id: `generated-${topicSlug}-${index + 1}`,
    title: `${topicName} Practice ${index + 1}`,
    prompt: template.replace("{topic}", topicName),
    difficulty: index < 2 ? "easy" : index < 4 ? "medium" : "hard",
    source: "generated",
  }));
}
