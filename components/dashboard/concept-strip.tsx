import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Concept {
  angular: string;
  react: string;
  note: string;
  accent: string; // tailwind text color class for the chip
}

const CONCEPTS: Concept[] = [
  { angular: "*ngFor", react: ".map()", note: "Render lists by mapping to JSX", accent: "text-accent" },
  { angular: "*ngIf", react: "{cond && …}", note: "Conditional rendering", accent: "text-easy" },
  { angular: "@Input()", react: "props", note: "Pass data down", accent: "text-medium" },
  { angular: "@Output()", react: "callback prop", note: "Bubble events up", accent: "text-hard" },
  { angular: "ngOnInit", react: "useEffect(…, [])", note: "Run on mount", accent: "text-accent" },
  { angular: "ngOnDestroy", react: "useEffect cleanup", note: "Return a teardown fn", accent: "text-easy" },
  { angular: "Service + DI", react: "Context / hooks", note: "Share logic & state", accent: "text-medium" },
  { angular: "[(ngModel)]", react: "value + onChange", note: "Controlled inputs", accent: "text-hard" },
  { angular: "@ViewChild", react: "useRef", note: "Reference DOM/children", accent: "text-accent" },
  { angular: "Observable", react: "Promise / state", note: "async/await for one-shot", accent: "text-easy" },
];

export function ConceptStrip() {
  return (
    <section aria-labelledby="concept-strip-heading">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="concept-strip-heading" className="heading-3">
          Angular → React quick reference
        </h2>
        <Link
          href="/migration-guide"
          className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          Full guide <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {CONCEPTS.map((c) => (
          <div
            key={c.angular}
            className="min-w-[210px] shrink-0 rounded-xl border bg-surface p-4 shadow-card"
          >
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">{c.angular}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className={`font-semibold ${c.accent}`}>{c.react}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{c.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
