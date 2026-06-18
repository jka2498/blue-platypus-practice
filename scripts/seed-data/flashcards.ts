// Seed flashcards for DevPath. Every topic slug from lib/content-config TOPICS
// gets 2-4 cards. Slugs are globally unique. Content is interview-grade.

import type { SeedFlashcard } from "./types";

const JS_FUNDAMENTALS_FLASHCARDS: SeedFlashcard[] = [
  {
    topicSlug: "data-structures-basics",
    slug: "ds-array-vs-object-lookup",
    front: "When should you prefer an object/map over an array for lookups?",
    back: "Use an object or `Map` for key-based lookup when you need near O(1) access by identifier. Arrays are ideal for ordered iteration but searching by id with `find`/`filter` is O(n).",
    difficulty: "easy",
  },
  {
    topicSlug: "data-structures-basics",
    slug: "ds-stack-vs-queue",
    front: "What is the difference between a stack and a queue?",
    back: "A stack is LIFO (last in, first out): push/pop from one end. A queue is FIFO (first in, first out): enqueue at back, dequeue at front. Pick based on required processing order.",
    difficulty: "easy",
  },
  {
    topicSlug: "data-structures-basics",
    slug: "ds-set-uniqueness",
    front: "Why is `Set` useful in JavaScript interviews?",
    back: "`Set` stores unique values and gives fast membership checks (`has`) compared with repeated `array.includes` over large lists. Great for de-duplication and visited tracking.",
    difficulty: "medium",
  },
  {
    topicSlug: "recursion-fundamentals",
    slug: "recur-base-case",
    front: "Why must every recursive function have a base case?",
    back: "Without a base case, recursion never terminates and eventually overflows the call stack. The base case is the stopping condition that returns a non-recursive value.",
    difficulty: "easy",
  },
  {
    topicSlug: "recursion-fundamentals",
    slug: "recur-call-stack",
    front: "What role does the call stack play in recursion?",
    back: "Each recursive call adds a new frame to the call stack. Once a base case returns, frames unwind in reverse order, combining results on the way back up.",
    difficulty: "medium",
  },
  {
    topicSlug: "recursion-fundamentals",
    slug: "recur-vs-iteration",
    front: "When might iteration be preferable to recursion in JavaScript?",
    back: "For very deep input sizes, iteration avoids stack overflow risk and may be easier to optimize. Recursion can be clearer for tree/divide-and-conquer logic.",
    difficulty: "medium",
  },
  {
    topicSlug: "string-algorithms",
    slug: "str-two-pointer",
    front: "What is the two-pointer technique for strings?",
    back: "Use one pointer from the left and one from the right (or two forward pointers) to compare/transform in linear time, often reducing extra memory use.",
    difficulty: "easy",
  },
  {
    topicSlug: "string-algorithms",
    slug: "str-normalize-before-compare",
    front: "Why normalize strings before checks like palindrome/anagram?",
    back: "Normalization (lowercasing, trimming, removing punctuation/whitespace) ensures logic compares semantic content, not formatting differences.",
    difficulty: "easy",
  },
  {
    topicSlug: "string-algorithms",
    slug: "str-frequency-map",
    front: "How does a frequency map help with string problems?",
    back: "Count each character in an object/map, then compare counts or constraints in O(n). It's a common pattern for anagrams, duplicates, and window problems.",
    difficulty: "medium",
  },
  {
    topicSlug: "object-map-patterns",
    slug: "map-vs-object",
    front: "When is `Map` better than plain object `{}`?",
    back: "`Map` preserves insertion order, supports non-string keys, and provides explicit APIs (`set/get/has/delete`). Objects are fine for simple string-key records.",
    difficulty: "easy",
  },
  {
    topicSlug: "object-map-patterns",
    slug: "obj-avoid-prototype-collision",
    front: "How can plain objects cause key-collision surprises?",
    back: "Objects inherit prototype properties, so keys can collide in edge cases. `Object.create(null)` or `Map` avoids prototype-chain interference for dictionary-style use.",
    difficulty: "medium",
  },
  {
    topicSlug: "object-map-patterns",
    slug: "map-counting-pattern",
    front: "What is the counting pattern with map/object?",
    back: "Iterate once, incrementing counts by key: `counts[k] = (counts[k] ?? 0) + 1`. Then evaluate counts for pairs, duplicates, or constraints in a second pass.",
    difficulty: "medium",
  },
  {
    topicSlug: "big-o-basics",
    slug: "big-o-time-vs-space",
    front: "What is the difference between time and space complexity?",
    back: "Time complexity measures how operations grow with input size; space complexity measures additional memory growth. Strong solutions balance both.",
    difficulty: "easy",
  },
  {
    topicSlug: "big-o-basics",
    slug: "big-o-common-orders",
    front: "Order these from fastest growth to slowest: O(1), O(log n), O(n), O(n^2)",
    back: "Fastest to slowest growth with larger n is: O(1), O(log n), O(n), O(n^2). Lower growth means better scaling.",
    difficulty: "easy",
  },
  {
    topicSlug: "big-o-basics",
    slug: "big-o-nested-loops",
    front: "Why do nested loops often imply O(n^2)?",
    back: "If an outer loop runs n times and the inner loop also runs up to n times per outer iteration, total work is roughly n*n.",
    difficulty: "medium",
  },
];

