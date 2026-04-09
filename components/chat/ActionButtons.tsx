"use client";

import { cn } from "@/lib/utils";
import type { DetectedAction } from "@/lib/agent/action-detector";

interface ActionButtonsProps {
  actions: DetectedAction[];
  onAction: (value: string) => void;
}

export function ActionButtons({ actions, onAction }: ActionButtonsProps) {
  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 animate-fade-in-up">
      {actions.map((action) => (
        <button
          key={action.value}
          onClick={() => onAction(action.value)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium",
            "transition-all duration-150 active:scale-[0.97]",
            action.variant === "primary"
              ? "bg-vinmec-primary text-white hover:bg-vinmec-primary-dark shadow-chat-bubble"
              : "border border-vinmec-primary text-vinmec-primary hover:bg-vinmec-primary/5"
          )}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
