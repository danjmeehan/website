export type ProfileIcon = "linkedin" | "github" | "email";

export const site = {
  bio: "Director of Product at LexisNexis, bridging agile flow and enterprise governance.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/danjmeehan/", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/danjmeehan", icon: "github" },
    { label: "Email", href: "mailto:danjmeehan@gmail.com", icon: "email" },
  ] satisfies { label: string; href: string; icon: ProfileIcon }[],
};
