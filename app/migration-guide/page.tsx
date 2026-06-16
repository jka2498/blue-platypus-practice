"use client";

import { CodeCompare } from "@/components/migration/code-compare";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Concept = {
  /** Accordion item value — unique within its section. */
  id: string;
  /** Concept name shown in the trigger. */
  name: string;
  /** 1-2 sentence nuance explanation. */
  note: string;
  angular: string;
  react: string;
};

type Section = {
  value: string;
  label: string;
  intro: string;
  concepts: Concept[];
};

const SECTIONS: Section[] = [
  {
    value: "template",
    label: "Template Syntax",
    intro:
      "Angular templates are HTML with directives; JSX is JavaScript that returns markup. There's no separate template language — you use the language you already know.",
    concepts: [
      {
        id: "ngfor",
        name: "*ngFor → .map()",
        note: "JSX has no loop directive. You map an array to elements and must supply a stable key prop (the equivalent of trackBy).",
        angular: `<li *ngFor="let user of users; trackBy: trackById">
  {{ user.name }}
</li>`,
        react: `{users.map((user) => (
  <li key={user.id}>{user.name}</li>
))}`,
      },
      {
        id: "ngif",
        name: "*ngIf → && / ternary",
        note: "There's no *ngIf — you conditionally render with a logical && or a ternary expression inside JSX.",
        angular: `<p *ngIf="isLoading">Loading…</p>
<p *ngIf="!isLoading; else other">Done</p>
<ng-template #other>Idle</ng-template>`,
        react: `{isLoading && <p>Loading…</p>}
{isLoading ? <p>Done</p> : <p>Idle</p>}`,
      },
      {
        id: "prop-binding",
        name: "[prop] → prop={}",
        note: "Property binding becomes a JSX attribute with a curly-brace expression. Note React uses camelCase DOM props (htmlFor, className).",
        angular: `<img [src]="avatarUrl" [alt]="label" />
<button [disabled]="busy">Save</button>`,
        react: `<img src={avatarUrl} alt={label} />
<button disabled={busy}>Save</button>`,
      },
      {
        id: "event-binding",
        name: "(click) → onClick",
        note: "Event bindings become camelCase handler props that take a function reference (not an inline call expression).",
        angular: `<button (click)="onSave()">Save</button>
<input (input)="onInput($event)" />`,
        react: `<button onClick={onSave}>Save</button>
<input onChange={(e) => onInput(e.target.value)} />`,
      },
      {
        id: "ngmodel",
        name: "[(ngModel)] → controlled value + onChange",
        note: "React has no two-way binding sugar. You wire state to value and update it in onChange — the explicit version of banana-in-a-box.",
        angular: `<input [(ngModel)]="name" />`,
        react: `const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
      },
      {
        id: "ngclass",
        name: "[ngClass] → className",
        note: "Conditional classes are just a computed string. Libraries like clsx/cn replace the ngClass object map.",
        angular: `<div [ngClass]="{ active: isActive, error: hasError }">
</div>`,
        react: `<div
  className={[isActive && "active", hasError && "error"]
    .filter(Boolean)
    .join(" ")}
/>`,
      },
      {
        id: "interpolation",
        name: "{{ x }} → { x }",
        note: "Interpolation uses single braces in JSX, and the expression must produce a renderable value (string, number, element).",
        angular: `<h1>Hello, {{ user.name }}!</h1>`,
        react: `<h1>Hello, {user.name}!</h1>`,
      },
      {
        id: "containers",
        name: "<ng-container> / <ng-template> → fragments <>…</>",
        note: "When you need to group elements without adding a wrapper node, use a React fragment instead of <ng-container>.",
        angular: `<ng-container *ngIf="user">
  <h2>{{ user.name }}</h2>
  <p>{{ user.email }}</p>
</ng-container>`,
        react: `{user && (
  <>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </>
)}`,
      },
    ],
  },
  {
    value: "communication",
    label: "Communication",
    intro:
      "Angular components talk through decorators and DI; React components talk through plain props — data down, callbacks up.",
    concepts: [
      {
        id: "input",
        name: "@Input() → props",
        note: "Inputs become function parameters. You destructure props directly; types come from a props interface rather than decorators.",
        angular: `@Component({ selector: "app-user-card" })
export class UserCardComponent {
  @Input() name = "";
  @Input() active = false;
}`,
        react: `type UserCardProps = { name: string; active?: boolean };

function UserCard({ name, active = false }: UserCardProps) {
  return <div>{name}</div>;
}`,
      },
      {
        id: "output",
        name: "@Output() EventEmitter → callback props",
        note: "Instead of emitting events, the parent passes a function down and the child calls it — no EventEmitter or subscription needed.",
        angular: `// child
@Output() save = new EventEmitter<string>();
onClick() { this.save.emit(this.value); }

// parent
<app-form (save)="handleSave($event)"></app-form>`,
        react: `// child
type FormProps = { onSave: (value: string) => void };
function Form({ onSave }: FormProps) {
  return <button onClick={() => onSave(value)}>Save</button>;
}

// parent
<Form onSave={handleSave} />`,
      },
      {
        id: "viewchild",
        name: "@ViewChild → useRef",
        note: "To reach a DOM node or child instance, attach a ref. ref.current is null until after the element mounts.",
        angular: `@ViewChild("box") box!: ElementRef<HTMLDivElement>;

ngAfterViewInit() {
  this.box.nativeElement.focus();
}`,
        react: `const boxRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  boxRef.current?.focus();
}, []);

return <div ref={boxRef} tabIndex={-1} />;`,
      },
      {
        id: "ngcontent",
        name: "<ng-content> → children",
        note: "Content projection maps to the special children prop. Multiple slots become named props instead of select= queries.",
        angular: `// panel.component.html
<section class="panel">
  <ng-content></ng-content>
</section>

// usage
<app-panel><p>Body</p></app-panel>`,
        react: `function Panel({ children }: { children: React.ReactNode }) {
  return <section className="panel">{children}</section>;
}

// usage
<Panel><p>Body</p></Panel>`,
      },
    ],
  },
  {
    value: "lifecycle",
    label: "Lifecycle",
    intro:
      "Angular has named lifecycle methods on a class; React expresses the same moments declaratively through useEffect and its dependency array.",
    concepts: [
      {
        id: "ngoninit",
        name: "ngOnInit → useEffect(() => {}, [])",
        note: "Run-once-on-mount logic goes in an effect with an empty dependency array.",
        angular: `export class Page implements OnInit {
  ngOnInit() {
    this.loadData();
  }
}`,
        react: `useEffect(() => {
  loadData();
}, []);`,
      },
      {
        id: "ngondestroy",
        name: "ngOnDestroy → cleanup return",
        note: "Return a function from the effect — React runs it on unmount (and before re-running the effect) to tear things down.",
        angular: `export class Clock implements OnDestroy {
  private id = setInterval(() => this.tick(), 1000);
  ngOnDestroy() {
    clearInterval(this.id);
  }
}`,
        react: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`,
      },
      {
        id: "ngonchanges",
        name: "ngOnChanges → useEffect([dep])",
        note: "React doesn't notify you of prop changes via a hook; instead you list the prop in the dependency array and the effect reruns when it changes.",
        angular: `ngOnChanges(changes: SimpleChanges) {
  if (changes["userId"]) {
    this.fetchUser(this.userId);
  }
}`,
        react: `useEffect(() => {
  fetchUser(userId);
}, [userId]);`,
      },
      {
        id: "ngafterviewinit",
        name: "ngAfterViewInit → useEffect + ref",
        note: "When you need the DOM to exist before acting, combine a ref with an effect — effects fire after the DOM is committed.",
        angular: `@ViewChild("input") input!: ElementRef<HTMLInputElement>;

ngAfterViewInit() {
  this.input.nativeElement.focus();
}`,
        react: `const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;`,
      },
    ],
  },
  {
    value: "state",
    label: "State",
    intro:
      "Angular often centralizes state in singleton services; React keeps it local by default and lifts or shares it only when needed.",
    concepts: [
      {
        id: "service-state",
        name: "Stateful service + RxJS → useState / useReducer + Context",
        note: "A BehaviorSubject-backed service becomes a Context provider holding useState/useReducer state. Components consume it with a hook instead of injecting the service.",
        angular: `@Injectable({ providedIn: "root" })
export class CartService {
  private items$ = new BehaviorSubject<Item[]>([]);
  readonly items = this.items$.asObservable();
  add(item: Item) {
    this.items$.next([...this.items$.value, item]);
  }
}`,
        react: `const CartContext = createContext<{
  items: Item[];
  add: (item: Item) => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const add = (item: Item) => setItems((prev) => [...prev, item]);
  return (
    <CartContext.Provider value={{ items, add }}>
      {children}
    </CartContext.Provider>
  );
}`,
      },
      {
        id: "ngrx",
        name: "NgRx → Redux / useReducer",
        note: "The action → reducer → store mental model carries over almost exactly. For app-wide state use Redux Toolkit or Zustand; for local complex state useReducer is enough.",
        angular: `// NgRx reducer
export const counterReducer = createReducer(
  0,
  on(increment, (state) => state + 1),
);`,
        react: `// useReducer
type Action = { type: "increment" };
function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + 1;
  }
}
const [count, dispatch] = useReducer(reducer, 0);`,
      },
      {
        id: "signals",
        name: "Angular signals → useState (conceptually)",
        note: "Signals give you fine-grained reactive values; the closest everyday React analog is useState, though React re-renders the whole component rather than tracking individual reads.",
        angular: `count = signal(0);
double = computed(() => this.count() * 2);
increment() { this.count.update((c) => c + 1); }`,
        react: `const [count, setCount] = useState(0);
const double = count * 2; // derived during render
const increment = () => setCount((c) => c + 1);`,
      },
    ],
  },
  {
    value: "routing",
    label: "Routing",
    intro:
      "This app uses the Next.js App Router: routes are folders on disk, not a Routes array. Navigation, params, and guards all have direct equivalents.",
    concepts: [
      {
        id: "routerlink",
        name: "routerLink → <Link>",
        note: "Next's <Link> from next/link replaces routerLink and gives you client-side navigation with prefetching for free.",
        angular: `<a routerLink="/users/42">Profile</a>`,
        react: `import Link from "next/link";

<Link href="/users/42">Profile</Link>`,
      },
      {
        id: "file-routes",
        name: "Routes config → file-based routes",
        note: "Instead of registering a Routes array, you create a folder per segment with a page.tsx. Dynamic segments use [param] folder names.",
        angular: `const routes: Routes = [
  { path: "users/:id", component: UserComponent },
];`,
        react: `// app/users/[id]/page.tsx
export default function UserPage() {
  return <section>User detail</section>;
}`,
      },
      {
        id: "params",
        name: "ActivatedRoute params → useParams",
        note: "In a client component, read dynamic segments with useParams from next/navigation; in a server component, params arrive as a prop.",
        angular: `constructor(private route: ActivatedRoute) {}
ngOnInit() {
  this.route.paramMap.subscribe((p) => {
    this.id = p.get("id");
  });
}`,
        react: `"use client";
import { useParams } from "next/navigation";

const { id } = useParams<{ id: string }>();`,
      },
      {
        id: "guards",
        name: "CanActivate guard → middleware",
        note: "Route guards map to middleware.ts at the project root, which can redirect before a route renders. Per-segment checks can also live in a layout or server component.",
        angular: `@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.auth.isLoggedIn();
  }
}`,
        react: `// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.cookies.get("session")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}`,
      },
    ],
  },
  {
    value: "http",
    label: "HTTP / Services",
    intro:
      "There's no HttpClient or DI container in React. You fetch with the platform fetch API, usually wrapped in a reusable hook, and share dependencies via imports or Context.",
    concepts: [
      {
        id: "httpclient",
        name: "HttpClient → fetch in useEffect",
        note: "fetch returns a Promise and does not throw on HTTP errors, so check response.ok yourself. Run the request inside an effect for load-on-mount data.",
        angular: `constructor(private http: HttpClient) {}
ngOnInit() {
  this.http
    .get<User[]>("/api/users")
    .subscribe((users) => (this.users = users));
}`,
        react: `useEffect(() => {
  fetch("/api/users")
    .then((res) => {
      if (!res.ok) throw new Error("Request failed");
      return res.json() as Promise<User[]>;
    })
    .then(setUsers);
}, []);`,
      },
      {
        id: "usefetch",
        name: "Reusable service method → useFetch hook",
        note: "Extract repeated fetch logic into a custom hook that returns data, loading, and error — the React-idiomatic replacement for a shared service method.",
        angular: `@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<User[]>("/api/users");
  }
}`,
        react: `function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch(url)
      .then((r) => r.json() as Promise<T>)
      .then((d) => active && setData(d))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [url]);
  return { data, loading };
}`,
      },
      {
        id: "di",
        name: "providedIn: 'root' → module import + Context",
        note: "A root singleton becomes either a plain module export (import it where needed) or, when components must subscribe to shared state, a Context provider.",
        angular: `@Injectable({ providedIn: "root" })
export class ApiClient {
  baseUrl = "/api";
}
// injected: constructor(private api: ApiClient) {}`,
        react: `// apiClient.ts — a module singleton
export const apiClient = { baseUrl: "/api" };

// anywhere
import { apiClient } from "@/lib/apiClient";`,
      },
    ],
  },
  {
    value: "rxjs",
    label: "RxJS",
    intro:
      "Most component data flows are single async values, which map cleanly to Promises and async/await. RxJS is genuinely richer for ongoing event streams — reach for a stream library only when you actually have a stream.",
    concepts: [
      {
        id: "observable-promise",
        name: "Observable → Promise",
        note: "A one-shot Observable (like an HTTP call) is really just a Promise. fetch already returns one, so subscribe becomes await or .then.",
        angular: `this.http.get<User>("/api/me").subscribe((user) => {
  this.user = user;
});`,
        react: `const res = await fetch("/api/me");
const user = (await res.json()) as User;
setUser(user);`,
      },
      {
        id: "operators",
        name: "map / filter → array methods",
        note: "When you're transforming a collection (not a time-based stream), the RxJS operators map and filter are just the synchronous Array methods of the same name.",
        angular: `from(users)
  .pipe(
    filter((u) => u.active),
    map((u) => u.name),
  )
  .subscribe((name) => names.push(name));`,
        react: `const names = users
  .filter((u) => u.active)
  .map((u) => u.name);`,
      },
      {
        id: "switchmap",
        name: "switchMap → cancel-previous with AbortController",
        note: "switchMap cancels the in-flight request when a new one starts. The fetch equivalent is aborting the previous request via an AbortController in the effect cleanup.",
        angular: `this.query$
  .pipe(switchMap((q) => this.http.get<Result[]>("/api/search?q=" + q)))
  .subscribe((r) => (this.results = r));`,
        react: `useEffect(() => {
  const controller = new AbortController();
  fetch("/api/search?q=" + query, { signal: controller.signal })
    .then((r) => r.json() as Promise<Result[]>)
    .then(setResults)
    .catch((e) => {
      if (e.name !== "AbortError") throw e;
    });
  return () => controller.abort();
}, [query]);`,
      },
      {
        id: "debouncetime",
        name: "debounceTime → debounced effect",
        note: "debounceTime becomes a setTimeout inside an effect whose cleanup clears the pending timer — the timer resets every time the dependency changes.",
        angular: `this.search$
  .pipe(debounceTime(300))
  .subscribe((q) => this.runSearch(q));`,
        react: `useEffect(() => {
  const id = setTimeout(() => runSearch(query), 300);
  return () => clearTimeout(id);
}, [query]);`,
      },
      {
        id: "behaviorsubject",
        name: "BehaviorSubject → state",
        note: "A BehaviorSubject holds a current value and emits updates — exactly what useState (in a component) or a Context value (when shared) gives you.",
        angular: `private count$ = new BehaviorSubject(0);
get count() { return this.count$.value; }
increment() { this.count$.next(this.count$.value + 1); }`,
        react: `const [count, setCount] = useState(0);
const increment = () => setCount((c) => c + 1);`,
      },
    ],
  },
];

export default function MigrationGuidePage() {
  return (
    <div className="container max-w-5xl py-12 space-y-10">
      <header className="space-y-4">
        <h1 className="heading-1 text-balance">
          Angular <span className="text-accent">→</span> React
        </h1>
        <p className="text-lg text-muted-foreground">
          A side-by-side translation guide for Angular developers.
        </p>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">
          You already know components, data binding, services, and RxJS. This
          guide maps each idea you reach for daily in Angular onto its React
          equivalent so you can stay productive from day one. Nothing here is new
          computer science — it&apos;s the same concepts wearing different syntax,
          with notes where the mental model genuinely shifts.
        </p>
      </header>

      <Tabs defaultValue="template">
        <TabsList className="flex w-full flex-wrap">
          {SECTIONS.map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map((section) => (
          <TabsContent
            key={section.value}
            value={section.value}
            className="space-y-4"
          >
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              {section.intro}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {section.concepts.map((concept) => (
                <AccordionItem key={concept.id} value={concept.id}>
                  <AccordionTrigger>{concept.name}</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="leading-relaxed">{concept.note}</p>
                    <CodeCompare angular={concept.angular} react={concept.react} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
