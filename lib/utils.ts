import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Today's date as an ISO `YYYY-MM-DD` string (local time). */
export function todayISO(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Number of whole calendar days between two ISO dates (b - a). */
export function daysBetween(aISO: string, bISO: string): number {
  const a = new Date(`${aISO}T00:00:00`);
  const b = new Date(`${bISO}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/** Add N days to an ISO date, returning a new ISO date. */
export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return todayISO(d);
}

/** Clamp a number to a range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Stable, dependency-free deep equality for test-case comparison. */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a !== "object") {
    // Handle NaN
    return Number.isNaN(a) && Number.isNaN(b);
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  const ao = a as Record<string, unknown>;
  const bo = b as Record<string, unknown>;
  const ak = Object.keys(ao);
  const bk = Object.keys(bo);
  if (ak.length !== bk.length) return false;
  return ak.every((k) => deepEqual(ao[k], bo[k]));
}

/** Pretty-print any value for display in test result panels. */
export function formatValue(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/** Pluralise a noun by count. */
export function plural(count: number, noun: string, suffix = "s"): string {
  return `${count} ${noun}${count === 1 ? "" : suffix}`;
}
