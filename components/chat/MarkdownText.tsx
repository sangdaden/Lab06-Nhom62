"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownTextProps {
  children: string;
  className?: string;
}

export function MarkdownText({ children, className }: MarkdownTextProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none",
        "prose-p:my-1.5 prose-p:leading-relaxed",
        "prose-strong:text-vinmec-text prose-strong:font-semibold",
        "prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5",
        "prose-headings:text-vinmec-text prose-headings:font-semibold",
        "prose-a:text-vinmec-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:bg-vinmec-surface prose-code:px-1 prose-code:rounded prose-code:text-vinmec-text",
        "prose-blockquote:border-l-vinmec-primary prose-blockquote:text-vinmec-text-muted",
        "[&_p:last-child]:mb-0 [&_ul:last-child]:mb-0 [&_ol:last-child]:mb-0",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: linkChildren }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {linkChildren}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
