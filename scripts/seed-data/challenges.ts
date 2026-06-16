// Seed coding challenges for DevPath.
//
// JS grading contract (see lib/test-runner.ts): the runner builds the solution,
// finds the function named `fnName`, calls `fnName(...testCase.input)`, awaits if
// the result is a Promise, and deep-compares the return value with
// `expected_output`. Solutions must define `fnName` and be pure/deterministic.
//
// React challenges use `testCases: []` and a `reactChecklist` for self-verify.

import type { SeedChallenge } from "./types";

export const CHALLENGES: SeedChallenge[] = [
  // ── 1. flatten (easy) ──────────────────────────────────────────────────────
  {
    title: "Implement flatten(arr, depth)",
    slug: "implement-flatten",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Flatten\nWrite `flatten(arr, depth)` that flattens nested arrays up to `depth` levels (default `1`).\n\n**Example**\n```js\nflatten([1, [2, [3]]], 1); // [1, 2, [3]]\nflatten([1, [2, [3]]], 2); // [1, 2, 3]\n```",
    fnName: "flatten",
    starterCode:
      "function flatten(arr, depth = 1) {\n  // your code here\n}\n",
    solutionCode:
      "function flatten(arr, depth = 1) {\n  if (depth < 1) return arr.slice();\n  return arr.reduce(\n    (acc, v) => acc.concat(Array.isArray(v) ? flatten(v, depth - 1) : v),\n    []\n  );\n}\n",
    annotatedSolution:
      "function flatten(arr, depth = 1) {\n  // Base case: no more flattening requested -> return a shallow copy.\n  if (depth < 1) return arr.slice();\n  // Build a new array; recurse into nested arrays, decrementing depth.\n  return arr.reduce(\n    (acc, v) => acc.concat(Array.isArray(v) ? flatten(v, depth - 1) : v),\n    []\n  );\n}\n",
    testCases: [
      { input: [[1, [2, [3]]], 1], expected_output: [1, 2, [3]], description: "depth 1 flattens one level" },
      { input: [[1, [2, [3]]], 2], expected_output: [1, 2, 3], description: "depth 2 flattens two levels" },
      { input: [[1, 2, 3], 1], expected_output: [1, 2, 3], description: "already flat array unchanged" },
      { input: [[1, [2, [3, [4]]]], 0], expected_output: [1, [2, [3, [4]]]], description: "depth 0 returns a copy" },
    ],
    hints: [
      "Think recursion with a depth counter.",
      "Use reduce; concat the flattened child when the value is an array, else the value itself.",
      "Decrement depth on each recursive call; the base case (depth < 1) returns a shallow copy.",
    ],
    orderIndex: 1,
  },

  // ── 2. chunk (easy) ─────────────────────────────────────────────────────────
  {
    title: "Implement chunk(arr, size)",
    slug: "implement-chunk",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Chunk\nWrite `chunk(arr, size)` that splits `arr` into groups of at most `size` items.\n\n**Example**\n```js\nchunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]\n```",
    fnName: "chunk",
    starterCode: "function chunk(arr, size) {\n  // your code here\n}\n",
    solutionCode:
      "function chunk(arr, size) {\n  const out = [];\n  for (let i = 0; i < arr.length; i += size) {\n    out.push(arr.slice(i, i + size));\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function chunk(arr, size) {\n  const out = [];\n  // Step through the array `size` items at a time.\n  for (let i = 0; i < arr.length; i += size) {\n    // slice grabs up to `size` items, and is safe past the end.\n    out.push(arr.slice(i, i + size));\n  }\n  return out;\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expected_output: [[1, 2], [3, 4], [5]], description: "size 2 with a remainder" },
      { input: [[1, 2, 3, 4], 2], expected_output: [[1, 2], [3, 4]], description: "evenly divisible" },
      { input: [[1, 2, 3], 5], expected_output: [[1, 2, 3]], description: "size larger than array" },
      { input: [[], 3], expected_output: [], description: "empty array" },
    ],
    hints: [
      "Walk the array in steps of `size`.",
      "Use a for-loop incrementing `i` by `size` each iteration.",
      "Push `arr.slice(i, i + size)` into the result; slice safely handles the final short group.",
    ],
    orderIndex: 2,
  },

  // ── 3. unique (easy) ──────────────────────────────────────────────────────────
  {
    title: "Implement unique(arr)",
    slug: "implement-unique",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Unique\nWrite `unique(arr)` that returns a new array with duplicate primitive values removed, preserving first-seen order.\n\n**Example**\n```js\nunique([1, 2, 2, 3, 1]); // [1, 2, 3]\n```",
    fnName: "unique",
    starterCode: "function unique(arr) {\n  // your code here\n}\n",
    solutionCode: "function unique(arr) {\n  return [...new Set(arr)];\n}\n",
    annotatedSolution:
      "function unique(arr) {\n  // A Set keeps only distinct values and preserves insertion order;\n  // spreading it back into an array gives the de-duplicated result.\n  return [...new Set(arr)];\n}\n",
    testCases: [
      { input: [[1, 2, 2, 3, 1]], expected_output: [1, 2, 3], description: "removes duplicate numbers" },
      { input: [["a", "b", "a"]], expected_output: ["a", "b"], description: "removes duplicate strings" },
      { input: [[]], expected_output: [], description: "empty array" },
      { input: [[1, 1, 1]], expected_output: [1], description: "all duplicates collapse to one" },
    ],
    hints: [
      "A built-in collection only stores distinct values.",
      "A `Set` removes duplicates while preserving insertion order.",
      "Spread the Set back into an array: `[...new Set(arr)]`.",
    ],
    orderIndex: 3,
  },

  // ── 4. curry (easy) ───────────────────────────────────────────────────────────
  {
    title: "Curry: write curriedSum(args)",
    slug: "curried-add",
    difficulty: "easy",
    topicSlug: "closures",
    type: "js",
    description:
      "## Currying with closures\nCurrying turns `f(a, b, c)` into `f(a)(b)(c)` — a chain of one-argument functions, each closing over earlier arguments. Build a curried `add3` internally and demonstrate it.\n\nWrite `curriedSum(args)` where `args` is a 3-element array `[a, b, c]`. Inside, define `const add3 = a => b => c => a + b + c;` and return the result of applying it one argument at a time: `add3(a)(b)(c)`.\n\n**Example**\n```js\ncurriedSum([1, 2, 3]); // 6\n```",
    fnName: "curriedSum",
    starterCode:
      "function curriedSum(args) {\n  const [a, b, c] = args;\n  // define a curried add3 and apply it one arg at a time\n}\n",
    solutionCode:
      "function curriedSum(args) {\n  const [a, b, c] = args;\n  const add3 = (x) => (y) => (z) => x + y + z;\n  return add3(a)(b)(c);\n}\n",
    annotatedSolution:
      "function curriedSum(args) {\n  const [a, b, c] = args;\n  // Each arrow closes over the previously supplied argument; by the third\n  // call all three values are in scope to be summed.\n  const add3 = (x) => (y) => (z) => x + y + z;\n  // Apply one argument at a time — that's the essence of currying.\n  return add3(a)(b)(c);\n}\n",
    testCases: [
      { input: [[1, 2, 3]], expected_output: 6, description: "add3(1)(2)(3) === 6" },
      { input: [[10, 20, 30]], expected_output: 60, description: "add3(10)(20)(30) === 60" },
      { input: [[0, 0, 0]], expected_output: 0, description: "zeros sum to 0" },
      { input: [[-1, 1, 5]], expected_output: 5, description: "handles negatives" },
    ],
    hints: [
      "A curried function returns a new function expecting the next argument.",
      "Define `const add3 = x => y => z => x + y + z;` using closures.",
      "Apply it one argument at a time: `add3(a)(b)(c)` and return that value.",
    ],
    orderIndex: 4,
  },

  // ── 5. capitalize words (easy) ────────────────────────────────────────────────
  {
    title: "capitalize(words)",
    slug: "capitalize-words",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Capitalize words\nWrite `capitalize(str)` that uppercases the first letter of each space-separated word and lowercases the rest.\n\n**Example**\n```js\ncapitalize('hello WORLD'); // 'Hello World'\n```",
    fnName: "capitalize",
    starterCode: "function capitalize(str) {\n  // your code here\n}\n",
    solutionCode:
      "function capitalize(str) {\n  return str\n    .split(' ')\n    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))\n    .join(' ');\n}\n",
    annotatedSolution:
      "function capitalize(str) {\n  return str\n    .split(' ') // break into words\n    .map((w) =>\n      // uppercase first char, lowercase the rest; guard against empty pieces\n      w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w\n    )\n    .join(' '); // re-join with single spaces\n}\n",
    testCases: [
      { input: ["hello WORLD"], expected_output: "Hello World", description: "mixed case normalized" },
      { input: ["the quick brown fox"], expected_output: "The Quick Brown Fox", description: "all-lowercase title-cased" },
      { input: ["a"], expected_output: "A", description: "single character" },
      { input: [""], expected_output: "", description: "empty string" },
    ],
    hints: [
      "Process the string one word at a time.",
      "Split on spaces, transform each word, then join back.",
      "For each word use `w[0].toUpperCase() + w.slice(1).toLowerCase()`, guarding empty words.",
    ],
    orderIndex: 5,
  },

  // ── 6. range (easy) ───────────────────────────────────────────────────────────
  {
    title: "range(start, end)",
    slug: "implement-range",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Range\nWrite `range(start, end)` returning an array of integers from `start` up to but NOT including `end`.\n\n**Example**\n```js\nrange(1, 5); // [1, 2, 3, 4]\n```",
    fnName: "range",
    starterCode: "function range(start, end) {\n  // your code here\n}\n",
    solutionCode:
      "function range(start, end) {\n  const out = [];\n  for (let i = start; i < end; i++) out.push(i);\n  return out;\n}\n",
    annotatedSolution:
      "function range(start, end) {\n  const out = [];\n  // Inclusive of start, exclusive of end (half-open interval).\n  for (let i = start; i < end; i++) out.push(i);\n  return out;\n}\n",
    testCases: [
      { input: [1, 5], expected_output: [1, 2, 3, 4], description: "basic ascending range" },
      { input: [0, 3], expected_output: [0, 1, 2], description: "starts at zero" },
      { input: [5, 5], expected_output: [], description: "empty when start === end" },
      { input: [-2, 2], expected_output: [-2, -1, 0, 1], description: "negative start" },
    ],
    hints: [
      "Collect numbers into an array.",
      "Loop `i` from `start` while `i < end`.",
      "Push each `i` and return the array; the upper bound is exclusive.",
    ],
    orderIndex: 6,
  },

  // ── 7. countVowels (easy) ─────────────────────────────────────────────────────
  {
    title: "countVowels(str)",
    slug: "count-vowels",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Count vowels\nWrite `countVowels(str)` that returns how many vowels (a, e, i, o, u, case-insensitive) the string contains.\n\n**Example**\n```js\ncountVowels('Hello'); // 2\n```",
    fnName: "countVowels",
    starterCode: "function countVowels(str) {\n  // your code here\n}\n",
    solutionCode:
      "function countVowels(str) {\n  const m = str.match(/[aeiou]/gi);\n  return m ? m.length : 0;\n}\n",
    annotatedSolution:
      "function countVowels(str) {\n  // Global, case-insensitive match of any vowel.\n  const m = str.match(/[aeiou]/gi);\n  // `match` returns null when there are no matches, so coalesce to 0.\n  return m ? m.length : 0;\n}\n",
    testCases: [
      { input: ["Hello"], expected_output: 2, description: "counts e and o" },
      { input: ["xyz"], expected_output: 0, description: "no vowels" },
      { input: ["AEIOU"], expected_output: 5, description: "uppercase vowels" },
      { input: [""], expected_output: 0, description: "empty string" },
    ],
    hints: [
      "Vowels are a, e, i, o, u in either case.",
      "A regular expression with the global+ignorecase flags can find them all.",
      "`str.match(/[aeiou]/gi)` returns an array (or null); return its length or 0.",
    ],
    orderIndex: 7,
  },

  // ── 8. isPalindrome (easy) ────────────────────────────────────────────────────
  {
    title: "isPalindrome(str)",
    slug: "is-palindrome",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Palindrome\nWrite `isPalindrome(str)` that returns `true` if the string reads the same forwards and backwards, ignoring case and non-alphanumeric characters.\n\n**Example**\n```js\nisPalindrome('A man, a plan, a canal: Panama'); // true\n```",
    fnName: "isPalindrome",
    starterCode: "function isPalindrome(str) {\n  // your code here\n}\n",
    solutionCode:
      "function isPalindrome(str) {\n  const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return s === s.split('').reverse().join('');\n}\n",
    annotatedSolution:
      "function isPalindrome(str) {\n  // Normalize: lowercase and strip anything that isn't a letter/digit.\n  const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  // Compare to its reverse.\n  return s === s.split('').reverse().join('');\n}\n",
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected_output: true, description: "classic palindrome with punctuation" },
      { input: ["racecar"], expected_output: true, description: "simple palindrome" },
      { input: ["hello"], expected_output: false, description: "not a palindrome" },
      { input: [""], expected_output: true, description: "empty string is trivially a palindrome" },
    ],
    hints: [
      "Normalize the string before comparing.",
      "Lowercase it and remove non-alphanumeric characters with a regex.",
      "Compare the cleaned string to its reversed self.",
    ],
    orderIndex: 8,
  },

  // ── 9. retry (medium) ─────────────────────────────────────────────────────────
  {
    title: "Promise-based retry(fn, times)",
    slug: "promise-retry",
    difficulty: "medium",
    topicSlug: "promises-async",
    type: "js",
    description:
      "## Retry\nWrite an async function `retry(fn, times)` that calls `fn()` (which returns a Promise) and, if it rejects, retries up to `times` total attempts. Resolve with the first success; reject with the last error if all attempts fail.\n\n**Example**\n```js\nretry(flaky, 3); // resolves once flaky() succeeds within 3 tries\n```",
    fnName: "retry",
    starterCode:
      "async function retry(fn, times) {\n  // your code here\n}\n",
    solutionCode:
      "async function retry(fn, times) {\n  let lastErr;\n  for (let i = 0; i < times; i++) {\n    try {\n      return await fn();\n    } catch (err) {\n      lastErr = err;\n    }\n  }\n  throw lastErr;\n}\n",
    annotatedSolution:
      "async function retry(fn, times) {\n  let lastErr;\n  // Try up to `times` attempts.\n  for (let i = 0; i < times; i++) {\n    try {\n      // Success short-circuits the loop and resolves.\n      return await fn();\n    } catch (err) {\n      // Remember the error and loop to retry.\n      lastErr = err;\n    }\n  }\n  // Exhausted all attempts -> reject with the last error.\n  throw lastErr;\n}\n",
    testCases: [
      {
        input: [
          // a fn that fails the first two times, then succeeds. We build it
          // inline as part of the input so the test is self-contained.
          (() => {
            let n = 0;
            return () =>
              n++ < 2 ? Promise.reject(new Error("fail")) : Promise.resolve("ok");
          })(),
          5,
        ],
        expected_output: "ok",
        description: "succeeds on the third attempt within the limit",
      },
      {
        input: [() => Promise.resolve(42), 3],
        expected_output: 42,
        description: "resolves immediately on first success",
      },
    ],
    hints: [
      "Loop up to `times`, returning on the first success.",
      "Wrap each `await fn()` in try/catch and remember the latest error.",
      "After the loop, throw the saved error so the returned promise rejects.",
    ],
    orderIndex: 9,
  },

  // ── 10. groupBy (medium) ──────────────────────────────────────────────────────
  {
    title: "groupBy(arr, keyFn)",
    slug: "implement-groupby",
    difficulty: "medium",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Group by\nWrite `groupBy(arr, keyFn)` that returns an object mapping each computed key to the array of items that produced it (in original order).\n\n**Example**\n```js\ngroupBy([1, 2, 3, 4], n => n % 2 === 0 ? 'even' : 'odd');\n// { odd: [1, 3], even: [2, 4] }\n```",
    fnName: "groupBy",
    starterCode:
      "function groupBy(arr, keyFn) {\n  // your code here\n}\n",
    solutionCode:
      "function groupBy(arr, keyFn) {\n  return arr.reduce((acc, item) => {\n    const key = keyFn(item);\n    (acc[key] || (acc[key] = [])).push(item);\n    return acc;\n  }, {});\n}\n",
    annotatedSolution:
      "function groupBy(arr, keyFn) {\n  return arr.reduce((acc, item) => {\n    // Compute the bucket key for this item.\n    const key = keyFn(item);\n    // Create the bucket array on first use, then push.\n    (acc[key] || (acc[key] = [])).push(item);\n    return acc;\n  }, {});\n}\n",
    testCases: [
      {
        input: [[1, 2, 3, 4], (n: number) => (n % 2 === 0 ? "even" : "odd")],
        expected_output: { odd: [1, 3], even: [2, 4] },
        description: "groups odds and evens preserving order",
      },
      {
        input: [["apple", "banana", "avocado"], (s: string) => s[0]],
        expected_output: { a: ["apple", "avocado"], b: ["banana"] },
        description: "groups by first letter",
      },
      {
        input: [[], (x: unknown) => String(x)],
        expected_output: {},
        description: "empty input yields empty object",
      },
    ],
    hints: [
      "Reduce into a plain object keyed by the result of `keyFn`.",
      "For each item compute its key and append to that key's array.",
      "Lazily initialize the bucket: `(acc[key] || (acc[key] = [])).push(item)`.",
    ],
    orderIndex: 10,
  },

  // ── 11. memoize (medium) ──────────────────────────────────────────────────────
  {
    title: "memoize(fn)",
    slug: "implement-memoize",
    difficulty: "medium",
    topicSlug: "closures",
    type: "js",
    description:
      "## Memoize\nWrite `memoize(fn)` that returns a function caching results by its arguments. Repeated calls with the same args should NOT re-invoke `fn`.\n\nFor this exercise, return a function that, given an array of single-number-argument calls, returns the number of times the underlying function actually ran.\n\n**Example**\n```js\nmemoize([1, 1, 2, 1, 2]); // 2 (only 1 and 2 computed once each)\n```",
    fnName: "memoize",
    starterCode:
      "function memoize(calls) {\n  // your code here\n}\n",
    solutionCode:
      "function memoize(calls) {\n  let runs = 0;\n  const cache = new Map();\n  const expensive = (n) => {\n    runs++;\n    return n * n;\n  };\n  const memoized = (n) => {\n    if (cache.has(n)) return cache.get(n);\n    const v = expensive(n);\n    cache.set(n, v);\n    return v;\n  };\n  calls.forEach((n) => memoized(n));\n  return runs;\n}\n",
    annotatedSolution:
      "function memoize(calls) {\n  let runs = 0;\n  const cache = new Map(); // key -> cached result\n  const expensive = (n) => {\n    runs++; // count genuine computations\n    return n * n;\n  };\n  const memoized = (n) => {\n    // Cache hit: skip recomputation.\n    if (cache.has(n)) return cache.get(n);\n    const v = expensive(n);\n    cache.set(n, v);\n    return v;\n  };\n  // Replay the calls; only distinct args incur a real run.\n  calls.forEach((n) => memoized(n));\n  return runs;\n}\n",
    testCases: [
      { input: [[1, 1, 2, 1, 2]], expected_output: 2, description: "two distinct args computed once each" },
      { input: [[5, 5, 5]], expected_output: 1, description: "same arg cached after first call" },
      { input: [[1, 2, 3, 4]], expected_output: 4, description: "all distinct -> four runs" },
      { input: [[]], expected_output: 0, description: "no calls -> zero runs" },
    ],
    hints: [
      "Keep a cache keyed by argument and a counter of real computations.",
      "On each call, check the cache; only run the expensive function on a miss.",
      "Use a `Map`; increment the counter only inside the un-cached branch, then return the counter.",
    ],
    orderIndex: 11,
  },

  // ── 12. deep clone (medium) ───────────────────────────────────────────────────
  {
    title: "deepClone(value)",
    slug: "implement-deep-clone",
    difficulty: "medium",
    topicSlug: "prototypes",
    type: "js",
    description:
      "## Deep clone\nWrite `deepClone(value)` that returns a deep copy of nested plain objects and arrays. Mutating the clone must not affect the original.\n\n**Example**\n```js\nconst a = { x: { y: 1 } };\nconst b = deepClone(a);\nb.x.y = 2; // a.x.y is still 1\n```",
    fnName: "deepClone",
    starterCode: "function deepClone(value) {\n  // your code here\n}\n",
    solutionCode:
      "function deepClone(value) {\n  if (value === null || typeof value !== 'object') return value;\n  if (Array.isArray(value)) return value.map((v) => deepClone(v));\n  const out = {};\n  for (const k of Object.keys(value)) {\n    out[k] = deepClone(value[k]);\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function deepClone(value) {\n  // Primitives (and null) are copied by value already.\n  if (value === null || typeof value !== 'object') return value;\n  // Arrays: clone each element.\n  if (Array.isArray(value)) return value.map((v) => deepClone(v));\n  // Plain objects: clone each own enumerable property.\n  const out = {};\n  for (const k of Object.keys(value)) {\n    out[k] = deepClone(value[k]);\n  }\n  return out;\n}\n",
    testCases: [
      { input: [{ x: { y: 1 } }], expected_output: { x: { y: 1 } }, description: "nested object cloned by value" },
      { input: [[1, [2, [3]]]], expected_output: [1, [2, [3]]], description: "nested arrays cloned" },
      { input: [{ a: 1, b: [{ c: 2 }] }], expected_output: { a: 1, b: [{ c: 2 }] }, description: "mixed nesting" },
      { input: [42], expected_output: 42, description: "primitive returned as-is" },
    ],
    hints: [
      "Recurse over the structure.",
      "Return primitives directly; handle arrays and plain objects separately.",
      "For arrays map+recurse; for objects recurse over `Object.keys`. Base case is non-objects.",
    ],
    orderIndex: 12,
  },

  // ── 13. debounce pure variant (medium) ────────────────────────────────────────
  {
    title: "debounceTrailingValue(calls, windowSize)",
    slug: "debounce-pure-variant",
    difficulty: "medium",
    topicSlug: "event-loop",
    type: "js",
    description:
      "## Debounce (pure model)\nReal debouncing relies on timers, which aren't deterministic to test. Instead, model the OUTPUT of a trailing-edge debounce purely.\n\nWrite `debounceTrailingValue(calls, windowSize)`. Given an array of `{ time, value }` calls (sorted by `time`) and a `windowSize`, return the array of values a trailing debounce would actually emit: a call emits only if no later call arrives within `windowSize` of it (i.e. the next call's `time` is more than `windowSize` after it), and the final call always emits.\n\n**Example**\n```js\ndebounceTrailingValue([{time:0,value:'a'},{time:5,value:'b'},{time:100,value:'c'}], 10);\n// ['b', 'c']  (a is superseded by b within 10ms; b emits because c is >10ms later; c is last)\n```",
    fnName: "debounceTrailingValue",
    starterCode:
      "function debounceTrailingValue(calls, windowSize) {\n  // your code here\n}\n",
    solutionCode:
      "function debounceTrailingValue(calls, windowSize) {\n  const out = [];\n  for (let i = 0; i < calls.length; i++) {\n    const isLast = i === calls.length - 1;\n    const gapToNext = isLast ? Infinity : calls[i + 1].time - calls[i].time;\n    if (gapToNext > windowSize) out.push(calls[i].value);\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function debounceTrailingValue(calls, windowSize) {\n  const out = [];\n  for (let i = 0; i < calls.length; i++) {\n    const isLast = i === calls.length - 1;\n    // Time until the next call (Infinity if this is the last call).\n    const gapToNext = isLast ? Infinity : calls[i + 1].time - calls[i].time;\n    // A trailing debounce emits a call only if nothing follows within the window.\n    if (gapToNext > windowSize) out.push(calls[i].value);\n  }\n  return out;\n}\n",
    testCases: [
      {
        input: [
          [
            { time: 0, value: "a" },
            { time: 5, value: "b" },
            { time: 100, value: "c" },
          ],
          10,
        ],
        expected_output: ["b", "c"],
        description: "a superseded by b; b and c emit",
      },
      {
        input: [[{ time: 0, value: "only" }], 50],
        expected_output: ["only"],
        description: "single call always emits",
      },
      {
        input: [
          [
            { time: 0, value: "x" },
            { time: 100, value: "y" },
            { time: 200, value: "z" },
          ],
          10,
        ],
        expected_output: ["x", "y", "z"],
        description: "all spaced beyond the window, all emit",
      },
    ],
    hints: [
      "A trailing debounce drops a call if a newer one arrives too soon after it.",
      "For each call compute the gap to the next call; the last call has an infinite gap.",
      "Emit the value when that gap exceeds `windowSize`.",
    ],
    orderIndex: 13,
  },

  // ── 14. rewrite RxJS chain with async (medium) ────────────────────────────────
  {
    title: "Rewrite an RxJS observable chain using Promises/async-await",
    slug: "rxjs-to-async",
    difficulty: "medium",
    topicSlug: "promises-async",
    type: "js",
    description:
      "## From Observables to async/await\nAn Angular service used an RxJS pipe like:\n```ts\nof(...nums).pipe(\n  filter(n => n % 2 === 0),\n  map(n => n * 10),\n  scan((acc, n) => acc + n, 0)\n).subscribe(last => ...) // final accumulated value\n```\nRe-express this as a deterministic async function. Write `async function transform(nums)` that, over the input array, keeps even numbers, multiplies each by 10, and returns the SUM of the results (the final scan value). Use `await` on an async step to mirror the async pipeline.\n\n**Example**\n```js\nawait transform([1, 2, 3, 4]); // 60  ((2*10)+(4*10))\n```",
    fnName: "transform",
    starterCode:
      "async function transform(nums) {\n  // your code here\n}\n",
    solutionCode:
      "async function transform(nums) {\n  const evens = nums.filter((n) => n % 2 === 0);\n  const scaled = await Promise.all(evens.map((n) => Promise.resolve(n * 10)));\n  return scaled.reduce((acc, n) => acc + n, 0);\n}\n",
    annotatedSolution:
      "async function transform(nums) {\n  // filter() mirrors RxJS filter(n => n % 2 === 0)\n  const evens = nums.filter((n) => n % 2 === 0);\n  // map + await Promise.all mirrors an async map(n => n * 10) step\n  const scaled = await Promise.all(evens.map((n) => Promise.resolve(n * 10)));\n  // reduce mirrors scan((acc, n) => acc + n, 0), returning the final value\n  return scaled.reduce((acc, n) => acc + n, 0);\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4]], expected_output: 60, description: "evens 2,4 -> 20+40" },
      { input: [[1, 3, 5]], expected_output: 0, description: "no evens -> 0" },
      { input: [[2, 4, 6]], expected_output: 120, description: "all evens -> 20+40+60" },
      { input: [[]], expected_output: 0, description: "empty input -> 0" },
    ],
    hints: [
      "Translate each RxJS operator to an array method: filter -> filter, map -> map, scan -> reduce.",
      "Wrap the map step in `await Promise.all(...)` to model the async pipeline deterministically.",
      "Filter evens, multiply by 10, then reduce to the sum and return it.",
    ],
    orderIndex: 14,
  },

  // ── 15. flattenDeep / fibonacci (medium) ──────────────────────────────────────
  {
    title: "fib(n) memoized",
    slug: "fibonacci-memoized",
    difficulty: "medium",
    topicSlug: "closures",
    type: "js",
    description:
      "## Fibonacci\nWrite `fib(n)` returning the nth Fibonacci number (0-indexed: `fib(0) === 0`, `fib(1) === 1`). It should be efficient for moderately large `n`.\n\n**Example**\n```js\nfib(10); // 55\n```",
    fnName: "fib",
    starterCode: "function fib(n) {\n  // your code here\n}\n",
    solutionCode:
      "function fib(n) {\n  let a = 0;\n  let b = 1;\n  for (let i = 0; i < n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return a;\n}\n",
    annotatedSolution:
      "function fib(n) {\n  // Iterative bottom-up avoids exponential recursion.\n  let a = 0; // fib(i)\n  let b = 1; // fib(i + 1)\n  for (let i = 0; i < n; i++) {\n    // Advance the pair using destructuring swap.\n    [a, b] = [b, a + b];\n  }\n  return a;\n}\n",
    testCases: [
      { input: [0], expected_output: 0, description: "base case 0" },
      { input: [1], expected_output: 1, description: "base case 1" },
      { input: [10], expected_output: 55, description: "fib(10)" },
      { input: [20], expected_output: 6765, description: "larger n stays fast" },
    ],
    hints: [
      "Avoid naive recursion (it's exponential).",
      "Track the last two values and iterate upward.",
      "Use a destructuring swap `[a, b] = [b, a + b]` n times; return `a`.",
    ],
    orderIndex: 15,
  },

  // ── 16. compose / pipe (medium) ───────────────────────────────────────────────
  {
    title: "pipe(...fns)",
    slug: "implement-pipe",
    difficulty: "medium",
    topicSlug: "closures",
    type: "js",
    description:
      "## Pipe\nWrite `pipe(...fns)` that returns a function applying `fns` left-to-right to its input.\n\nFor deterministic testing, `pipe` receives the list of functions plus the initial value packaged so the runner can call it. Implement `pipe(fns, x)` that runs each function in `fns` over `x`, left-to-right, and returns the result.\n\n**Example**\n```js\npipe([n => n + 1, n => n * 2], 3); // 8\n```",
    fnName: "pipe",
    starterCode: "function pipe(fns, x) {\n  // your code here\n}\n",
    solutionCode:
      "function pipe(fns, x) {\n  return fns.reduce((acc, fn) => fn(acc), x);\n}\n",
    annotatedSolution:
      "function pipe(fns, x) {\n  // Thread `x` through each function left-to-right; the accumulator is the\n  // running value, starting from the initial input.\n  return fns.reduce((acc, fn) => fn(acc), x);\n}\n",
    testCases: [
      {
        input: [[(n: number) => n + 1, (n: number) => n * 2], 3],
        expected_output: 8,
        description: "(3+1)*2 = 8, left-to-right",
      },
      {
        input: [[(s: string) => s.trim(), (s: string) => s.toUpperCase()], "  hi  "],
        expected_output: "HI",
        description: "string transforms compose",
      },
      { input: [[], 5], expected_output: 5, description: "no functions returns input" },
    ],
    hints: [
      "Reduce over the functions, feeding each result into the next.",
      "Start the accumulator at the initial value `x`.",
      "`fns.reduce((acc, fn) => fn(acc), x)` applies them left-to-right.",
    ],
    orderIndex: 16,
  },

  // ── 17. createStore (hard) ────────────────────────────────────────────────────
  {
    title: "Redux-like createStore(reducer)",
    slug: "implement-create-store",
    difficulty: "hard",
    topicSlug: "usereducer",
    type: "js",
    description:
      "## createStore\nImplement a minimal Redux-like store. `createStore(reducer, preloadedState)` returns `{ getState, dispatch, subscribe }`:\n- `getState()` returns the current state.\n- `dispatch(action)` runs `reducer(state, action)`, stores the result, and notifies subscribers.\n- `subscribe(listener)` registers a listener and returns an unsubscribe function.\n\nFor deterministic testing, write `createStore(actions)` that builds a counter store (reducer handling `INCREMENT`/`DECREMENT`), dispatches every action in the `actions` array, and returns the final `getState()` value `{ count }`.\n\n**Example**\n```js\ncreateStore([{type:'INCREMENT'}, {type:'INCREMENT'}, {type:'DECREMENT'}]);\n// { count: 1 }\n```",
    fnName: "createStore",
    starterCode:
      "function createStore(actions) {\n  // build a store, dispatch each action, return final state\n}\n",
    solutionCode:
      "function createStore(actions) {\n  function reducer(state, action) {\n    switch (action.type) {\n      case 'INCREMENT':\n        return { count: state.count + 1 };\n      case 'DECREMENT':\n        return { count: state.count - 1 };\n      default:\n        return state;\n    }\n  }\n  let state = { count: 0 };\n  const listeners = [];\n  const getState = () => state;\n  const dispatch = (action) => {\n    state = reducer(state, action);\n    listeners.forEach((l) => l());\n    return action;\n  };\n  const subscribe = (l) => {\n    listeners.push(l);\n    return () => {\n      const i = listeners.indexOf(l);\n      if (i >= 0) listeners.splice(i, 1);\n    };\n  };\n  // Wire up the public store API (returned in a real implementation).\n  const store = { getState, dispatch, subscribe };\n  actions.forEach((a) => store.dispatch(a));\n  return store.getState();\n}\n",
    annotatedSolution:
      "function createStore(actions) {\n  // The reducer is a pure (state, action) -> state function.\n  function reducer(state, action) {\n    switch (action.type) {\n      case 'INCREMENT':\n        return { count: state.count + 1 };\n      case 'DECREMENT':\n        return { count: state.count - 1 };\n      default:\n        return state; // unknown actions leave state untouched\n    }\n  }\n  let state = { count: 0 }; // private state\n  const listeners = [];\n  const getState = () => state; // read the current state\n  const dispatch = (action) => {\n    state = reducer(state, action); // compute next state\n    listeners.forEach((l) => l()); // notify subscribers\n    return action;\n  };\n  const subscribe = (l) => {\n    listeners.push(l);\n    // Returned unsubscribe removes the listener.\n    return () => {\n      const i = listeners.indexOf(l);\n      if (i >= 0) listeners.splice(i, 1);\n    };\n  };\n  const store = { getState, dispatch, subscribe };\n  // Drive the store with the provided actions and read the final state.\n  actions.forEach((a) => store.dispatch(a));\n  return store.getState();\n}\n",
    testCases: [
      {
        input: [[{ type: "INCREMENT" }, { type: "INCREMENT" }, { type: "DECREMENT" }]],
        expected_output: { count: 1 },
        description: "+1 +1 -1 = 1",
      },
      { input: [[]], expected_output: { count: 0 }, description: "no actions -> initial state" },
      {
        input: [[{ type: "DECREMENT" }, { type: "UNKNOWN" }]],
        expected_output: { count: -1 },
        description: "unknown action ignored",
      },
    ],
    hints: [
      "Keep private state plus an array of listeners in a closure.",
      "Expose getState/dispatch/subscribe; dispatch runs the reducer and notifies listeners.",
      "After defining the store, dispatch each action in order and return getState().",
    ],
    orderIndex: 17,
  },

  // ── 18. event emitter (hard) ──────────────────────────────────────────────────
  {
    title: "EventEmitter (on/emit/off)",
    slug: "implement-event-emitter",
    difficulty: "hard",
    topicSlug: "closures",
    type: "js",
    description:
      "## EventEmitter\nImplement a tiny event emitter supporting `on(event, handler)`, `emit(event, ...args)`, and `off(event, handler)`.\n\nFor deterministic testing, write `runEmitter(script)`. `script` is an array of operations; replay them against an emitter and return an array recording the values handlers received via `emit`. Operations:\n- `{ op: 'on', event, id }` — register a handler that, when called with a value, records `\"<id>:<value>\"`.\n- `{ op: 'off', event, id }` — remove the handler registered with that id.\n- `{ op: 'emit', event, value }` — emit, invoking current handlers with `value`.\n\nReturn the array of recorded strings, in the order handlers ran.\n\n**Example**\n```js\nrunEmitter([\n  { op:'on', event:'tick', id:'A' },\n  { op:'emit', event:'tick', value:1 },\n  { op:'off', event:'tick', id:'A' },\n  { op:'emit', event:'tick', value:2 },\n]); // ['A:1']\n```",
    fnName: "runEmitter",
    starterCode:
      "function runEmitter(script) {\n  // build an emitter, replay the script, return recorded outputs\n}\n",
    solutionCode:
      "function runEmitter(script) {\n  const log = [];\n  const events = {};\n  const handlers = {};\n  const on = (event, id, fn) => {\n    (events[event] || (events[event] = [])).push(fn);\n    handlers[event + ':' + id] = fn;\n  };\n  const off = (event, id) => {\n    const key = event + ':' + id;\n    const fn = handlers[key];\n    if (!fn || !events[event]) return;\n    events[event] = events[event].filter((h) => h !== fn);\n    delete handlers[key];\n  };\n  const emit = (event, value) => {\n    (events[event] || []).forEach((h) => h(value));\n  };\n  for (const step of script) {\n    if (step.op === 'on') {\n      on(step.event, step.id, (v) => log.push(step.id + ':' + v));\n    } else if (step.op === 'off') {\n      off(step.event, step.id);\n    } else if (step.op === 'emit') {\n      emit(step.event, step.value);\n    }\n  }\n  return log;\n}\n",
    annotatedSolution:
      "function runEmitter(script) {\n  const log = [];\n  const events = {}; // event -> array of handler fns (registration order)\n  const handlers = {}; // 'event:id' -> fn, so we can remove by id later\n  const on = (event, id, fn) => {\n    (events[event] || (events[event] = [])).push(fn);\n    handlers[event + ':' + id] = fn;\n  };\n  const off = (event, id) => {\n    const key = event + ':' + id;\n    const fn = handlers[key];\n    if (!fn || !events[event]) return;\n    // Remove only the matching handler reference.\n    events[event] = events[event].filter((h) => h !== fn);\n    delete handlers[key];\n  };\n  const emit = (event, value) => {\n    (events[event] || []).forEach((h) => h(value));\n  };\n  for (const step of script) {\n    if (step.op === 'on') {\n      // Handler records 'id:value' so we can observe what it received.\n      on(step.event, step.id, (v) => log.push(step.id + ':' + v));\n    } else if (step.op === 'off') {\n      off(step.event, step.id);\n    } else if (step.op === 'emit') {\n      emit(step.event, step.value);\n    }\n  }\n  return log;\n}\n",
    testCases: [
      {
        input: [
          [
            { op: "on", event: "tick", id: "A" },
            { op: "emit", event: "tick", value: 1 },
            { op: "off", event: "tick", id: "A" },
            { op: "emit", event: "tick", value: 2 },
          ],
        ],
        expected_output: ["A:1"],
        description: "handler removed before second emit",
      },
      {
        input: [
          [
            { op: "on", event: "x", id: "A" },
            { op: "on", event: "x", id: "B" },
            { op: "emit", event: "x", value: 9 },
          ],
        ],
        expected_output: ["A:9", "B:9"],
        description: "multiple handlers fire in registration order",
      },
      {
        input: [[{ op: "emit", event: "none", value: 1 }]],
        expected_output: [],
        description: "emitting an event with no handlers is a no-op",
      },
    ],
    hints: [
      "Store handlers per event name in arrays.",
      "Track handlers by an id key so `off` can remove the exact function.",
      "`emit` iterates the event's handlers in order; replay the script and collect outputs.",
    ],
    orderIndex: 18,
  },

  // ── 19. mapLimit / promise pool (hard) ────────────────────────────────────────
  {
    title: "mapLimit(items, limit, asyncFn)",
    slug: "implement-map-limit",
    difficulty: "hard",
    topicSlug: "promises-async",
    type: "js",
    description:
      "## mapLimit (promise pool)\nWrite `async function mapLimit(items, limit, asyncFn)` that maps `asyncFn` over `items` running at most `limit` operations concurrently, and resolves to the results **in the original order**.\n\n**Example**\n```js\nawait mapLimit([1, 2, 3], 2, async n => n * 2); // [2, 4, 6]\n```",
    fnName: "mapLimit",
    starterCode:
      "async function mapLimit(items, limit, asyncFn) {\n  // your code here\n}\n",
    solutionCode:
      "async function mapLimit(items, limit, asyncFn) {\n  const results = new Array(items.length);\n  let next = 0;\n  async function worker() {\n    while (next < items.length) {\n      const i = next++;\n      results[i] = await asyncFn(items[i], i);\n    }\n  }\n  const pool = Array.from({ length: Math.min(limit, items.length) }, () => worker());\n  await Promise.all(pool);\n  return results;\n}\n",
    annotatedSolution:
      "async function mapLimit(items, limit, asyncFn) {\n  const results = new Array(items.length); // preserve original order by index\n  let next = 0; // shared cursor into items\n  async function worker() {\n    // Each worker repeatedly claims the next index until items are exhausted.\n    while (next < items.length) {\n      const i = next++;\n      results[i] = await asyncFn(items[i], i);\n    }\n  }\n  // Spin up at most `limit` workers (no more than there are items).\n  const pool = Array.from(\n    { length: Math.min(limit, items.length) },\n    () => worker()\n  );\n  await Promise.all(pool); // wait for every worker to drain the queue\n  return results;\n}\n",
    testCases: [
      {
        input: [[1, 2, 3], 2, async (n: number) => n * 2],
        expected_output: [2, 4, 6],
        description: "results stay in original order",
      },
      {
        input: [[], 3, async (n: number) => n],
        expected_output: [],
        description: "empty input resolves to empty array",
      },
      {
        input: [[5, 4, 3, 2, 1], 1, async (n: number) => n + 1],
        expected_output: [6, 5, 4, 3, 2],
        description: "limit 1 processes sequentially, order preserved",
      },
    ],
    hints: [
      "Pre-size a results array indexed by position so order survives concurrency.",
      "Use a shared cursor and a fixed number of 'worker' loops that claim the next index.",
      "Run `min(limit, items.length)` workers and `await Promise.all` of them.",
    ],
    orderIndex: 19,
  },

  // ── 20. once (hard) ───────────────────────────────────────────────────────────
  {
    title: "once(fn) caching first result",
    slug: "implement-once",
    difficulty: "hard",
    topicSlug: "closures",
    type: "js",
    description:
      "## once\n`once(fn)` returns a function that invokes `fn` only the first time and returns that first result on every later call.\n\nFor deterministic testing, write `once(callCount)`: create an `add` that increments an internal counter and returns it, wrap it with a `once` implementation, call the wrapped function `callCount` times, and return an array of the values returned by each call.\n\n**Example**\n```js\nonce(3); // [1, 1, 1]  (only the first call runs add; result cached)\n```",
    fnName: "once",
    starterCode: "function once(callCount) {\n  // your code here\n}\n",
    solutionCode:
      "function once(callCount) {\n  let counter = 0;\n  const add = () => ++counter;\n  const onceify = (fn) => {\n    let called = false;\n    let result;\n    return () => {\n      if (!called) {\n        called = true;\n        result = fn();\n      }\n      return result;\n    };\n  };\n  const wrapped = onceify(add);\n  const out = [];\n  for (let i = 0; i < callCount; i++) out.push(wrapped());\n  return out;\n}\n",
    annotatedSolution:
      "function once(callCount) {\n  let counter = 0;\n  const add = () => ++counter; // side-effecting function we want to call once\n  const onceify = (fn) => {\n    let called = false;\n    let result;\n    return () => {\n      // First call runs fn and caches the result.\n      if (!called) {\n        called = true;\n        result = fn();\n      }\n      // Subsequent calls return the cached value without re-running fn.\n      return result;\n    };\n  };\n  const wrapped = onceify(add);\n  const out = [];\n  for (let i = 0; i < callCount; i++) out.push(wrapped());\n  return out;\n}\n",
    testCases: [
      { input: [3], expected_output: [1, 1, 1], description: "fn runs once; cached result repeats" },
      { input: [1], expected_output: [1], description: "single call" },
      { input: [0], expected_output: [], description: "no calls" },
      { input: [5], expected_output: [1, 1, 1, 1, 1], description: "still cached across many calls" },
    ],
    hints: [
      "Track whether the function has run and cache its result via closure.",
      "On the first invocation set a flag and store the result; otherwise return the stored value.",
      "Wrap an incrementing `add`; calling the wrapper N times should yield N copies of the first result.",
    ],
    orderIndex: 20,
  },

  // ── 21. LRU cache (hard) ──────────────────────────────────────────────────────
  {
    title: "LRU cache",
    slug: "implement-lru-cache",
    difficulty: "hard",
    topicSlug: "closures",
    type: "js",
    description:
      "## LRU cache\nImplement a fixed-capacity Least-Recently-Used cache. On `get`, the key becomes most-recently used. On `set`, if at capacity, evict the least-recently used key.\n\nFor deterministic testing, write `lru(capacity, ops)`. `ops` is an array of operations against the cache; return an array of the results of every `get` operation.\n- `['set', key, value]` — insert/update.\n- `['get', key]` — record the value, or `null` if absent.\n\n**Example**\n```js\nlru(2, [['set','a',1],['set','b',2],['get','a'],['set','c',3],['get','b']]);\n// [1, null]  (setting c evicted b, the least-recently used)\n```",
    fnName: "lru",
    starterCode:
      "function lru(capacity, ops) {\n  // your code here\n}\n",
    solutionCode:
      "function lru(capacity, ops) {\n  const map = new Map();\n  const out = [];\n  const get = (key) => {\n    if (!map.has(key)) return null;\n    const val = map.get(key);\n    map.delete(key);\n    map.set(key, val);\n    return val;\n  };\n  const set = (key, val) => {\n    if (map.has(key)) map.delete(key);\n    map.set(key, val);\n    if (map.size > capacity) {\n      const oldest = map.keys().next().value;\n      map.delete(oldest);\n    }\n  };\n  for (const op of ops) {\n    if (op[0] === 'set') set(op[1], op[2]);\n    else if (op[0] === 'get') out.push(get(op[1]));\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function lru(capacity, ops) {\n  // A Map preserves insertion order; we treat the FRONT as least-recently used.\n  const map = new Map();\n  const out = [];\n  const get = (key) => {\n    if (!map.has(key)) return null;\n    const val = map.get(key);\n    // Re-insert to mark as most-recently used (moves to the end).\n    map.delete(key);\n    map.set(key, val);\n    return val;\n  };\n  const set = (key, val) => {\n    if (map.has(key)) map.delete(key); // refresh position\n    map.set(key, val);\n    if (map.size > capacity) {\n      // Evict the oldest entry (first key in iteration order).\n      const oldest = map.keys().next().value;\n      map.delete(oldest);\n    }\n  };\n  for (const op of ops) {\n    if (op[0] === 'set') set(op[1], op[2]);\n    else if (op[0] === 'get') out.push(get(op[1]));\n  }\n  return out;\n}\n",
    testCases: [
      {
        input: [
          2,
          [
            ["set", "a", 1],
            ["set", "b", 2],
            ["get", "a"],
            ["set", "c", 3],
            ["get", "b"],
          ],
        ],
        expected_output: [1, null],
        description: "setting c evicts least-recently-used b",
      },
      {
        input: [
          1,
          [
            ["set", "x", 10],
            ["set", "y", 20],
            ["get", "x"],
            ["get", "y"],
          ],
        ],
        expected_output: [null, 20],
        description: "capacity 1 keeps only the newest",
      },
      {
        input: [2, [["get", "missing"]]],
        expected_output: [null],
        description: "missing key returns null",
      },
    ],
    hints: [
      "A `Map` remembers insertion order — use that to track recency.",
      "On get/set, delete then re-set the key to move it to the most-recent end.",
      "When size exceeds capacity, evict the first key from `map.keys().next().value`.",
    ],
    orderIndex: 21,
  },

  // ── 22. Counter with useReducer (react, easy-mid) ─────────────────────────────
  {
    title: "Build a Counter with useReducer",
    slug: "react-counter-usereducer",
    difficulty: "medium",
    topicSlug: "usereducer",
    type: "react",
    description:
      "## Counter with useReducer\nBuild a `Counter` (default export `App`) using `useReducer`. It shows the current count and has three buttons: **Increment**, **Decrement**, and **Reset**. The reducer must handle `'increment'`, `'decrement'`, and `'reset'` actions.\n\nUse a pure reducer that returns a new state object each time.",
    fnName: "App",
    starterCode:
      "import { useReducer } from 'react';\n\nfunction reducer(state, action) {\n  // handle 'increment' | 'decrement' | 'reset'\n  return state;\n}\n\nexport default function App() {\n  // const [state, dispatch] = useReducer(reducer, { count: 0 });\n  return <div>build me</div>;\n}\n",
    solutionCode:
      "import { useReducer } from 'react';\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    case 'reset':\n      return { count: 0 };\n    default:\n      return state;\n  }\n}\n\nexport default function App() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  return (\n    <div>\n      <h1>Count: {state.count}</h1>\n      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>\n      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n    </div>\n  );\n}\n",
    annotatedSolution:
      "import { useReducer } from 'react';\n\n// Pure reducer: (state, action) -> new state. Never mutate `state`.\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    case 'reset':\n      return { count: 0 };\n    default:\n      return state; // ignore unknown actions\n  }\n}\n\nexport default function App() {\n  // dispatch sends actions; React runs the reducer to get the next state.\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  return (\n    <div>\n      <h1>Count: {state.count}</h1>\n      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>\n      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n    </div>\n  );\n}\n",
    testCases: [],
    reactChecklist: [
      "The current count is displayed and starts at 0.",
      "Clicking Increment raises the count by 1.",
      "Clicking Decrement lowers the count by 1 (and can go negative).",
      "Clicking Reset sets the count back to 0.",
      "All updates go through dispatch + a pure reducer (no direct setState of count).",
    ],
    hints: [
      "Model state as `{ count }` and drive changes through `dispatch`.",
      "Write a switch-based reducer handling 'increment', 'decrement', and 'reset'.",
      "Each button calls `dispatch({ type })`; render `state.count` in the UI.",
    ],
    orderIndex: 22,
  },

  // ── 23. Controlled form (react, medium) ───────────────────────────────────────
  {
    title: "Controlled sign-up form",
    slug: "react-controlled-form",
    difficulty: "medium",
    topicSlug: "forms",
    type: "react",
    description:
      "## Controlled form\nBuild a controlled form (default export `App`) with **name** and **email** text inputs and a **Submit** button. Each input's value must be driven by state. On submit, prevent the default page reload and show a confirmation like `Submitted: <name> (<email>)`.",
    fnName: "App",
    starterCode:
      "import { useState } from 'react';\n\nexport default function App() {\n  // hold form state, render controlled inputs, handle submit\n  return <form>build me</form>;\n}\n",
    solutionCode:
      "import { useState } from 'react';\n\nexport default function App() {\n  const [form, setForm] = useState({ name: '', email: '' });\n  const [submitted, setSubmitted] = useState(null);\n\n  const handleChange = (e) =>\n    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    setSubmitted(`Submitted: ${form.name} (${form.email})`);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        name=\"name\"\n        placeholder=\"Name\"\n        value={form.name}\n        onChange={handleChange}\n      />\n      <input\n        name=\"email\"\n        placeholder=\"Email\"\n        value={form.email}\n        onChange={handleChange}\n      />\n      <button type=\"submit\">Submit</button>\n      {submitted && <p>{submitted}</p>}\n    </form>\n  );\n}\n",
    annotatedSolution:
      "import { useState } from 'react';\n\nexport default function App() {\n  // One state object holds every field, keyed by input `name`.\n  const [form, setForm] = useState({ name: '', email: '' });\n  const [submitted, setSubmitted] = useState(null);\n\n  // Generic handler: computed property name routes the change to the right field.\n  const handleChange = (e) =>\n    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));\n\n  const handleSubmit = (e) => {\n    e.preventDefault(); // stop the browser's full-page submit\n    setSubmitted(`Submitted: ${form.name} (${form.email})`);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* value + onChange => controlled inputs; React is the source of truth */}\n      <input name=\"name\" placeholder=\"Name\" value={form.name} onChange={handleChange} />\n      <input name=\"email\" placeholder=\"Email\" value={form.email} onChange={handleChange} />\n      <button type=\"submit\">Submit</button>\n      {submitted && <p>{submitted}</p>}\n    </form>\n  );\n}\n",
    testCases: [],
    reactChecklist: [
      "Both inputs are controlled (each has value bound to state and an onChange).",
      "Typing in an input updates only that field's state.",
      "Submitting does NOT reload the page (preventDefault is called).",
      "After submit, a confirmation shows the entered name and email.",
    ],
    hints: [
      "Store fields in a single state object keyed by input `name`.",
      "Use one onChange that spreads prev state and sets `[e.target.name]`.",
      "In onSubmit call `e.preventDefault()` then render the captured values.",
    ],
    orderIndex: 23,
  },

  // ── 24. useFetch custom hook (react, medium) ──────────────────────────────────
  {
    title: "Write a useFetch custom hook",
    slug: "react-use-fetch",
    difficulty: "medium",
    topicSlug: "custom-hooks",
    type: "react",
    description:
      "## useFetch\nWrite a custom hook `useFetch(url)` returning `{ data, loading, error }`. It fetches when `url` changes, exposes a loading flag, captures errors, and cancels stale responses (so a fast URL change doesn't overwrite newer data). Provide an `App` that uses it.",
    fnName: "App",
    starterCode:
      "import { useState, useEffect } from 'react';\n\nfunction useFetch(url) {\n  // return { data, loading, error }\n}\n\nexport default function App() {\n  const { data, loading, error } = useFetch('/api/example');\n  return <div>build me</div>;\n}\n",
    solutionCode:
      "import { useState, useEffect } from 'react';\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let active = true;\n    setLoading(true);\n    setError(null);\n    fetch(url)\n      .then((res) => {\n        if (!res.ok) throw new Error(`HTTP ${res.status}`);\n        return res.json();\n      })\n      .then((json) => {\n        if (active) {\n          setData(json);\n          setLoading(false);\n        }\n      })\n      .catch((err) => {\n        if (active) {\n          setError(err);\n          setLoading(false);\n        }\n      });\n    return () => {\n      active = false;\n    };\n  }, [url]);\n\n  return { data, loading, error };\n}\n\nexport default function App() {\n  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');\n  if (loading) return <p>Loading…</p>;\n  if (error) return <p>Error: {error.message}</p>;\n  return <pre>{JSON.stringify(data, null, 2)}</pre>;\n}\n",
    annotatedSolution:
      "import { useState, useEffect } from 'react';\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    // `active` guards against setting state from a stale request after the\n    // url changed or the component unmounted (cleanup sets it false).\n    let active = true;\n    setLoading(true);\n    setError(null);\n    fetch(url)\n      .then((res) => {\n        if (!res.ok) throw new Error(`HTTP ${res.status}`);\n        return res.json();\n      })\n      .then((json) => {\n        if (active) { setData(json); setLoading(false); }\n      })\n      .catch((err) => {\n        if (active) { setError(err); setLoading(false); }\n      });\n    // Cleanup runs on url change / unmount -> ignore the in-flight response.\n    return () => { active = false; };\n  }, [url]); // re-fetch whenever url changes\n\n  return { data, loading, error };\n}\n\nexport default function App() {\n  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');\n  if (loading) return <p>Loading…</p>;\n  if (error) return <p>Error: {error.message}</p>;\n  return <pre>{JSON.stringify(data, null, 2)}</pre>;\n}\n",
    testCases: [],
    reactChecklist: [
      "The hook returns an object with data, loading, and error.",
      "loading is true initially and becomes false after the fetch settles.",
      "A failed/non-ok response populates error (and stops loading).",
      "The effect re-runs when url changes (url is in the dependency array).",
      "A cleanup flag prevents stale responses from overwriting newer state.",
    ],
    hints: [
      "Hold data, loading, and error as separate state and reset them when url changes.",
      "Fetch inside useEffect keyed on [url]; set loading false in both then and catch.",
      "Use a local `active` boolean and a cleanup that flips it to ignore stale responses.",
    ],
    orderIndex: 24,
  },

  // ── 25. Lift state up (react, medium) ─────────────────────────────────────────
  {
    title: "Lift state up between two inputs",
    slug: "react-lift-state-up",
    difficulty: "medium",
    topicSlug: "lifting-state",
    type: "react",
    description:
      "## Lift state up\nBuild a temperature converter (default export `App`) with two inputs: **Celsius** and **Fahrenheit**. Typing in either updates the other live. Hold the temperature in the common parent (`App`) and pass value + onChange down to each input — do NOT keep separate state inside each input.",
    fnName: "App",
    starterCode:
      "import { useState } from 'react';\n\nfunction TempInput({ label, value, onChange }) {\n  return (\n    <label>{label}: <input value={value} onChange={(e) => onChange(e.target.value)} /></label>\n  );\n}\n\nexport default function App() {\n  // lift the temperature state here\n  return <div>build me</div>;\n}\n",
    solutionCode:
      "import { useState } from 'react';\n\nfunction TempInput({ label, value, onChange }) {\n  return (\n    <label>\n      {label}: <input value={value} onChange={(e) => onChange(e.target.value)} />\n    </label>\n  );\n}\n\nconst toF = (c) => (c * 9) / 5 + 32;\nconst toC = (f) => ((f - 32) * 5) / 9;\nconst round = (n) => (Number.isFinite(n) ? Math.round(n * 100) / 100 : '');\n\nexport default function App() {\n  const [celsius, setCelsius] = useState('');\n\n  const handleCelsius = (val) => setCelsius(val);\n  const handleFahrenheit = (val) =>\n    setCelsius(val === '' ? '' : String(round(toC(parseFloat(val)))));\n\n  const fahrenheit = celsius === '' ? '' : String(round(toF(parseFloat(celsius))));\n\n  return (\n    <div>\n      <TempInput label=\"Celsius\" value={celsius} onChange={handleCelsius} />\n      <TempInput label=\"Fahrenheit\" value={fahrenheit} onChange={handleFahrenheit} />\n    </div>\n  );\n}\n",
    annotatedSolution:
      "import { useState } from 'react';\n\n// Presentational, fully controlled by props — no internal state.\nfunction TempInput({ label, value, onChange }) {\n  return (\n    <label>\n      {label}: <input value={value} onChange={(e) => onChange(e.target.value)} />\n    </label>\n  );\n}\n\nconst toF = (c) => (c * 9) / 5 + 32;\nconst toC = (f) => ((f - 32) * 5) / 9;\nconst round = (n) => (Number.isFinite(n) ? Math.round(n * 100) / 100 : '');\n\nexport default function App() {\n  // Single source of truth lives in the common parent.\n  const [celsius, setCelsius] = useState('');\n\n  const handleCelsius = (val) => setCelsius(val);\n  // Editing Fahrenheit converts back to Celsius — the one stored value.\n  const handleFahrenheit = (val) =>\n    setCelsius(val === '' ? '' : String(round(toC(parseFloat(val)))));\n\n  // Fahrenheit is derived from the stored Celsius each render.\n  const fahrenheit = celsius === '' ? '' : String(round(toF(parseFloat(celsius))));\n\n  return (\n    <div>\n      <TempInput label=\"Celsius\" value={celsius} onChange={handleCelsius} />\n      <TempInput label=\"Fahrenheit\" value={fahrenheit} onChange={handleFahrenheit} />\n    </div>\n  );\n}\n",
    testCases: [],
    reactChecklist: [
      "The shared temperature state lives in App, not inside the input components.",
      "The input components are controlled purely by props (value + onChange).",
      "Typing in Celsius updates the Fahrenheit field live, and vice versa.",
      "Clearing one input clears/handles the other gracefully (no NaN shown).",
    ],
    hints: [
      "Keep ONE value (e.g. Celsius) in the parent; derive the other.",
      "Pass value + onChange into each child; children hold no state.",
      "Convert in the handlers so editing either field updates the single source of truth.",
    ],
    orderIndex: 25,
  },

  // ── 26. Angular service -> React hook (react, hard) ───────────────────────────
  {
    title: "Convert an Angular service to a React custom hook",
    slug: "react-angular-service-to-hook",
    difficulty: "hard",
    topicSlug: "usecontext",
    type: "react",
    description:
      "## From Angular service to React\nIn Angular you might have an injectable `AuthService` holding the current user and exposing `login`/`logout`:\n```ts\n@Injectable({ providedIn: 'root' })\nexport class AuthService {\n  private user$ = new BehaviorSubject<User | null>(null);\n  login(name: string) { this.user$.next({ name }); }\n  logout() { this.user$.next(null); }\n}\n```\nRecreate this in React using **Context + a custom hook**. Provide an `AuthProvider` that holds the current user in state and exposes `login(name)`/`logout()`, plus a `useAuth()` hook that reads it. Build an `App` (default export) wrapped in the provider that shows the user (or 'Logged out') and has Login/Logout buttons.",
    fnName: "App",
    starterCode:
      "import { createContext, useContext, useState } from 'react';\n\nconst AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  // hold user state; expose login/logout via context value\n  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;\n}\n\nfunction useAuth() {\n  // read the context\n}\n\nexport default function App() {\n  return <AuthProvider>{/* build me */}</AuthProvider>;\n}\n",
    solutionCode:
      "import { createContext, useContext, useMemo, useState } from 'react';\n\nconst AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const value = useMemo(\n    () => ({\n      user,\n      login: (name) => setUser({ name }),\n      logout: () => setUser(null),\n    }),\n    [user]\n  );\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nfunction useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');\n  return ctx;\n}\n\nfunction Dashboard() {\n  const { user, login, logout } = useAuth();\n  return (\n    <div>\n      <p>{user ? `Logged in as ${user.name}` : 'Logged out'}</p>\n      <button onClick={() => login('Ada')}>Login</button>\n      <button onClick={logout}>Logout</button>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <AuthProvider>\n      <Dashboard />\n    </AuthProvider>\n  );\n}\n",
    annotatedSolution:
      "import { createContext, useContext, useMemo, useState } from 'react';\n\n// Context replaces Angular's DI: provide the 'service' once, consume anywhere.\nconst AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  // useState replaces the BehaviorSubject's current value + change notifications.\n  const [user, setUser] = useState(null);\n  // Memoize so consumers don't re-render unless `user` actually changes.\n  const value = useMemo(\n    () => ({\n      user,\n      login: (name) => setUser({ name }), // like user$.next({ name })\n      logout: () => setUser(null),         // like user$.next(null)\n    }),\n    [user]\n  );\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\n// Custom hook = the ergonomic 'inject(AuthService)' equivalent.\nfunction useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');\n  return ctx;\n}\n\nfunction Dashboard() {\n  const { user, login, logout } = useAuth();\n  return (\n    <div>\n      <p>{user ? `Logged in as ${user.name}` : 'Logged out'}</p>\n      <button onClick={() => login('Ada')}>Login</button>\n      <button onClick={logout}>Logout</button>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <AuthProvider>\n      <Dashboard />\n    </AuthProvider>\n  );\n}\n",
    testCases: [],
    reactChecklist: [
      "An AuthProvider holds the current user in state (replacing the BehaviorSubject).",
      "login(name) sets the user; logout() clears it — both exposed via context.",
      "A useAuth() hook reads the context and throws if used outside the provider.",
      "The UI shows 'Logged out' initially and the user's name after Login.",
      "Clicking Logout returns the UI to the logged-out state.",
    ],
    hints: [
      "Replace the BehaviorSubject's value with useState in a provider component.",
      "Expose { user, login, logout } as the context value (memoize it).",
      "Write useAuth() to consume the context; guard against missing provider.",
    ],
    orderIndex: 26,
  },
];
