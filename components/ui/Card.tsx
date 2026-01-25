import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-white/80 p-6 shadow-soft backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
