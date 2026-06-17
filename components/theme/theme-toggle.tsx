"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ORDER = ["light", "dark", "system"] as const;
type Mode = (typeof ORDER)[number];

const LABEL: Record<Mode, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Placeholder so layout doesn't jump when the button mounts. Same
    // dimensions as the real button (p-2 + 20×20 icon).
    return <span className="block h-9 w-9" aria-hidden />;
  }

  const current: Mode = (ORDER as readonly string[]).includes(theme ?? "")
    ? (theme as Mode)
    : "system";
  const next: Mode = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Laptop;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted-hover hover:text-foreground"
      aria-label={`${LABEL[current]} (click for ${LABEL[next].toLowerCase()})`}
      title={LABEL[current]}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
