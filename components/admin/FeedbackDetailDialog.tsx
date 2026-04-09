"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { FeedbackWithUser } from "@/app/admin/feedback/page";
import { ThumbsUp, ThumbsDown, Copy, Check, Wrench, Clock, User } from "lucide-react";

interface Props {
  feedback: FeedbackWithUser;
  open: boolean;
  onClose: () => void;
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function FeedbackDetailDialog({ feedback: f, open, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    const json = JSON.stringify(
      {
        id: f.id,
        rating: f.rating,
        reason: f.reason,
        query: f.query,
        response: f.response,
        toolsUsed: f.toolsUsed,
        userId: f.userId,
        userName: f.user.name,
        messageId: f.messageId,
        createdAt: f.createdAt,
      },
      null,
      2
    );
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        id="feedback-detail-dialog"
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            {f.rating === "up" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold">
                <ThumbsUp className="w-4 h-4" /> Hài lòng
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-sm font-semibold">
                <ThumbsDown className="w-4 h-4" /> Chưa hài lòng
              </span>
            )}
            <span className="text-[#1A2B3C]">Chi tiết Feedback</span>
          </DialogTitle>
        </DialogHeader>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-[#6B7885]">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {f.user.name}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatTime(f.createdAt)}
          </span>
        </div>

        {/* Query */}
        <div className="rounded-xl bg-[#F0FBFA] border border-[#00B5AD]/20 p-4">
          <p className="text-xs font-semibold text-[#00918A] mb-1.5 uppercase tracking-wide">
            👤 Câu hỏi người dùng
          </p>
          <p className="text-sm text-[#1A2B3C] leading-relaxed whitespace-pre-wrap">
            {f.query}
          </p>
        </div>

        {/* Response */}
        <div className="rounded-xl bg-[#F7F9FA] border border-[#E5E9ED] p-4">
          <p className="text-xs font-semibold text-[#6B7885] mb-1.5 uppercase tracking-wide">
            🤖 Phản hồi AI
          </p>
          <p className="text-sm text-[#1A2B3C] leading-relaxed whitespace-pre-wrap">
            {f.response}
          </p>
        </div>

        {/* Tools used */}
        {(f.toolsUsed as string[]).length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#6B7885] mb-2 uppercase tracking-wide flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5" /> Tools đã dùng
            </p>
            <div className="flex flex-wrap gap-2">
              {(f.toolsUsed as string[]).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#E6F7F6] text-[#00918A] rounded-lg text-xs font-medium"
                >
                  {t.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reason */}
        {f.reason && (
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1 uppercase tracking-wide">
              💬 Lý do phản hồi
            </p>
            <p className="text-sm text-amber-800">{f.reason}</p>
          </div>
        )}

        {/* ID info */}
        <div className="text-xs text-[#9AA5B1] space-y-0.5 border-t border-[#E5E9ED] pt-3 mt-1">
          <p>ID: {f.id}</p>
          <p>Message ID: {f.messageId}</p>
        </div>

        <DialogFooter className="border-t-0 bg-transparent -mx-0 -mb-0 pt-0">
          <Button
            id="btn-copy-json"
            variant="outline"
            size="sm"
            onClick={handleCopyJson}
            className="gap-2 text-[#1A2B3C]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" /> Đã copy!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy as JSON
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
