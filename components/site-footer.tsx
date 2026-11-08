import { site, type ProfileIcon } from "@/lib/site";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function ProfileMark({ name }: { name: ProfileIcon }) {
  const shared = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    className: "size-[0.95em] shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "linkedin") {
    return (
      <svg {...shared}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg {...shared}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ProfileLabel({
  icon,
  label,
  linked = false,
}: {
  icon: ProfileIcon;
  label: string;
  linked?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <ProfileMark name={icon} />
      <span
        className={
          linked
            ? "link-mark underline decoration-rule underline-offset-4 group-hover:decoration-ink"
            : undefined
        }
      >
        {label}
      </span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-rule pt-6">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted">
        {site.links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <a
                href={link.href}
                className="group hover:text-ink"
                {...(isExternal(link.href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <ProfileLabel icon={link.icon} label={link.label} linked />
              </a>
            ) : (
              <ProfileLabel icon={link.icon} label={link.label} />
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}
