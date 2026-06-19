// Seed coding challenges for DevPath.
//
// JS grading contract (see lib/test-runner.ts): the runner builds the solution,
// finds the function named `fnName`, calls `fnName(...testCase.input)`, awaits if
// the result is a Promise, and deep-compares the return value with
// `expected_output`. Solutions must define `fnName` and be pure/deterministic.
//
// React challenges use a manual checklist and explicit test-case artifacts.

import type { SeedChallenge } from "./types";

type GeneratedReactChallenge = {
  title: string;
  slug: string;
  topicSlug: string;
  objective: string;
};

const makeGeneratedReactChallenge = (
  cfg: GeneratedReactChallenge,
  difficulty: "easy" | "medium",
  orderIndex: number,
): SeedChallenge => ({
  title: cfg.title,
  slug: cfg.slug,
  difficulty,
  topicSlug: cfg.topicSlug,
  type: "react",
  description:
    `## ${cfg.title}\n${cfg.objective}\n\n` +
    "Create a default export `App` that demonstrates the behavior clearly in the UI.",
  fnName: "App",
  starterCode:
    "import React from 'react';\n\nexport default function App() {\n  // TODO: implement the challenge requirements.\n  return <main>Implement challenge</main>;\n}\n",
  solutionCode:
    "import React from 'react';\n\nexport default function App() {\n  // Reference implementation intentionally omitted in seed expansion challenges.\n  // Build the requested behavior and verify with the checklist.\n  return <main>Challenge complete</main>;\n}\n",
  annotatedSolution:
    "import React from 'react';\n\nexport default function App() {\n  // 1) Build the UI for the scenario.\n  // 2) Add state/handlers needed by the objective.\n  // 3) Ensure behavior matches the checklist exactly.\n  return <main>Challenge complete</main>;\n}\n",
  testCases: [],
  hints: [
    "Start with the smallest working UI for the requirement.",
    "Move shared behavior into state and explicit event handlers.",
    "Verify each acceptance bullet manually before finishing.",
  ],
  reactChecklist: [
    "The screen renders the required controls and output states.",
    "User interactions update UI state predictably and without console errors.",
    "The final behavior matches the objective statement end-to-end.",
  ],
  orderIndex,
});

const EASY_CHALLENGE_EXPANSION: SeedChallenge[] = [
  { title: "Toggle paragraph visibility", slug: "react-easy-extra-01-toggle-paragraph", topicSlug: "usestate", objective: "Render a button that toggles a paragraph between shown and hidden." },
  { title: "Simple click counter", slug: "react-easy-extra-02-click-counter", topicSlug: "usestate", objective: "Render increment/decrement buttons and show the current count." },
  { title: "Greeting from input", slug: "react-easy-extra-03-greeting-input", topicSlug: "forms", objective: "Use a controlled input and live-render `Hello, <name>` below it." },
  { title: "Character counter", slug: "react-easy-extra-04-char-counter", topicSlug: "controlled-inputs", objective: "Track text input length and show remaining characters from a max of 120." },
  { title: "Theme switch badge", slug: "react-easy-extra-05-theme-switch", topicSlug: "props-state", objective: "Toggle between light/dark labels and show the current mode in a badge." },
  { title: "Disable submit until valid", slug: "react-easy-extra-06-disable-submit", topicSlug: "forms", objective: "Build a mini form where submit stays disabled until both fields are non-empty." },
  { title: "Mirror text in real time", slug: "react-easy-extra-07-text-mirror", topicSlug: "controlled-inputs", objective: "Display exactly what the user types in a preview area." },
  { title: "Reusable status chip", slug: "react-easy-extra-08-status-chip", topicSlug: "props-state", objective: "Create a component receiving `status` prop and render different chip text per status." },
  { title: "List from array prop", slug: "react-easy-extra-09-list-from-props", topicSlug: "jsx", objective: "Render a bullet list from an array prop and provide stable keys." },
  { title: "Tab switcher basics", slug: "react-easy-extra-10-tab-switcher", topicSlug: "usestate", objective: "Implement three tabs and show only the active tab panel." },
  { title: "Button click logger UI", slug: "react-easy-extra-11-click-log", topicSlug: "props-state", objective: "Store click timestamps in state and show the last five actions." },
  { title: "Progress step indicator", slug: "react-easy-extra-12-step-indicator", topicSlug: "usestate", objective: "Build previous/next controls for a 4-step indicator with bounds checking." },
  { title: "Password visibility toggle", slug: "react-easy-extra-13-password-toggle", topicSlug: "forms", objective: "Create a password field with show/hide toggle using local component state." },
  { title: "Checkbox preferences", slug: "react-easy-extra-14-checkbox-prefs", topicSlug: "forms", objective: "Manage two checkboxes in state and show selected preferences summary." },
  { title: "Simple accordion item", slug: "react-easy-extra-15-accordion-item", topicSlug: "usestate", objective: "Implement one collapsible section that expands/collapses on header click." },
  { title: "Like button with count", slug: "react-easy-extra-16-like-button", topicSlug: "usestate", objective: "Build a like button that toggles liked state and adjusts like count accordingly." },
  { title: "Filter completed tasks", slug: "react-easy-extra-17-filter-completed", topicSlug: "array-methods", objective: "Render static tasks and a toggle to show all vs completed only." },
  { title: "Render empty state", slug: "react-easy-extra-18-empty-state", topicSlug: "jsx", objective: "Conditionally render an empty state message when list length is zero." },
  { title: "Profile card props", slug: "react-easy-extra-19-profile-card", topicSlug: "props-state", objective: "Build a reusable profile card component with avatar/name/role props." },
  { title: "Inline validation message", slug: "react-easy-extra-20-inline-validation", topicSlug: "forms", objective: "Show validation hint under email input if value does not include `@`." },
  { title: "Resettable timer display", slug: "react-easy-extra-21-resettable-timer", topicSlug: "component-lifecycle", objective: "Use an interval to increase seconds and provide reset button back to zero." },
  { title: "Counter with step size", slug: "react-easy-extra-22-counter-step", topicSlug: "usestate", objective: "Add configurable step input so increment/decrement uses the selected step." },
  { title: "Controlled select input", slug: "react-easy-extra-23-controlled-select", topicSlug: "controlled-inputs", objective: "Create a select dropdown and show the currently selected value below it." },
  { title: "Read and focus with ref", slug: "react-easy-extra-24-focus-ref", topicSlug: "useref", objective: "Use `useRef` to focus an input when a button is clicked." },
  { title: "Basic route links mock", slug: "react-easy-extra-25-route-links", topicSlug: "react-router", objective: "Render nav links and active label state to simulate basic route switching behavior." },
].map((cfg, i) => makeGeneratedReactChallenge(cfg, "easy", 27 + i));

const MEDIUM_CHALLENGE_EXPANSION: SeedChallenge[] = [
  { title: "Debounced search box", slug: "react-medium-extra-01-debounced-search", topicSlug: "useeffect", objective: "Implement a search input that updates displayed query only after 400ms of no typing." },
  { title: "Paginated list controls", slug: "react-medium-extra-02-pagination", topicSlug: "lifting-state", objective: "Build page state in parent and pass page/handlers to child list + pager components." },
  { title: "Optimistic toggle action", slug: "react-medium-extra-03-optimistic-toggle", topicSlug: "promises-async", objective: "Apply optimistic UI for a toggle action and rollback on simulated API failure." },
  { title: "Reducer-based todo state", slug: "react-medium-extra-04-reducer-todos", topicSlug: "usereducer", objective: "Manage add/toggle/remove todo actions with `useReducer` and pure reducer logic." },
  { title: "Shared auth context", slug: "react-medium-extra-05-auth-context", topicSlug: "usecontext", objective: "Create AuthContext with login/logout and consume auth state in two sibling components." },
  { title: "Derived state memoization", slug: "react-medium-extra-06-derived-memo", topicSlug: "memoisation", objective: "Compute expensive filtered/sorted data with `useMemo` based on active filters." },
  { title: "Custom hook: useToggleMap", slug: "react-medium-extra-07-hook-toggle-map", topicSlug: "custom-hooks", objective: "Write a hook for keyed boolean state with `set`, `toggle`, and `reset` helpers." },
  { title: "Form wizard with steps", slug: "react-medium-extra-08-form-wizard", topicSlug: "forms", objective: "Build a 3-step form that preserves entered values while navigating between steps." },
  { title: "Keyboard navigation list", slug: "react-medium-extra-09-keyboard-list", topicSlug: "useref", objective: "Support ArrowUp/ArrowDown focus movement across a list of interactive rows." },
  { title: "Synced query params", slug: "react-medium-extra-10-query-sync", topicSlug: "react-router", objective: "Mirror filter state to URL query params and restore state from URL on load." },
  { title: "Compound accordion", slug: "react-medium-extra-11-compound-accordion", topicSlug: "props-state", objective: "Create parent-managed accordion where only one section can be open at a time." },
  { title: "Infinite scroll sentinel", slug: "react-medium-extra-12-infinite-scroll", topicSlug: "component-lifecycle", objective: "Load additional items when scroll reaches bottom sentinel while avoiding duplicate loads." },
  { title: "Undo toast queue", slug: "react-medium-extra-13-undo-toast", topicSlug: "promises-async", objective: "Implement a dismissible toast queue with undo action and timeout-based auto-close." },
  { title: "Editable table rows", slug: "react-medium-extra-14-editable-rows", topicSlug: "lifting-state", objective: "Hold table row draft edits in parent and commit/cancel per row." },
  { title: "Multi-select chips", slug: "react-medium-extra-15-multiselect-chips", topicSlug: "controlled-inputs", objective: "Build multi-select behavior with removable chips and controlled text input." },
  { title: "Error boundary fallback", slug: "react-medium-extra-16-error-fallback", topicSlug: "error-handling", objective: "Create a route area wrapper that catches render errors and shows a recovery UI." },
  { title: "Cross-field validation", slug: "react-medium-extra-17-cross-field-validation", topicSlug: "forms", objective: "Validate password + confirm fields and block submit until they match and pass strength checks." },
  { title: "Reusable modal manager", slug: "react-medium-extra-18-modal-manager", topicSlug: "usecontext", objective: "Implement context-driven modal open/close APIs usable from nested components." },
  { title: "Memoized row renderer", slug: "react-medium-extra-19-memo-rows", topicSlug: "memoisation", objective: "Render large row list with memoized row component and stable callbacks." },
  { title: "Stale request cancellation", slug: "react-medium-extra-20-request-cancel", topicSlug: "useeffect", objective: "Cancel/ignore stale fetch responses when request parameters change rapidly." },
  { title: "Drag reorder state", slug: "react-medium-extra-21-drag-reorder", topicSlug: "array-methods", objective: "Implement list reordering logic from source index to destination index." },
  { title: "Persisted preferences hook", slug: "react-medium-extra-22-persisted-prefs", topicSlug: "custom-hooks", objective: "Build `useLocalStorageState` hook and use it for user preference toggles." },
  { title: "Nested route breadcrumbs", slug: "react-medium-extra-23-breadcrumbs", topicSlug: "react-router", objective: "Generate breadcrumbs from nested route metadata and render clickable trail." },
  { title: "Selection with shift-click", slug: "react-medium-extra-24-shift-select", topicSlug: "usestate", objective: "Support range selection in a checkbox list using shift-click behavior." },
  { title: "Client-side cache layer", slug: "react-medium-extra-25-client-cache", topicSlug: "promises-async", objective: "Cache fetch results by key and reuse cached data before revalidating in background." },
].map((cfg, i) => makeGeneratedReactChallenge(cfg, "medium", 52 + i));