export const FLASHCARDS: SeedFlashcard[] = [
  // ── variables-scope ────────────────────────────────────────────────────────
  {
    topicSlug: "variables-scope",
    slug: "var-let-const-difference",
    front: "What are the key differences between `var`, `let`, and `const`?",
    back: "`var` is function-scoped and hoisted with an initial value of `undefined`. `let` and `const` are block-scoped and hoisted into the *temporal dead zone* (TDZ) so they can't be used before declaration. `const` additionally forbids reassignment of the binding (the value itself may still be mutable).",
    difficulty: "easy",
  },
  {
    topicSlug: "variables-scope",
    slug: "scope-tdz",
    front: "What is the Temporal Dead Zone (TDZ)?",
    back: "The TDZ is the span from the start of a block until a `let`/`const` declaration is evaluated. Referencing the variable in that window throws a `ReferenceError`, even though the binding is hoisted. It exists so that block-scoped bindings can't be read before initialization.",
    difficulty: "medium",
  },
  {
    topicSlug: "variables-scope",
    slug: "scope-lexical",
    front: "What is lexical (static) scope?",
    back: "Lexical scope means a variable's accessibility is determined by *where it is written in the source code*, not by where the function is called from. Inner functions can read variables from the scopes that physically enclose them.",
    difficulty: "medium",
  },
  {
    topicSlug: "variables-scope",
    slug: "scope-shadowing",
    front: "What is variable shadowing?",
    back: "Shadowing happens when a variable declared in an inner scope has the same name as one in an outer scope; the inner one 'hides' the outer within its block. With `let`/`const` this is legal, but illegal shadowing (e.g. redeclaring a function parameter with `let` in the same scope) throws.",
    difficulty: "hard",
  },

  // ── closures ────────────────────────────────────────────────────────────────
  {
    topicSlug: "closures",
    slug: "closures-definition",
    front: "What is a closure?",
    back: "A closure is a function bundled together with references to its surrounding lexical environment. The inner function keeps access to the outer function's variables even after the outer function has returned.",
    difficulty: "easy",
  },
  {
    topicSlug: "closures",
    slug: "closures-loop-var",
    front: "Why does a `for (var i = 0; ...)` loop with `setTimeout` log the same value repeatedly, and how do you fix it?",
    back: "All callbacks close over the *same* `var i`, which equals its final value by the time they run. Fix it by using `let` (a fresh binding per iteration) or by capturing the value in an IIFE: `(function(j){ setTimeout(() => console.log(j)); })(i)`.",
    difficulty: "medium",
  },
  {
    topicSlug: "closures",
    slug: "closures-private-state",
    front: "How do closures enable private state?",
    back: "Variables in an outer function aren't accessible from outside, but inner functions that close over them can read/update them. This is the basis of the module pattern and factory functions: `function counter(){ let n=0; return { inc:()=>++n }; }` keeps `n` private.",
    difficulty: "medium",
  },
  {
    topicSlug: "closures",
    slug: "closures-memory",
    front: "Can closures cause memory leaks?",
    back: "Yes. As long as a closure is reachable, every variable it captures stays alive and can't be garbage-collected. Long-lived closures (e.g. event listeners, caches) that capture large objects can pin memory unintentionally; remove listeners and null out references when done.",
    difficulty: "hard",
  },

  // ── prototypes ────────────────────────────────────────────────────────────────
  {
    topicSlug: "prototypes",
    slug: "prototypes-chain",
    front: "What is the prototype chain?",
    back: "Every object has an internal `[[Prototype]]` link (accessible via `Object.getPrototypeOf`). When you read a property, JS walks up this chain until it finds the property or reaches `null`. This is how inheritance and method sharing work in JavaScript.",
    difficulty: "easy",
  },
  {
    topicSlug: "prototypes",
    slug: "prototypes-proto-vs-prototype",
    front: "What's the difference between `__proto__` and `prototype`?",
    back: "`prototype` is a property on *constructor functions* that becomes the `[[Prototype]]` of instances they create. `__proto__` (legacy accessor for `[[Prototype]]`) is the link on an *instance* pointing to that prototype object. In short: `new Foo().__proto__ === Foo.prototype`.",
    difficulty: "medium",
  },
  {
    topicSlug: "prototypes",
    slug: "prototypes-object-create",
    front: "What does `Object.create(proto)` do?",
    back: "It creates a new object whose `[[Prototype]]` is set to `proto`, without running any constructor. `Object.create(null)` makes a 'bare' object with no prototype at all — useful as a clean dictionary with no inherited `toString`/`hasOwnProperty`.",
    difficulty: "medium",
  },
  {
    topicSlug: "prototypes",
    slug: "prototypes-class-sugar",
    front: "Are ES6 `class` declarations a new inheritance model?",
    back: "No. `class` is syntactic sugar over prototype-based inheritance. Methods defined in a class body are placed on `Class.prototype`, and `extends` wires up the prototype chain. Classes do add real differences though: they're not hoisted usefully, run in strict mode, and require `new`.",
    difficulty: "hard",
  },

  // ── this-keyword ────────────────────────────────────────────────────────────────
  {
    topicSlug: "this-keyword",
    slug: "this-call-site",
    front: "How is the value of `this` determined in a regular function?",
    back: "By the *call site*, not where the function is defined. Rules in priority order: `new` binding → explicit `call`/`apply`/`bind` → method call (`obj.fn()` makes `this` = `obj`) → default (global object, or `undefined` in strict mode).",
    difficulty: "medium",
  },
  {
    topicSlug: "this-keyword",
    slug: "this-arrow",
    front: "How do arrow functions treat `this`?",
    back: "Arrow functions don't have their own `this`; they capture `this` lexically from the enclosing scope at definition time. That's why they're ideal for callbacks inside methods, and why `call`/`apply`/`bind` can't change their `this`.",
    difficulty: "medium",
  },
  {
    topicSlug: "this-keyword",
    slug: "this-bind",
    front: "What does `Function.prototype.bind` return?",
    back: "It returns a *new* function with `this` permanently fixed to the supplied value (and optionally some leading arguments pre-filled — partial application). The original function is not modified.",
    difficulty: "easy",
  },
  {
    topicSlug: "this-keyword",
    slug: "this-lost-context",
    front: "Why does `const f = obj.method; f()` lose `this`, and how do you keep it?",
    back: "Detaching the method from `obj` removes the `obj.` call site, so `this` falls back to the default binding (`undefined` in strict mode). Preserve it with `obj.method.bind(obj)`, an arrow wrapper `() => obj.method()`, or by calling `obj.method()` directly.",
    difficulty: "hard",
  },

  // ── event-loop ────────────────────────────────────────────────────────────────
  {
    topicSlug: "event-loop",
    slug: "event-loop-basics",
    front: "What is the event loop?",
    back: "The event loop is the mechanism that lets single-threaded JS handle async work: it continuously checks whether the call stack is empty, and if so, pulls the next queued callback (from the task or microtask queues) and runs it to completion.",
    difficulty: "easy",
  },
  {
    topicSlug: "event-loop",
    slug: "event-loop-micro-vs-macro",
    front: "What's the difference between microtasks and macrotasks?",
    back: "Microtasks (Promise `.then`/`catch`/`finally`, `queueMicrotask`, `MutationObserver`) run after the current task and are *fully drained* before the next macrotask. Macrotasks (`setTimeout`, `setInterval`, I/O, UI events) run one per loop turn. So a resolved promise callback always runs before a `setTimeout(0)`.",
    difficulty: "medium",
  },
  {
    topicSlug: "event-loop",
    slug: "event-loop-order",
    front: "What does this log?\n```js\nconsole.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n```",
    back: "`1 4 3 2`. Synchronous code runs first (`1`, `4`). Then the microtask queue is drained (`3`). The `setTimeout` macrotask runs last (`2`), on the next loop turn.",
    difficulty: "hard",
  },

  // ── promises-async ────────────────────────────────────────────────────────────────
  {
    topicSlug: "promises-async",
    slug: "promises-states",
    front: "What are the three states of a Promise?",
    back: "`pending` (initial), `fulfilled` (resolved with a value), and `rejected` (failed with a reason). A promise is *settled* once it becomes fulfilled or rejected, and a settled promise can never change state again.",
    difficulty: "easy",
  },
  {
    topicSlug: "promises-async",
    slug: "promises-all-vs-allsettled",
    front: "How do `Promise.all` and `Promise.allSettled` differ?",
    back: "`Promise.all` rejects as soon as *any* input rejects (short-circuits) and otherwise resolves to an array of values. `Promise.allSettled` never rejects; it waits for all inputs and resolves to an array of `{status, value}`/`{status, reason}` objects so you can inspect each outcome.",
    difficulty: "medium",
  },
  {
    topicSlug: "promises-async",
    slug: "promises-async-await-error",
    front: "How do you handle errors with `async`/`await`?",
    back: "Wrap awaited calls in `try/catch`; a rejected promise becomes a thrown error inside an `async` function. Unhandled rejections in an `async` function reject the promise that the function returns.",
    difficulty: "medium",
  },
  {
    topicSlug: "promises-async",
    slug: "promises-race-vs-any",
    front: "What's the difference between `Promise.race` and `Promise.any`?",
    back: "`Promise.race` settles as soon as the *first* promise settles, whether it fulfills or rejects. `Promise.any` resolves with the first *fulfilled* value and only rejects (with an `AggregateError`) if *all* inputs reject.",
    difficulty: "hard",
  },

  // ── array-methods ────────────────────────────────────────────────────────────────
  {
    topicSlug: "array-methods",
    slug: "array-map-vs-foreach",
    front: "When should you use `map` vs `forEach`?",
    back: "Use `map` when you want a *new array* of transformed values (it returns one and shouldn't have side effects). Use `forEach` purely for side effects (e.g. logging); it always returns `undefined` and can't be chained.",
    difficulty: "easy",
  },
  {
    topicSlug: "array-methods",
    slug: "array-reduce",
    front: "What does `Array.prototype.reduce` do?",
    back: "It folds an array into a single accumulated value by applying a reducer `(acc, item) => newAcc` left-to-right. Always pass an explicit initial value (`arr.reduce(fn, init)`) to avoid surprises on empty arrays and to fix the accumulator's type.",
    difficulty: "medium",
  },
  {
    topicSlug: "array-methods",
    slug: "array-find-vs-filter",
    front: "How do `find` and `filter` differ?",
    back: "`find` returns the *first* element matching the predicate (or `undefined`), short-circuiting once found. `filter` returns a *new array* of all matching elements, always scanning the whole array.",
    difficulty: "easy",
  },
  {
    topicSlug: "array-methods",
    slug: "array-sort-mutates",
    front: "What's a common gotcha with `Array.prototype.sort()`?",
    back: "`sort` mutates the array *in place* and, with no comparator, sorts by string Unicode order — so `[10, 9, 1].sort()` gives `[1, 10, 9]`. For numbers pass a comparator: `arr.sort((a, b) => a - b)`. Use `toSorted` for a non-mutating copy.",
    difficulty: "hard",
  },

  // ── destructuring ────────────────────────────────────────────────────────────────
  {
    topicSlug: "destructuring",
    slug: "destructuring-defaults",
    front: "How do default values work in destructuring?",
    back: "A default is used only when the matched value is *strictly* `undefined`: `const { x = 5 } = { x: undefined }` gives `5`, but `{ x: null }` gives `null`. Defaults can reference earlier-bound variables too.",
    difficulty: "medium",
  },
  {
    topicSlug: "destructuring",
    slug: "destructuring-rename",
    front: "How do you rename a property while destructuring?",
    back: "Use the `source: newName` syntax: `const { id: userId } = user`. You can combine renaming with defaults: `const { id: userId = 0 } = user`.",
    difficulty: "easy",
  },
  {
    topicSlug: "destructuring",
    slug: "destructuring-rest",
    front: "What does the rest pattern do in destructuring?",
    back: "It collects the remaining items into a new array/object: `const [first, ...rest] = arr` puts everything after the first into `rest`. For objects, `const { a, ...others } = obj` gives `others` as a shallow copy minus the named keys — handy for omitting props.",
    difficulty: "medium",
  },
  {
    topicSlug: "destructuring",
    slug: "destructuring-swap",
    front: "How can you swap two variables with destructuring?",
    back: "`[a, b] = [b, a]`. The right-hand array is evaluated first, then its elements are assigned back, so no temporary variable is needed.",
    difficulty: "easy",
  },

  // ── es-modules ────────────────────────────────────────────────────────────────
  {
    topicSlug: "es-modules",
    slug: "esm-named-vs-default",
    front: "What's the difference between named and default exports?",
    back: "A module can have many *named* exports (imported by their exact name with braces: `import { foo } from './m'`) and at most one *default* export (imported under any name without braces: `import anything from './m'`). Named imports give better tooling/refactoring support.",
    difficulty: "easy",
  },
  {
    topicSlug: "es-modules",
    slug: "esm-live-bindings",
    front: "Are ES module imports copies or live bindings?",
    back: "They are *live, read-only bindings*. If the exporting module reassigns an exported variable, importers see the updated value. You cannot, however, reassign an import from the importing side — it's read-only.",
    difficulty: "hard",
  },
  {
    topicSlug: "es-modules",
    slug: "esm-vs-cjs",
    front: "How do ES modules differ from CommonJS?",
    back: "ESM is static (`import`/`export` analyzed before execution, enabling tree-shaking), asynchronous-friendly, and uses live bindings. CommonJS (`require`/`module.exports`) is dynamic, synchronous, and copies values at require time. ESM imports are also hoisted to the top of the module.",
    difficulty: "medium",
  },

  // ── error-handling ────────────────────────────────────────────────────────────────
  {
    topicSlug: "error-handling",
    slug: "error-try-catch-finally",
    front: "What is the role of the `finally` block?",
    back: "`finally` runs whether or not an error was thrown (and even if `try`/`catch` returns), making it ideal for cleanup like closing connections. Note: a `return`/`throw` in `finally` overrides any pending `return`/`throw` from the `try` block.",
    difficulty: "medium",
  },
  {
    topicSlug: "error-handling",
    slug: "error-custom-classes",
    front: "How do you create a custom error type?",
    back: "Extend the built-in `Error`: `class ValidationError extends Error { constructor(msg){ super(msg); this.name = 'ValidationError'; } }`. Setting `name` improves logging, and `instanceof ValidationError` lets callers branch on error type.",
    difficulty: "medium",
  },
  {
    topicSlug: "error-handling",
    slug: "error-throw-non-error",
    front: "Why should you throw `Error` objects rather than strings?",
    back: "`Error` objects carry a stack trace and a `name`/`message`, and tooling/`instanceof` checks rely on them. `throw 'oops'` loses the stack and breaks `error instanceof Error` guards used throughout most codebases.",
    difficulty: "hard",
  },

  // ── jsx ────────────────────────────────────────────────────────────────
  {
    topicSlug: "jsx",
    slug: "jsx-what-is",
    front: "What is JSX and what does it compile to?",
    back: "JSX is a syntax extension that looks like HTML but compiles to function calls — historically `React.createElement(type, props, ...children)`, and with the modern transform to `jsx(type, props)`. It produces plain JS objects (React elements), not DOM nodes.",
    difficulty: "easy",
  },
  {
    topicSlug: "jsx",
    slug: "jsx-className",
    front: "Why is it `className` instead of `class` in JSX?",
    back: "JSX attributes map to DOM properties, and `class` is a reserved word in JavaScript. React uses the DOM property name `className`. Similarly `for` becomes `htmlFor`.",
    difficulty: "easy",
  },
  {
    topicSlug: "jsx",
    slug: "jsx-expressions",
    front: "What can you put inside JSX curly braces `{ }`?",
    back: "Any JavaScript *expression*: variables, function calls, ternaries, `&&` short-circuits, `.map()` results. You cannot put *statements* like `if`, `for`, or variable declarations directly — convert them to expressions or compute them above the return.",
    difficulty: "medium",
  },
  {
    topicSlug: "jsx",
    slug: "jsx-fragment",
    front: "Why and how do you use a React Fragment?",
    back: "A component must return a single root node. A Fragment (`<>...</>` or `<React.Fragment>`) groups siblings without adding an extra DOM wrapper. Use the long form `<React.Fragment key={id}>` when you need a `key` in a list.",
    difficulty: "medium",
  },

  // ── props-state ────────────────────────────────────────────────────────────────
  {
    topicSlug: "props-state",
    slug: "props-vs-state",
    front: "What's the difference between props and state?",
    back: "Props are inputs *passed in* from a parent and are read-only within the component. State is data *owned and managed* by the component that can change over time and triggers re-renders when updated. Props flow down; state is local.",
    difficulty: "easy",
  },
  {
    topicSlug: "props-state",
    slug: "props-immutable",
    front: "Why must you never mutate props?",
    back: "Props are owned by the parent; mutating them breaks React's one-way data flow, can desync the parent's state, and won't reliably trigger re-renders. To 'change' a prop, lift the value to the parent's state and pass a callback down.",
    difficulty: "medium",
  },
  {
    topicSlug: "props-state",
    slug: "props-children",
    front: "What is the `children` prop?",
    back: "`children` is a special prop holding whatever JSX you nest between a component's tags: `<Card>hi</Card>` makes `props.children === 'hi'`. It enables composition/wrapper components without the parent knowing the content in advance.",
    difficulty: "easy",
  },

  // ── usestate ────────────────────────────────────────────────────────────────
  {
    topicSlug: "usestate",
    slug: "usestate-basics",
    front: "What does `useState` return?",
    back: "An array of exactly two items: the current state value and a setter function. You typically destructure it: `const [count, setCount] = useState(0)`. The argument is the initial state, used only on the first render.",
    difficulty: "easy",
  },
  {
    topicSlug: "usestate",
    slug: "usestate-functional-update",
    front: "When should you use the functional updater `setX(prev => ...)`?",
    back: "Whenever the new state depends on the previous state, especially across multiple updates in one event or inside async callbacks/closures. `setCount(c => c + 1)` is safe; `setCount(count + 1)` can use a stale `count` captured by the closure.",
    difficulty: "medium",
  },
  {
    topicSlug: "usestate",
    slug: "usestate-batching",
    front: "Why does calling `setCount(count + 1)` three times only add 1?",
    back: "React *batches* state updates in an event handler and each call reads the same stale `count`. They all set the state to `count + 1`. Use the functional form `setCount(c => c + 1)` so each update builds on the latest queued value, yielding +3.",
    difficulty: "hard",
  },
  {
    topicSlug: "usestate",
    slug: "usestate-lazy-init",
    front: "What is lazy initialization in `useState`?",
    back: "Passing a *function* instead of a value (`useState(() => expensiveCompute())`) makes React call it only on the first render, skipping the cost on every subsequent render. Passing the value directly would re-run the computation each render even though it's ignored.",
    difficulty: "hard",
  },

  // ── useeffect ────────────────────────────────────────────────────────────────
  {
    topicSlug: "useeffect",
    slug: "useeffect-purpose",
    front: "What is `useEffect` for?",
    back: "Running *side effects* that must happen as a result of rendering — data fetching, subscriptions, manually changing the DOM, timers — and synchronizing your component with external systems. It runs after the render is committed to the screen.",
    difficulty: "easy",
  },
  {
    topicSlug: "useeffect",
    slug: "useeffect-deps",
    front: "How does the dependency array control `useEffect`?",
    back: "No array → runs after every render. `[]` → runs once after mount. `[a, b]` → runs after mount and whenever `a` or `b` changes (by `Object.is`). Omitting a value the effect uses causes stale closures and bugs — keep deps honest.",
    difficulty: "medium",
  },
  {
    topicSlug: "useeffect",
    slug: "useeffect-cleanup",
    front: "What is the cleanup function in `useEffect`?",
    back: "The function you optionally `return` from the effect. React runs it before re-running the effect and on unmount, so you can unsubscribe, clear timers, or abort requests — preventing leaks and duplicate subscriptions.",
    difficulty: "medium",
  },
  {
    topicSlug: "useeffect",
    slug: "useeffect-infinite-loop",
    front: "What commonly causes an infinite `useEffect` loop?",
    back: "Setting state inside the effect while a dependency changes every render — e.g. depending on a freshly-created object/array/function, or calling `setState` unconditionally with no/changing deps. Fix by memoizing the dependency or correcting the dep array.",
    difficulty: "hard",
  },

  // ── useref ────────────────────────────────────────────────────────────────
  {
    topicSlug: "useref",
    slug: "useref-purpose",
    front: "What is `useRef` used for?",
    back: "Two main uses: (1) referencing a DOM node via the `ref` attribute, and (2) holding a mutable value that persists across renders *without* triggering a re-render when it changes (`ref.current = ...`).",
    difficulty: "easy",
  },
  {
    topicSlug: "useref",
    slug: "useref-vs-state",
    front: "How does `useRef` differ from `useState`?",
    back: "Updating state schedules a re-render and the value is captured per render. Mutating `ref.current` does *not* re-render and is read live (not snapshotted). Use refs for values the UI doesn't need to react to, like timer IDs or previous values.",
    difficulty: "medium",
  },
  {
    topicSlug: "useref",
    slug: "useref-previous-value",
    front: "How do you track the previous value of a prop or state with refs?",
    back: "Store it in a ref and update it inside an effect after each render: `const prev = useRef(); useEffect(() => { prev.current = value; }, [value]);`. During render `prev.current` still holds the value from the previous render.",
    difficulty: "hard",
  },

  // ── component-lifecycle ────────────────────────────────────────────────────────────────
  {
    topicSlug: "component-lifecycle",
    slug: "lifecycle-phases",
    front: "What are the three phases of a React component's lifecycle?",
    back: "Mounting (component is created and inserted into the DOM), Updating (re-renders due to prop/state changes), and Unmounting (removed from the DOM). Hooks model these with `useEffect` (run/cleanup) rather than named class methods.",
    difficulty: "easy",
  },
  {
    topicSlug: "component-lifecycle",
    slug: "lifecycle-mount-effect",
    front: "What hook pattern replaces `componentDidMount`?",
    back: "`useEffect(() => { /* mount logic */ }, [])` — an effect with an empty dependency array runs once after the first render. Cleanup logic returned from it corresponds to `componentWillUnmount`.",
    difficulty: "medium",
  },
  {
    topicSlug: "component-lifecycle",
    slug: "lifecycle-strictmode-double",
    front: "Why might an effect run twice on mount in development?",
    back: "React 18+ Strict Mode intentionally mounts, unmounts, and remounts components in development to surface effects that aren't cleanup-safe. It does *not* happen in production; the fix is to make effects idempotent with proper cleanup, not to suppress it.",
    difficulty: "hard",
  },

  // ── react-router ────────────────────────────────────────────────────────────────
  {
    topicSlug: "react-router",
    slug: "router-link-vs-a",
    front: "Why use `<Link>` instead of `<a>` in React Router?",
    back: "`<Link>` performs client-side navigation: it updates the URL and renders the matching route without a full page reload, preserving app state. A plain `<a>` triggers a full document request, throwing away the SPA's in-memory state.",
    difficulty: "easy",
  },
  {
    topicSlug: "react-router",
    slug: "router-use-params",
    front: "How do you read a dynamic URL segment in React Router?",
    back: "Define the route with a colon param (`<Route path=\"/users/:id\" .../>`) and read it with the `useParams` hook: `const { id } = useParams()`. The value is always a string.",
    difficulty: "medium",
  },
  {
    topicSlug: "react-router",
    slug: "router-programmatic-nav",
    front: "How do you navigate programmatically in React Router v6?",
    back: "Call the function returned by the `useNavigate` hook: `const navigate = useNavigate(); navigate('/dashboard')`. Pass `{ replace: true }` to replace the history entry, or a number like `navigate(-1)` to go back.",
    difficulty: "medium",
  },

  // ── lifting-state ────────────────────────────────────────────────────────────────
  {
    topicSlug: "lifting-state",
    slug: "lifting-what",
    front: "What does 'lifting state up' mean?",
    back: "Moving shared state to the closest common ancestor of the components that need it, then passing the value down as props and changes back up via callbacks. It keeps multiple components in sync from a single source of truth.",
    difficulty: "easy",
  },
  {
    topicSlug: "lifting-state",
    slug: "lifting-single-source",
    front: "Why is a single source of truth important when lifting state?",
    back: "If two components keep their own copies of the same data, they drift out of sync. Holding the value in one parent and deriving children's displays from it guarantees they always agree and updates propagate consistently.",
    difficulty: "medium",
  },
  {
    topicSlug: "lifting-state",
    slug: "lifting-vs-context",
    front: "When should you reach for Context instead of lifting state?",
    back: "Lifting works well for a few levels, but when many deeply-nested components need the same data you get 'prop drilling'. Context (or a state library) lets you provide the value once and consume it anywhere below, avoiding threading props through intermediaries.",
    difficulty: "hard",
  },

  // ── controlled-inputs ────────────────────────────────────────────────────────────────
  {
    topicSlug: "controlled-inputs",
    slug: "controlled-definition",
    front: "What is a controlled input in React?",
    back: "An input whose value is driven by React state: you set `value={state}` and update it in `onChange`. React is the single source of truth, so the displayed value always matches state.",
    difficulty: "easy",
  },
  {
    topicSlug: "controlled-inputs",
    slug: "controlled-vs-uncontrolled",
    front: "Controlled vs uncontrolled inputs — what's the difference?",
    back: "A *controlled* input's value lives in React state (`value` + `onChange`). An *uncontrolled* input keeps its value in the DOM and you read it via a ref or on submit (often with `defaultValue`). Controlled gives instant validation/derived UI; uncontrolled is simpler for fire-and-forget forms.",
    difficulty: "medium",
  },
  {
    topicSlug: "controlled-inputs",
    slug: "controlled-warning",
    front: "Why does React warn about switching a controlled input to uncontrolled?",
    back: "It happens when `value` becomes `undefined`/`null` after starting defined (e.g. `value={user.name}` when `name` is missing). React can't tell which mode you want. Fix it by defaulting: `value={user.name ?? ''}`.",
    difficulty: "hard",
  },

  // ── forms ────────────────────────────────────────────────────────────────
  {
    topicSlug: "forms",
    slug: "forms-prevent-default",
    front: "Why call `e.preventDefault()` in a React form's `onSubmit`?",
    back: "To stop the browser's default behavior of submitting the form and reloading the page. In an SPA you handle the data in JS instead, so you prevent the navigation and run your own submit logic.",
    difficulty: "easy",
  },
  {
    topicSlug: "forms",
    slug: "forms-single-handler",
    front: "How can one handler manage many form fields?",
    back: "Give each input a `name` matching a state key and use the name in the handler: `onChange={e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))}`. The computed property name routes each change to the right field.",
    difficulty: "medium",
  },
  {
    topicSlug: "forms",
    slug: "forms-checkbox-value",
    front: "What's special about handling a checkbox's value?",
    back: "Read `e.target.checked` (a boolean), not `e.target.value`. So `onChange={e => setChecked(e.target.checked)}` and bind with `checked={checked}` rather than `value`.",
    difficulty: "medium",
  },

  // ── usecontext ────────────────────────────────────────────────────────────────
  {
    topicSlug: "usecontext",
    slug: "usecontext-purpose",
    front: "What problem does `useContext` solve?",
    back: "It avoids 'prop drilling' by letting any descendant read a value provided higher in the tree without passing props through every intermediate component. Common for themes, current user, locale, and other app-wide values.",
    difficulty: "easy",
  },
  {
    topicSlug: "usecontext",
    slug: "usecontext-provider",
    front: "How do you create and use a Context?",
    back: "`const Ctx = createContext(defaultValue)`, wrap part of the tree in `<Ctx.Provider value={...}>`, then read it in any descendant with `const value = useContext(Ctx)`. Without a matching Provider above, consumers get the default value.",
    difficulty: "medium",
  },
  {
    topicSlug: "usecontext",
    slug: "usecontext-rerender",
    front: "What's a performance pitfall of Context, and how do you mitigate it?",
    back: "Every consumer re-renders whenever the Provider's `value` changes by reference — so an inline object `value={{ ... }}` re-renders all consumers each render. Memoize the value (`useMemo`) and split rarely- vs frequently-changing data into separate contexts.",
    difficulty: "hard",
  },

  // ── usereducer ────────────────────────────────────────────────────────────────
  {
    topicSlug: "usereducer",
    slug: "usereducer-signature",
    front: "What does `useReducer` return and take?",
    back: "`const [state, dispatch] = useReducer(reducer, initialState)`. You call `dispatch(action)`; React runs `reducer(state, action)` to compute the next state. It's ideal when next state depends on previous state or when state transitions are complex.",
    difficulty: "easy",
  },
  {
    topicSlug: "usereducer",
    slug: "usereducer-vs-usestate",
    front: "When is `useReducer` preferable to `useState`?",
    back: "When you have multiple related sub-values, complex transition logic, or the next state depends on the previous one in non-trivial ways. Centralizing logic in a pure reducer also makes updates easier to test and to share via `dispatch` over context.",
    difficulty: "medium",
  },
  {
    topicSlug: "usereducer",
    slug: "usereducer-pure",
    front: "Why must a reducer be a pure function?",
    back: "React may call the reducer multiple times (e.g. Strict Mode) and relies on it being deterministic with no side effects. It must return a *new* state object rather than mutating the existing one, otherwise React can miss the change and components won't re-render correctly.",
    difficulty: "hard",
  },

  // ── custom-hooks ────────────────────────────────────────────────────────────────
  {
    topicSlug: "custom-hooks",
    slug: "custom-hook-rules",
    front: "What are the rules for a custom hook?",
    back: "Its name must start with `use`, it may call other hooks, and it must obey the Rules of Hooks — only call hooks at the top level (not in loops/conditions) and only from React functions. The `use` prefix lets the linter enforce these rules.",
    difficulty: "easy",
  },
  {
    topicSlug: "custom-hooks",
    slug: "custom-hook-purpose",
    front: "Why extract logic into a custom hook?",
    back: "To reuse *stateful logic* (not markup) across components — e.g. `useFetch`, `useLocalStorage`, `useDebounce`. Each component that calls the hook gets its own isolated state; the hook shares behavior, not the data itself.",
    difficulty: "medium",
  },
  {
    topicSlug: "custom-hooks",
    slug: "custom-hook-isolated-state",
    front: "If two components call the same custom hook, do they share state?",
    back: "No. Each call creates a completely independent instance of the hook's internal state and effects. Custom hooks share *logic*, never the underlying state values — that's the whole point versus a module-level variable.",
    difficulty: "hard",
  },

  // ── memoisation ────────────────────────────────────────────────────────────────
  {
    topicSlug: "memoisation",
    slug: "memo-usememo-usecallback",
    front: "What's the difference between `useMemo` and `useCallback`?",
    back: "`useMemo(fn, deps)` memoizes the *return value* of `fn`; `useCallback(fn, deps)` memoizes the *function itself*. In fact `useCallback(fn, deps) === useMemo(() => fn, deps)`. Both recompute only when a dependency changes.",
    difficulty: "medium",
  },
  {
    topicSlug: "memoisation",
    slug: "memo-react-memo",
    front: "What does `React.memo` do?",
    back: "It wraps a component so it skips re-rendering when its props are shallow-equal to the previous render. It only helps if the parent re-renders often and the props are stable — pair it with `useCallback`/`useMemo` to keep object/function props referentially stable.",
    difficulty: "medium",
  },
  {
    topicSlug: "memoisation",
    slug: "memo-overuse",
    front: "Why can over-using `useMemo`/`useCallback` hurt?",
    back: "Memoization isn't free: it costs memory and comparison work on every render, and adds complexity. For cheap computations or rarely-rendering components the overhead can outweigh the savings — measure first, memoize where it demonstrably helps.",
    difficulty: "hard",
  },

  // ── keys-reconciliation ────────────────────────────────────────────────────────────────
  {
    topicSlug: "keys-reconciliation",
    slug: "keys-purpose",
    front: "Why does React need `key` props in lists?",
    back: "Keys give each list item a stable identity so React can match elements between renders and reorder/insert/remove the minimum number of DOM nodes during reconciliation, instead of re-creating them.",
    difficulty: "easy",
  },
  {
    topicSlug: "keys-reconciliation",
    slug: "keys-index-antipattern",
    front: "Why is using the array index as a `key` problematic?",
    back: "When the list can reorder, insert, or remove items, index keys make React associate the wrong state/DOM with the wrong item — causing bugs in inputs, animations, and component state. Use a stable unique id derived from the data instead.",
    difficulty: "medium",
  },
  {
    topicSlug: "keys-reconciliation",
    slug: "keys-reconciliation-algo",
    front: "How does React's reconciliation decide whether to reuse a node?",
    back: "It diffs by element *type* and *key* at each position. Same type + same key → update the existing instance in place. Different type → tear down the subtree and rebuild. This heuristic is O(n) instead of a full O(n³) tree diff.",
    difficulty: "hard",
  },
  ...JS_FUNDAMENTALS_FLASHCARDS,
];
