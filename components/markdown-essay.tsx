import { isValidElement, type ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CALLOUT = /^\s*\p{Extended_Pictographic}/u;

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textContent(node.props.children);
  }
  return "";
}

function Quote({ children }: { children?: ReactNode }) {
  if (CALLOUT.test(textContent(children))) {
    return (
      <aside className="not-prose my-8 rounded-md border border-rule bg-ink/[0.04] px-5 py-5 text-[1.0625rem] leading-[1.7] text-ink [&_a]:underline [&_a]:decoration-rule [&_a]:underline-offset-4 [&_p+p]:mt-4 [&_strong]:font-semibold">
        {children}
      </aside>
    );
  }

  return <blockquote>{children}</blockquote>;
}

function isSafeImageSrc(src: string) {
  return (
    src.startsWith("/") ||
    src.startsWith("https://") ||
    src.startsWith("http://")
  );
}

const components: Components = {
  blockquote: Quote,
  img: ({ src, alt }) => {
    if (typeof src !== "string" || !isSafeImageSrc(src)) return null;

    return (
      // Markdown figures have intrinsic sizes and may be remote URLs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className="my-10 w-full max-w-full rounded-md"
      />
    );
  },
};

export function MarkdownEssay({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
