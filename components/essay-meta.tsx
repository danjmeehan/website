import { formatEssayDate, type Essay } from "@/lib/essays";

export function EssayMeta({
  date,
  tags,
  className,
}: {
  date: Essay["date"];
  tags: Essay["tags"];
  className?: string;
}) {
  if (!date && tags.length === 0) return null;

  return (
    <div className={className}>
      {date ? (
        <p className="font-sans text-sm text-muted">
          <time dateTime={date}>{formatEssayDate(date)}</time>
        </p>
      ) : null}
      {tags.length > 0 ? (
        <ul className={`flex flex-wrap gap-1.5${date ? " mt-2" : ""}`}>
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-rule px-2 py-0.5 font-sans text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
