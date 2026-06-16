import { cn } from "@/lib/utils";

/** Loading placeholder. Pair with aria-busy on the container. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#EEE9E5]", className)}
      {...props}
    />
  );
}

export { Skeleton };
