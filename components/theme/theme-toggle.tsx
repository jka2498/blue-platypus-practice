"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="block h-9 w-9" aria-hidden />;
  }

  const isLight = theme === "light";
  const Icon = isLight ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`${isLight ? "Dark" : "Light"} theme`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
