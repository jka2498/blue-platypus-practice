import * as React from "react";
import { cn } from "@/lib/utils";

interface CodePanelProps {
  /** Label shown in the panel header, e.g. "Angular" or "React". */
  label: string;
  /** The source code to display. Rendered verbatim in a <pre>. */
  code: string;
  /** Accent the header (used for the React side). */
  accent?: boolean;
}

function CodePanel({ label, code, accent = false }: CodePanelProps) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-code-bg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider",
            accent ? "text-accent" : "text-[#9C9690]",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              accent ? "bg-accent" : "bg-[#6B6561]",
            )}
            aria-hidden
          />
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#E8E4E0]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export interface CodeCompareProps {
  /** Angular source snippet (left side). */
  angular: string;
  /** React source snippet (right side). */
  react: string;
  /** Optional caption rendered under the comparison. */
  caption?: string;
  className?: string;
}

/**
 * Side-by-side code comparison: Angular on the left, React on the right.
 * Stacks vertically on small screens and sits side-by-side from `md` up.
 */
export function CodeCompare({ angular, react, caption, className }: CodeCompareProps) {
  return (
    <figure className={cn("not-prose my-0", className)}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CodePanel label="Angular" code={angular} />
        <CodePanel label="React" code={react} accent />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export default CodeCompare;
