import {
  LayoutDashboard,
  Layers3,
  ListChecks,
  Code2,
  LineChart,
  Route,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/javascript-roadmap", label: "JS Roadmap", icon: Route },
  { href: "/flashcards", label: "Flashcards", icon: Layers3 },
  { href: "/quiz", label: "Quiz", icon: ListChecks },
  { href: "/challenges", label: "Challenges", icon: Code2 },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/migration-guide", label: "Angular → React", icon: ArrowLeftRight },
];