const JS_FUNDAMENTALS_CHALLENGE_EXPANSION: SeedChallenge[] = [
  {
    title: "Binary search in sorted array",
    slug: "jsfund-binary-search",
    difficulty: "easy",
    topicSlug: "data-structures-basics",
    type: "js",
    description:
      "## Binary search\nImplement `binarySearch(nums, target)` returning the index of `target` in a sorted array, or `-1` when not found.",
    fnName: "binarySearch",
    starterCode: "function binarySearch(nums, target) {\n  // your code here\n}\n",
    solutionCode:
      "function binarySearch(nums, target) {\n  let lo = 0;\n  let hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = lo + Math.floor((hi - lo) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n",
    annotatedSolution:
      "function binarySearch(nums, target) {\n  // Keep narrowing [lo, hi] until either target is found or the interval is empty.\n  let lo = 0;\n  let hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = lo + Math.floor((hi - lo) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n",
    testCases: [
      { input: [[1, 3, 5, 7, 9], 7], expected_output: 3, description: "finds existing element" },
      { input: [[1, 3, 5, 7, 9], 2], expected_output: -1, description: "returns -1 when missing" },
      { input: [[], 1], expected_output: -1, description: "handles empty array" },
    ],
    hints: [
      "Use two pointers `lo` and `hi` over the sorted range.",
      "Check middle element, then discard half of the range each step.",
      "Stop when `lo > hi`; return -1 if never matched.",
    ],
    orderIndex: 77,
  },
  {
    title: "Reverse words in a sentence",
    slug: "jsfund-reverse-words",
    difficulty: "easy",
    topicSlug: "string-algorithms",
    type: "js",
    description:
      "## Reverse words\nImplement `reverseWords(str)` that reverses word order, trims extra spaces, and joins with single spaces.",
    fnName: "reverseWords",
    starterCode: "function reverseWords(str) {\n  // your code here\n}\n",
    solutionCode:
      "function reverseWords(str) {\n  return str.trim().split(/\\s+/).reverse().join(' ');\n}\n",
    annotatedSolution:
      "function reverseWords(str) {\n  // Normalize whitespace, split into words, reverse order, join back.\n  return str.trim().split(/\\s+/).reverse().join(' ');\n}\n",
    testCases: [
      { input: ["the sky is blue"], expected_output: "blue is sky the", description: "basic reversal" },
      { input: ["  hello   world  "], expected_output: "world hello", description: "collapses extra spaces" },
      { input: ["one"], expected_output: "one", description: "single word" },
    ],
    hints: [
      "Trim leading/trailing spaces first.",
      "Split with a regex that handles repeated spaces.",
      "Reverse the word array then join with one space.",
    ],
    orderIndex: 78,
  },
  {
    title: "Character frequency counter",
    slug: "jsfund-char-frequency",
    difficulty: "easy",
    topicSlug: "object-map-patterns",
    type: "js",
    description:
      "## Character frequency\nImplement `charFrequency(str)` returning an object of lowercase alphanumeric character counts.",
    fnName: "charFrequency",
    starterCode: "function charFrequency(str) {\n  // your code here\n}\n",
    solutionCode:
      "function charFrequency(str) {\n  const out = {};\n  for (const ch of str.toLowerCase()) {\n    if (!/[a-z0-9]/.test(ch)) continue;\n    out[ch] = (out[ch] ?? 0) + 1;\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function charFrequency(str) {\n  const out = {};\n  // Normalize to lowercase and count only alphanumeric characters.\n  for (const ch of str.toLowerCase()) {\n    if (!/[a-z0-9]/.test(ch)) continue;\n    out[ch] = (out[ch] ?? 0) + 1;\n  }\n  return out;\n}\n",
    testCases: [
      { input: ["aab!B"], expected_output: { a: 2, b: 2 }, description: "ignores punctuation and case" },
      { input: ["12311"], expected_output: { 1: 3, 2: 1, 3: 1 }, description: "counts numeric chars too" },
      { input: [""], expected_output: {}, description: "empty string" },
    ],
    hints: [
      "Loop over each character and keep a dictionary of counts.",
      "Normalize case first so A and a map to same key.",
      "Skip non-alphanumeric characters with a regex guard.",
    ],
    orderIndex: 79,
  },
  {
    title: "Longest unique substring length",
    slug: "jsfund-longest-unique-substring",
    difficulty: "medium",
    topicSlug: "string-algorithms",
    type: "js",
    description:
      "## Sliding window\nImplement `lengthOfLongestUniqueSubstring(s)` returning the max length of a substring with no repeated characters.",
    fnName: "lengthOfLongestUniqueSubstring",
    starterCode: "function lengthOfLongestUniqueSubstring(s) {\n  // your code here\n}\n",
    solutionCode:
      "function lengthOfLongestUniqueSubstring(s) {\n  let left = 0;\n  let best = 0;\n  const seen = new Map();\n  for (let right = 0; right < s.length; right++) {\n    const ch = s[right];\n    if (seen.has(ch) && seen.get(ch) >= left) left = seen.get(ch) + 1;\n    seen.set(ch, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n",
    annotatedSolution:
      "function lengthOfLongestUniqueSubstring(s) {\n  let left = 0;\n  let best = 0;\n  const seen = new Map();\n  // Expand with `right`; move `left` only when a duplicate enters current window.\n  for (let right = 0; right < s.length; right++) {\n    const ch = s[right];\n    if (seen.has(ch) && seen.get(ch) >= left) left = seen.get(ch) + 1;\n    seen.set(ch, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n",
    testCases: [
      { input: ["abcabcbb"], expected_output: 3, description: "abc is longest" },
      { input: ["bbbbb"], expected_output: 1, description: "single repeated char" },
      { input: ["pwwkew"], expected_output: 3, description: "wke is longest" },
    ],
    hints: [
      "Use a sliding window with two pointers.",
      "Track last-seen index of each character.",
      "When duplicate appears inside window, move left past previous index.",
    ],
    orderIndex: 80,
  },
  {
    title: "First unique character index",
    slug: "jsfund-first-unique-index",
    difficulty: "medium",
    topicSlug: "object-map-patterns",
    type: "js",
    description:
      "## Frequency map pattern\nImplement `firstUniqueIndex(str)` returning the index of the first non-repeating character, or `-1` if none exists.",
    fnName: "firstUniqueIndex",
    starterCode: "function firstUniqueIndex(str) {\n  // your code here\n}\n",
    solutionCode:
      "function firstUniqueIndex(str) {\n  const freq = {};\n  for (const ch of str) freq[ch] = (freq[ch] ?? 0) + 1;\n  for (let i = 0; i < str.length; i++) {\n    if (freq[str[i]] === 1) return i;\n  }\n  return -1;\n}\n",
    annotatedSolution:
      "function firstUniqueIndex(str) {\n  const freq = {};\n  // Pass 1: count all chars.\n  for (const ch of str) freq[ch] = (freq[ch] ?? 0) + 1;\n  // Pass 2: first index whose count is exactly one.\n  for (let i = 0; i < str.length; i++) {\n    if (freq[str[i]] === 1) return i;\n  }\n  return -1;\n}\n",
    testCases: [
      { input: ["leetcode"], expected_output: 0, description: "first char unique" },
      { input: ["loveleetcode"], expected_output: 2, description: "middle unique char" },
      { input: ["aabb"], expected_output: -1, description: "no unique chars" },
    ],
    hints: [
      "Count occurrences of each character first.",
      "Then iterate the string in order to find first count of 1.",
      "Return -1 if no such character exists.",
    ],
    orderIndex: 81,
  },
  {
    title: "Check balanced brackets",
    slug: "jsfund-balanced-brackets",
    difficulty: "medium",
    topicSlug: "data-structures-basics",
    type: "js",
    description:
      "## Stack problem\nImplement `isBalanced(str)` to validate `()[]{}` bracket pairs.",
    fnName: "isBalanced",
    starterCode: "function isBalanced(str) {\n  // your code here\n}\n",
    solutionCode:
      "function isBalanced(str) {\n  const stack = [];\n  const closeToOpen = { ')': '(', ']': '[', '}': '{' };\n  for (const ch of str) {\n    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);\n    else if (closeToOpen[ch]) {\n      if (stack.pop() !== closeToOpen[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}\n",
    annotatedSolution:
      "function isBalanced(str) {\n  const stack = [];\n  const closeToOpen = { ')': '(', ']': '[', '}': '{' };\n  // Push openings; on closing, ensure top of stack is matching opener.\n  for (const ch of str) {\n    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);\n    else if (closeToOpen[ch]) {\n      if (stack.pop() !== closeToOpen[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}\n",
    testCases: [
      { input: ["()[]{}"], expected_output: true, description: "simple balanced" },
      { input: ["([{}])"], expected_output: true, description: "nested balanced" },
      { input: ["(]"], expected_output: false, description: "mismatch" },
      { input: ["(("], expected_output: false, description: "unclosed" },
    ],
    hints: [
      "A stack is ideal for nested matching problems.",
      "Push opening brackets, verify and pop on closing brackets.",
      "Balanced only if all closings match and stack ends empty.",
    ],
    orderIndex: 82,
  },
  {
    title: "Recursive sum of nested numbers",
    slug: "jsfund-sum-nested",
    difficulty: "medium",
    topicSlug: "recursion-fundamentals",
    type: "js",
    description:
      "## Recursive traversal\nImplement `sumNested(arr)` to sum all numbers in arbitrarily nested arrays.",
    fnName: "sumNested",
    starterCode: "function sumNested(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function sumNested(arr) {\n  let sum = 0;\n  for (const v of arr) {\n    if (Array.isArray(v)) sum += sumNested(v);\n    else sum += v;\n  }\n  return sum;\n}\n",
    annotatedSolution:
      "function sumNested(arr) {\n  let sum = 0;\n  // Recurse into sub-arrays; add plain numbers directly.\n  for (const v of arr) {\n    if (Array.isArray(v)) sum += sumNested(v);\n    else sum += v;\n  }\n  return sum;\n}\n",
    testCases: [
      { input: [[1, [2, [3, 4]], 5]], expected_output: 15, description: "sums deep nesting" },
      { input: [[-1, [2], 3]], expected_output: 4, description: "handles negatives" },
      { input: [[[]]], expected_output: 0, description: "empty nested arrays" },
    ],
    hints: [
      "Think base + recursive case per element.",
      "If element is array, recurse; otherwise add directly.",
      "Accumulate total and return it at each level.",
    ],
    orderIndex: 83,
  },
  {
    title: "Analyze two snippets by Big-O",
    slug: "jsfund-classify-big-o",
    difficulty: "easy",
    topicSlug: "big-o-basics",
    type: "js",
    description:
      "## Big-O classification\nImplement `classifyComplexity(kind)` where `kind` is `'single-loop'`, `'nested-loop'`, or `'binary-search'` and return `'O(n)'`, `'O(n^2)'`, or `'O(log n)'` respectively.",
    fnName: "classifyComplexity",
    starterCode: "function classifyComplexity(kind) {\n  // your code here\n}\n",
    solutionCode:
      "function classifyComplexity(kind) {\n  if (kind === 'single-loop') return 'O(n)';\n  if (kind === 'nested-loop') return 'O(n^2)';\n  if (kind === 'binary-search') return 'O(log n)';\n  return 'unknown';\n}\n",
    annotatedSolution:
      "function classifyComplexity(kind) {\n  // Direct mapping challenge to reinforce Big-O recognition patterns.\n  if (kind === 'single-loop') return 'O(n)';\n  if (kind === 'nested-loop') return 'O(n^2)';\n  if (kind === 'binary-search') return 'O(log n)';\n  return 'unknown';\n}\n",
    testCases: [
      { input: ["single-loop"], expected_output: "O(n)", description: "linear scan" },
      { input: ["nested-loop"], expected_output: "O(n^2)", description: "quadratic nested loop" },
      { input: ["binary-search"], expected_output: "O(log n)", description: "divide-and-conquer" },
    ],
    hints: [
      "Map each known kind to its complexity string.",
      "Use simple conditionals for the three supported values.",
      "Return fallback for unknown input.",
    ],
    orderIndex: 84,
  },
  {
    title: "Hello variable",
    slug: "jsfund-varscope-01-hello-variable",
    difficulty: "easy",
    topicSlug: "variables-scope",
    type: "js",
    description:
      "## Start super easy\nImplement `helloVariable(name)` and return exactly `\"Hello, <name>!\"`.\n\nUse a local variable before returning.",
    fnName: "helloVariable",
    starterCode: "function helloVariable(name) {\n  // your code here\n}\n",
    solutionCode:
      "function helloVariable(name) {\n  const message = `Hello, ${name}!`;\n  return message;\n}\n",
    annotatedSolution:
      "function helloVariable(name) {\n  // `message` exists only inside this function scope.\n  const message = `Hello, ${name}!`;\n  return message;\n}\n",
    testCases: [
      { input: ["Kai"], expected_output: "Hello, Kai!", description: "formats basic greeting" },
      { input: ["Ava"], expected_output: "Hello, Ava!", description: "works for another name" },
    ],
    hints: [
      "Create a local variable named `message`.",
      "Use template literals with backticks.",
      "Return the variable.",
    ],
    orderIndex: 85,
  },
  {
    title: "Block scope chooser",
    slug: "jsfund-varscope-02-block-scope-chooser",
    difficulty: "easy",
    topicSlug: "variables-scope",
    type: "js",
    description:
      "## Block scope\nImplement `chooseLabel(isMember)` that returns:\n- `'member'` when `isMember` is true\n- `'guest'` when false\n\nUse block-scoped variables (`let` or `const`) inside the branches.",
    fnName: "chooseLabel",
    starterCode: "function chooseLabel(isMember) {\n  // your code here\n}\n",
    solutionCode:
      "function chooseLabel(isMember) {\n  if (isMember) {\n    const label = 'member';\n    return label;\n  }\n  const label = 'guest';\n  return label;\n}\n",
    annotatedSolution:
      "function chooseLabel(isMember) {\n  // Each block can have its own scoped `label`.\n  if (isMember) {\n    const label = 'member';\n    return label;\n  }\n  const label = 'guest';\n  return label;\n}\n",
    testCases: [
      { input: [true], expected_output: "member", description: "true branch" },
      { input: [false], expected_output: "guest", description: "false branch" },
    ],
    hints: [
      "Use an `if` statement with two branches.",
      "Create block-scoped variables in each branch.",
      "Return the right label.",
    ],
    orderIndex: 86,
  },
  {
    title: "Shadowing in action",
    slug: "jsfund-varscope-03-shadowing-action",
    difficulty: "easy",
    topicSlug: "variables-scope",
    type: "js",
    description:
      "## Variable shadowing\nImplement `shadowingDemo(value)`:\n- Start with `result = value`\n- If `value > 3`, create a new block-scoped `result = value * 2` and return it\n- Otherwise return the outer `result`\n\nThis demonstrates shadowing safely.",
    fnName: "shadowingDemo",
    starterCode: "function shadowingDemo(value) {\n  // your code here\n}\n",
    solutionCode:
      "function shadowingDemo(value) {\n  const result = value;\n  if (value > 3) {\n    const result = value * 2;\n    return result;\n  }\n  return result;\n}\n",
    annotatedSolution:
      "function shadowingDemo(value) {\n  // Outer binding.\n  const result = value;\n  if (value > 3) {\n    // Inner `result` shadows the outer one only in this block.\n    const result = value * 2;\n    return result;\n  }\n  return result;\n}\n",
    testCases: [
      { input: [2], expected_output: 2, description: "returns outer binding" },
      { input: [5], expected_output: 10, description: "returns inner shadowed binding" },
    ],
    hints: [
      "Create one variable outside the `if` block.",
      "Create another variable with the same name inside the block.",
      "Return from the right scope.",
    ],
    orderIndex: 87,
  },
  {
    title: "Counter operations",
    slug: "jsfund-varscope-04-counter-ops",
    difficulty: "medium",
    topicSlug: "variables-scope",
    type: "js",
    description:
      "## Local mutable state\nImplement `applyCounterOps(start, ops)` where `ops` contains `'inc'`, `'dec'`, and `'value'`.\n\nKeep `count` as local function state and return an array with the value after each operation.",
    fnName: "applyCounterOps",
    starterCode: "function applyCounterOps(start = 0, ops = []) {\n  // your code here\n}\n",
    solutionCode:
      "function applyCounterOps(start = 0, ops = []) {\n  let count = start;\n  const out = [];\n  for (const op of ops) {\n    if (op === 'inc') count += 1;\n    else if (op === 'dec') count -= 1;\n    out.push(count);\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function applyCounterOps(start = 0, ops = []) {\n  // `count` is scoped to this function call, so state does not leak globally.\n  let count = start;\n  const out = [];\n  for (const op of ops) {\n    if (op === 'inc') count += 1;\n    else if (op === 'dec') count -= 1;\n    out.push(count);\n  }\n  return out;\n}\n",
    testCases: [
      {
        input: [2, ["value", "inc", "inc", "dec", "value"]],
        expected_output: [2, 3, 4, 3, 3],
        description: "keeps local mutable state behind operations",
      },
      {
        input: [0, ["inc", "inc", "value"]],
        expected_output: [1, 2, 2],
        description: "increments independently from initial value",
      },
    ],
    hints: [
      "Use a local `let` variable for count.",
      "Loop through `ops` in order.",
      "Push the current count after each operation.",
    ],
    orderIndex: 88,
  },
  {
    title: "Closure-powered counter runner",
    slug: "jsfund-varscope-05-closure-counter-runner",
    difficulty: "medium",
    topicSlug: "variables-scope",
    type: "js",
    description:
      "## Build on previous challenge\nImplement `runCounterWithClosure(start, ops)` by creating inner functions (`inc`, `dec`, `value`) that all share the same `count` variable.\n\nReturn an array of results for each op.",
    fnName: "runCounterWithClosure",
    starterCode: "function runCounterWithClosure(start = 0, ops = []) {\n  // your code here\n}\n",
    solutionCode:
      "function runCounterWithClosure(start = 0, ops = []) {\n  let count = start;\n  const inc = () => (count += 1);\n  const dec = () => (count -= 1);\n  const value = () => count;\n  const out = [];\n  for (const op of ops) {\n    if (op === 'inc') out.push(inc());\n    else if (op === 'dec') out.push(dec());\n    else out.push(value());\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function runCounterWithClosure(start = 0, ops = []) {\n  let count = start;\n  // These functions close over the same `count` binding.\n  const inc = () => (count += 1);\n  const dec = () => (count -= 1);\n  const value = () => count;\n\n  const out = [];\n  for (const op of ops) {\n    if (op === 'inc') out.push(inc());\n    else if (op === 'dec') out.push(dec());\n    else out.push(value());\n  }\n  return out;\n}\n",
    testCases: [
      {
        input: [1, ["value", "inc", "inc", "dec", "value"]],
        expected_output: [1, 2, 3, 2, 2],
        description: "shared closure state updates across operations",
      },
      {
        input: [5, ["dec", "dec", "value"]],
        expected_output: [4, 3, 3],
        description: "decrements and reads final state",
      },
    ],
    hints: [
      "Keep `count` in the outer function scope.",
      "Create small helper functions that read/update `count`.",
      "Run helpers based on each op and collect results.",
    ],
    orderIndex: 89,
  },
  {
    title: "Pick profile fields with destructuring",
    slug: "jsfund-destructure-profile",
    difficulty: "easy",
    topicSlug: "destructuring",
    type: "js",
    description:
      "## Destructuring basics\nImplement `pickProfile(user)` returning `{ id, displayName, city }` where:\n- `displayName` comes from `user.profile.name`\n- `city` comes from `user.address.city`\n- Missing nested fields default to `'Unknown'`.",
    fnName: "pickProfile",
    starterCode: "function pickProfile(user) {\n  // your code here\n}\n",
    solutionCode:
      "function pickProfile(user) {\n  const { id, profile: { name: displayName = 'Unknown' } = {}, address: { city = 'Unknown' } = {} } = user ?? {};\n  return { id, displayName, city };\n}\n",
    annotatedSolution:
      "function pickProfile(user) {\n  // Nested destructuring with defaults avoids repetitive optional checks.\n  const {\n    id,\n    profile: { name: displayName = 'Unknown' } = {},\n    address: { city = 'Unknown' } = {},\n  } = user ?? {};\n  return { id, displayName, city };\n}\n",
    testCases: [
      {
        input: [{ id: 7, profile: { name: "Kai" }, address: { city: "Berlin" } }],
        expected_output: { id: 7, displayName: "Kai", city: "Berlin" },
        description: "reads nested fields",
      },
      {
        input: [{ id: 2, profile: {}, address: {} }],
        expected_output: { id: 2, displayName: "Unknown", city: "Unknown" },
        description: "uses defaults when nested values missing",
      },
    ],
    hints: [
      "Destructure nested objects directly in one statement.",
      "Use fallback empty objects for nested paths that may be missing.",
      "Alias `name` to `displayName` while destructuring.",
    ],
    orderIndex: 90,
  },
  {
    title: "Format message with explicit this binding",
    slug: "jsfund-bind-this-methods",
    difficulty: "medium",
    topicSlug: "this-keyword",
    type: "js",
    description:
      "## this binding\nImplement `formatWithContext(ctx, msg)` where `ctx` is an object with a `prefix` field.\n\nUse explicit binding so output is `\"<prefix>: <msg>\"`.",
    fnName: "formatWithContext",
    starterCode: "function formatWithContext(ctx, msg) {\n  // your code here\n}\n",
    solutionCode:
      "function formatWithContext(ctx, msg) {\n  function format(text) {\n    return `${this.prefix}: ${text}`;\n  }\n  return format.call(ctx, msg);\n}\n",
    annotatedSolution:
      "function formatWithContext(ctx, msg) {\n  function format(text) {\n    // `this` comes from how function is called, not where it's defined.\n    return `${this.prefix}: ${text}`;\n  }\n  // Force `this` to be `ctx`.\n  return format.call(ctx, msg);\n}\n",
    testCases: [
      {
        input: [{ prefix: "DBG" }, "ready"],
        expected_output: "DBG: ready",
        description: "formats using explicit context",
      },
      {
        input: [{ prefix: "API" }, "done"],
        expected_output: "API: done",
        description: "works with different context objects",
      },
    ],
    hints: [
      "`this` is determined by call-site, not lexical scope for normal functions.",
      "Create a helper function that reads `this.prefix`.",
      "Use `call` to run that helper with `ctx` as `this`.",
    ],
    orderIndex: 91,
  },
  {
    title: "Normalize module records",
    slug: "jsfund-normalize-module-record",
    difficulty: "easy",
    topicSlug: "es-modules",
    type: "js",
    description:
      "## Module boundary style\nImplement `normalizeModuleRecord(record)` that returns `{ name, path, enabled }` where:\n- `name` defaults to `'unknown-module'`\n- `path` defaults to `'./index.js'`\n- `enabled` is coerced to boolean.",
    fnName: "normalizeModuleRecord",
    starterCode: "function normalizeModuleRecord(record) {\n  // your code here\n}\n",
    solutionCode:
      "function normalizeModuleRecord(record) {\n  const { name = 'unknown-module', path = './index.js', enabled = false } = record ?? {};\n  return { name, path, enabled: Boolean(enabled) };\n}\n",
    annotatedSolution:
      "function normalizeModuleRecord(record) {\n  // Normalize shape at the module boundary so callers get predictable data.\n  const {\n    name = 'unknown-module',\n    path = './index.js',\n    enabled = false,\n  } = record ?? {};\n  return { name, path, enabled: Boolean(enabled) };\n}\n",
    testCases: [
      {
        input: [{ name: "auth", path: "./auth.js", enabled: 1 }],
        expected_output: { name: "auth", path: "./auth.js", enabled: true },
        description: "coerces enabled to boolean",
      },
      {
        input: [{}],
        expected_output: { name: "unknown-module", path: "./index.js", enabled: false },
        description: "applies defaults for missing fields",
      },
    ],
    hints: [
      "Use object destructuring with default values.",
      "Handle nullish input with a fallback empty object.",
      "Return a normalized object, not the original reference.",
    ],
    orderIndex: 92,
  },
];

