// Seed quiz questions for DevPath. Broad JS + React coverage, including
// Angular -> React comparison questions filed under the most relevant topic.
// Every slug is globally unique; options is a 4-tuple; correctIndex is 0-3.

import type { SeedQuizQuestion } from "./types";

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
];
