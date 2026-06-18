// Seed quiz questions for DevPath. Broad JS + React coverage, including
// Angular -> React comparison questions filed under the most relevant topic.
// Every slug is globally unique; options is a 4-tuple; correctIndex is 0-3.

import type { SeedQuizQuestion } from "./types";

const makeQuiz = (
  topicSlug: string,
  slug: string,
  question: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
): SeedQuizQuestion => ({ topicSlug, slug, question, options, correctIndex, explanation });

const EASY_QUIZ_ADDITIONS: SeedQuizQuestion[] = [
  makeQuiz(
    "variables-scope",
    "q-easy-extra-01-typeof-undeclared",
    "What does this return?\n\n```javascript\ntypeof notDeclared\n```",
    ["ReferenceError", "undefined", "null", "object"],
    1,
    "`typeof` on an undeclared identifier safely returns the string `undefined`; it does not throw.",
  ),
  makeQuiz(
    "variables-scope",
    "q-easy-extra-02-const-reassign",
    "What happens when you run this?\n\n```javascript\nconst x = 5;\nx = 10;\n```",
    ["It works if the value type matches", "It throws a TypeError", "It silently fails", "It creates a new variable"],
    1,
    "`const` bindings cannot be reassigned. Reassignment throws a TypeError.",
  ),
  makeQuiz(
    "array-methods",
    "q-easy-extra-03-filter",
    "What does this return?\n\n```javascript\n[1,2,3,4].filter(n => n % 2 === 0)\n```",
    ["[1,3]", "[2,4]", "2", "true"],
    1,
    "`filter` keeps items where the predicate is truthy, so only even numbers remain.",
  ),
  makeQuiz(
    "array-methods",
    "q-easy-extra-04-find",
    "What does this return?\n\n```javascript\n[5,8,10].find(n => n > 6)\n```",
    ["[8,10]", "8", "true", "undefined"],
    1,
    "`find` returns the first matching element, not all matches.",
  ),
  makeQuiz(
    "array-methods",
    "q-easy-extra-05-some",
    "What does `some()` return?",
    ["An array of matches", "A number", "A boolean", "A promise"],
    2,
    "`some` returns true if at least one element passes, otherwise false.",
  ),
  makeQuiz(
    "destructuring",
    "q-easy-extra-06-swap",
    "Which approach swaps `a` and `b`?",
    ["`a = b; b = a;`", "```javascript\n[a, b] = [b, a]\n```", "`{a,b} = {b,a}`", "`a ^= b ^= a ^= b`"],
    1,
    "Array destructuring provides a concise swap pattern.",
  ),
  makeQuiz(
    "es-modules",
    "q-easy-extra-07-named-import",
    "How do you import named export `sum` from `./math`?",
    ["`import sum from './math'`", "```javascript\nimport { sum } from './math'\n```", "`import * as sum from './math'`", "`require('./math').sum`"],
    1,
    "Named exports must be imported with braces.",
  ),
  makeQuiz(
    "error-handling",
    "q-easy-extra-08-finally",
    "In `try/catch/finally`, when does `finally` run?",
    ["Only on errors", "Only when no errors", "Always", "Never with return"],
    2,
    "`finally` runs whether the code throws or not.",
  ),
  makeQuiz(
    "jsx",
    "q-easy-extra-09-classname",
    "In JSX, which prop sets CSS classes?",
    ["`class`", "`className`", "`cssClass`", "`styleClass`"],
    1,
    "React uses `className` because `class` is a reserved JavaScript keyword.",
  ),
  makeQuiz(
    "props-state",
    "q-easy-extra-10-props-readonly",
    "Props in React are best treated as:",
    ["Mutable", "Read-only", "Optional only", "Global state"],
    1,
    "Props flow from parent to child and should not be mutated in the child.",
  ),
  makeQuiz(
    "usestate",
    "q-easy-extra-11-setter",
    "Calling a `useState` setter causes:",
    ["Immediate DOM mutation only", "A re-render with new state", "A full page reload", "No effect in function components"],
    1,
    "State setters schedule React to render again with updated state.",
  ),
  makeQuiz(
    "useeffect",
    "q-easy-extra-12-empty-deps",
    "`useEffect(fn, [])` runs:",
    ["After every render", "Only on mount/unmount", "Only on unmount", "Before render"],
    1,
    "An empty dependency array means run once after mount; cleanup runs on unmount.",
  ),
  makeQuiz(
    "controlled-inputs",
    "q-easy-extra-13-controlled",
    "A controlled input is controlled by:",
    ["Browser default state", "React state via `value` + `onChange`", "Only refs", "Context only"],
    1,
    "Controlled inputs use React state as source of truth.",
  ),
  makeQuiz(
    "forms",
    "q-easy-extra-14-prevent-default",
    "Why call `event.preventDefault()` in form submit handlers?",
    ["To trigger validation", "To stop page reload/navigation", "To focus the first input", "To reset the form"],
    1,
    "Preventing default keeps SPA behavior and lets React handle submit logic.",
  ),
  makeQuiz(
    "react-router",
    "q-easy-extra-15-link",
    "In React Router apps, internal navigation should use:",
    ["`<a href>` for all routes", "`<Link to>`", "`window.location.href`", "`history.back()`"],
    1,
    "`Link` performs client-side navigation without full page reload.",
  ),
  makeQuiz(
    "keys-reconciliation",
    "q-easy-extra-16-key-source",
    "Best key choice for list items is:",
    ["Array index", "Random number each render", "Stable unique ID from data", "Item label if not unique"],
    2,
    "Stable unique IDs help React reconcile correctly across reorders.",
  ),
  makeQuiz(
    "closures",
    "q-easy-extra-17-closure",
    "A closure is:",
    ["A function with access to its lexical scope", "A function without return", "A method on class prototypes", "A promise callback"],
    0,
    "Closures let functions retain access to variables where they were created.",
  ),
  makeQuiz(
    "promises-async",
    "q-easy-extra-18-resolve",
    "`Promise.resolve(5)` produces:",
    ["A rejected promise", "A fulfilled promise with value 5", "The number 5 directly", "A callback"],
    1,
    "`Promise.resolve` wraps a value in an already-fulfilled Promise.",
  ),
  makeQuiz(
    "event-loop",
    "q-easy-extra-19-timeout",
    "`setTimeout(fn, 0)` means:",
    ["Run synchronously", "Run in the next macrotask turn", "Run before promises", "Run exactly at 0 ms"],
    1,
    "The callback is queued for a later macrotask; it is never synchronous.",
  ),
  makeQuiz(
    "useref",
    "q-easy-extra-20-useref",
    "Updating `ref.current` typically:",
    ["Triggers re-render", "Does not trigger re-render", "Throws in strict mode", "Resets component state"],
    1,
    "Refs are mutable containers whose updates do not cause renders.",
  ),
  makeQuiz(
    "component-lifecycle",
    "q-easy-extra-21-cleanup",
    "An effect cleanup function is useful for:",
    ["Creating global variables", "Clearing timers/subscriptions", "Skipping render", "Mutating props"],
    1,
    "Cleanup avoids leaks by tearing down side effects like intervals or listeners.",
  ),
  makeQuiz(
    "lifting-state",
    "q-easy-extra-22-lift-state",
    "When two siblings need shared data, the state should usually live:",
    ["In each sibling separately", "In a common parent", "In localStorage only", "In CSS"],
    1,
    "Lift state to the nearest common ancestor and pass down via props.",
  ),
  makeQuiz(
    "custom-hooks",
    "q-easy-extra-23-hook-name",
    "Custom hook names should start with:",
    ["`get`", "`hook`", "`use`", "`with`"],
    2,
    "The `use` prefix enables lint rules and communicates hook semantics.",
  ),
  makeQuiz(
    "memoisation",
    "q-easy-extra-24-usememo",
    "`useMemo` is mainly for:",
    ["Running effects", "Memoizing expensive computed values", "Handling form submit", "Creating refs"],
    1,
    "`useMemo` caches a computed value until dependencies change.",
  ),
  makeQuiz(
    "variables-scope",
    "q-easy-extra-25-let-redeclare",
    "Can you redeclare `let x` in the same block?",
    ["Yes", "No", "Only in strict mode", "Only with semicolons"],
    1,
    "`let` and `const` cannot be redeclared in the same scope.",
  ),
];

