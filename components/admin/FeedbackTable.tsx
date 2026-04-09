"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Wrench, ChevronRight } from "lucide-react";
import type { FeedbackWithUser } from "@/app/admin/feedback/page";
import { FeedbackDetailDialog } from "./FeedbackDetailDialog";

interface Props {
  feedbacks: FeedbackWithUser[];
}

type Filter = "all" | "up" | "down";

function formatTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export function FeedbackTable({ feedbacks }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<FeedbackWithUser | null>(null);

  const filtered =
    filter === "all" ? feedbacks : feedbacks.filter((f) => f.rating === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: `Tất cả (${feedbacks.length})` },
    {
      key: "up",
      label: `👍 Hài lòng (${feedbacks.filter((f) => f.rating === "up").length})`,
    },
    {
      key: "down",
      label: `👎 Chưa hài lòng (${feedbacks.filter((f) => f.rating === "down").length})`,
    },
  ];

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            id={`filter-tab-${t.key}`}
            onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
              filter === t.key
                ? "bg-[#00B5AD] text-white shadow-md shadow-[#00B5AD]/20"
                : "bg-white text-[#6B7885] border border-[#E5E9ED] hover:border-[#00B5AD] hover:text-[#00B5AD]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-[#E5E9ED] overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[#9AA5B1]">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-medium">Chưa có feedback nào</p>
            <p className="text-sm mt-1">
              Thử chọn bộ lọc khác hoặc chờ người dùng gửi phản hồi
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E9ED] bg-[#F7F9FA]">
                <th className="text-left px-4 py-3 font-semibold text-[#1A2B3C] w-36">
                  Thời gian
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#1A2B3C] w-28">
                  Người dùng
                </th>
                <th className="text-center px-4 py-3 font-semibold text-[#1A2B3C] w-20">
                  Đánh giá
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#1A2B3C]">
                  Câu hỏi
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#1A2B3C]">
                  Phản hồi
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#1A2B3C] w-32">
                  Tools
                </th>
                <th className="text-left px-4 py-3 font-semibold text-[#1A2B3C] w-32">
                  Lý do
                </th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr
                  key={f.id}
                  id={`feedback-row-${f.id}`}
                  onClick={() => setSelected(f)}
                  className={`border-b border-[#E5E9ED] cursor-pointer transition-colors hover:bg-[#F0FBFA] ${
                    i % 2 === 0 ? "bg-white" : "bg-[#F7F9FA]/40"
                  }`}
                >
                  <td className="px-4 py-3 text-[#6B7885] whitespace-nowrap text-xs">
                    {formatTime(f.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#1A2B3C]">
                      {f.user.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {f.rating === "up" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                        <ThumbsUp className="w-3 h-3" /> Hài lòng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                        <ThumbsDown className="w-3 h-3" /> Chưa HL
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#1A2B3C] max-w-[180px]">
                    {truncate(f.query, 80)}
                  </td>
                  <td className="px-4 py-3 text-[#6B7885] max-w-[200px]">
                    {truncate(f.response, 80)}
                  </td>
                  <td className="px-4 py-3">
                    {(f.toolsUsed as string[]).length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {(f.toolsUsed as string[]).slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#E6F7F6] text-[#00918A] rounded text-xs"
                          >
                            <Wrench className="w-2.5 h-2.5" />
                            {t.replace(/_/g, " ")}
                          </span>
                        ))}
                        {(f.toolsUsed as string[]).length > 2 && (
                          <span className="text-xs text-[#9AA5B1]">
                            +{(f.toolsUsed as string[]).length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-[#9AA5B1]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#6B7885] text-xs max-w-[120px]">
                    {f.reason ? truncate(f.reason, 40) : <span className="text-[#CED4DA]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[#CED4DA]">
                    <ChevronRight className="w-4 h-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[#9AA5B1] bg-white rounded-2xl border border-[#E5E9ED]">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-medium">Chưa có feedback nào</p>
          </div>
        ) : (
          filtered.map((f) => (
            <div
              key={f.id}
              id={`feedback-card-${f.id}`}
              onClick={() => setSelected(f)}
              className="bg-white rounded-2xl border border-[#E5E9ED] p-4 cursor-pointer hover:border-[#00B5AD] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-[#1A2B3C] text-sm">
                    {f.user.name}
                  </span>
                  <p className="text-xs text-[#9AA5B1] mt-0.5">
                    {formatTime(f.createdAt)}
                  </p>
                </div>
                {f.rating === "up" ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                    <ThumbsUp className="w-3 h-3" /> Hài lòng
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                    <ThumbsDown className="w-3 h-3" /> Chưa HL
                  </span>
                )}
              </div>
              <p className="text-sm text-[#1A2B3C] line-clamp-2 mb-2">
                <span className="font-medium text-[#6B7885]">Q: </span>
                {f.query}
              </p>
              <p className="text-xs text-[#6B7885] line-clamp-2">
                <span className="font-medium">A: </span>
                {f.response}
              </p>
              {(f.toolsUsed as string[]).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {(f.toolsUsed as string[]).slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-[#E6F7F6] text-[#00918A] rounded text-xs"
                    >
                      {t.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      {selected && (
        <FeedbackDetailDialog
          feedback={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
