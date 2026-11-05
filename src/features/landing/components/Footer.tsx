"use client";

import { DEFAULT_FEEDBACK_URL } from "@/features/site-config/lib/defaults";
import { useSiteConfig } from "@/features/site-config/hooks/use-site-config";

const LINK =
  "inline-flex min-h-11 items-center rounded-control underline-offset-2 hover:text-brand-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function Footer(): React.JSX.Element {
  const { branding } = useSiteConfig();
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 py-5 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
        <div className="flex flex-col md:flex-row md:gap-5">
          <a
            href={branding.feedbackUrl || DEFAULT_FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            Send feedback
          </a>
        </div>
        <span>
          &copy; {new Date().getFullYear()} {branding.appName}
        </span>
      </div>
    </footer>
  );
}