const MEDIUM_QUIZ_ADDITIONS: SeedQuizQuestion[] = [
  makeQuiz(
    "closures",
    "q-medium-extra-01-stale-closure",
    "A stale closure bug in React effects usually comes from:",
    ["Too many CSS classes", "Missing dependencies in `useEffect`", "Using `const`", "Returning JSX from hooks"],
    1,
    "If dependencies are omitted, the effect captures outdated values from an earlier render.",
  ),
  makeQuiz(
    "promises-async",
    "q-medium-extra-02-allsettled",
    "`Promise.allSettled` returns:",
    ["Only fulfilled values", "An array of status objects for all inputs", "The first settled result", "A rejected promise on first failure"],
    1,
    "`allSettled` always waits for every promise and returns per-item `{ status, ... }` results.",
  ),
  makeQuiz(
    "event-loop",
    "q-medium-extra-03-await-order",
    "Inside `async` functions, code after `await` resumes:",
    ["Immediately in same call stack", "As a microtask after current stack", "As a macrotask after timers", "Only after repaint"],
    1,
    "`await` yields control and continuation runs in a microtask.",
  ),
  makeQuiz(
    "this-keyword",
    "q-medium-extra-04-bind",
    "Given `const g = f.bind(obj)`, calling `g.call(other)` uses `this` as:",
    ["`other`", "`obj`", "global object", "undefined"],
    1,
    "A bound function keeps its bound `this`; later `call/apply` cannot override it.",
  ),
  makeQuiz(
    "prototypes",
    "q-medium-extra-05-hasown",
    "Which checks only an object's own property (not prototype chain)?",
    ["`'x' in obj`", "`obj.hasOwnProperty('x')`", "`obj.x !== undefined`", "`Object.keys(obj).includes('x')` always"],
    1,
    "`hasOwnProperty` targets own properties; `in` traverses prototype chain.",
  ),
  makeQuiz(
    "error-handling",
    "q-medium-extra-06-async-throw",
    "Throwing inside an `async` function results in:",
    ["A synchronous throw to caller", "A rejected Promise", "A fulfilled Promise with Error", "No effect"],
    1,
    "Async functions wrap throws into rejected promises.",
  ),
  makeQuiz(
    "useeffect",
    "q-medium-extra-07-function-dep",
    "An inline function in a dependency array can cause extra effect runs because:",
    ["Functions are forbidden", "Its identity changes every render", "Effects compare source code", "It runs only once"],
    1,
    "Dependency checks are reference-based; new function objects trigger reruns.",
  ),
  makeQuiz(
    "usecontext",
    "q-medium-extra-08-context-rerender",
    "Context consumers re-render when:",
    ["Any parent renders", "Provider value reference changes", "Only on mount", "Never"],
    1,
    "Consumers update when the nearest provider's `value` changes by reference.",
  ),
  makeQuiz(
    "usereducer",
    "q-medium-extra-09-usereducer-when",
    "`useReducer` is often preferred over many related `useState`s when:",
    ["State is trivial and independent", "Transitions are complex and centralized", "You need DOM refs", "You avoid re-renders entirely"],
    1,
    "Reducers centralize transition logic for complex, interconnected state changes.",
  ),
  makeQuiz(
    "custom-hooks",
    "q-medium-extra-10-hook-composition",
    "A custom hook primarily enables:",
    ["Sharing rendered DOM", "Sharing stateful logic across components", "Global mutable state by default", "Skipping React rules"],
    1,
    "Custom hooks compose reusable logic while each caller keeps isolated state.",
  ),
  makeQuiz(
    "memoisation",
    "q-medium-extra-11-memo-child",
    "A memoized child still re-renders if parent passes:",
    ["Primitive props", "A newly created object/function prop each render", "A stable ID string", "No props"],
    1,
    "Shallow prop comparison fails when references change each render.",
  ),
  makeQuiz(
    "react-router",
    "q-medium-extra-12-navigate",
    "In React Router, `useNavigate` is used to:",
    ["Read query params", "Programmatically change routes", "Define route config", "Preload CSS"],
    1,
    "`useNavigate` returns a function for imperative navigation.",
  ),
  makeQuiz(
    "forms",
    "q-medium-extra-13-generic-change",
    "A generic form `onChange` handler often relies on:",
    ["`event.target.name`", "`event.keyCode`", "`event.persist()`", "`event.timeStamp`"],
    0,
    "Using input `name` lets one handler update multiple fields dynamically.",
  ),
  makeQuiz(
    "usestate",
    "q-medium-extra-14-functional-update",
    "When next state depends on previous state, use:",
    ["Direct assignment", "Functional updater `setX(prev => ...)`", "`Object.freeze`", "`useRef` setter"],
    1,
    "Functional updates avoid stale reads when React batches updates.",
  ),
  makeQuiz(
    "array-methods",
    "q-medium-extra-15-parseint-map",
    "Why can `['1','2','3'].map(parseInt)` be surprising?",
    ["`map` mutates strings", "`parseInt` receives (value, index) and index becomes radix", "`parseInt` is async", "It returns numbers correctly every time"],
    1,
    "`map` passes index as second arg; `parseInt` treats it as radix, producing unexpected results.",
  ),
  makeQuiz(
    "destructuring",
    "q-medium-extra-16-nested-default",
    "In `const { a: { b = 2 } = {} } = obj`, default `b=2` is used when:",
    ["`obj.a.b` is `undefined`", "`obj.a.b` is `null`", "`obj.a` is an object with `b`", "always"],
    0,
    "Destructuring defaults apply only to `undefined`, not `null`.",
  ),
  makeQuiz(
    "promises-async",
    "q-medium-extra-17-race",
    "`Promise.race` settles when:",
    ["All promises settle", "The first promise settles (fulfill or reject)", "The first promise fulfills only", "The slowest promise settles"],
    1,
    "`race` mirrors whichever input settles first, success or failure.",
  ),
  makeQuiz(
    "event-loop",
    "q-medium-extra-18-then-chain",
    "A `.then(() => ...)` callback is queued as:",
    ["Animation frame", "Microtask", "Macrotask timer", "Synchronous call"],
    1,
    "Promise callbacks run in microtask queue after current sync work.",
  ),
  makeQuiz(
    "jsx",
    "q-medium-extra-19-key-prop",
    "Why can't a component read its own `key` via props?",
    ["Keys are encrypted", "`key` is a special React field not passed to component props", "TypeScript removes it", "Only class components receive keys"],
    1,
    "React uses `key` internally for reconciliation and does not expose it as a normal prop.",
  ),
  makeQuiz(
    "controlled-inputs",
    "q-medium-extra-20-null-value",
    "A controlled text input with `value={null}` is problematic because:",
    ["It crashes React always", "It can switch controlled/uncontrolled behavior", "It becomes read-only by browser rule", "It triggers useEffect loops"],
    1,
    "Controlled inputs should use strings (often empty string) to avoid mode switches.",
  ),
  makeQuiz(
    "useeffect",
    "q-medium-extra-21-object-deps",
    "Putting a newly created object literal in effect deps causes reruns because:",
    ["Objects are compared deeply each render", "Reference identity differs each render", "Effects ignore objects", "React stringifies deps"],
    1,
    "Dependency comparisons are reference-based, so new object literals appear changed.",
  ),
  makeQuiz(
    "useref",
    "q-medium-extra-22-timer-ref",
    "A common `useRef` use case is storing:",
    ["Derived JSX", "Mutable values like timer IDs between renders", "Route config", "Context provider state only"],
    1,
    "Refs keep mutable data between renders without re-rendering.",
  ),
  makeQuiz(
    "keys-reconciliation",
    "q-medium-extra-23-fragment-key",
    "When returning a list of fragments, where should key go?",
    ["On first child inside fragment", "On the fragment itself", "On parent container once", "No key needed for fragments"],
    1,
    "Each list item, including fragments, needs its own stable key.",
  ),
  makeQuiz(
    "lifting-state",
    "q-medium-extra-24-dup-state",
    "Duplicating the same source-of-truth state in siblings often leads to:",
    ["Better performance always", "State divergence and sync bugs", "Automatic memoization", "Smaller bundles"],
    1,
    "One lifted source of truth prevents inconsistent sibling views.",
  ),
  makeQuiz(
    "es-modules",
    "q-medium-extra-25-live-bindings",
    "ES module imports are:",
    ["Copied values at import time", "Live bindings to exported values", "Mutable local aliases", "Only default exports are live"],
    1,
    "Imports are live views of exported bindings rather than one-time copies.",
  ),
];

