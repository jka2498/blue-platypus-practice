"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Flame, Layers, Menu, X, Zap, LogOut } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { signOut } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

interface NavbarProps {
  displayName: string | null;
  xp: number;
  streak: number;
  levelName: string;
  level: number;
}

export function Navbar({ displayName, xp, streak, levelName, level }: NavbarProps) {
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
                  "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted-hover hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="hidden items-center gap-3 2xl:flex">
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

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/profile"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-1.5 transition hover:bg-muted-hover"
              title={levelName}
            >
              <span className="max-w-[8rem] truncate text-sm font-semibold">{displayName ?? "Learner"}</span>
              <div className="relative h-8 w-8">
                <svg className="h-full w-full" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" className="text-border" />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${Math.min(level * 2.8, 87.96)} 87.96`}
                    className="text-accent transition-all"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                  {level}
                </span>
              </div>
            </Link>
          </div>

          <ThemeToggle />

          <button
            onClick={() => signOut()}
            className="hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground lg:inline-flex"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted-hover lg:hidden"
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
                    : "text-muted-foreground hover:bg-muted-hover",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted-hover"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
