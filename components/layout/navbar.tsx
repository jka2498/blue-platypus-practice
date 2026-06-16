"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Flame, Layers, Menu, X, Zap } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface NavbarProps {
  displayName: string | null;
  xp: number;
  streak: number;
  levelName: string;
  authMode: "local" | "auth0";
}

export function Navbar({ displayName, xp, streak, levelName, authMode }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-extrabold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
              <Layers className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">DevPath</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-[#F1ECE8] hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <span
              className="flex items-center gap-1.5 rounded-full border bg-surface px-3 py-1 text-sm font-semibold"
              title={`${streak}-day streak`}
            >
              <Flame className="h-4 w-4 text-accent" />
              {streak}
            </span>
            <span
              className="flex items-center gap-1.5 rounded-full border bg-surface px-3 py-1 text-sm font-semibold"
              title={`${xp} XP — ${levelName}`}
            >
              <Zap className="h-4 w-4 text-accent" />
              {xp.toLocaleString()} XP
            </span>
          </div>

          <div className="hidden text-right text-sm leading-tight md:block">
            <div className="font-semibold">{displayName ?? "Learner"}</div>
            <div className="text-xs text-muted-foreground">{levelName}</div>
          </div>

          {authMode === "auth0" ? (
            <a
              href="/api/auth/logout"
              className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground md:inline"
            >
              Sign out
            </a>
          ) : null}

          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-[#F1ECE8] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open ? (
        <nav className="border-t lg:hidden" aria-label="Mobile">
          <div className="container flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-[#F1ECE8]",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
