"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { toast } from "sonner";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { MobileStatusBar } from "@/components/layout/MobileStatusBar";
import { useUserSession } from "@/lib/store/user-session";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { ChatFooter } from "./ChatFooter";

interface ChatScreenProps {
  initialMessages?: UIMessage[];
}

export function ChatScreen({ initialMessages = [] }: ChatScreenProps) {
  const user = useUserSession((s) => s.user);
  const logout = useUserSession((s) => s.logout);
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { userId: user?.id },
    }),
    messages: initialMessages,
    onError: (e) => console.error("[useChat] error:", e),
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Show error toast when status becomes "error"
  useEffect(() => {
    if (status === "error") {
      toast.error("Đã có lỗi xảy ra", {
        description: error?.message || "Vui lòng thử lại",
        action: {
          label: "Thử lại",
          onClick: () => sendMessage(),
        },
        duration: 8000,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSend = (text: string) => {
    if (!text.trim() || !user || isLoading) return;
    sendMessage({ text });
  };

  const handleClose = () => {
    stop();
    logout();
    router.replace("/login");
  };

  const handleSuggestionPick = (q: string) => {
    if (!user) return;
    sendMessage({ text: q });
  };

  const handleActionClick = (value: string) => {
    if (value.startsWith("tel:")) {
      window.location.href = value;
      return;
    }
    if (!user) return;
    toast("Đang gửi câu hỏi...", {
      duration: 1500,
      position: "top-center",
    });
    sendMessage({ text: value });
  };

  return (
    <PhoneFrame>
      {/* Use h-dvh for mobile keyboard handling (dynamic viewport height) */}
      <div className="flex flex-col h-dvh max-h-dvh">
        <MobileStatusBar />
        <ChatHeader onClose={handleClose} />

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth-custom px-4 py-4 bg-vinmec-bg"
        >
          <MessageList
            messages={messages}
            isStreaming={isLoading}
            onSuggestionPick={handleSuggestionPick}
            onActionClick={handleActionClick}
            scrollContainerRef={scrollContainerRef}
          />
        </div>

        <div className="px-3 pt-2 pb-1 bg-vinmec-bg border-t border-vinmec-border shrink-0">
          <ChatInput
            onSend={handleSend}
            onStop={stop}
            disabled={status === "error"}
            isStreaming={isLoading}
            placeholder="Hãy nhập câu hỏi!"
          />
        </div>

        <ChatFooter />
      </div>
    </PhoneFrame>
  );
}
