"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const REASONS = [
  "Thông tin không chính xác",
  "Không hiểu câu hỏi của tôi",
  "Trả lời quá dài/lan man",
  "Khác",
] as const;

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string) => void;
}

export function FeedbackDialog({
  open,
  onOpenChange,
  onSubmit,
}: FeedbackDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [extra, setExtra] = useState("");

  const handleSubmit = () => {
    if (!selectedReason) return;
    const reason = extra.trim()
      ? `${selectedReason} — ${extra.trim()}`
      : selectedReason;
    onSubmit(reason);
    // reset
    setSelectedReason("");
    setExtra("");
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setSelectedReason("");
      setExtra("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[calc(100%-2rem)] sm:max-w-md p-0 overflow-hidden"
      >
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-0">
          <DialogTitle className="text-base font-semibold text-vinmec-text">
            Phản hồi của bạn
          </DialogTitle>
          <p className="text-sm text-vinmec-text-muted mt-1">
            Điều gì khiến bạn không hài lòng?
          </p>
        </DialogHeader>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {/* Radio group */}
          <div className="flex flex-col gap-2" role="radiogroup" aria-label="Lý do không hài lòng">
            {REASONS.map((reason) => {
              const id = `fb-reason-${reason.replace(/\s+/g, "-")}`;
              const checked = selectedReason === reason;
              return (
                <label
                  key={reason}
                  htmlFor={id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                    checked
                      ? "border-vinmec-primary bg-vinmec-primary/5"
                      : "border-vinmec-border bg-vinmec-surface hover:border-vinmec-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    id={id}
                    name="feedback-reason"
                    value={reason}
                    checked={checked}
                    onChange={() => setSelectedReason(reason)}
                    className="accent-vinmec-primary w-4 h-4 shrink-0"
                  />
                  <span className="text-sm text-vinmec-text">{reason}</span>
                </label>
              );
            })}
          </div>

          {/* Optional textarea */}
          <textarea
            id="feedback-extra"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="Mô tả thêm (không bắt buộc)"
            rows={3}
            className="w-full resize-none rounded-xl border border-vinmec-border bg-vinmec-surface px-4 py-3 text-sm text-vinmec-text placeholder:text-vinmec-text-subtle focus:outline-none focus:border-vinmec-primary transition-colors duration-150"
          />
        </div>

        {/* Footer */}
        <DialogFooter className="px-5 py-4 border-t border-vinmec-border bg-vinmec-surface/50 flex flex-row gap-2 justify-end sm:flex-row -mx-0 -mb-0 rounded-b-xl">
          <button
            id="feedback-dialog-cancel"
            onClick={() => handleOpenChange(false)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-vinmec-text-muted border border-vinmec-border hover:bg-vinmec-surface-2 transition-colors duration-150"
          >
            Huỷ
          </button>
          <button
            id="feedback-dialog-submit"
            onClick={handleSubmit}
            disabled={!selectedReason}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
              selectedReason
                ? "bg-vinmec-primary text-white hover:bg-vinmec-primary-dark shadow-chat-bubble"
                : "bg-vinmec-border text-vinmec-text-subtle cursor-not-allowed"
            }`}
          >
            Gửi phản hồi
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
