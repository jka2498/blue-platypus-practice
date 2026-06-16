import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl font-extrabold tracking-tight text-accent">404</div>
      <h1 className="heading-2 mt-4">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        That route doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Landing page</Link>
        </Button>
      </div>
    </div>
  );
}
