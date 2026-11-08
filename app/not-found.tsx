import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-medium tracking-tight">
        This page is not here.
      </h1>
      <p className="mt-4 text-lg">
        <Link
          href="/"
          className="link-mark underline decoration-rule underline-offset-4 hover:decoration-ink"
        >
          Back to the index
        </Link>
      </p>
    </div>
  );
}
