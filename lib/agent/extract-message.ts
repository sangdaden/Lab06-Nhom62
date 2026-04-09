import type { UIMessage } from "ai";

type Part = { type: string; text?: string; toolName?: string };

export function extractText(msg: UIMessage): string {
  return (msg.parts as Part[])
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export function extractToolNames(msg: UIMessage): string[] {
  const names = (msg.parts as Part[])
    .filter(
      (p) =>
        p.type?.startsWith("tool-") || p.type === "dynamic-tool"
    )
    .map((p) => {
      if (p.type === "dynamic-tool") return p.toolName ?? "unknown";
      return p.type.replace(/^tool-/, "");
    });
  // dedup
  return Array.from(new Set(names));
}