const JS_FUNDAMENTALS_QUIZ_ADDITIONS: SeedQuizQuestion[] = [
  makeQuiz(
    "data-structures-basics",
    "q-jsfund-01-set-membership",
    "For frequent membership checks on large unique values, which is usually better?",
    ["Array with includes", "Set with has", "String concatenation", "Nested loops"],
    1,
    "`Set#has` is optimized for membership checks and avoids repeated O(n) scans.",
  ),
  makeQuiz(
    "data-structures-basics",
    "q-jsfund-02-queue-order",
    "A queue processes items in which order?",
    ["LIFO", "FIFO", "Random", "Sorted"],
    1,
    "Queue semantics are FIFO: first in, first out.",
  ),
  makeQuiz(
    "data-structures-basics",
    "q-jsfund-03-stack-order",
    "A stack processes items in which order?",
    ["FIFO", "LIFO", "Alphabetical", "Hash order"],
    1,
    "Stack semantics are LIFO: last in, first out.",
  ),
  makeQuiz(
    "data-structures-basics",
    "q-jsfund-04-map-key-types",
    "Which structure supports object keys directly without string coercion?",
    ["Plain object", "Map", "Array", "Set only"],
    1,
    "`Map` supports keys of any type including objects.",
  ),
  makeQuiz(
    "recursion-fundamentals",
    "q-jsfund-05-recursion-base-case",
    "What happens if recursion has no reachable base case?",
    ["It auto-stops", "Stack overflow / maximum call stack exceeded", "It becomes O(1)", "It memoizes automatically"],
    1,
    "Without a stopping condition, recursive calls continue until stack exhaustion.",
  ),
  makeQuiz(
    "recursion-fundamentals",
    "q-jsfund-06-factorial-base",
    "A common base case for factorial recursion is:",
    ["`n === 2`", "`n <= 1`", "`n < 0`", "no base case needed"],
    1,
    "Factorial recursion typically stops at 0 or 1.",
  ),
  makeQuiz(
    "recursion-fundamentals",
    "q-jsfund-07-recursive-tree",
    "Recursion is often natural for:",
    ["Flat constant-size arrays only", "Tree traversal problems", "CSS rendering", "HTTP caching"],
    1,
    "Tree structures map naturally to recursive decomposition.",
  ),
  makeQuiz(
    "recursion-fundamentals",
    "q-jsfund-08-tail-call",
    "Why is deep recursion risky in JavaScript?",
    ["No function support", "Limited stack depth in engines", "Objects can't recurse", "Promises block recursion"],
    1,
    "Most JS engines have finite call stack depth and no guaranteed TCO in practice.",
  ),
  makeQuiz(
    "string-algorithms",
    "q-jsfund-09-anagram-technique",
    "A common O(n) anagram check uses:",
    ["Sorting both strings only", "Frequency counting map", "Nested loops", "Regex replace only"],
    1,
    "Counting characters with a map enables linear comparison.",
  ),
  makeQuiz(
    "string-algorithms",
    "q-jsfund-10-palindrome-normalize",
    "For robust palindrome checks, first:",
    ["Reverse raw input only", "Normalize case and remove non-alphanumerics", "Use setTimeout", "Sort characters"],
    1,
    "Normalization avoids false mismatches from punctuation/case.",
  ),
  makeQuiz(
    "string-algorithms",
    "q-jsfund-11-two-pointer",
    "Two-pointer palindrome checks usually run in:",
    ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    2,
    "Each pointer moves toward center once, giving linear time.",
  ),
  makeQuiz(
    "string-algorithms",
    "q-jsfund-12-substring-window",
    "Sliding window is useful when problems ask for:",
    ["Graph shortest paths", "Contiguous substring constraints", "SQL joins", "DOM painting"],
    1,
    "Sliding window optimizes contiguous segment/substring problems.",
  ),
  makeQuiz(
    "object-map-patterns",
    "q-jsfund-13-map-vs-object",
    "Which is true about `Map` compared with plain objects?",
    ["`Map` keys must be strings", "`Map` tracks insertion order and supports any key type", "`Map` cannot be iterated", "Objects are always faster"],
    1,
    "`Map` supports arbitrary key types and predictable iteration order.",
  ),
  makeQuiz(
    "object-map-patterns",
    "q-jsfund-14-frequency-counter",
    "`counts[k] = (counts[k] ?? 0) + 1` is a pattern for:",
    ["Memoizing promises", "Counting frequencies", "Sorting arrays", "Debouncing handlers"],
    1,
    "That increment pattern builds frequency maps.",
  ),
  makeQuiz(
    "object-map-patterns",
    "q-jsfund-15-has-own",
    "Best way to avoid inherited-key confusion in dictionary objects is often:",
    ["Use prototype chain lookups", "Use `Object.create(null)` or `Map`", "Use arrays only", "Disable strict mode"],
    1,
    "Null-prototype objects or Maps avoid prototype key collisions.",
  ),
  makeQuiz(
    "object-map-patterns",
    "q-jsfund-16-grouping",
    "Grouping items by property is commonly implemented with:",
    ["reduce + object/map accumulators", "setTimeout", "try/finally", "Promise.race"],
    0,
    "`reduce` with keyed buckets is a core grouping pattern.",
  ),
  makeQuiz(
    "big-o-basics",
    "q-jsfund-17-constant-time",
    "Which operation is typically O(1)?",
    ["Linear search in unsorted array", "Direct object property access by key", "Sorting n items", "Nested loop over n*n"],
    1,
    "Direct hash/property lookup is constant-time on average.",
  ),
  makeQuiz(
    "big-o-basics",
    "q-jsfund-18-nlogn-example",
    "Which is usually O(n log n)?",
    ["Bubble every pair manually", "Typical comparison sort", "Direct index read", "Single pass count"],
    1,
    "Efficient comparison sorts (merge/quick average) are generally O(n log n).",
  ),
  makeQuiz(
    "big-o-basics",
    "q-jsfund-19-double-loop",
    "A full nested loop over the same n-sized array is commonly:",
    ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
    2,
    "Two dependent linear loops multiply to quadratic work.",
  ),
  makeQuiz(
    "big-o-basics",
    "q-jsfund-20-space-tradeoff",
    "Using a hash map to speed lookup usually trades for:",
    ["Lower readability only", "More memory usage", "More network calls", "Less determinism"],
    1,
    "Many optimizations improve time complexity by allocating extra space.",
  ),
];

