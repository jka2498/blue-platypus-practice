import { cn } from "@/lib/utils";

interface ProgressRingProps {
  percent: number; // 0..100
  label: string;
  sublabel?: string;
  size?: number;
  className?: string;
}

/** Accessible SVG progress ring used for the per-track dashboard rings. */
export function ProgressRing({
  percent,
  label,
  sublabel,
  size = 116,
  className,
}: ProgressRingProps) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`${label}: ${clamped}% complete`}
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EEE9E5"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold tracking-tight">{clamped}%</span>
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold leading-tight">{label}</div>
        {sublabel ? (
          <div className="text-xs text-muted-foreground">{sublabel}</div>
        ) : null}
      </div>
    </div>
  );
}
