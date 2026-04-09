"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  onStop?: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  onStop,
  disabled = false,
  isStreaming = false,
  placeholder = "Hãy nhập câu hỏi!",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isStreaming) inputRef.current?.focus();
  }, [isStreaming]);

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled || isStreaming) return;
    onSend(text);
    setValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isStreaming) {
        onStop?.();
      } else {
        handleSend();
      }
    }
  };

  const canSend = value.trim().length > 0 && !disabled && !isStreaming;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-chat-input border border-vinmec-border",
        "bg-vinmec-bg shadow-chat-input px-4 py-2.5",
        "focus-within:border-vinmec-primary transition-colors",
        disabled && "opacity-60"
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || isStreaming}
        placeholder={isStreaming ? "Đang trả lời..." : placeholder}
        aria-label="Nhập tin nhắn"
        className={cn(
          "flex-1 bg-transparent text-vinmec-text text-sm outline-none",
          "placeholder:text-vinmec-text-subtle",
          "disabled:cursor-not-allowed"
        )}
      />

      {isStreaming ? (
        <button
          onClick={onStop}
          aria-label="Dừng phản hồi"
          className="w-8 h-8 flex items-center justify-center rounded-full shrink-0
                     bg-vinmec-text text-white hover:bg-vinmec-text/80 active:scale-95
                     transition-all duration-200"
        >
          <Square size={13} fill="currentColor" />
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Gửi tin nhắn"
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full shrink-0",
            "transition-all duration-200",
            canSend
              ? "bg-vinmec-primary text-white hover:bg-vinmec-primary-dark active:scale-95"
              : "text-vinmec-text-subtle"
          )}
        >
          <Send size={15} />
        </button>
      )}
    </div>
  );
}
