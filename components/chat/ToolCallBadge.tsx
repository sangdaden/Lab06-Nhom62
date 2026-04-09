import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { getToolLabel } from "@/lib/agent/tool-labels";
import { cn } from "@/lib/utils";

interface ToolCallBadgeProps {
  toolName: string;
  state: "running" | "done" | "error";
  className?: string;
}

export function ToolCallBadge({ toolName, state, className }: ToolCallBadgeProps) {
  const label =
    state === "error"
      ? `Lỗi khi thực hiện ${toolName}`
      : getToolLabel(toolName, state === "running" ? "running" : "done");

  return (
    <div
      className={cn(
        "chat-bubble-tool",
        state === "running" && "animate-pulse-soft",
        state === "error" && "border-vinmec-error/30 text-vinmec-error",
        className
      )}
    >
      {state === "running" && (
        <Loader2
          size={13}
          className="animate-spin text-vinmec-primary shrink-0"
        />
      )}
      {state === "done" && (
        <CheckCircle2 size={13} className="text-vinmec-success shrink-0" />
      )}
      {state === "error" && (
        <AlertCircle size={13} className="text-vinmec-error shrink-0" />
      )}
      <span>{label}</span>
    </div>
  );
}
