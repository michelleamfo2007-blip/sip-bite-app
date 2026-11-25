export function FoldLabel({
  name,
  as: Tag = "p",
  compact = false,
  className = "text-[13px] font-medium uppercase tracking-[0.04em]",
}: {
  name: string;
  as?: "p" | "h1" | "h3";
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={compact ? "relative pb-4" : "relative pb-7"}>
      <div className={`bg-[#F6A31A] [transform:skewY(-3deg)] ${compact ? "px-2 py-1" : "px-3 py-2.5"}`}>
        <Tag className={`text-center leading-tight text-[#1C140F] [transform:skewY(3deg)] ${className}`}>{name}</Tag>
      </div>
      <svg viewBox="0 0 88 28" className={`absolute bottom-0 right-3 ${compact ? "h-4 w-14" : "h-6 w-20"}`} aria-hidden="true">
        <polygon points="0,2 88,0 74,16 6,14" fill="#D4922A" />
        <polygon points="6,14 52,12 26,28" fill="#F6C453" />
      </svg>
    </div>
  );
}
