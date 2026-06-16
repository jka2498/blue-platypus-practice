import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Angular → React Migration Guide",
  description:
    "A practical, side-by-side reference for Angular developers moving to React: template syntax, component communication, lifecycle hooks, state, routing, HTTP, and RxJS.",
};

export default function MigrationGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Slim public header — blurred backdrop, thin bottom border. */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
              <Layers className="h-4 w-4" />
            </span>
            DevPath
          </Link>
          <Button asChild size="sm">
            <Link href="/dashboard">Start Learning</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:h-16 sm:flex-row sm:py-0">
          <span>DevPath — your personal React study platform.</span>
          <span>Built for Angular developers moving to React.</span>
        </div>
      </footer>
    </div>
  );
}