const ARRAY_METHOD_FUNDAMENTAL_CHALLENGES: SeedChallenge[] = [
  {
    title: "Array length fundamentals",
    slug: "array-method-fundamentals-01-length",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array length\nImplement `arrayLength(arr)` and return the array length.\n\nPass all 5 exercises.",
    fnName: "arrayLength",
    starterCode: "function arrayLength(arr) {\n  // your code here\n}\n",
    solutionCode: "function arrayLength(arr) {\n  return arr.length;\n}\n",
    annotatedSolution:
      "function arrayLength(arr) {\n  // `length` is the total number of slots in the array.\n  return arr.length;\n}\n",
    testCases: [
      { input: [[1, 2, 3]], expected_output: 3, description: "three items" },
      { input: [[]], expected_output: 0, description: "empty array" },
      { input: [["a"]], expected_output: 1, description: "single item" },
      { input: [[[1], [2], [3], [4]]], expected_output: 4, description: "nested values still count as one slot each" },
      { input: [[null, undefined, 0]], expected_output: 3, description: "special values still count" },
    ],
    hints: [
      "JavaScript arrays expose a built-in `length` property.",
      "No loop is needed for this challenge.",
      "Return `arr.length` directly.",
    ],
    orderIndex: 320,
  },
  {
    title: "Array toString fundamentals",
    slug: "array-method-fundamentals-02-tostring",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array toString()\nImplement `arrayToString(arr)` returning the default comma-separated string.\n\nPass all 5 exercises.",
    fnName: "arrayToString",
    starterCode: "function arrayToString(arr) {\n  // your code here\n}\n",
    solutionCode: "function arrayToString(arr) {\n  return arr.toString();\n}\n",
    annotatedSolution:
      "function arrayToString(arr) {\n  // `toString()` joins with commas and stringifies each element.\n  return arr.toString();\n}\n",
    testCases: [
      { input: [[1, 2, 3]], expected_output: "1,2,3", description: "numbers" },
      { input: [["a", "b"]], expected_output: "a,b", description: "strings" },
      { input: [[]], expected_output: "", description: "empty array" },
      { input: [[[1, 2], 3]], expected_output: "1,2,3", description: "nested arrays flatten into string representation" },
      { input: [[true, false]], expected_output: "true,false", description: "booleans" },
    ],
    hints: [
      "Use the array instance method called `toString`.",
      "Do not manually loop and concatenate.",
      "Return `arr.toString()`.",
    ],
    orderIndex: 321,
  },
  {
    title: "Array at fundamentals",
    slug: "array-method-fundamentals-03-at",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array at()\nImplement `arrayAt(arr, index)` using `at()` (supports negative indices).\n\nPass all 5 exercises.",
    fnName: "arrayAt",
    starterCode: "function arrayAt(arr, index) {\n  // your code here\n}\n",
    solutionCode: "function arrayAt(arr, index) {\n  return arr.at(index);\n}\n",
    annotatedSolution:
      "function arrayAt(arr, index) {\n  // `at(-1)` gets the last element, unlike bracket syntax.\n  return arr.at(index);\n}\n",
    testCases: [
      { input: [[10, 20, 30], 1], expected_output: 20, description: "middle index" },
      { input: [[10, 20, 30], -1], expected_output: 30, description: "last element via negative index" },
      { input: [[10, 20, 30], -2], expected_output: 20, description: "second from end" },
      { input: [[10, 20, 30], 5], expected_output: undefined, description: "out of bounds" },
      { input: [[], 0], expected_output: undefined, description: "empty array" },
    ],
    hints: [
      "Use `arr.at(index)` directly.",
      "Negative indexes are the main benefit of `at`.",
      "Out-of-range should return `undefined`.",
    ],
    orderIndex: 322,
  },
  {
    title: "Array join fundamentals",
    slug: "array-method-fundamentals-04-join",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array join()\nImplement `arrayJoin(arr, sep)` that joins with the provided separator.\n\nPass all 5 exercises.",
    fnName: "arrayJoin",
    starterCode: "function arrayJoin(arr, sep) {\n  // your code here\n}\n",
    solutionCode: "function arrayJoin(arr, sep) {\n  return arr.join(sep);\n}\n",
    annotatedSolution:
      "function arrayJoin(arr, sep) {\n  // `join` is like `toString` but with custom separator.\n  return arr.join(sep);\n}\n",
    testCases: [
      { input: [["a", "b", "c"], "-"], expected_output: "a-b-c", description: "dash separator" },
      { input: [[1, 2, 3], " | "], expected_output: "1 | 2 | 3", description: "spaced separator" },
      { input: [[], ","], expected_output: "", description: "empty array" },
      { input: [["x"], ","], expected_output: "x", description: "single item" },
      { input: [["a", "", "c"], ","], expected_output: "a,,c", description: "empty string element" },
    ],
    hints: [
      "The separator is the first argument to `join`.",
      "No manual string building needed.",
      "Return `arr.join(sep)`.",
    ],
    orderIndex: 323,
  },
  {
    title: "Array pop fundamentals",
    slug: "array-method-fundamentals-05-pop",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array pop()\nImplement `popState(arr)` that returns `{ popped, remaining }` without mutating the original input.\n\nPass all 5 exercises.",
    fnName: "popState",
    starterCode: "function popState(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function popState(arr) {\n  const copy = arr.slice();\n  const popped = copy.pop();\n  return { popped, remaining: copy };\n}\n",
    annotatedSolution:
      "function popState(arr) {\n  // Copy first to avoid mutating the input array.\n  const copy = arr.slice();\n  const popped = copy.pop();\n  return { popped, remaining: copy };\n}\n",
    testCases: [
      { input: [[1, 2, 3]], expected_output: { popped: 3, remaining: [1, 2] }, description: "pops last element" },
      { input: [["a"]], expected_output: { popped: "a", remaining: [] }, description: "single element" },
      { input: [[]], expected_output: { popped: undefined, remaining: [] }, description: "empty array" },
      { input: [[1, null]], expected_output: { popped: null, remaining: [1] }, description: "null value" },
      { input: [[true, false]], expected_output: { popped: false, remaining: [true] }, description: "boolean values" },
    ],
    hints: [
      "`pop` mutates arrays, so clone first.",
      "Use `slice()` for a shallow copy.",
      "Return both popped value and remaining array.",
    ],
    orderIndex: 324,
  },
  {
    title: "Array push fundamentals",
    slug: "array-method-fundamentals-06-push",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array push()\nImplement `pushItems(arr, items)` that appends all `items` and returns the new array (without mutating input).\n\nPass all 5 exercises.",
    fnName: "pushItems",
    starterCode: "function pushItems(arr, items) {\n  // your code here\n}\n",
    solutionCode:
      "function pushItems(arr, items) {\n  const copy = arr.slice();\n  copy.push(...items);\n  return copy;\n}\n",
    annotatedSolution:
      "function pushItems(arr, items) {\n  const copy = arr.slice();\n  // Spread items so each one is pushed separately.\n  copy.push(...items);\n  return copy;\n}\n",
    testCases: [
      { input: [[1, 2], [3]], expected_output: [1, 2, 3], description: "append one" },
      { input: [[1], [2, 3]], expected_output: [1, 2, 3], description: "append many" },
      { input: [[], [1, 2]], expected_output: [1, 2], description: "start empty" },
      { input: [[1, 2], []], expected_output: [1, 2], description: "append none" },
      { input: [["a"], ["b", "c"]], expected_output: ["a", "b", "c"], description: "strings" },
    ],
    hints: [
      "Clone the source array first.",
      "Use `push(...items)` on the clone.",
      "Return the clone.",
    ],
    orderIndex: 325,
  },
  {
    title: "Array shift fundamentals",
    slug: "array-method-fundamentals-07-shift",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array shift()\nImplement `shiftState(arr)` that returns `{ shifted, remaining }` without mutating input.\n\nPass all 5 exercises.",
    fnName: "shiftState",
    starterCode: "function shiftState(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function shiftState(arr) {\n  const copy = arr.slice();\n  const shifted = copy.shift();\n  return { shifted, remaining: copy };\n}\n",
    annotatedSolution:
      "function shiftState(arr) {\n  const copy = arr.slice();\n  const shifted = copy.shift();\n  return { shifted, remaining: copy };\n}\n",
    testCases: [
      { input: [[1, 2, 3]], expected_output: { shifted: 1, remaining: [2, 3] }, description: "shifts first" },
      { input: [["a"]], expected_output: { shifted: "a", remaining: [] }, description: "single" },
      { input: [[]], expected_output: { shifted: undefined, remaining: [] }, description: "empty" },
      { input: [[null, 1]], expected_output: { shifted: null, remaining: [1] }, description: "null first value" },
      { input: [[true, false]], expected_output: { shifted: true, remaining: [false] }, description: "booleans" },
    ],
    hints: [
      "`shift` removes from the front.",
      "Copy first to keep input immutable.",
      "Return both removed value and remaining array.",
    ],
    orderIndex: 326,
  },
  {
    title: "Array unshift fundamentals",
    slug: "array-method-fundamentals-08-unshift",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array unshift()\nImplement `unshiftItems(arr, items)` that prepends all `items` and returns the new array.\n\nPass all 5 exercises.",
    fnName: "unshiftItems",
    starterCode: "function unshiftItems(arr, items) {\n  // your code here\n}\n",
    solutionCode:
      "function unshiftItems(arr, items) {\n  const copy = arr.slice();\n  copy.unshift(...items);\n  return copy;\n}\n",
    annotatedSolution:
      "function unshiftItems(arr, items) {\n  const copy = arr.slice();\n  copy.unshift(...items);\n  return copy;\n}\n",
    testCases: [
      { input: [[2, 3], [1]], expected_output: [1, 2, 3], description: "prepend one" },
      { input: [[3], [1, 2]], expected_output: [1, 2, 3], description: "prepend many" },
      { input: [[], [1, 2]], expected_output: [1, 2], description: "empty start" },
      { input: [[1, 2], []], expected_output: [1, 2], description: "prepend none" },
      { input: [["c"], ["a", "b"]], expected_output: ["a", "b", "c"], description: "strings" },
    ],
    hints: [
      "`unshift` adds to the front.",
      "Clone first.",
      "Spread `items` into `unshift`.",
    ],
    orderIndex: 327,
  },
  {
    title: "Array isArray fundamentals",
    slug: "array-method-fundamentals-09-isarray",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array.isArray()\nImplement `isArrayValue(value)` using `Array.isArray`.\n\nPass all 5 exercises.",
    fnName: "isArrayValue",
    starterCode: "function isArrayValue(value) {\n  // your code here\n}\n",
    solutionCode: "function isArrayValue(value) {\n  return Array.isArray(value);\n}\n",
    annotatedSolution:
      "function isArrayValue(value) {\n  // `Array.isArray` is safer than `typeof` for arrays.\n  return Array.isArray(value);\n}\n",
    testCases: [
      { input: [[1, 2, 3]], expected_output: true, description: "array literal" },
      { input: [{ a: 1 }], expected_output: false, description: "plain object" },
      { input: ["abc"], expected_output: false, description: "string" },
      { input: [[[]]], expected_output: true, description: "nested array still array" },
      { input: [null], expected_output: false, description: "null" },
    ],
    hints: [
      "Use `Array.isArray(...)`.",
      "Do not use `typeof` for this check.",
      "Return the boolean result directly.",
    ],
    orderIndex: 328,
  },
  {
    title: "Array delete fundamentals",
    slug: "array-method-fundamentals-10-delete",
    difficulty: "medium",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## delete on arrays\nImplement `deleteAt(arr, index)` and return `{ length, hasIndex, valueAt }` after deleting.\n\nUse `delete` (which creates a hole) and pass all 5 exercises.",
    fnName: "deleteAt",
    starterCode: "function deleteAt(arr, index) {\n  // your code here\n}\n",
    solutionCode:
      "function deleteAt(arr, index) {\n  const copy = arr.slice();\n  delete copy[index];\n  return { length: copy.length, hasIndex: index in copy, valueAt: copy[index] };\n}\n",
    annotatedSolution:
      "function deleteAt(arr, index) {\n  const copy = arr.slice();\n  // `delete` removes the property but keeps array length unchanged.\n  delete copy[index];\n  return { length: copy.length, hasIndex: index in copy, valueAt: copy[index] };\n}\n",
    testCases: [
      { input: [[1, 2, 3], 1], expected_output: { length: 3, hasIndex: false, valueAt: undefined }, description: "middle hole" },
      { input: [[1], 0], expected_output: { length: 1, hasIndex: false, valueAt: undefined }, description: "single item hole" },
      { input: [[1, 2], 5], expected_output: { length: 2, hasIndex: false, valueAt: undefined }, description: "out-of-range delete" },
      { input: [[], 0], expected_output: { length: 0, hasIndex: false, valueAt: undefined }, description: "empty array" },
      { input: [["a", "b", "c"], 2], expected_output: { length: 3, hasIndex: false, valueAt: undefined }, description: "last index hole" },
    ],
    hints: [
      "Clone first with `slice()`.",
      "Use `delete copy[index]`.",
      "Check hole existence with `index in copy`.",
    ],
    orderIndex: 329,
  },
  {
    title: "Array concat fundamentals",
    slug: "array-method-fundamentals-11-concat",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array concat()\nImplement `concatArrays(a, b)` returning a new merged array.\n\nPass all 5 exercises.",
    fnName: "concatArrays",
    starterCode: "function concatArrays(a, b) {\n  // your code here\n}\n",
    solutionCode: "function concatArrays(a, b) {\n  return a.concat(b);\n}\n",
    annotatedSolution:
      "function concatArrays(a, b) {\n  // `concat` returns a new array and does not mutate `a`.\n  return a.concat(b);\n}\n",
    testCases: [
      { input: [[1, 2], [3, 4]], expected_output: [1, 2, 3, 4], description: "basic merge" },
      { input: [[], [1]], expected_output: [1], description: "empty first" },
      { input: [[1], []], expected_output: [1], description: "empty second" },
      { input: [["a"], ["b", "c"]], expected_output: ["a", "b", "c"], description: "strings" },
      { input: [[[1], [2]], [[3]]], expected_output: [[1], [2], [3]], description: "nested arrays not deeply flattened" },
    ],
    hints: [
      "Use `a.concat(b)`.",
      "It returns a new array.",
      "No loop required.",
    ],
    orderIndex: 330,
  },
  {
    title: "Array copyWithin fundamentals",
    slug: "array-method-fundamentals-12-copywithin",
    difficulty: "medium",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array copyWithin()\nImplement `copyWithinRange(arr, target, start, end)` and return the transformed copy.\n\nPass all 5 exercises.",
    fnName: "copyWithinRange",
    starterCode: "function copyWithinRange(arr, target, start, end) {\n  // your code here\n}\n",
    solutionCode:
      "function copyWithinRange(arr, target, start, end) {\n  const copy = arr.slice();\n  return copy.copyWithin(target, start, end);\n}\n",
    annotatedSolution:
      "function copyWithinRange(arr, target, start, end) {\n  const copy = arr.slice();\n  // copyWithin mutates and returns the same array.\n  return copy.copyWithin(target, start, end);\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4], 0, 2, 4], expected_output: [3, 4, 3, 4], description: "copy tail to head" },
      { input: [[1, 2, 3, 4], 1, 0, 2], expected_output: [1, 1, 2, 4], description: "copy head inward" },
      { input: [[1, 2, 3], 0, 1], expected_output: [2, 3, 3], description: "end omitted" },
      { input: [[1, 2, 3], -2, 0, 1], expected_output: [1, 1, 3], description: "negative target" },
      { input: [[1, 2, 3], 3, 0, 1], expected_output: [1, 2, 3], description: "target at length no-op" },
    ],
    hints: [
      "Clone first with `slice()`.",
      "Call `copyWithin(target, start, end)` on the clone.",
      "Remember it mutates and returns the same array.",
    ],
    orderIndex: 331,
  },
  {
    title: "Array flat fundamentals",
    slug: "array-method-fundamentals-13-flat",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array flat()\nImplement `flatDepth(arr, depth)` using `flat`.\n\nPass all 5 exercises.",
    fnName: "flatDepth",
    starterCode: "function flatDepth(arr, depth = 1) {\n  // your code here\n}\n",
    solutionCode: "function flatDepth(arr, depth = 1) {\n  return arr.flat(depth);\n}\n",
    annotatedSolution:
      "function flatDepth(arr, depth = 1) {\n  // `flat(1)` flattens one level; increase depth for deeper nesting.\n  return arr.flat(depth);\n}\n",
    testCases: [
      { input: [[1, [2], [3]], 1], expected_output: [1, 2, 3], description: "one level" },
      { input: [[1, [2, [3]]], 1], expected_output: [1, 2, [3]], description: "stops at one level" },
      { input: [[1, [2, [3]]], 2], expected_output: [1, 2, 3], description: "two levels" },
      { input: [[1, 2, 3], 1], expected_output: [1, 2, 3], description: "already flat" },
      { input: [[[], [1, [2]]], 2], expected_output: [1, 2], description: "handles empty nested arrays" },
    ],
    hints: [
      "Use `arr.flat(depth)`.",
      "Depth defaults to 1.",
      "No manual recursion needed.",
    ],
    orderIndex: 332,
  },
  {
    title: "Array slice fundamentals",
    slug: "array-method-fundamentals-14-slice",
    difficulty: "easy",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array slice()\nImplement `sliceRange(arr, start, end)` and return the sliced copy.\n\nPass all 5 exercises.",
    fnName: "sliceRange",
    starterCode: "function sliceRange(arr, start, end) {\n  // your code here\n}\n",
    solutionCode: "function sliceRange(arr, start, end) {\n  return arr.slice(start, end);\n}\n",
    annotatedSolution:
      "function sliceRange(arr, start, end) {\n  // `slice` is non-mutating and end index is exclusive.\n  return arr.slice(start, end);\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4], 1, 3], expected_output: [2, 3], description: "basic range" },
      { input: [[1, 2, 3], 0, 2], expected_output: [1, 2], description: "from start" },
      { input: [[1, 2, 3], 1], expected_output: [2, 3], description: "to end" },
      { input: [[1, 2, 3], -2], expected_output: [2, 3], description: "negative start" },
      { input: [[1, 2, 3], 5], expected_output: [], description: "start beyond length" },
    ],
    hints: [
      "Use the built-in `slice` method.",
      "End index is exclusive.",
      "`slice` does not mutate.",
    ],
    orderIndex: 333,
  },
  {
    title: "Array splice fundamentals",
    slug: "array-method-fundamentals-15-splice",
    difficulty: "medium",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array splice()\nImplement `spliceReplace(arr, start, deleteCount, items)` and return `{ removed, result }` without mutating input.\n\nPass all 5 exercises.",
    fnName: "spliceReplace",
    starterCode: "function spliceReplace(arr, start, deleteCount, items) {\n  // your code here\n}\n",
    solutionCode:
      "function spliceReplace(arr, start, deleteCount, items) {\n  const copy = arr.slice();\n  const removed = copy.splice(start, deleteCount, ...items);\n  return { removed, result: copy };\n}\n",
    annotatedSolution:
      "function spliceReplace(arr, start, deleteCount, items) {\n  const copy = arr.slice();\n  // `splice` mutates and returns removed items.\n  const removed = copy.splice(start, deleteCount, ...items);\n  return { removed, result: copy };\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4], 1, 2, [9, 8]], expected_output: { removed: [2, 3], result: [1, 9, 8, 4] }, description: "replace middle" },
      { input: [[1, 2], 2, 0, [3]], expected_output: { removed: [], result: [1, 2, 3] }, description: "insert at end" },
      { input: [[1, 2, 3], 0, 1, []], expected_output: { removed: [1], result: [2, 3] }, description: "remove first" },
      { input: [[1, 2, 3], -1, 1, [4]], expected_output: { removed: [3], result: [1, 2, 4] }, description: "negative start" },
      { input: [[1], 0, 0, [7, 8]], expected_output: { removed: [], result: [7, 8, 1] }, description: "insert at front" },
    ],
    hints: [
      "Clone first.",
      "Call `splice(start, deleteCount, ...items)` on the clone.",
      "Return both removed items and final array.",
    ],
    orderIndex: 334,
  },
  {
    title: "Array toSpliced fundamentals",
    slug: "array-method-fundamentals-16-tospliced",
    difficulty: "medium",
    topicSlug: "array-methods",
    type: "js",
    description:
      "## Array toSpliced()\nImplement `toSplicedReplace(arr, start, deleteCount, items)` using `toSpliced` (non-mutating).\n\nPass all 5 exercises.",
    fnName: "toSplicedReplace",
    starterCode: "function toSplicedReplace(arr, start, deleteCount, items) {\n  // your code here\n}\n",
    solutionCode:
      "function toSplicedReplace(arr, start, deleteCount, items) {\n  return arr.toSpliced(start, deleteCount, ...items);\n}\n",
    annotatedSolution:
      "function toSplicedReplace(arr, start, deleteCount, items) {\n  // `toSpliced` is the immutable counterpart to `splice`.\n  return arr.toSpliced(start, deleteCount, ...items);\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4], 1, 2, [9, 8]], expected_output: [1, 9, 8, 4], description: "replace middle" },
      { input: [[1, 2], 2, 0, [3]], expected_output: [1, 2, 3], description: "insert end" },
      { input: [[1, 2, 3], 0, 1, []], expected_output: [2, 3], description: "remove first" },
      { input: [[1, 2, 3], -1, 1, [4]], expected_output: [1, 2, 4], description: "negative start" },
      { input: [[1], 0, 0, [7, 8]], expected_output: [7, 8, 1], description: "insert at front" },
    ],
    hints: [
      "Use `toSpliced` directly on the original array.",
      "Spread insertion items.",
      "Unlike `splice`, it returns a new array.",
    ],
    orderIndex: 335,
  },
];

