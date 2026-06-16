import Link from "next/link";
import { AlertTriangle, Terminal } from "lucide-react";

/**
 * Friendly fallback when the database isn't reachable (e.g. `supabase start`
 * hasn't been run, or .env.local isn't filled in). Keeps the app from crashing
 * with a raw stack trace.
 */
export function SetupNotice({ detail }: { detail?: string }) {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h1 className="heading-2 mt-6">Let&apos;s finish setup</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        DevPath can&apos;t reach your database yet. Start Supabase locally and seed
        it, then refresh this page.
      </p>

      <div className="mt-6 w-full max-w-lg rounded-xl border bg-code-bg p-5 text-left font-mono text-sm text-[#E8E4E0]">
        <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[#9b958f]">
          <Terminal className="h-3.5 w-3.5" /> Run in your project
        </p>
        <pre className="whitespace-pre-wrap leading-relaxed">
{`cp .env.local.example .env.local
npx supabase start
npx supabase db push
npm run seed
npm run dev`}
        </pre>
      </div>

      {detail ? (
        <p className="mt-4 max-w-lg text-xs text-muted-foreground">Details: {detail}</p>
      ) : null}

      <Link href="/" className="mt-6 text-sm font-semibold text-accent hover:underline">
        ← Back to landing
      </Link>
    </div>
  );
}
