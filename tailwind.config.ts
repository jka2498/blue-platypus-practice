import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // DevPath design system — warm, premium, intentional.
        background: "var(--background)",
        surface: "var(--surface)",
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--accent)",
        foreground: "var(--text-primary)",
        muted: {
          DEFAULT: "var(--background)",
          foreground: "var(--text-secondary)",
          hover: "var(--muted-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "var(--error)",
          foreground: "#FFFFFF",
        },
        // Difficulty accents
        easy: "#16A34A",
        medium: "#D97706",
        hard: "#DC2626",
        "code-bg": "var(--code-bg)",
        "code-inline-bg": "var(--code-inline-bg)",
        "code-inline-fg": "var(--code-inline-fg)",
        "code-block-fg": "var(--code-block-fg)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      borderRadius: {
        xl: "0.875rem",
        lg: "0.625rem",
        md: "0.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 15 15 / 0.04), 0 1px 3px 0 rgb(15 15 15 / 0.04)",
        card: "0 1px 3px 0 rgb(15 15 15 / 0.06), 0 1px 2px -1px rgb(15 15 15 / 0.06)",
        elevated:
          "0 4px 6px -1px rgb(15 15 15 / 0.07), 0 2px 4px -2px rgb(15 15 15 / 0.07)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
