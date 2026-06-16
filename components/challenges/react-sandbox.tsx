"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { CheckSquare } from "lucide-react";

interface ReactSandboxProps {
  starterCode: string;
  checklist: string[];
}

/**
 * React challenges use Sandpack's live preview + a self-verify checklist (guided
 * grading), rather than brittle automated assertions against rendered output.
 */
export function ReactSandbox({ starterCode, checklist }: ReactSandboxProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Sandpack
          template="react"
          files={{ "/App.js": starterCode }}
          theme="light"
          options={{
            showLineNumbers: true,
            showTabs: false,
            editorHeight: 360,
            editorWidthPercentage: 55,
          }}
        />
      </div>

      <div className="rounded-lg border bg-surface p-4">
        <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
          <CheckSquare className="h-4 w-4 text-accent" /> Expected behaviour — verify in the preview
        </div>
        <ul className="space-y-1.5">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
