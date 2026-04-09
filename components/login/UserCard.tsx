"use client";

import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui-vinmec/Avatar";
import type { SessionUser } from "@/lib/store/user-session";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: SessionUser;
  onSelect: (u: SessionUser) => void;
  index?: number;
}

const GENDER_LABEL: Record<string, string> = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

export function UserCard({ user, onSelect, index = 0 }: UserCardProps) {
  return (
    <button
      onClick={() => onSelect(user)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(user)}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-4 rounded-2xl",
        "bg-vinmec-bg border border-vinmec-border",
        "hover:border-vinmec-primary hover:shadow-chat-bubble",
        "active:scale-[0.98] transition-all duration-200",
        "text-left animate-fade-in-up",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinmec-primary"
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
      aria-label={`Chọn tài khoản ${user.name}`}
    >
      <Avatar name={user.name} size={52} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-vinmec-text text-base leading-tight">
            {user.name}
          </span>
          <span className="text-xs bg-vinmec-primary-light text-vinmec-primary-dark font-medium px-2 py-0.5 rounded-full shrink-0">
            {user.age}t • {GENDER_LABEL[user.gender] ?? user.gender}
          </span>
        </div>

        {user.medicalNotes && (
          <p className="text-sm text-vinmec-text-muted line-clamp-2 leading-snug">
            {user.medicalNotes}
          </p>
        )}
      </div>

      <ChevronRight
        size={20}
        className="text-vinmec-text-subtle shrink-0"
        aria-hidden
      />
    </button>
  );
}