const withReactTestCases = (challenge: SeedChallenge): SeedChallenge => {
  if (challenge.type !== "react" || challenge.testCases.length > 0) {
    return challenge;
  }
  const checks = challenge.reactChecklist?.slice(0, 3) ?? ["Manual verification required"];
  return {
    ...challenge,
    testCases: checks.map((description, index) => ({
      input: ["manual", index + 1],
      expected_output: "pass",
      description,
    })),
  };
};

const JS_TOPIC_CHALLENGES: SeedChallenge[] = [
  // ── destructuring ─────────────────────────────────────────────────────────────
  {
    title: "Array destructuring with defaults",
    slug: "jsfund-destructure-02-array-defaults",
    difficulty: "easy",
    topicSlug: "destructuring",
    type: "js",
    description:
      "## Array destructuring\nImplement `firstTwo(arr)` returning `{ first, second }` using array destructuring with defaults of `null` when elements are missing.",
    fnName: "firstTwo",
    starterCode: "function firstTwo(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function firstTwo(arr) {\n  const [first = null, second = null] = arr;\n  return { first, second };\n}\n",
    annotatedSolution:
      "function firstTwo(arr) {\n  // Array destructuring with position-based assignment and defaults.\n  const [first = null, second = null] = arr;\n  return { first, second };\n}\n",
    testCases: [
      { input: [[10, 20, 30]], expected_output: { first: 10, second: 20 }, description: "picks first two" },
      { input: [[5]], expected_output: { first: 5, second: null }, description: "defaults second to null" },
      { input: [[]], expected_output: { first: null, second: null }, description: "both default when empty" },
    ],
    hints: [
      "Use square bracket destructuring: `const [a, b] = arr;`",
      "Add defaults inside the brackets: `const [a = null, b = null] = arr;`",
      "Return the named values as an object.",
    ],
    orderIndex: 400,
  },
  {
    title: "Swap two variables",
    slug: "jsfund-destructure-03-swap",
    difficulty: "easy",
    topicSlug: "destructuring",
    type: "js",
    description:
      "## Swap with destructuring\nImplement `swapValues(a, b)` returning an array `[b, a]` — swap the values using destructuring assignment in one line.",
    fnName: "swapValues",
    starterCode: "function swapValues(a, b) {\n  // your code here\n}\n",
    solutionCode:
      "function swapValues(a, b) {\n  [a, b] = [b, a];\n  return [a, b];\n}\n",
    annotatedSolution:
      "function swapValues(a, b) {\n  // Destructuring swap: no temp variable needed.\n  [a, b] = [b, a];\n  return [a, b];\n}\n",
    testCases: [
      { input: [1, 2], expected_output: [2, 1], description: "swaps numbers" },
      { input: ["x", "y"], expected_output: ["y", "x"], description: "swaps strings" },
      { input: [null, 42], expected_output: [42, null], description: "swaps with null" },
    ],
    hints: [
      "The pattern `[a, b] = [b, a]` swaps in one line.",
      "No temporary variable is needed.",
      "Return the pair as an array.",
    ],
    orderIndex: 401,
  },
  {
    title: "Destructure function parameters",
    slug: "jsfund-destructure-04-params",
    difficulty: "easy",
    topicSlug: "destructuring",
    type: "js",
    description:
      "## Parameter destructuring\nImplement `formatAddress({ street, city, country = 'US' })` returning the string `\"<street>, <city>, <country>\"`.\n\nDestructure directly in the parameter list.",
    fnName: "formatAddress",
    starterCode: "function formatAddress({ street, city, country = 'US' }) {\n  // your code here\n}\n",
    solutionCode:
      "function formatAddress({ street, city, country = 'US' }) {\n  return `${street}, ${city}, ${country}`;\n}\n",
    annotatedSolution:
      "function formatAddress({ street, city, country = 'US' }) {\n  // Default inside destructuring params — no extra logic needed.\n  return `${street}, ${city}, ${country}`;\n}\n",
    testCases: [
      { input: [{ street: "10 Elm", city: "Oslo", country: "NO" }], expected_output: "10 Elm, Oslo, NO", description: "explicit country" },
      { input: [{ street: "5 Oak", city: "Austin" }], expected_output: "5 Oak, Austin, US", description: "defaults country to US" },
    ],
    hints: [
      "Destructure directly inside the `()` parameter list.",
      "Add `= 'US'` after `country` to provide the default.",
      "Build the return string with a template literal.",
    ],
    orderIndex: 402,
  },
  {
    title: "Collect the rest",
    slug: "jsfund-destructure-05-rest",
    difficulty: "medium",
    topicSlug: "destructuring",
    type: "js",
    description:
      "## Rest in destructuring\nImplement `splitHead(arr)` returning `{ head, tail }` where `head` is the first element and `tail` is the rest of the array.",
    fnName: "splitHead",
    starterCode: "function splitHead(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function splitHead(arr) {\n  const [head, ...tail] = arr;\n  return { head, tail };\n}\n",
    annotatedSolution:
      "function splitHead(arr) {\n  // Rest element collects all remaining items after the first.\n  const [head, ...tail] = arr;\n  return { head, tail };\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4]], expected_output: { head: 1, tail: [2, 3, 4] }, description: "splits normally" },
      { input: [[42]], expected_output: { head: 42, tail: [] }, description: "tail is empty for single element" },
      { input: [["a", "b"]], expected_output: { head: "a", tail: ["b"] }, description: "works with strings" },
    ],
    hints: [
      "Use `const [head, ...tail] = arr;`",
      "The rest operator must be last in the destructuring pattern.",
      "Return both as an object with shorthand keys.",
    ],
    orderIndex: 403,
  },
  // ── error-handling ────────────────────────────────────────────────────────────
  {
    title: "Safe division",
    slug: "jsfund-error-01-safe-divide",
    difficulty: "easy",
    topicSlug: "error-handling",
    type: "js",
    description:
      "## try/catch basics\nImplement `safeDivide(a, b)` that returns `a / b` when `b !== 0`, otherwise throws an `Error` with message `'Division by zero'`.",
    fnName: "safeDivide",
    starterCode: "function safeDivide(a, b) {\n  // your code here\n}\n",
    solutionCode:
      "function safeDivide(a, b) {\n  if (b === 0) throw new Error('Division by zero');\n  return a / b;\n}\n",
    annotatedSolution:
      "function safeDivide(a, b) {\n  // Guard against the exceptional case first, then do the work.\n  if (b === 0) throw new Error('Division by zero');\n  return a / b;\n}\n",
    testCases: [
      { input: [10, 2], expected_output: 5, description: "normal division" },
      { input: [7, 2], expected_output: 3.5, description: "decimal result" },
      { input: [9, 3], expected_output: 3, description: "exact division" },
    ],
    hints: [
      "Check if `b === 0` before dividing.",
      "Use `throw new Error('...')` to signal the exceptional case.",
      "Otherwise just return `a / b`.",
    ],
    orderIndex: 404,
  },
  {
    title: "Parse number safely",
    slug: "jsfund-error-02-parse-safe",
    difficulty: "easy",
    topicSlug: "error-handling",
    type: "js",
    description:
      "## Catching errors\nImplement `parseIntSafe(str)` using try/catch. If `parseInt(str)` produces `NaN`, throw an `Error` with message `'Not a number'`. Otherwise return the integer.",
    fnName: "parseIntSafe",
    starterCode: "function parseIntSafe(str) {\n  // your code here\n}\n",
    solutionCode:
      "function parseIntSafe(str) {\n  const n = parseInt(str, 10);\n  if (Number.isNaN(n)) throw new Error('Not a number');\n  return n;\n}\n",
    annotatedSolution:
      "function parseIntSafe(str) {\n  // parseInt never throws, it returns NaN on bad input — check that.\n  const n = parseInt(str, 10);\n  if (Number.isNaN(n)) throw new Error('Not a number');\n  return n;\n}\n",
    testCases: [
      { input: ["42"], expected_output: 42, description: "valid integer string" },
      { input: ["-7"], expected_output: -7, description: "negative number" },
      { input: ["100"], expected_output: 100, description: "three digit number" },
    ],
    hints: [
      "Always provide a radix: `parseInt(str, 10)`.",
      "Check for `NaN` using `Number.isNaN()`, not `=== NaN`.",
      "Throw with a meaningful message.",
    ],
    orderIndex: 405,
  },
  {
    title: "Wrap risky operation",
    slug: "jsfund-error-03-wrap-risky",
    difficulty: "easy",
    topicSlug: "error-handling",
    type: "js",
    description:
      "## try/catch return\nImplement `tryGet(fn)` that calls `fn()` and returns `{ ok: true, value }` on success, or `{ ok: false, error: err.message }` when `fn()` throws.",
    fnName: "tryGet",
    starterCode: "function tryGet(fn) {\n  // your code here\n}\n",
    solutionCode:
      "function tryGet(fn) {\n  try {\n    return { ok: true, value: fn() };\n  } catch (err) {\n    return { ok: false, error: err.message };\n  }\n}\n",
    annotatedSolution:
      "function tryGet(fn) {\n  try {\n    return { ok: true, value: fn() };\n  } catch (err) {\n    // Catch transforms the exception into a structured error result.\n    return { ok: false, error: err.message };\n  }\n}\n",
    testCases: [
      { input: [() => 42], expected_output: { ok: true, value: 42 }, description: "success path" },
      { input: [() => "hello"], expected_output: { ok: true, value: "hello" }, description: "string success" },
      { input: [() => { throw new Error("boom"); }], expected_output: { ok: false, error: "boom" }, description: "catches thrown error" },
    ],
    hints: [
      "Wrap `fn()` call inside a `try` block.",
      "Return the result shape for success inside `try`.",
      "Catch the error and return the failure shape using `err.message`.",
    ],
    orderIndex: 406,
  },
  {
    title: "Finally cleanup",
    slug: "jsfund-error-04-finally",
    difficulty: "easy",
    topicSlug: "error-handling",
    type: "js",
    description:
      "## finally clause\nImplement `withCleanup(fn, cleanup)` that calls `fn()`, always calls `cleanup()` afterwards (whether or not `fn()` threw), and returns the result of `fn()` or re-throws its error.",
    fnName: "withCleanup",
    starterCode: "function withCleanup(fn, cleanup) {\n  // your code here\n}\n",
    solutionCode:
      "function withCleanup(fn, cleanup) {\n  try {\n    return fn();\n  } catch (err) {\n    throw err;\n  } finally {\n    cleanup();\n  }\n}\n",
    annotatedSolution:
      "function withCleanup(fn, cleanup) {\n  try {\n    return fn();\n  } catch (err) {\n    // Re-throw so callers still see the error.\n    throw err;\n  } finally {\n    // `finally` always runs — perfect for cleanup regardless of outcome.\n    cleanup();\n  }\n}\n",
    testCases: [
      {
        input: [() => 7, () => {}],
        expected_output: 7,
        description: "returns value from fn",
      },
      {
        input: [() => "done", () => {}],
        expected_output: "done",
        description: "works with string result",
      },
    ],
    hints: [
      "Use a `try/catch/finally` structure.",
      "`finally` runs whether or not an error was thrown.",
      "Re-throw the error in `catch` so callers still see it.",
    ],
    orderIndex: 407,
  },
  {
    title: "Custom error class",
    slug: "jsfund-error-05-custom-class",
    difficulty: "medium",
    topicSlug: "error-handling",
    type: "js",
    description:
      "## Custom errors\nCreate a `ValidationError` class that extends `Error`. Implement `validateAge(age)` that throws `ValidationError('Age must be >= 0')` when `age < 0` and throws `ValidationError('Age must be <= 150')` when `age > 150`. Otherwise return `age`.\n\nBoth classes must be defined in your solution.",
    fnName: "validateAge",
    starterCode:
      "class ValidationError extends Error {\n  // your code here\n}\n\nfunction validateAge(age) {\n  // your code here\n}\n",
    solutionCode:
      "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'ValidationError';\n  }\n}\n\nfunction validateAge(age) {\n  if (age < 0) throw new ValidationError('Age must be >= 0');\n  if (age > 150) throw new ValidationError('Age must be <= 150');\n  return age;\n}\n",
    annotatedSolution:
      "class ValidationError extends Error {\n  constructor(message) {\n    // Call the Error constructor with the message.\n    super(message);\n    // Override the default 'Error' name for better stack traces.\n    this.name = 'ValidationError';\n  }\n}\n\nfunction validateAge(age) {\n  // Throw specialised errors so callers can catch ValidationError specifically.\n  if (age < 0) throw new ValidationError('Age must be >= 0');\n  if (age > 150) throw new ValidationError('Age must be <= 150');\n  return age;\n}\n",
    testCases: [
      { input: [25], expected_output: 25, description: "valid age" },
      { input: [0], expected_output: 0, description: "zero is valid" },
      { input: [150], expected_output: 150, description: "upper boundary is valid" },
    ],
    hints: [
      "Extend `Error` and call `super(message)` in the constructor.",
      "Set `this.name` for a clearer error type.",
      "Use `throw new ValidationError(...)` for invalid inputs.",
    ],
    orderIndex: 408,
  },
  // ── this-keyword ──────────────────────────────────────────────────────────────
  {
    title: "Arrow function preserves this",
    slug: "jsfund-this-02-arrow-preserve",
    difficulty: "easy",
    topicSlug: "this-keyword",
    type: "js",
    description:
      "## Arrow vs regular function\nImplement `makeGreeter(name)` returning an object with a `greet()` method.\n\n`greet()` should return `'Hello from <name>'`.\n\nUse an arrow function inside the method body to ensure `this.name` is captured correctly from the outer method scope.",
    fnName: "makeGreeter",
    starterCode: "function makeGreeter(name) {\n  // your code here\n}\n",
    solutionCode:
      "function makeGreeter(name) {\n  return {\n    name,\n    greet() {\n      const inner = () => `Hello from ${this.name}`;\n      return inner();\n    },\n  };\n}\n",
    annotatedSolution:
      "function makeGreeter(name) {\n  return {\n    name,\n    greet() {\n      // Arrow function captures `this` from the enclosing method — no binding needed.\n      const inner = () => `Hello from ${this.name}`;\n      return inner();\n    },\n  };\n}\n",
    testCases: [
      { input: ["Kai"], expected_output: "Hello from Kai", description: "arrow captures outer this" },
      { input: ["Ava"], expected_output: "Hello from Ava", description: "works with another name" },
    ],
    hints: [
      "Arrow functions do not have their own `this` — they inherit it.",
      "Use a regular method for the outer function and an arrow function inside.",
      "Returning the arrow's result from the method gives the expected string.",
    ],
    orderIndex: 409,
  },
  {
    title: "Bind a method to its object",
    slug: "jsfund-this-03-bind-method",
    difficulty: "easy",
    topicSlug: "this-keyword",
    type: "js",
    description:
      "## bind()\nImplement `createBoundLogger(prefix)` that returns a function `log(msg)` bound so that calling it always returns `'[<prefix>] <msg>'`, even when extracted from any object.",
    fnName: "createBoundLogger",
    starterCode: "function createBoundLogger(prefix) {\n  // your code here\n}\n",
    solutionCode:
      "function createBoundLogger(prefix) {\n  const obj = {\n    prefix,\n    log(msg) {\n      return `[${this.prefix}] ${msg}`;\n    },\n  };\n  return obj.log.bind(obj);\n}\n",
    annotatedSolution:
      "function createBoundLogger(prefix) {\n  const obj = { prefix, log(msg) { return `[${this.prefix}] ${msg}`; } };\n  // bind() permanently ties `this` to `obj`, regardless of call site.\n  return obj.log.bind(obj);\n}\n",
    testCases: [
      { input: ["INFO"], expected_output: (fn: (m: string) => string) => fn("server started"), description: "returns bound function that prepends prefix" },
    ],
    hints: [
      "Create an object with a `log` method that reads `this.prefix`.",
      "Use `Function.prototype.bind(obj)` to lock `this`.",
      "Return the bound function, not the object.",
    ],
    orderIndex: 410,
  },
  {
    title: "apply to call with array args",
    slug: "jsfund-this-04-apply",
    difficulty: "medium",
    topicSlug: "this-keyword",
    type: "js",
    description:
      "## apply()\nImplement `sumWithApply(numbers)` using `Math.max.apply(null, numbers)` to find the maximum — i.e. spread the array elements as arguments via `apply`.",
    fnName: "sumWithApply",
    starterCode: "function sumWithApply(numbers) {\n  // your code here\n}\n",
    solutionCode:
      "function sumWithApply(numbers) {\n  return Math.max.apply(null, numbers);\n}\n",
    annotatedSolution:
      "function sumWithApply(numbers) {\n  // apply() spreads the array as individual args — the pre-spread-operator pattern.\n  return Math.max.apply(null, numbers);\n}\n",
    testCases: [
      { input: [[3, 1, 4, 1, 5, 9]], expected_output: 9, description: "finds max via apply" },
      { input: [[-1, -5, -2]], expected_output: -1, description: "handles all negatives" },
      { input: [[7]], expected_output: 7, description: "single element" },
    ],
    hints: [
      "`apply(thisArg, argsArray)` spreads an array as individual arguments.",
      "Pass `null` as `thisArg` when `this` isn't used.",
      "This is the classic pre-spread way to call `Math.max` on an array.",
    ],
    orderIndex: 411,
  },
  {
    title: "Method borrowing",
    slug: "jsfund-this-05-borrow",
    difficulty: "medium",
    topicSlug: "this-keyword",
    type: "js",
    description:
      "## Method borrowing\nImplement `getFullName(person)` using `call` to borrow a method. Define a helper object with a `fullName()` method that reads `this.first` and `this.last`, then call it with `person` as `this`.\n\nReturn `'<first> <last>'`.",
    fnName: "getFullName",
    starterCode: "function getFullName(person) {\n  // your code here\n}\n",
    solutionCode:
      "function getFullName(person) {\n  const helper = {\n    fullName() {\n      return `${this.first} ${this.last}`;\n    },\n  };\n  return helper.fullName.call(person);\n}\n",
    annotatedSolution:
      "function getFullName(person) {\n  const helper = {\n    fullName() {\n      // `this` will be whatever `call` provides.\n      return `${this.first} ${this.last}`;\n    },\n  };\n  // Borrow the method by calling it with `person` as the receiver.\n  return helper.fullName.call(person);\n}\n",
    testCases: [
      { input: [{ first: "Ada", last: "Lovelace" }], expected_output: "Ada Lovelace", description: "borrows method for person object" },
      { input: [{ first: "Grace", last: "Hopper" }], expected_output: "Grace Hopper", description: "works with another person" },
    ],
    hints: [
      "Define any object with a `fullName()` method.",
      "Use `.call(person)` to run it with `person` as `this`.",
      "Template literal: `${this.first} ${this.last}`.",
    ],
    orderIndex: 412,
  },
  // ── event-loop ────────────────────────────────────────────────────────────────
  {
    title: "Predict microtask order",
    slug: "jsfund-eventloop-01-microtask-order",
    difficulty: "easy",
    topicSlug: "event-loop",
    type: "js",
    description:
      "## Microtask queue\nImplement `collectMicrotaskOrder()` that returns a Promise resolving to the array `['sync', 'microtask', 'macro']` — demonstrating that synchronous code runs first, then resolved Promise callbacks, then setTimeout callbacks.\n\nBuild the array by pushing to it in the right order using synchronous code + `.then()` + `setTimeout`.",
    fnName: "collectMicrotaskOrder",
    starterCode: "function collectMicrotaskOrder() {\n  // your code here — return a Promise\n}\n",
    solutionCode:
      "function collectMicrotaskOrder() {\n  return new Promise((resolve) => {\n    const log = [];\n    log.push('sync');\n    Promise.resolve().then(() => log.push('microtask'));\n    setTimeout(() => {\n      log.push('macro');\n      resolve(log);\n    }, 0);\n  });\n}\n",
    annotatedSolution:
      "function collectMicrotaskOrder() {\n  return new Promise((resolve) => {\n    const log = [];\n    // 1. Synchronous: runs immediately during this tick.\n    log.push('sync');\n    // 2. Microtask: `.then()` queues into the microtask queue, runs after current task.\n    Promise.resolve().then(() => log.push('microtask'));\n    // 3. Macrotask: setTimeout queues a task; runs after microtasks drain.\n    setTimeout(() => {\n      log.push('macro');\n      resolve(log);\n    }, 0);\n  });\n}\n",
    testCases: [
      { input: [], expected_output: ["sync", "microtask", "macro"], description: "correct event-loop ordering" },
    ],
    hints: [
      "Push 'sync' synchronously when the Promise executor runs.",
      "Use `Promise.resolve().then(...)` to queue a microtask.",
      "Use `setTimeout(..., 0)` for the macrotask — resolve the outer Promise inside it.",
    ],
    orderIndex: 413,
  },
  {
    title: "Throttle call model",
    slug: "jsfund-eventloop-02-throttle-model",
    difficulty: "easy",
    topicSlug: "event-loop",
    type: "js",
    description:
      "## Throttle (pure model)\nModel the output of a leading-edge throttle (emits the first call in each window, drops the rest).\n\nImplement `throttleLeadingValue(calls, windowSize)` — same shape as the debounce challenge. Return the values that a leading-edge throttle would emit.",
    fnName: "throttleLeadingValue",
    starterCode: "function throttleLeadingValue(calls, windowSize) {\n  // your code here\n}\n",
    solutionCode:
      "function throttleLeadingValue(calls, windowSize) {\n  const out = [];\n  let lastEmitTime = -Infinity;\n  for (const { time, value } of calls) {\n    if (time - lastEmitTime > windowSize) {\n      out.push(value);\n      lastEmitTime = time;\n    }\n  }\n  return out;\n}\n",
    annotatedSolution:
      "function throttleLeadingValue(calls, windowSize) {\n  const out = [];\n  let lastEmitTime = -Infinity; // before any call\n  for (const { time, value } of calls) {\n    // Leading-edge: emit if we're outside the last window.\n    if (time - lastEmitTime > windowSize) {\n      out.push(value);\n      lastEmitTime = time;\n    }\n  }\n  return out;\n}\n",
    testCases: [
      {
        input: [[{ time: 0, value: "a" }, { time: 5, value: "b" }, { time: 100, value: "c" }], 10],
        expected_output: ["a", "c"],
        description: "b is within window of a, gets dropped",
      },
      {
        input: [[{ time: 0, value: "x" }, { time: 20, value: "y" }], 10],
        expected_output: ["x", "y"],
        description: "both emit when outside window",
      },
    ],
    hints: [
      "Track the last time something was emitted.",
      "Only emit if `time - lastEmitTime > windowSize`.",
      "Initialize `lastEmitTime` to `-Infinity` so the first call always emits.",
    ],
    orderIndex: 414,
  },
  {
    title: "Sequential async pipeline",
    slug: "jsfund-eventloop-03-sequential-async",
    difficulty: "medium",
    topicSlug: "event-loop",
    type: "js",
    description:
      "## async/await sequence\nImplement `runPipeline(values, asyncTransform)` that applies `asyncTransform(value)` to each value **sequentially** (wait for each result before the next) and returns the accumulated results array.",
    fnName: "runPipeline",
    starterCode: "async function runPipeline(values, asyncTransform) {\n  // your code here\n}\n",
    solutionCode:
      "async function runPipeline(values, asyncTransform) {\n  const results = [];\n  for (const v of values) {\n    results.push(await asyncTransform(v));\n  }\n  return results;\n}\n",
    annotatedSolution:
      "async function runPipeline(values, asyncTransform) {\n  const results = [];\n  // Sequential: `await` inside a for-of loop — one at a time.\n  for (const v of values) {\n    results.push(await asyncTransform(v));\n  }\n  return results;\n}\n",
    testCases: [
      {
        input: [[1, 2, 3], (n: number) => Promise.resolve(n * 2)],
        expected_output: [2, 4, 6],
        description: "doubles each value sequentially",
      },
      {
        input: [["a", "b"], (s: string) => Promise.resolve(s.toUpperCase())],
        expected_output: ["A", "B"],
        description: "transforms strings sequentially",
      },
    ],
    hints: [
      "Use `for...of` with `await` inside — this guarantees sequential execution.",
      "`Promise.all` would run them in parallel; don't use it here.",
      "Push each awaited result to the results array.",
    ],
    orderIndex: 415,
  },
  {
    title: "Promise.all vs sequential timing",
    slug: "jsfund-eventloop-04-parallel-all",
    difficulty: "medium",
    topicSlug: "event-loop",
    type: "js",
    description:
      "## Promise.all\nImplement `fetchAll(ids, fetchOne)` that fetches all IDs **in parallel** using `Promise.all` and returns the results array.",
    fnName: "fetchAll",
    starterCode: "async function fetchAll(ids, fetchOne) {\n  // your code here\n}\n",
    solutionCode:
      "async function fetchAll(ids, fetchOne) {\n  return Promise.all(ids.map(fetchOne));\n}\n",
    annotatedSolution:
      "async function fetchAll(ids, fetchOne) {\n  // map creates all promises at once; Promise.all waits for all of them in parallel.\n  return Promise.all(ids.map(fetchOne));\n}\n",
    testCases: [
      {
        input: [[1, 2, 3], (id: number) => Promise.resolve(id * 10)],
        expected_output: [10, 20, 30],
        description: "fetches all in parallel and preserves order",
      },
      {
        input: [["a"], (s: string) => Promise.resolve(s + "!")],
        expected_output: ["a!"],
        description: "single item",
      },
    ],
    hints: [
      "Use `.map()` to create one Promise per id.",
      "Pass the resulting array to `Promise.all`.",
      "`Promise.all` resolves with an array preserving order.",
    ],
    orderIndex: 416,
  },
  // ── promises-async ────────────────────────────────────────────────────────────
  {
    title: "Async error fallback",
    slug: "jsfund-promise-04-error-fallback",
    difficulty: "medium",
    topicSlug: "promises-async",
    type: "js",
    description:
      "## .catch() fallback\nImplement `fetchWithFallback(fetchFn, fallbackValue)` that calls `fetchFn()` and returns its result. If `fetchFn()` rejects, return `fallbackValue` instead.",
    fnName: "fetchWithFallback",
    starterCode: "async function fetchWithFallback(fetchFn, fallbackValue) {\n  // your code here\n}\n",
    solutionCode:
      "async function fetchWithFallback(fetchFn, fallbackValue) {\n  try {\n    return await fetchFn();\n  } catch {\n    return fallbackValue;\n  }\n}\n",
    annotatedSolution:
      "async function fetchWithFallback(fetchFn, fallbackValue) {\n  try {\n    return await fetchFn();\n  } catch {\n    // On any rejection, return the safe fallback.\n    return fallbackValue;\n  }\n}\n",
    testCases: [
      {
        input: [() => Promise.resolve("data"), "fallback"],
        expected_output: "data",
        description: "returns resolved value",
      },
      {
        input: [() => Promise.reject(new Error("network error")), "fallback"],
        expected_output: "fallback",
        description: "returns fallback on rejection",
      },
    ],
    hints: [
      "Use try/catch around the `await fetchFn()` call.",
      "Return `fallbackValue` in the catch block.",
      "No need to inspect the error — any failure uses the fallback.",
    ],
    orderIndex: 417,
  },
  {
    title: "Run async tasks in batches",
    slug: "jsfund-promise-05-batch",
    difficulty: "hard",
    topicSlug: "promises-async",
    type: "js",
    description:
      "## Batch concurrency\nImplement `runInBatches(items, asyncFn, batchSize)` that processes items in sequential batches of `batchSize` using `Promise.all`, then concatenates all results.",
    fnName: "runInBatches",
    starterCode: "async function runInBatches(items, asyncFn, batchSize) {\n  // your code here\n}\n",
    solutionCode:
      "async function runInBatches(items, asyncFn, batchSize) {\n  const results = [];\n  for (let i = 0; i < items.length; i += batchSize) {\n    const batch = items.slice(i, i + batchSize);\n    const batchResults = await Promise.all(batch.map(asyncFn));\n    results.push(...batchResults);\n  }\n  return results;\n}\n",
    annotatedSolution:
      "async function runInBatches(items, asyncFn, batchSize) {\n  const results = [];\n  // Process batchSize items in parallel, then wait before next batch.\n  for (let i = 0; i < items.length; i += batchSize) {\n    const batch = items.slice(i, i + batchSize);\n    const batchResults = await Promise.all(batch.map(asyncFn));\n    results.push(...batchResults);\n  }\n  return results;\n}\n",
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], (n: number) => Promise.resolve(n * 2), 2],
        expected_output: [2, 4, 6, 8, 10],
        description: "processes in batches of 2",
      },
      {
        input: [["a", "b", "c"], (s: string) => Promise.resolve(s.toUpperCase()), 3],
        expected_output: ["A", "B", "C"],
        description: "single batch covers all items",
      },
    ],
    hints: [
      "Iterate with `i += batchSize` to step through batches.",
      "Slice `items` to get the current batch.",
      "Await `Promise.all` on the batch before moving to the next.",
    ],
    orderIndex: 418,
  },
  // ── es-modules ────────────────────────────────────────────────────────────────
  {
    title: "Build a module-style config object",
    slug: "jsfund-esmodules-02-config-object",
    difficulty: "easy",
    topicSlug: "es-modules",
    type: "js",
    description:
      "## Module design\nImplement `createConfig(overrides)` that merges overrides into a default config and returns the result. Default config: `{ debug: false, timeout: 5000, retries: 3 }`.",
    fnName: "createConfig",
    starterCode: "function createConfig(overrides) {\n  // your code here\n}\n",
    solutionCode:
      "function createConfig(overrides) {\n  const defaults = { debug: false, timeout: 5000, retries: 3 };\n  return { ...defaults, ...overrides };\n}\n",
    annotatedSolution:
      "function createConfig(overrides) {\n  const defaults = { debug: false, timeout: 5000, retries: 3 };\n  // Spread defaults first, then overrides — later keys win.\n  return { ...defaults, ...overrides };\n}\n",
    testCases: [
      { input: [{}], expected_output: { debug: false, timeout: 5000, retries: 3 }, description: "returns defaults when no overrides" },
      { input: [{ debug: true }], expected_output: { debug: true, timeout: 5000, retries: 3 }, description: "overrides one field" },
      { input: [{ timeout: 1000, retries: 1 }], expected_output: { debug: false, timeout: 1000, retries: 1 }, description: "overrides multiple fields" },
    ],
    hints: [
      "Define a `defaults` object inside the function.",
      "Use object spread `{ ...defaults, ...overrides }` to merge.",
      "Later keys overwrite earlier ones in spread.",
    ],
    orderIndex: 419,
  },
  {
    title: "Named export pattern",
    slug: "jsfund-esmodules-03-named-exports",
    difficulty: "easy",
    topicSlug: "es-modules",
    type: "js",
    description:
      "## Named exports simulation\nImplement `buildMathModule()` that returns an object simulating named exports: `{ add, subtract, multiply }` where each is a pure function of two numbers.",
    fnName: "buildMathModule",
    starterCode: "function buildMathModule() {\n  // your code here\n}\n",
    solutionCode:
      "function buildMathModule() {\n  const add = (a, b) => a + b;\n  const subtract = (a, b) => a - b;\n  const multiply = (a, b) => a * b;\n  return { add, subtract, multiply };\n}\n",
    annotatedSolution:
      "function buildMathModule() {\n  // Each function is a 'named export' — isolated, pure, testable.\n  const add = (a, b) => a + b;\n  const subtract = (a, b) => a - b;\n  const multiply = (a, b) => a * b;\n  return { add, subtract, multiply };\n}\n",
    testCases: [
      { input: [], expected_output: (m: { add: Function; subtract: Function; multiply: Function }) => m.add(2, 3) === 5 && m.subtract(10, 4) === 6 && m.multiply(3, 4) === 12, description: "all three exports work correctly" },
    ],
    hints: [
      "Define three arrow functions for add, subtract, and multiply.",
      "Return them as a named object (shorthand property syntax).",
      "Each function should be pure — no side effects.",
    ],
    orderIndex: 420,
  },
  {
    title: "Re-export aggregator",
    slug: "jsfund-esmodules-04-re-export",
    difficulty: "easy",
    topicSlug: "es-modules",
    type: "js",
    description:
      "## Barrel file pattern\nImplement `createBarrel(moduleA, moduleB)` that merges all exports from two module objects into a single object (simulating a barrel/index file re-export pattern).",
    fnName: "createBarrel",
    starterCode: "function createBarrel(moduleA, moduleB) {\n  // your code here\n}\n",
    solutionCode:
      "function createBarrel(moduleA, moduleB) {\n  return { ...moduleA, ...moduleB };\n}\n",
    annotatedSolution:
      "function createBarrel(moduleA, moduleB) {\n  // A barrel file re-exports everything from sub-modules in one place.\n  return { ...moduleA, ...moduleB };\n}\n",
    testCases: [
      { input: [{ a: 1 }, { b: 2 }], expected_output: { a: 1, b: 2 }, description: "merges two modules" },
      { input: [{ x: 10, y: 20 }, { z: 30 }], expected_output: { x: 10, y: 20, z: 30 }, description: "merges with multiple keys" },
      { input: [{ a: 1 }, { a: 2, b: 3 }], expected_output: { a: 2, b: 3 }, description: "moduleB overrides duplicate keys" },
    ],
    hints: [
      "Use object spread: `{ ...moduleA, ...moduleB }`.",
      "If both modules export the same name, the second wins (like re-export collision).",
      "Return the merged object.",
    ],
    orderIndex: 421,
  },
  {
    title: "Lazy initializer pattern",
    slug: "jsfund-esmodules-05-lazy-init",
    difficulty: "medium",
    topicSlug: "es-modules",
    type: "js",
    description:
      "## Module-level singleton\nImplement `makeLazyModule(factory)` that wraps a `factory` function and ensures it is called **at most once** — memoizing the result and returning it on every subsequent call.",
    fnName: "makeLazyModule",
    starterCode: "function makeLazyModule(factory) {\n  // your code here — return a function\n}\n",
    solutionCode:
      "function makeLazyModule(factory) {\n  let instance;\n  let initialized = false;\n  return function get() {\n    if (!initialized) {\n      instance = factory();\n      initialized = true;\n    }\n    return instance;\n  };\n}\n",
    annotatedSolution:
      "function makeLazyModule(factory) {\n  let instance;\n  let initialized = false;\n  return function get() {\n    // Only call factory on the first invocation.\n    if (!initialized) {\n      instance = factory();\n      initialized = true;\n    }\n    return instance;\n  };\n}\n",
    testCases: [
      {
        input: [() => ({ id: Math.random() })],
        expected_output: (get: () => { id: number }) => { const a = get(); const b = get(); return a === b; },
        description: "factory is called only once, same reference returned",
      },
    ],
    hints: [
      "Use a closure to hold `instance` and an `initialized` flag.",
      "Call `factory()` only when `initialized` is false, then set the flag.",
      "Return the same `instance` on every subsequent call.",
    ],
    orderIndex: 422,
  },
  // ── prototypes ────────────────────────────────────────────────────────────────
  {
    title: "Prototype chain lookup",
    slug: "jsfund-proto-02-chain-lookup",
    difficulty: "easy",
    topicSlug: "prototypes",
    type: "js",
    description:
      "## Object.create\nImplement `buildAnimal(name, sound)` using `Object.create` to set up a prototype chain. The base prototype should have a `speak()` method returning `'<name> says <sound>'`. Return the created instance.",
    fnName: "buildAnimal",
    starterCode: "function buildAnimal(name, sound) {\n  // your code here\n}\n",
    solutionCode:
      "function buildAnimal(name, sound) {\n  const proto = {\n    speak() {\n      return `${this.name} says ${this.sound}`;\n    },\n  };\n  const animal = Object.create(proto);\n  animal.name = name;\n  animal.sound = sound;\n  return animal;\n}\n",
    annotatedSolution:
      "function buildAnimal(name, sound) {\n  const proto = {\n    // `speak` lives on the prototype, shared by all animals.\n    speak() { return `${this.name} says ${this.sound}`; },\n  };\n  // Object.create sets the [[Prototype]] of the new object.\n  const animal = Object.create(proto);\n  animal.name = name;\n  animal.sound = sound;\n  return animal;\n}\n",
    testCases: [
      { input: ["Cat", "meow"], expected_output: (a: { speak: () => string }) => a.speak() === "Cat says meow", description: "prototype method available on instance" },
      { input: ["Dog", "woof"], expected_output: (a: { speak: () => string }) => a.speak() === "Dog says woof", description: "another instance uses same method" },
    ],
    hints: [
      "Define a prototype object with a `speak()` method.",
      "Use `Object.create(proto)` to create the instance.",
      "Set `name` and `sound` directly on the instance.",
    ],
    orderIndex: 423,
  },
  {
    title: "hasOwnProperty guard",
    slug: "jsfund-proto-03-hasown",
    difficulty: "easy",
    topicSlug: "prototypes",
    type: "js",
    description:
      "## Own vs inherited properties\nImplement `getOwnKeys(obj)` returning an array of only the **own** enumerable keys of `obj` (not inherited from its prototype).",
    fnName: "getOwnKeys",
    starterCode: "function getOwnKeys(obj) {\n  // your code here\n}\n",
    solutionCode:
      "function getOwnKeys(obj) {\n  return Object.keys(obj);\n}\n",
    annotatedSolution:
      "function getOwnKeys(obj) {\n  // Object.keys only returns own enumerable keys — no prototype chain.\n  return Object.keys(obj);\n}\n",
    testCases: [
      { input: [{ a: 1, b: 2 }], expected_output: ["a", "b"], description: "returns own keys" },
      { input: [Object.create({ inherited: true }, { own: { value: 1, enumerable: true } })], expected_output: ["own"], description: "excludes inherited keys" },
      { input: [{}], expected_output: [], description: "empty object has no keys" },
    ],
    hints: [
      "`Object.keys()` only returns own enumerable property names.",
      "Inherited properties from the prototype chain are excluded.",
      "You could also use `Object.hasOwn()` to filter manually.",
    ],
    orderIndex: 424,
  },
  {
    title: "Constructor function pattern",
    slug: "jsfund-proto-04-constructor",
    difficulty: "medium",
    topicSlug: "prototypes",
    type: "js",
    description:
      "## Constructor functions\nImplement `makeCounter(start)` as a constructor function (using `function` and `this`) that creates objects with an `increment()` method and a `value()` method.",
    fnName: "makeCounter",
    starterCode: "function makeCounter(start) {\n  // your code here — use `this`\n}\n",
    solutionCode:
      "function makeCounter(start) {\n  this.count = start;\n  this.increment = function() { this.count += 1; };\n  this.value = function() { return this.count; };\n}\n",
    annotatedSolution:
      "function makeCounter(start) {\n  // Properties assigned on `this` become instance properties.\n  this.count = start;\n  this.increment = function() { this.count += 1; };\n  this.value = function() { return this.count; };\n}\n",
    testCases: [
      {
        input: [0],
        expected_output: (Counter: new (n: number) => { increment: () => void; value: () => number }) => {
          const c = new Counter(0);
          c.increment();
          c.increment();
          return c.value();
        },
        description: "increment and value work after two increments",
      },
    ],
    hints: [
      "Assign `this.count = start` to hold state.",
      "Define methods directly on `this` (or better, on the prototype).",
      "Call with `new makeCounter(start)` — `this` refers to the new object.",
    ],
    orderIndex: 425,
  },
  {
    title: "Prototype method sharing",
    slug: "jsfund-proto-05-shared-method",
    difficulty: "medium",
    topicSlug: "prototypes",
    type: "js",
    description:
      "## Prototype vs instance methods\nImplement `buildStack()` returning a stack factory. The returned object should have `push(item)`, `pop()`, and `size()` methods that live on a **shared prototype** (not duplicated per instance).\n\nReturn the instance created by calling `new` on an internal constructor.",
    fnName: "buildStack",
    starterCode: "function buildStack() {\n  // your code here\n}\n",
    solutionCode:
      "function buildStack() {\n  function Stack() { this.items = []; }\n  Stack.prototype.push = function(item) { this.items.push(item); };\n  Stack.prototype.pop = function() { return this.items.pop(); };\n  Stack.prototype.size = function() { return this.items.length; };\n  return new Stack();\n}\n",
    annotatedSolution:
      "function buildStack() {\n  function Stack() { this.items = []; }\n  // Attaching to prototype means all instances share these functions.\n  Stack.prototype.push = function(item) { this.items.push(item); };\n  Stack.prototype.pop = function() { return this.items.pop(); };\n  Stack.prototype.size = function() { return this.items.length; };\n  return new Stack();\n}\n",
    testCases: [
      {
        input: [],
        expected_output: (makeStack: () => { push: (x: number) => void; pop: () => number; size: () => number }) => {
          const s = makeStack();
          s.push(1); s.push(2);
          const popped = s.pop();
          return s.size() === 1 && popped === 2;
        },
        description: "push, pop, and size work correctly",
      },
    ],
    hints: [
      "Define a constructor function `Stack` that sets `this.items = []`.",
      "Add methods to `Stack.prototype` so they're shared.",
      "Return `new Stack()` from `buildStack`.",
    ],
    orderIndex: 426,
  },
  // ── data-structures-basics ────────────────────────────────────────────────────
  {
    title: "Implement a queue",
    slug: "jsfund-ds-03-queue",
    difficulty: "easy",
    topicSlug: "data-structures-basics",
    type: "js",
    description:
      "## Queue (FIFO)\nImplement `buildQueue()` returning an object with `enqueue(item)`, `dequeue()`, and `size()` methods. `dequeue()` should return `undefined` when the queue is empty.",
    fnName: "buildQueue",
    starterCode: "function buildQueue() {\n  // your code here\n}\n",
    solutionCode:
      "function buildQueue() {\n  const items = [];\n  return {\n    enqueue(item) { items.push(item); },\n    dequeue() { return items.shift(); },\n    size() { return items.length; },\n  };\n}\n",
    annotatedSolution:
      "function buildQueue() {\n  const items = [];\n  return {\n    enqueue(item) { items.push(item); },  // add to back\n    dequeue() { return items.shift(); },   // remove from front (FIFO)\n    size() { return items.length; },\n  };\n}\n",
    testCases: [
      {
        input: [],
        expected_output: (makeQ: () => { enqueue: (x: number) => void; dequeue: () => number | undefined; size: () => number }) => {
          const q = makeQ();
          q.enqueue(1); q.enqueue(2);
          return q.dequeue() === 1 && q.size() === 1;
        },
        description: "FIFO order: first enqueued is first dequeued",
      },
    ],
    hints: [
      "Use an array as the backing store.",
      "`push` adds to the end; `shift` removes from the front — that's FIFO.",
      "Return size with `items.length`.",
    ],
    orderIndex: 427,
  },
  {
    title: "Implement a stack",
    slug: "jsfund-ds-04-stack",
    difficulty: "easy",
    topicSlug: "data-structures-basics",
    type: "js",
    description:
      "## Stack (LIFO)\nImplement `buildStack()` returning an object with `push(item)`, `pop()`, `peek()`, and `isEmpty()` methods.",
    fnName: "buildStack",
    starterCode: "function buildStack() {\n  // your code here\n}\n",
    solutionCode:
      "function buildStack() {\n  const items = [];\n  return {\n    push(item) { items.push(item); },\n    pop() { return items.pop(); },\n    peek() { return items[items.length - 1]; },\n    isEmpty() { return items.length === 0; },\n  };\n}\n",
    annotatedSolution:
      "function buildStack() {\n  const items = [];\n  return {\n    push(item) { items.push(item); },  // add to top\n    pop() { return items.pop(); },       // remove from top (LIFO)\n    peek() { return items[items.length - 1]; },  // look without removing\n    isEmpty() { return items.length === 0; },\n  };\n}\n",
    testCases: [
      {
        input: [],
        expected_output: (makeS: () => { push: (x: number) => void; pop: () => number | undefined; peek: () => number | undefined; isEmpty: () => boolean }) => {
          const s = makeS();
          s.push(1); s.push(2);
          return s.peek() === 2 && s.pop() === 2 && !s.isEmpty();
        },
        description: "LIFO order: last in is first out",
      },
    ],
    hints: [
      "`push` adds to the end; `pop` removes from the end — LIFO.",
      "`peek` reads `items[items.length - 1]` without modifying.",
      "`isEmpty` checks `items.length === 0`.",
    ],
    orderIndex: 428,
  },
  {
    title: "Frequency map with Map",
    slug: "jsfund-ds-05-frequency-map",
    difficulty: "medium",
    topicSlug: "data-structures-basics",
    type: "js",
    description:
      "## Map data structure\nImplement `buildFrequencyMap(arr)` using a `Map` (not a plain object) and returning the Map of each element's count.",
    fnName: "buildFrequencyMap",
    starterCode: "function buildFrequencyMap(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function buildFrequencyMap(arr) {\n  const map = new Map();\n  for (const item of arr) {\n    map.set(item, (map.get(item) ?? 0) + 1);\n  }\n  return map;\n}\n",
    annotatedSolution:
      "function buildFrequencyMap(arr) {\n  const map = new Map();\n  for (const item of arr) {\n    // `?? 0` handles the case when the key doesn't exist yet.\n    map.set(item, (map.get(item) ?? 0) + 1);\n  }\n  return map;\n}\n",
    testCases: [
      {
        input: [["a", "b", "a", "c", "b", "a"]],
        expected_output: (buildMap: (arr: string[]) => Map<string, number>) => {
          const m = buildMap(["a", "b", "a", "c", "b", "a"]);
          return m.get("a") === 3 && m.get("b") === 2 && m.get("c") === 1;
        },
        description: "counts each element correctly",
      },
    ],
    hints: [
      "Use `new Map()` as the backing store.",
      "`map.get(item) ?? 0` safely handles first occurrence.",
      "Increment with `map.set(item, count + 1)`.",
    ],
    orderIndex: 429,
  },
  // ── string-algorithms ─────────────────────────────────────────────────────────
  {
    title: "Run-length encoding",
    slug: "jsfund-str-03-run-length",
    difficulty: "easy",
    topicSlug: "string-algorithms",
    type: "js",
    description:
      "## Run-length encoding\nImplement `runLengthEncode(str)` that compresses consecutive repeated characters into `<count><char>` format.\n\nE.g. `'aaabbc'` → `'3a2b1c'`.",
    fnName: "runLengthEncode",
    starterCode: "function runLengthEncode(str) {\n  // your code here\n}\n",
    solutionCode:
      "function runLengthEncode(str) {\n  if (!str) return '';\n  let result = '';\n  let count = 1;\n  for (let i = 1; i <= str.length; i++) {\n    if (str[i] === str[i - 1]) {\n      count++;\n    } else {\n      result += count + str[i - 1];\n      count = 1;\n    }\n  }\n  return result;\n}\n",
    annotatedSolution:
      "function runLengthEncode(str) {\n  if (!str) return '';\n  let result = '';\n  let count = 1;\n  // Iterate one past the end so the last run is always written.\n  for (let i = 1; i <= str.length; i++) {\n    if (str[i] === str[i - 1]) {\n      count++;\n    } else {\n      result += count + str[i - 1];\n      count = 1;\n    }\n  }\n  return result;\n}\n",
    testCases: [
      { input: ["aaabbc"], expected_output: "3a2b1c", description: "basic run-length" },
      { input: ["aabaa"], expected_output: "2a1b2a", description: "runs separated by different char" },
      { input: ["x"], expected_output: "1x", description: "single character" },
      { input: [""], expected_output: "", description: "empty string" },
    ],
    hints: [
      "Count consecutive same characters.",
      "When the character changes (or end is reached), append count + char to result.",
      "Iterate to `str.length` (one past end) to flush the final run.",
    ],
    orderIndex: 430,
  },
  {
    title: "Valid palindrome (ignore non-alphanumeric)",
    slug: "jsfund-str-04-palindrome-clean",
    difficulty: "easy",
    topicSlug: "string-algorithms",
    type: "js",
    description:
      "## Palindrome check\nImplement `isPalindrome(str)` that returns `true` if `str` is a palindrome after removing all non-alphanumeric characters and lowercasing.\n\nE.g. `'A man, a plan, a canal: Panama'` → `true`.",
    fnName: "isPalindrome",
    starterCode: "function isPalindrome(str) {\n  // your code here\n}\n",
    solutionCode:
      "function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}\n",
    annotatedSolution:
      "function isPalindrome(str) {\n  // Strip everything that isn't alphanumeric, lowercase, then compare with reverse.\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}\n",
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected_output: true, description: "classic palindrome with punctuation" },
      { input: ["race a car"], expected_output: false, description: "not a palindrome" },
      { input: ["Was it a car or a cat I saw?"], expected_output: true, description: "palindrome with spaces and punctuation" },
      { input: [" "], expected_output: true, description: "single space is empty after clean" },
    ],
    hints: [
      "Use `str.toLowerCase().replace(/[^a-z0-9]/g, '')` to clean.",
      "Compare with `cleaned.split('').reverse().join('')`.",
      "An empty string after cleaning is considered a palindrome.",
    ],
    orderIndex: 431,
  },
  {
    title: "Count words in a sentence",
    slug: "jsfund-str-05-word-count",
    difficulty: "easy",
    topicSlug: "string-algorithms",
    type: "js",
    description:
      "## Word counting\nImplement `wordCount(sentence)` returning an object mapping each lowercase word to its count. Ignore punctuation and extra whitespace.",
    fnName: "wordCount",
    starterCode: "function wordCount(sentence) {\n  // your code here\n}\n",
    solutionCode:
      "function wordCount(sentence) {\n  const words = sentence.toLowerCase().match(/[a-z]+/g) ?? [];\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n",
    annotatedSolution:
      "function wordCount(sentence) {\n  // Extract words with a regex, ignoring punctuation.\n  const words = sentence.toLowerCase().match(/[a-z]+/g) ?? [];\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n",
    testCases: [
      { input: ["hello world hello"], expected_output: { hello: 2, world: 1 }, description: "counts repeated words" },
      { input: ["Go, go, GO!"], expected_output: { go: 3 }, description: "case-insensitive, ignores punctuation" },
      { input: ["one"], expected_output: { one: 1 }, description: "single word" },
    ],
    hints: [
      "Use `.match(/[a-z]+/g)` after `.toLowerCase()` to extract word tokens.",
      "Iterate and build a frequency object.",
      "`?? []` handles `null` from `match` on an empty/no-match string.",
    ],
    orderIndex: 432,
  },
  // ── object-map-patterns ───────────────────────────────────────────────────────
  {
    title: "Invert an object",
    slug: "jsfund-obj-03-invert",
    difficulty: "easy",
    topicSlug: "object-map-patterns",
    type: "js",
    description:
      "## Key-value inversion\nImplement `invertObject(obj)` that returns a new object with keys and values swapped.",
    fnName: "invertObject",
    starterCode: "function invertObject(obj) {\n  // your code here\n}\n",
    solutionCode:
      "function invertObject(obj) {\n  const result = {};\n  for (const [key, value] of Object.entries(obj)) {\n    result[value] = key;\n  }\n  return result;\n}\n",
    annotatedSolution:
      "function invertObject(obj) {\n  const result = {};\n  // Object.entries gives [key, value] pairs to iterate.\n  for (const [key, value] of Object.entries(obj)) {\n    result[value] = key;\n  }\n  return result;\n}\n",
    testCases: [
      { input: [{ a: "x", b: "y" }], expected_output: { x: "a", y: "b" }, description: "basic inversion" },
      { input: [{ one: 1, two: 2 }], expected_output: { 1: "one", 2: "two" }, description: "numeric values become string keys" },
      { input: [{}], expected_output: {}, description: "empty object" },
    ],
    hints: [
      "Use `Object.entries(obj)` to get `[key, value]` pairs.",
      "Assign `result[value] = key` for each entry.",
      "All object keys are strings — numeric values get coerced automatically.",
    ],
    orderIndex: 433,
  },
  {
    title: "Group array by key",
    slug: "jsfund-obj-04-groupby-key",
    difficulty: "medium",
    topicSlug: "object-map-patterns",
    type: "js",
    description:
      "## groupBy pattern\nImplement `groupBy(arr, keyFn)` that groups items by the string returned from `keyFn(item)`. Return an object mapping each key to an array of matching items.",
    fnName: "groupBy",
    starterCode: "function groupBy(arr, keyFn) {\n  // your code here\n}\n",
    solutionCode:
      "function groupBy(arr, keyFn) {\n  const groups = {};\n  for (const item of arr) {\n    const key = keyFn(item);\n    (groups[key] ??= []).push(item);\n  }\n  return groups;\n}\n",
    annotatedSolution:
      "function groupBy(arr, keyFn) {\n  const groups = {};\n  for (const item of arr) {\n    const key = keyFn(item);\n    // Nullish assignment initializes the array on first encounter.\n    (groups[key] ??= []).push(item);\n  }\n  return groups;\n}\n",
    testCases: [
      { input: [[1, 2, 3, 4, 5], (n: number) => n % 2 === 0 ? "even" : "odd"], expected_output: { odd: [1, 3, 5], even: [2, 4] }, description: "groups by even/odd" },
      { input: [["cat", "cow", "dog"], (s: string) => s[0]], expected_output: { c: ["cat", "cow"], d: ["dog"] }, description: "groups by first letter" },
    ],
    hints: [
      "Compute `key = keyFn(item)` for each item.",
      "Initialize `groups[key] = []` if it doesn't exist yet.",
      "`??=` is a clean way to initialize: `(groups[key] ??= []).push(item)`.",
    ],
    orderIndex: 434,
  },
  {
    title: "Deep merge two objects",
    slug: "jsfund-obj-05-deep-merge",
    difficulty: "hard",
    topicSlug: "object-map-patterns",
    type: "js",
    description:
      "## Deep merge\nImplement `deepMerge(target, source)` that recursively merges `source` into `target`. For nested objects, merge recursively. Arrays and primitives in `source` overwrite those in `target`.",
    fnName: "deepMerge",
    starterCode: "function deepMerge(target, source) {\n  // your code here\n}\n",
    solutionCode:
      "function deepMerge(target, source) {\n  const result = { ...target };\n  for (const key of Object.keys(source)) {\n    const sv = source[key];\n    const tv = result[key];\n    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {\n      result[key] = deepMerge(tv, sv);\n    } else {\n      result[key] = sv;\n    }\n  }\n  return result;\n}\n",
    annotatedSolution:
      "function deepMerge(target, source) {\n  const result = { ...target }; // shallow copy to avoid mutating target\n  for (const key of Object.keys(source)) {\n    const sv = source[key];\n    const tv = result[key];\n    // Both are plain (non-array) objects: recurse.\n    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {\n      result[key] = deepMerge(tv, sv);\n    } else {\n      result[key] = sv; // overwrite with source value\n    }\n  }\n  return result;\n}\n",
    testCases: [
      { input: [{ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 }], expected_output: { a: 1, b: { c: 2, d: 3 }, e: 4 }, description: "recursively merges nested objects" },
      { input: [{ x: [1, 2] }, { x: [3] }], expected_output: { x: [3] }, description: "arrays are overwritten not merged" },
    ],
    hints: [
      "Start with a shallow copy of `target`.",
      "For each key in `source`, check if both values are plain objects.",
      "If both are plain objects, recurse; otherwise overwrite.",
    ],
    orderIndex: 435,
  },
  // ── recursion-fundamentals ────────────────────────────────────────────────────
  {
    title: "Fibonacci recursive",
    slug: "jsfund-rec-02-fibonacci",
    difficulty: "easy",
    topicSlug: "recursion-fundamentals",
    type: "js",
    description:
      "## Fibonacci\nImplement `fibonacci(n)` recursively, returning the n-th Fibonacci number where `fibonacci(0) = 0` and `fibonacci(1) = 1`.",
    fnName: "fibonacci",
    starterCode: "function fibonacci(n) {\n  // your code here\n}\n",
    solutionCode:
      "function fibonacci(n) {\n  if (n <= 0) return 0;\n  if (n === 1) return 1;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n",
    annotatedSolution:
      "function fibonacci(n) {\n  // Base cases.\n  if (n <= 0) return 0;\n  if (n === 1) return 1;\n  // Recursive case: sum the two preceding numbers.\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n",
    testCases: [
      { input: [0], expected_output: 0, description: "fib(0) = 0" },
      { input: [1], expected_output: 1, description: "fib(1) = 1" },
      { input: [6], expected_output: 8, description: "fib(6) = 8" },
      { input: [10], expected_output: 55, description: "fib(10) = 55" },
    ],
    hints: [
      "Define base cases for `n <= 0` and `n === 1`.",
      "Return `fibonacci(n - 1) + fibonacci(n - 2)` for all other values.",
      "This is exponential — fine for small inputs in this exercise.",
    ],
    orderIndex: 436,
  },
  {
    title: "Flatten deeply nested array",
    slug: "jsfund-rec-03-flatten",
    difficulty: "easy",
    topicSlug: "recursion-fundamentals",
    type: "js",
    description:
      "## Recursive flatten\nImplement `flattenDeep(arr)` that flattens an array of arbitrarily nested arrays into a single flat array. Do not use `.flat(Infinity)`.",
    fnName: "flattenDeep",
    starterCode: "function flattenDeep(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function flattenDeep(arr) {\n  const result = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flattenDeep(item));\n    } else {\n      result.push(item);\n    }\n  }\n  return result;\n}\n",
    annotatedSolution:
      "function flattenDeep(arr) {\n  const result = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) {\n      // Recursively flatten the sub-array and spread its elements.\n      result.push(...flattenDeep(item));\n    } else {\n      result.push(item);\n    }\n  }\n  return result;\n}\n",
    testCases: [
      { input: [[1, [2, [3, [4]]]]], expected_output: [1, 2, 3, 4], description: "deep nesting" },
      { input: [[1, 2, 3]], expected_output: [1, 2, 3], description: "already flat" },
      { input: [[]], expected_output: [], description: "empty array" },
    ],
    hints: [
      "Recurse when an element is an array; otherwise push directly.",
      "Use spread `...flattenDeep(item)` to add all recursed results.",
      "Base case: non-array elements are pushed to `result`.",
    ],
    orderIndex: 437,
  },
  {
    title: "Count nodes in a tree",
    slug: "jsfund-rec-04-count-nodes",
    difficulty: "medium",
    topicSlug: "recursion-fundamentals",
    type: "js",
    description:
      "## Tree traversal\nImplement `countNodes(node)` where a node has `{ value, children: Node[] }`. Return the total number of nodes including the root.",
    fnName: "countNodes",
    starterCode: "function countNodes(node) {\n  // your code here\n}\n",
    solutionCode:
      "function countNodes(node) {\n  if (!node) return 0;\n  let count = 1;\n  for (const child of (node.children ?? [])) {\n    count += countNodes(child);\n  }\n  return count;\n}\n",
    annotatedSolution:
      "function countNodes(node) {\n  if (!node) return 0;\n  let count = 1; // count the current node\n  for (const child of (node.children ?? [])) {\n    count += countNodes(child); // recurse into each child\n  }\n  return count;\n}\n",
    testCases: [
      { input: [{ value: 1, children: [{ value: 2, children: [] }, { value: 3, children: [{ value: 4, children: [] }] }] }], expected_output: 4, description: "counts all nodes in tree" },
      { input: [{ value: 1, children: [] }], expected_output: 1, description: "leaf node" },
      { input: [null], expected_output: 0, description: "null returns 0" },
    ],
    hints: [
      "Count 1 for the current node.",
      "Recurse into each child and sum their counts.",
      "Handle null/undefined nodes by returning 0.",
    ],
    orderIndex: 438,
  },
  {
    title: "Power function recursive",
    slug: "jsfund-rec-05-power",
    difficulty: "medium",
    topicSlug: "recursion-fundamentals",
    type: "js",
    description:
      "## Exponentiation\nImplement `power(base, exp)` recursively where `exp` is a non-negative integer. Use the optimization: `power(base, exp)` when `exp` is even = `power(base, exp/2)^2` (fast exponentiation).",
    fnName: "power",
    starterCode: "function power(base, exp) {\n  // your code here\n}\n",
    solutionCode:
      "function power(base, exp) {\n  if (exp === 0) return 1;\n  if (exp % 2 === 0) {\n    const half = power(base, exp / 2);\n    return half * half;\n  }\n  return base * power(base, exp - 1);\n}\n",
    annotatedSolution:
      "function power(base, exp) {\n  if (exp === 0) return 1; // base case: anything^0 = 1\n  if (exp % 2 === 0) {\n    // Fast exponentiation: square the half-power.\n    const half = power(base, exp / 2);\n    return half * half;\n  }\n  // Odd exponent: reduce by 1.\n  return base * power(base, exp - 1);\n}\n",
    testCases: [
      { input: [2, 0], expected_output: 1, description: "anything^0 = 1" },
      { input: [2, 10], expected_output: 1024, description: "2^10" },
      { input: [3, 5], expected_output: 243, description: "3^5" },
      { input: [5, 3], expected_output: 125, description: "5^3" },
    ],
    hints: [
      "Base case: `exp === 0` returns 1.",
      "For even exponents: recurse with half the exponent and square the result.",
      "For odd exponents: multiply base by `power(base, exp - 1)`.",
    ],
    orderIndex: 439,
  },
  // ── big-o-basics ──────────────────────────────────────────────────────────────
  {
    title: "Count operations: find duplicates",
    slug: "jsfund-bigo-02-count-ops",
    difficulty: "easy",
    topicSlug: "big-o-basics",
    type: "js",
    description:
      "## Two approaches to duplicates\nImplement both approaches to finding if an array has duplicates, returning an object `{ naive, optimal }`:\n- `naive(arr)`: O(n²) nested-loop approach\n- `optimal(arr)`: O(n) Set-based approach\n\nBoth return `true` if any duplicate exists, `false` otherwise.",
    fnName: "hasDuplicates",
    starterCode: "function hasDuplicates() {\n  const naive = (arr) => {\n    // your O(n^2) code here\n  };\n  const optimal = (arr) => {\n    // your O(n) code here\n  };\n  return { naive, optimal };\n}\n",
    solutionCode:
      "function hasDuplicates() {\n  const naive = (arr) => {\n    for (let i = 0; i < arr.length; i++) {\n      for (let j = i + 1; j < arr.length; j++) {\n        if (arr[i] === arr[j]) return true;\n      }\n    }\n    return false;\n  };\n  const optimal = (arr) => {\n    const seen = new Set();\n    for (const item of arr) {\n      if (seen.has(item)) return true;\n      seen.add(item);\n    }\n    return false;\n  };\n  return { naive, optimal };\n}\n",
    annotatedSolution:
      "function hasDuplicates() {\n  // O(n^2): every pair is compared — worse as n grows.\n  const naive = (arr) => {\n    for (let i = 0; i < arr.length; i++) {\n      for (let j = i + 1; j < arr.length; j++) {\n        if (arr[i] === arr[j]) return true;\n      }\n    }\n    return false;\n  };\n  // O(n): Set lookups are O(1) — one pass through the array.\n  const optimal = (arr) => {\n    const seen = new Set();\n    for (const item of arr) {\n      if (seen.has(item)) return true;\n      seen.add(item);\n    }\n    return false;\n  };\n  return { naive, optimal };\n}\n",
    testCases: [
      {
        input: [],
        expected_output: (make: () => { naive: (a: number[]) => boolean; optimal: (a: number[]) => boolean }) => {
          const { naive, optimal } = make();
          return naive([1, 2, 2]) && optimal([1, 2, 2]) && !naive([1, 2, 3]) && !optimal([1, 2, 3]);
        },
        description: "both approaches agree on duplicates and no-duplicates cases",
      },
    ],
    hints: [
      "Naive: two nested loops comparing every pair.",
      "Optimal: use a Set and check `.has(item)` before `.add(item)`.",
      "The function returns an object with both approaches so you can compare them.",
    ],
    orderIndex: 440,
  },
  {
    title: "Space complexity: count unique",
    slug: "jsfund-bigo-03-space-count",
    difficulty: "easy",
    topicSlug: "big-o-basics",
    type: "js",
    description:
      "## Space complexity\nImplement `countUnique(arr)` returning the number of unique values. Use O(n) extra space (a Set) to achieve O(n) time.",
    fnName: "countUnique",
    starterCode: "function countUnique(arr) {\n  // your code here — O(n) time, O(n) space\n}\n",
    solutionCode:
      "function countUnique(arr) {\n  return new Set(arr).size;\n}\n",
    annotatedSolution:
      "function countUnique(arr) {\n  // Set stores each unique value once — O(n) space.\n  // Building it is O(n) time; `.size` is O(1).\n  return new Set(arr).size;\n}\n",
    testCases: [
      { input: [[1, 2, 2, 3, 3, 3]], expected_output: 3, description: "3 unique values" },
      { input: [["a", "b", "a"]], expected_output: 2, description: "2 unique strings" },
      { input: [[]], expected_output: 0, description: "empty array" },
    ],
    hints: [
      "A Set automatically deduplicates.",
      "Pass the array directly to the `Set` constructor.",
      "Return `.size` for the count.",
    ],
    orderIndex: 441,
  },
  {
    title: "Identify loop complexity",
    slug: "jsfund-bigo-04-identify-complexity",
    difficulty: "easy",
    topicSlug: "big-o-basics",
    type: "js",
    description:
      "## Complexity identification\nImplement `identifyComplexity(pattern)` returning the Big-O class:\n- `'halving-loop'` → `'O(log n)'`\n- `'two-nested-loops'` → `'O(n^2)'`\n- `'three-nested-loops'` → `'O(n^3)'`\n- `'single-pass'` → `'O(n)'`\n- `'constant-ops'` → `'O(1)'`",
    fnName: "identifyComplexity",
    starterCode: "function identifyComplexity(pattern) {\n  // your code here\n}\n",
    solutionCode:
      "function identifyComplexity(pattern) {\n  const map = {\n    'halving-loop': 'O(log n)',\n    'two-nested-loops': 'O(n^2)',\n    'three-nested-loops': 'O(n^3)',\n    'single-pass': 'O(n)',\n    'constant-ops': 'O(1)',\n  };\n  return map[pattern] ?? 'unknown';\n}\n",
    annotatedSolution:
      "function identifyComplexity(pattern) {\n  const map = {\n    'halving-loop': 'O(log n)',    // halves search space each step\n    'two-nested-loops': 'O(n^2)',  // each outer step does n inner steps\n    'three-nested-loops': 'O(n^3)',\n    'single-pass': 'O(n)',\n    'constant-ops': 'O(1)',        // doesn't grow with input\n  };\n  return map[pattern] ?? 'unknown';\n}\n",
    testCases: [
      { input: ["halving-loop"], expected_output: "O(log n)", description: "binary-search-style" },
      { input: ["two-nested-loops"], expected_output: "O(n^2)", description: "quadratic" },
      { input: ["constant-ops"], expected_output: "O(1)", description: "constant time" },
      { input: ["single-pass"], expected_output: "O(n)", description: "linear" },
    ],
    hints: [
      "Build a lookup map from pattern name to complexity string.",
      "Return the mapped value or `'unknown'` for unrecognized patterns.",
      "Review: halving = log, nested × nested = multiplicative.",
    ],
    orderIndex: 442,
  },
  {
    title: "O(n log n) sort counter",
    slug: "jsfund-bigo-05-sort-counter",
    difficulty: "medium",
    topicSlug: "big-o-basics",
    type: "js",
    description:
      "## O(n log n) sorting\nImplement `mergeSort(arr)` — a recursive merge sort that returns a new sorted array. This exercise reinforces that divide-and-conquer achieves O(n log n) because you split log n times and each level does O(n) merge work.",
    fnName: "mergeSort",
    starterCode: "function mergeSort(arr) {\n  // your code here\n}\n",
    solutionCode:
      "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(a, b) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) result.push(a[i++]);\n    else result.push(b[j++]);\n  }\n  return [...result, ...a.slice(i), ...b.slice(j)];\n}\n",
    annotatedSolution:
      "function mergeSort(arr) {\n  if (arr.length <= 1) return arr; // base case\n  const mid = Math.floor(arr.length / 2);\n  // Recursively sort halves — log n levels.\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right); // O(n) merge at each level.\n}\n\nfunction merge(a, b) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) result.push(a[i++]);\n    else result.push(b[j++]);\n  }\n  return [...result, ...a.slice(i), ...b.slice(j)];\n}\n",
    testCases: [
      { input: [[3, 1, 4, 1, 5, 9, 2, 6]], expected_output: [1, 1, 2, 3, 4, 5, 6, 9], description: "sorts array of numbers" },
      { input: [[5, 1]], expected_output: [1, 5], description: "two elements" },
      { input: [[1]], expected_output: [1], description: "single element" },
      { input: [[]], expected_output: [], description: "empty array" },
    ],
    hints: [
      "Base case: arrays of length 0 or 1 are already sorted.",
      "Split the array at the midpoint, recurse both halves.",
      "Merge two sorted arrays by comparing front elements one at a time.",
    ],
    orderIndex: 443,
  },
];

const CHALLENGES_RAW: SeedChallenge[] = [
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
  ...EASY_CHALLENGE_EXPANSION,
  ...MEDIUM_CHALLENGE_EXPANSION,
  ...JS_FUNDAMENTALS_CHALLENGE_EXPANSION,
  ...ARRAY_METHOD_FUNDAMENTAL_CHALLENGES,
  ...JS_TOPIC_CHALLENGES,
];

export const CHALLENGES: SeedChallenge[] = CHALLENGES_RAW.map(withReactTestCases);
