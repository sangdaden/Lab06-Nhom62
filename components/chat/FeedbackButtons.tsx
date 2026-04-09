"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useUserSession } from "@/lib/store/user-session";
import { FeedbackDialog } from "./FeedbackDialog";

interface FeedbackButtonsProps {
  messageId: string;
  query: string;
  response: string;
  toolsUsed: string[];
}

export function FeedbackButtons({
  messageId,
  query,
  response,
  toolsUsed,
}: FeedbackButtonsProps) {
  const user = useUserSession((s) => s.user);
  const [submitted, setSubmitted] = useState<"up" | "down" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const postFeedback = async (
    rating: "up" | "down",
    reason?: string
  ) => {
    if (!user) return;
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          messageId,
          rating,
          reason,
          query,
          response,
          toolsUsed,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error ?? "Không thể gửi phản hồi");
      }
    } catch {
      toast.error("Không thể gửi phản hồi, vui lòng thử lại");
    }
  };

  const handleThumbsUp = async () => {
    if (submitted) return;
    setSubmitted("up");
    await postFeedback("up");
    toast.success("Cảm ơn phản hồi của anh/chị!", { duration: 2500 });
  };

  const handleThumbsDown = () => {
    if (submitted) return;
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (reason: string) => {
    setDialogOpen(false);
    setSubmitted("down");
    await postFeedback("down", reason);
    toast.success("Cảm ơn phản hồi của anh/chị!", { duration: 2500 });
  };

  return (
    <>
      <div
        className="flex items-center justify-end gap-1 mt-1 animate-fade-in-up"
        aria-label="Đánh giá câu trả lời"
      >
        {/* Thumbs up */}
        {submitted !== "down" && (
          <button
            id={`feedback-up-${messageId}`}
            onClick={handleThumbsUp}
            disabled={submitted !== null}
            aria-label="Hữu ích"
            title="Hữu ích"
            className={cn(
              "p-1.5 rounded-lg transition-all duration-150",
              submitted === "up"
                ? "text-vinmec-primary cursor-default"
                : "text-vinmec-text-subtle opacity-60 hover:opacity-100 hover:text-vinmec-primary hover:bg-vinmec-primary/8"
            )}
          >
            <ThumbsUp
              size={15}
              className={cn(submitted === "up" && "fill-vinmec-primary")}
            />
          </button>
        )}

        {/* Thumbs down */}
        {submitted !== "up" && (
          <button
            id={`feedback-down-${messageId}`}
            onClick={handleThumbsDown}
            disabled={submitted !== null}
            aria-label="Không hữu ích"
            title="Không hữu ích"
            className={cn(
              "p-1.5 rounded-lg transition-all duration-150",
              submitted === "down"
                ? "text-vinmec-error cursor-default"
                : "text-vinmec-text-subtle opacity-60 hover:opacity-100 hover:text-vinmec-error hover:bg-vinmec-error/8"
            )}
          >
            <ThumbsDown
              size={15}
              className={cn(submitted === "down" && "fill-vinmec-error")}
            />
          </button>
        )}
      </div>

      <FeedbackDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
}
