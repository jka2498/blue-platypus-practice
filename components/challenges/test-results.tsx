"use client";

import { CheckCircle2, XCircle, Terminal, AlertTriangle } from "lucide-react";
import type { RunOutput } from "@/types";
import { cn } from "@/lib/utils";

export function TestResults({ output }: { output: RunOutput }) {
  const passCount = output.results.filter((r) => r.passed).length;

  return (
    <div className="space-y-4 text-sm">
      {/* Summary banner */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 font-semibold",
          output.error
            ? "bg-error/10 text-error"
            : output.passed
              ? "bg-success/10 text-success"
              : "bg-error/10 text-error",
        )}
      >
        {output.error ? (
          <>
            <AlertTriangle className="h-4 w-4" /> Error before tests ran
          </>
        ) : output.passed ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> All {output.results.length} tests passed
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4" /> {passCount}/{output.results.length} tests passed
          </>
        )}
        <span className="ml-auto text-xs font-normal opacity-70">{output.durationMs}ms</span>
      </div>

      {/* Fatal error */}
      {output.error ? (
        <pre className="overflow-x-auto rounded-lg bg-code-bg p-3 font-mono text-xs text-[#ff8f7a]">
          {output.error}
        </pre>
      ) : null}

      {/* Per-test results */}
      {output.results.length > 0 ? (
        <ul className="space-y-2">
          {output.results.map((r, i) => (
            <li
              key={i}
              className={cn(
                "rounded-lg border p-3",
                r.passed ? "border-success/30 bg-success/5" : "border-error/30 bg-error/5",
              )}
            >
              <div className="flex items-start gap-2">
                {r.passed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                )}
                <span className="font-medium">{r.description}</span>
              </div>
              {!r.passed ? (
                <div className="mt-2 space-y-1 pl-6 font-mono text-xs">
                  {r.error ? (
                    <div className="text-error">threw: {r.error}</div>
                  ) : (
                    <>
                      <div>
                        <span className="text-muted-foreground">expected: </span>
                        <span className="text-success">{r.expected}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">received: </span>
                        <span className="text-error">{r.received}</span>
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Console output */}
      {output.logs.length > 0 ? (
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" /> Console
          </div>
          <pre className="max-h-40 overflow-auto rounded-lg bg-code-bg p-3 font-mono text-xs text-[#E8E4E0]">
            {output.logs.join("\n")}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
