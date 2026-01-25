import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge ? (
        <span className="rounded-full border border-border bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {badge}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold text-slate md:text-4xl">
        {title}
      </h2>
      {description ? <p className="max-w-2xl text-base text-muted">{description}</p> : null}
    </div>
  );
}
