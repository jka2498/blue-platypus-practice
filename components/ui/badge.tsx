import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#F1ECE8] text-foreground",
        accent: "border-transparent bg-accent/10 text-accent",
        easy: "border-transparent bg-easy/10 text-easy",
        medium: "border-transparent bg-medium/10 text-medium",
        hard: "border-transparent bg-hard/10 text-hard",
        success: "border-transparent bg-success/10 text-success",
        error: "border-transparent bg-error/10 text-error",
        outline: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