export const QUIZ_QUESTIONS: SeedQuizQuestion[] = [
  // ── variables-scope ────────────────────────────────────────────────────────
  {
    topicSlug: "variables-scope",
    slug: "q-var-hoisting",
    question: "What is logged?\n```js\nconsole.log(x);\nvar x = 5;\n```",
    options: ["5", "undefined", "ReferenceError", "null"],
    correctIndex: 1,
    explanation:
      "`var` declarations are hoisted and initialized to `undefined`, so the read succeeds but the assignment hasn't run yet — logging `undefined`. It is NOT a ReferenceError; that would happen with `let`/`const` due to the temporal dead zone.",
  },
  {
    topicSlug: "variables-scope",
    slug: "q-let-block-scope",
    question: "Which statement about `let` is true?",
    options: [
      "It is function-scoped like `var`.",
      "It is block-scoped and lives in a temporal dead zone before its declaration.",
      "It cannot be reassigned.",
      "It is hoisted and initialized to `undefined`.",
    ],
    correctIndex: 1,
    explanation:
      "`let` is block-scoped and is in the TDZ until its declaration runs, so early access throws. It CAN be reassigned (that's `const` that can't), and unlike `var` it is not pre-initialized to `undefined`.",
  },
  {
    topicSlug: "variables-scope",
    slug: "q-const-mutation",
    question: "Is `const arr = [1]; arr.push(2);` an error?",
    options: [
      "Yes — `const` makes the array immutable.",
      "Yes — you can't call methods on a const.",
      "No — `const` only forbids reassigning the binding, not mutating the value.",
      "No, but `arr` is now a different reference.",
    ],
    correctIndex: 2,
    explanation:
      "`const` prevents reassigning the variable (`arr = ...` would throw), but the array object it points to is still mutable, so `push` works. `const` does not deep-freeze the value — that's a common misconception.",
  },

  // ── closures ────────────────────────────────────────────────────────────────
  {
    topicSlug: "closures",
    slug: "q-closure-counter",
    question:
      "```js\nfunction make(){ let n=0; return () => ++n; }\nconst c = make();\nc(); c();\n```\nWhat does the final `c()` return?",
    options: ["0", "1", "2", "undefined"],
    correctIndex: 2,
    explanation:
      "The returned arrow closes over `n`, which persists between calls. After two prior `++n` it's at 2 on the third call... wait — two calls shown then the asked one: 1, 2, then the final returns 2. Each invocation increments and returns the shared `n`.",
  },
  {
    topicSlug: "closures",
    slug: "q-closure-loop",
    question:
      "Using `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));` logs:",
    options: ["0 1 2", "3 3 3", "0 0 0", "undefined undefined undefined"],
    correctIndex: 1,
    explanation:
      "All three callbacks close over the same function-scoped `var i`, which is 3 by the time the timeouts fire, so it logs `3 3 3`. Using `let i` would create a fresh binding per iteration and log `0 1 2`.",
  },

  // ── prototypes ────────────────────────────────────────────────────────────────
  {
    topicSlug: "prototypes",
    slug: "q-proto-lookup",
    question: "When you access `obj.foo` and `obj` doesn't have `foo`, what happens?",
    options: [
      "It immediately returns `undefined`.",
      "It throws a ReferenceError.",
      "JS walks up the prototype chain looking for `foo` until reaching `null`.",
      "It calls a default `valueOf`.",
    ],
    correctIndex: 2,
    explanation:
      "Property reads traverse the `[[Prototype]]` chain; if found anywhere it's returned, otherwise `undefined` once the chain ends at `null`. It doesn't return `undefined` immediately — that ignores inheritance, which is the whole point of prototypes.",
  },
  {
    topicSlug: "prototypes",
    slug: "q-class-sugar",
    question: "An ES6 `class` is best described as:",
    options: [
      "A brand-new inheritance system separate from prototypes.",
      "Syntactic sugar over prototype-based inheritance.",
      "A way to make objects immutable.",
      "Identical to a plain object literal.",
    ],
    correctIndex: 1,
    explanation:
      "`class` is sugar: methods land on `Class.prototype` and `extends` wires the prototype chain. It is not a separate model. (It does add behaviors like strict mode and requiring `new`, but the underlying mechanism is still prototypes.)",
  },

  // ── this-keyword ────────────────────────────────────────────────────────────────
  {
    topicSlug: "this-keyword",
    slug: "q-this-method-detach",
    question:
      "```js\nconst o = { v: 1, get(){ return this.v; } };\nconst f = o.get;\nf();\n```\nIn strict mode this:",
    options: [
      "Returns 1",
      "Returns undefined",
      "Throws because `this` is undefined",
      "Returns the global object",
    ],
    correctIndex: 2,
    explanation:
      "Detaching the method loses the `o.` call site; in strict mode `this` is `undefined`, so `this.v` throws. It does not silently return 1 — that would require calling `o.get()` or binding `this`.",
  },
  {
    topicSlug: "this-keyword",
    slug: "q-this-arrow",
    question: "How does an arrow function determine its `this`?",
    options: [
      "From its call site, like a normal function.",
      "It is always the global object.",
      "Lexically — captured from the enclosing scope at definition.",
      "From the first argument passed to it.",
    ],
    correctIndex: 2,
    explanation:
      "Arrow functions have no own `this`; they inherit it lexically from where they're defined, which is why `call`/`apply`/`bind` can't change it. They are not bound to the global object nor to the call site.",
  },

  // ── event-loop ────────────────────────────────────────────────────────────────
  {
    topicSlug: "event-loop",
    slug: "q-eventloop-order",
    question:
      "```js\nconsole.log('A');\nsetTimeout(() => console.log('B'));\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n```\nOutput?",
    options: ["A B C D", "A D C B", "A D B C", "A C D B"],
    correctIndex: 1,
    explanation:
      "Sync code runs first (`A`, `D`). The microtask queue (promise `.then`) drains before macrotasks, so `C` next, then the `setTimeout` macrotask `B`. The tempting `A D B C` wrongly assumes the timer runs before the promise microtask.",
  },
  {
    topicSlug: "event-loop",
    slug: "q-microtask-priority",
    question: "Which runs first after the current synchronous code finishes?",
    options: [
      "A `setTimeout(fn, 0)` callback",
      "A resolved Promise's `.then` callback",
      "Whichever was scheduled first",
      "A `setInterval` tick",
    ],
    correctIndex: 1,
    explanation:
      "Microtasks (Promise callbacks) are fully drained before the next macrotask (`setTimeout`/`setInterval`). Scheduling order across the two queues doesn't matter — the microtask queue always has priority.",
  },

  // ── promises-async ────────────────────────────────────────────────────────────────
  {
    topicSlug: "promises-async",
    slug: "q-promise-all-reject",
    question: "What does `Promise.all` do if one of its promises rejects?",
    options: [
      "Resolves with the successful values and ignores the rejection.",
      "Rejects immediately with that reason, short-circuiting.",
      "Waits for all, then resolves with an array of results.",
      "Throws synchronously.",
    ],
    correctIndex: 1,
    explanation:
      "`Promise.all` rejects as soon as any input rejects, with that reason. To wait for every promise and inspect each outcome regardless of failures, use `Promise.allSettled` instead.",
  },
  {
    topicSlug: "promises-async",
    slug: "q-await-rejection",
    question: "Inside an `async` function, awaiting a rejected promise:",
    options: [
      "Returns `undefined`.",
      "Returns the rejection reason as a value.",
      "Throws, so you can catch it with `try/catch`.",
      "Silently terminates the function.",
    ],
    correctIndex: 2,
    explanation:
      "`await` on a rejected promise throws the reason into the async function, where `try/catch` can handle it. It does not return the reason as a value — that's what makes async/await read like synchronous error handling.",
  },
  {
    topicSlug: "promises-async",
    slug: "q-promise-any",
    question: "`Promise.any([p1, p2, p3])` resolves when:",
    options: [
      "The first promise settles, fulfilled or rejected.",
      "The first promise *fulfills*; it rejects only if all reject.",
      "All promises fulfill.",
      "The fastest promise rejects.",
    ],
    correctIndex: 1,
    explanation:
      "`Promise.any` yields the first *fulfilled* value and rejects (with an AggregateError) only if every input rejects. `Promise.race` is the one that settles on the first to settle, success or failure.",
  },

  // ── array-methods ────────────────────────────────────────────────────────────────
  {
    topicSlug: "array-methods",
    slug: "q-reduce-sum",
    question: "What is the result of `[1, 2, 3, 4].reduce((a, b) => a + b, 0)`?",
    options: ["10", "24", "[1,2,3,4]", "0"],
    correctIndex: 0,
    explanation:
      "`reduce` accumulates left to right starting from the initial value 0: 0+1+2+3+4 = 10. `24` would be the product (that's `reduce` with `a*b` and init 1).",
  },
  {
    topicSlug: "array-methods",
    slug: "q-map-return",
    question: "`[1, 2, 3].map(x => x * 2)` returns:",
    options: ["undefined", "[2, 4, 6]", "It mutates the original array", "6"],
    correctIndex: 1,
    explanation:
      "`map` returns a new array of transformed values `[2, 4, 6]` and never mutates the original. `forEach` is the one that returns `undefined`.",
  },
  {
    topicSlug: "array-methods",
    slug: "q-sort-default",
    question: "What does `[10, 1, 2].sort()` return?",
    options: ["[1, 2, 10]", "[10, 2, 1]", "[1, 10, 2]", "[2, 1, 10]"],
    correctIndex: 2,
    explanation:
      "With no comparator, `sort` converts elements to strings and compares lexicographically: '1' < '10' < '2', giving `[1, 10, 2]`. Use `sort((a, b) => a - b)` for numeric order `[1, 2, 10]`.",
  },

  // ── destructuring ────────────────────────────────────────────────────────────────
  {
    topicSlug: "destructuring",
    slug: "q-destructure-default-null",
    question: "Given `const { x = 5 } = { x: null };`, what is `x`?",
    options: ["5", "null", "undefined", "TypeError"],
    correctIndex: 1,
    explanation:
      "Defaults only apply when the value is strictly `undefined`. `null` is a defined value, so it's used as-is and `x` is `null`. Only `{ x: undefined }` (or a missing key) would yield the default 5.",
  },
  {
    topicSlug: "destructuring",
    slug: "q-destructure-rest",
    question: "After `const [a, ...rest] = [1, 2, 3, 4];`, what is `rest`?",
    options: ["[1, 2, 3, 4]", "[2, 3, 4]", "2", "[1]"],
    correctIndex: 1,
    explanation:
      "`a` takes the first element (1) and the rest pattern collects the remaining elements into a new array `[2, 3, 4]`. The rest element must be last and gathers everything after the named bindings.",
  },

  // ── es-modules ────────────────────────────────────────────────────────────────
  {
    topicSlug: "es-modules",
    slug: "q-default-import-syntax",
    question: "How do you import a default export from `./math`?",
    options: [
      "import { math } from './math'",
      "import math from './math'",
      "import * as math from './math'",
      "require('./math').default",
    ],
    correctIndex: 1,
    explanation:
      "A default export is imported without braces under any name: `import math from './math'`. Braces are for named exports, and `* as` creates a namespace object — neither targets the default binding directly.",
  },
  {
    topicSlug: "es-modules",
    slug: "q-esm-bindings",
    question: "ES module imports are:",
    options: [
      "Copies of the exported values at import time.",
      "Live, read-only bindings to the exported variables.",
      "Always asynchronous Promises.",
      "Mutable references you can reassign.",
    ],
    correctIndex: 1,
    explanation:
      "ESM imports are live bindings: if the module updates an exported variable, importers see the new value. They are read-only on the importing side. CommonJS, by contrast, copies values at `require` time.",
  },

  // ── error-handling ────────────────────────────────────────────────────────────────
  {
    topicSlug: "error-handling",
    slug: "q-finally-runs",
    question: "When does a `finally` block execute?",
    options: [
      "Only when no error is thrown.",
      "Only when an error is caught.",
      "Always — whether or not an exception occurred.",
      "Only if there's no `return` in the `try`.",
    ],
    correctIndex: 2,
    explanation:
      "`finally` always runs — after success, after a caught error, and even when `try`/`catch` returns — which is why it's used for cleanup. A `return` in `try` does not skip it (and a `return` in `finally` even overrides it).",
  },
  {
    topicSlug: "error-handling",
    slug: "q-throw-error-object",
    question: "Why prefer `throw new Error('msg')` over `throw 'msg'`?",
    options: [
      "Strings can't be caught.",
      "Error objects carry a stack trace and work with `instanceof`.",
      "Strings are slower to throw.",
      "There's no difference.",
    ],
    correctIndex: 1,
    explanation:
      "`Error` instances include a stack trace and `name`/`message`, and code commonly branches on `err instanceof Error`. Throwing a raw string loses the stack and breaks those guards, even though it's technically allowed.",
  },

  // ── jsx ────────────────────────────────────────────────────────────────
  {
    topicSlug: "jsx",
    slug: "q-jsx-compiles-to",
    question: "JSX ultimately compiles to:",
    options: [
      "An HTML string.",
      "Calls that create React element objects (e.g. `createElement`/`jsx`).",
      "Direct DOM node creation.",
      "A template literal.",
    ],
    correctIndex: 1,
    explanation:
      "JSX is transformed into element-creating function calls that return plain JS objects describing the UI. It is not HTML and does not create real DOM nodes by itself — React later reconciles those element objects into the DOM.",
  },
  {
    topicSlug: "jsx",
    slug: "q-jsx-expression-only",
    question: "Which can you place directly inside JSX `{ }`?",
    options: [
      "An `if` statement",
      "A `for` loop",
      "A ternary expression",
      "A variable declaration with `let`",
    ],
    correctIndex: 2,
    explanation:
      "JSX braces accept expressions, and a ternary is an expression. Statements like `if`, `for`, and `let` declarations are not expressions and must be moved above the return or rewritten (e.g. ternary, `.map`, `&&`).",
  },

  // ── props-state ────────────────────────────────────────────────────────────────
  {
    topicSlug: "props-state",
    slug: "q-props-readonly",
    question: "Within a component, props are:",
    options: [
      "Mutable local state.",
      "Read-only inputs from the parent.",
      "Always strings.",
      "Recomputed on every render automatically.",
    ],
    correctIndex: 1,
    explanation:
      "Props are read-only data passed down by the parent; a component must not mutate them. Mutable data the component owns is state. Props can be any type, not just strings.",
  },
  {
    topicSlug: "props-state",
    slug: "q-children-prop",
    question: "In `<Card>Hello</Card>`, where does `Hello` arrive?",
    options: [
      "As `props.text`",
      "As `props.children`",
      "It's discarded",
      "As `props.value`",
    ],
    correctIndex: 1,
    explanation:
      "Nested content is passed as the special `props.children` prop, enabling composition. It's not assigned to an arbitrary prop name like `text` or `value` unless you explicitly pass those.",
  },

  // ── usestate ────────────────────────────────────────────────────────────────
  {
    topicSlug: "usestate",
    slug: "q-usestate-batched",
    question:
      "In a click handler with `const [n,setN]=useState(0)`, calling `setN(n+1); setN(n+1); setN(n+1);` results in `n` becoming:",
    options: ["3", "1", "0", "It throws"],
    correctIndex: 1,
    explanation:
      "All three calls read the same stale `n` (0) and set state to 1, so the value becomes 1 after the batched render. To increment by 3 use the functional updater `setN(prev => prev + 1)`, which builds on the latest queued value.",
  },
  {
    topicSlug: "usestate",
    slug: "q-usestate-lazy",
    question: "Why pass a function to `useState(() => compute())`?",
    options: [
      "To re-run `compute` on every render.",
      "So the expensive initializer runs only on the first render.",
      "It's required syntax for objects.",
      "To make the state asynchronous.",
    ],
    correctIndex: 1,
    explanation:
      "Lazy initialization runs the initializer once, on mount, saving the cost on later renders. Passing the value directly (`useState(compute())`) would execute `compute` every render even though the result is ignored after the first.",
  },

  // ── useeffect ────────────────────────────────────────────────────────────────
  {
    topicSlug: "useeffect",
    slug: "q-useeffect-empty-deps",
    question: "An effect `useEffect(fn, [])` runs:",
    options: [
      "After every render.",
      "Once, after the initial mount.",
      "Never.",
      "Only when the component unmounts.",
    ],
    correctIndex: 1,
    explanation:
      "An empty dependency array means the effect has no dependencies that change, so it runs once after mount (and its cleanup runs on unmount). Omitting the array entirely is what makes it run after every render.",
  },
  {
    topicSlug: "useeffect",
    slug: "q-useeffect-cleanup",
    question: "What is the function returned from a `useEffect` callback used for?",
    options: [
      "To return data to the component.",
      "Cleanup — it runs before re-running the effect and on unmount.",
      "To set the dependency array.",
      "To trigger an immediate re-render.",
    ],
    correctIndex: 1,
    explanation:
      "The returned function is the cleanup: React calls it to tear down subscriptions/timers before the next effect run and at unmount. It cannot return data to the component or alter dependencies.",
  },
  {
    // Angular -> React comparison #1
    topicSlug: "useeffect",
    slug: "q-angular-ngoninit",
    question:
      "[Angular → React] What is the closest React equivalent of Angular's `ngOnInit` lifecycle hook?",
    options: [
      "`useMemo` with no dependencies",
      "`useEffect(() => { ... }, [])`",
      "The component constructor",
      "`useRef(null)`",
    ],
    correctIndex: 1,
    explanation:
      "`ngOnInit` runs initialization logic once after the component is set up; the equivalent is `useEffect(() => {...}, [])`, which runs once after mount. `useMemo` is for memoizing values, and refs/constructors don't model post-mount side effects.",
  },
  {
    // Angular -> React comparison #2
    topicSlug: "useeffect",
    slug: "q-angular-ngondestroy",
    question:
      "[Angular → React] Angular's `ngOnDestroy` (e.g. unsubscribing) maps to which React construct?",
    options: [
      "A second `useState`",
      "The cleanup function returned from `useEffect`",
      "`React.memo`",
      "`useCallback`",
    ],
    correctIndex: 1,
    explanation:
      "`ngOnDestroy` performs teardown when a component is destroyed; in React you return a cleanup function from `useEffect`, which runs on unmount. `React.memo`/`useCallback` are performance tools, not lifecycle teardown.",
  },

  // ── useref ────────────────────────────────────────────────────────────────
  {
    topicSlug: "useref",
    slug: "q-useref-no-rerender",
    question: "Mutating `ref.current = x` will:",
    options: [
      "Trigger a re-render.",
      "Not trigger a re-render.",
      "Throw because refs are read-only.",
      "Reset the component state.",
    ],
    correctIndex: 1,
    explanation:
      "Refs are mutable containers that persist across renders without causing re-renders when changed — ideal for timer IDs or previous values. If you need the UI to update on change, use state instead.",
  },
  {
    topicSlug: "useref",
    slug: "q-useref-dom",
    question: "To focus an `<input>` imperatively after mount, you typically:",
    options: [
      "Store it in state and call `.focus()`.",
      "Attach a `ref` and call `ref.current.focus()` in an effect.",
      "Use `document.write`.",
      "Pass `autoFocus` to `useEffect`.",
    ],
    correctIndex: 1,
    explanation:
      "Attach a ref to the input and call `ref.current.focus()` inside a mount effect. Storing a DOM node in state is unnecessary and would cause extra renders; `useEffect` doesn't accept an `autoFocus` argument.",
  },

  // ── component-lifecycle ────────────────────────────────────────────────────────────────
  {
    // Angular -> React comparison #3
    topicSlug: "component-lifecycle",
    slug: "q-angular-lifecycle-model",
    question:
      "[Angular → React] Angular has many named lifecycle hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`...). How does function-component React model the lifecycle?",
    options: [
      "With identically named methods on the component.",
      "Primarily through `useEffect` with different dependency arrays plus cleanup.",
      "It has no lifecycle at all.",
      "Through the `render` method only.",
    ],
    correctIndex: 1,
    explanation:
      "Function components unify lifecycle concerns into `useEffect`: `[]` for mount, `[deps]` for updates, and a returned cleanup for unmount. There are no Angular-style named hook methods; class components had some, but the modern model is effects.",
  },
  {
    topicSlug: "component-lifecycle",
    slug: "q-strictmode-double",
    question: "Why might a mount effect run twice in development with React 18?",
    options: [
      "A bug in React.",
      "Strict Mode deliberately mounts, unmounts, and remounts to surface unsafe effects.",
      "Because the component has state.",
      "It also happens in production.",
    ],
    correctIndex: 1,
    explanation:
      "Strict Mode double-invokes mount effects in development to expose missing cleanup; it does not happen in production. The fix is idempotent effects with cleanup, not removing Strict Mode.",
  },

  // ── react-router ────────────────────────────────────────────────────────────────
  {
    topicSlug: "react-router",
    slug: "q-router-link",
    question: "Why prefer `<Link to=...>` over a raw `<a href=...>` in a React SPA?",
    options: [
      "`<a>` is invalid inside React.",
      "`<Link>` does client-side navigation without a full page reload.",
      "`<Link>` is faster to render.",
      "There is no difference.",
    ],
    correctIndex: 1,
    explanation:
      "`<Link>` updates the URL and renders the matching route in-app, preserving state. A plain `<a>` causes a full document reload, discarding the SPA's in-memory state.",
  },
  {
    topicSlug: "react-router",
    slug: "q-router-useparams",
    question: "For route `/posts/:slug`, how do you read `slug` in the component?",
    options: [
      "`props.slug`",
      "`useParams().slug`",
      "`useState('slug')`",
      "`window.slug`",
    ],
    correctIndex: 1,
    explanation:
      "React Router exposes dynamic segments via the `useParams` hook: `const { slug } = useParams()`. It's not passed as a prop automatically, and the value is always a string.",
  },

  // ── lifting-state ────────────────────────────────────────────────────────────────
  {
    topicSlug: "lifting-state",
    slug: "q-lifting-where",
    question: "To share state between two sibling components, you should:",
    options: [
      "Duplicate the state in each sibling.",
      "Move the state to their closest common parent and pass it down.",
      "Use a global `var`.",
      "Store it on `window`.",
    ],
    correctIndex: 1,
    explanation:
      "Lifting state to the nearest common ancestor keeps a single source of truth that both siblings read via props and update via callbacks. Duplicating state in each leads to them drifting out of sync.",
  },
  {
    // Angular -> React comparison #4
    topicSlug: "lifting-state",
    slug: "q-angular-two-way-binding",
    question:
      "[Angular → React] Angular's two-way binding `[(ngModel)]` corresponds in React to:",
    options: [
      "Automatic two-way binding via `useState`.",
      "A controlled input: `value` from state plus an `onChange` setter (explicit one-way data flow).",
      "`useRef` on the input.",
      "Context.",
    ],
    correctIndex: 1,
    explanation:
      "React favors explicit one-way data flow: you read `value` from state and write back in `onChange`, simulating two-way binding manually. React has no built-in `[(ngModel)]`-style automatic two-way binding.",
  },

  // ── controlled-inputs ────────────────────────────────────────────────────────────────
  {
    topicSlug: "controlled-inputs",
    slug: "q-controlled-def",
    question: "A controlled input is one whose value is:",
    options: [
      "Stored in the DOM and read via a ref.",
      "Driven by React state via `value` and `onChange`.",
      "Set only once with `defaultValue`.",
      "Never changeable.",
    ],
    correctIndex: 1,
    explanation:
      "A controlled input binds `value` to state and updates it in `onChange`, making React the source of truth. Reading from the DOM via a ref (often with `defaultValue`) describes an uncontrolled input.",
  },
  {
    topicSlug: "controlled-inputs",
    slug: "q-controlled-warning",
    question:
      "React warns 'changing a controlled input to uncontrolled'. The usual cause is:",
    options: [
      "Using `onChange` without `value`.",
      "`value` becoming `undefined`/`null` after starting defined.",
      "Too many re-renders.",
      "Using a `<textarea>`.",
    ],
    correctIndex: 1,
    explanation:
      "The warning fires when `value` goes from a defined value to `undefined`/`null`, so React can't tell the intended mode. Default the value, e.g. `value={name ?? ''}`. (`onChange` without `value` is the *uncontrolled-to-controlled* direction.)",
  },

  // ── forms ────────────────────────────────────────────────────────────────
  {
    topicSlug: "forms",
    slug: "q-form-preventdefault",
    question: "Why call `e.preventDefault()` in a React form's submit handler?",
    options: [
      "To clear the form fields.",
      "To stop the browser's default full-page submit/reload.",
      "To validate inputs automatically.",
      "To re-render the component.",
    ],
    correctIndex: 1,
    explanation:
      "Without `preventDefault`, submitting reloads the page (the browser's default), wiping SPA state. It does not by itself clear fields, validate, or trigger a re-render.",
  },
  {
    topicSlug: "forms",
    slug: "q-form-checkbox",
    question: "For a checkbox in React, which property holds its state?",
    options: ["`e.target.value`", "`e.target.checked`", "`e.target.selected`", "`e.target.data`"],
    correctIndex: 1,
    explanation:
      "Checkboxes use the boolean `e.target.checked` and bind with `checked={...}`. `e.target.value` is for text-like inputs; using it for a checkbox gives the literal `value` attribute, not the checked state.",
  },

  // ── usecontext ────────────────────────────────────────────────────────────────
  {
    topicSlug: "usecontext",
    slug: "q-context-purpose",
    question: "The primary problem `useContext` solves is:",
    options: [
      "Slow renders.",
      "Prop drilling — passing data through many intermediate components.",
      "Asynchronous data fetching.",
      "Routing.",
    ],
    correctIndex: 1,
    explanation:
      "Context lets descendants read a provided value directly, avoiding threading props through layers that don't use them (prop drilling). It isn't a performance tool or a data-fetching/routing solution per se.",
  },
  {
    // Angular -> React comparison #5
    topicSlug: "usecontext",
    slug: "q-angular-di-service",
    question:
      "[Angular → React] Angular provides shared functionality through services injected via DI. The most common React equivalent is:",
    options: [
      "A class with a constructor.",
      "Context (often `createContext` + a provider), frequently wrapped in a custom hook.",
      "`useRef`.",
      "A global `setTimeout`.",
    ],
    correctIndex: 1,
    explanation:
      "Angular's DI-provided services map to React Context: you provide the shared value/logic once and consume it anywhere below, commonly via a custom `useXxx` hook. React has no built-in DI container; Context is the idiomatic substitute.",
  },
  {
    // Angular -> React comparison #6
    topicSlug: "usecontext",
    slug: "q-angular-behaviorsubject",
    question:
      "[Angular → React] An RxJS `BehaviorSubject` shared via a service (holding current value, notifying subscribers) is most like which React pattern?",
    options: [
      "A single `useRef`.",
      "State held in a provider (e.g. Context + `useState`/`useReducer`) that re-renders consumers on change.",
      "A `setTimeout` loop.",
      "An uncontrolled input.",
    ],
    correctIndex: 1,
    explanation:
      "A `BehaviorSubject` stores a current value and pushes updates to subscribers; in React you model this with state in a provider that re-renders consumers when it changes. A ref wouldn't notify/re-render consumers, which is the key behavior.",
  },

  // ── usereducer ────────────────────────────────────────────────────────────────
  {
    topicSlug: "usereducer",
    slug: "q-usereducer-signature",
    question: "`useReducer(reducer, initial)` returns:",
    options: [
      "`[state, setState]`",
      "`[state, dispatch]`",
      "`[dispatch, state]`",
      "Just the `state`",
    ],
    correctIndex: 1,
    explanation:
      "It returns the current `state` and a `dispatch` function; you call `dispatch(action)` and React runs `reducer(state, action)`. The setter isn't a direct `setState` — transitions go through the reducer.",
  },
  {
    // Angular -> React comparison #7 (extra)
    topicSlug: "usereducer",
    slug: "q-angular-ngrx-store",
    question:
      "[Angular → React] Angular teams often use NgRx (actions + reducers + a store). Inside a single React component, the closest built-in analog is:",
    options: [
      "`useState` with a plain object.",
      "`useReducer` — dispatch actions to a pure reducer that returns new state.",
      "`useRef`.",
      "`useEffect`.",
    ],
    correctIndex: 1,
    explanation:
      "NgRx's action/reducer/store flow maps directly onto `useReducer`: you `dispatch` actions and a pure reducer computes the next state. `useState` lacks the explicit action/reducer structure; for app-wide scope you'd combine `useReducer` with Context.",
  },

  // ── custom-hooks ────────────────────────────────────────────────────────────────
  {
    topicSlug: "custom-hooks",
    slug: "q-custom-hook-naming",
    question: "What must be true of a custom hook?",
    options: [
      "Its name must start with `use`.",
      "It must return JSX.",
      "It must be a class.",
      "It can only call `useState`.",
    ],
    correctIndex: 0,
    explanation:
      "Custom hooks must be prefixed with `use` so React's linter can enforce the Rules of Hooks. They return values/handlers (not necessarily JSX), are functions (not classes), and may call any hooks.",
  },
  {
    topicSlug: "custom-hooks",
    slug: "q-custom-hook-shared-state",
    question: "Two components both call your `useCounter()` hook. Do they share state?",
    options: [
      "Yes, they share one counter.",
      "No, each call gets its own independent state.",
      "Only if wrapped in Context.",
      "Only on the first render.",
    ],
    correctIndex: 1,
    explanation:
      "Custom hooks share logic, not state — each invocation creates isolated state. To actually share one value across components you'd lift it or use Context; the hook alone gives each caller a separate counter.",
  },

  // ── memoisation ────────────────────────────────────────────────────────────────
  {
    topicSlug: "memoisation",
    slug: "q-usememo-vs-usecallback",
    question: "What does `useCallback(fn, deps)` memoize?",
    options: [
      "The return value of `fn`.",
      "The function `fn` itself (stable reference).",
      "The component's render output.",
      "The dependency array.",
    ],
    correctIndex: 1,
    explanation:
      "`useCallback` returns a stable function reference until deps change (`useCallback(fn, d) === useMemo(() => fn, d)`). `useMemo` is the one that memoizes a *computed value*; neither memoizes render output directly.",
  },
  {
    topicSlug: "memoisation",
    slug: "q-react-memo",
    question: "`React.memo(Component)` skips re-rendering when:",
    options: [
      "The component has no state.",
      "Its props are shallow-equal to the previous render.",
      "It's inside a Context.",
      "Always.",
    ],
    correctIndex: 1,
    explanation:
      "`React.memo` bails out of re-rendering if props are shallow-equal to last time. It only helps when the parent re-renders often and props are referentially stable — passing new object/function props each render defeats it.",
  },

  // ── keys-reconciliation ────────────────────────────────────────────────────────────────
  {
    topicSlug: "keys-reconciliation",
    slug: "q-keys-why",
    question: "Why does React require a `key` on list items?",
    options: [
      "For CSS styling.",
      "To give items stable identity so reconciliation reuses DOM efficiently.",
      "It's optional and purely cosmetic.",
      "To sort the list automatically.",
    ],
    correctIndex: 1,
    explanation:
      "Keys identify elements across renders so React can match, reorder, and minimally update the DOM. They have nothing to do with styling or sorting, and omitting them produces a warning and can cause subtle state bugs.",
  },
  {
    topicSlug: "keys-reconciliation",
    slug: "q-keys-index",
    question: "Using the array index as a `key` is risky mainly when:",
    options: [
      "The list never changes.",
      "Items can be reordered, inserted, or removed.",
      "The list has fewer than 10 items.",
      "You use `map`.",
    ],
    correctIndex: 1,
    explanation:
      "Index keys break when the list mutates order/length, because React then associates the wrong state/DOM with items, corrupting inputs and animations. For a stable, never-changing list, index keys are acceptable but still discouraged.",
  },
  ...EASY_QUIZ_ADDITIONS,
  ...MEDIUM_QUIZ_ADDITIONS,
  ...JS_FUNDAMENTALS_QUIZ_ADDITIONS,
];
