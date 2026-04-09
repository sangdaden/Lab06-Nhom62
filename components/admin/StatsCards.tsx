"use client";

import { ThumbsUp, ThumbsDown, BarChart2, Wrench } from "lucide-react";
import type { FeedbackWithUser } from "@/app/admin/feedback/page";

interface Props {
  feedbacks: FeedbackWithUser[];
}

function getTopTool(feedbacks: FeedbackWithUser[]): string {
  const counts: Record<string, number> = {};
  for (const f of feedbacks) {
    for (const t of f.toolsUsed as string[]) {
      counts[t] = (counts[t] ?? 0) + 1;
    }
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0]?.replace(/_/g, " ") ?? "—";
}

export function StatsCards({ feedbacks }: Props) {
  const total = feedbacks.length;
  const upCount = feedbacks.filter((f) => f.rating === "up").length;
  const downCount = feedbacks.filter((f) => f.rating === "down").length;
  const upPct = total > 0 ? Math.round((upCount / total) * 100) : 0;
  const topTool = getTopTool(feedbacks);

  const cards = [
    {
      id: "stat-total",
      label: "Tổng Feedback",
      value: total,
      sub: "lượt phản hồi",
      icon: <BarChart2 className="w-5 h-5" />,
      color: "from-[#00B5AD] to-[#00918A]",
      textColor: "text-white",
      subColor: "text-white/70",
      iconBg: "bg-white/20",
    },
    {
      id: "stat-up",
      label: "Hài lòng 👍",
      value: upCount,
      sub: `${upPct}% tổng số`,
      icon: <ThumbsUp className="w-5 h-5" />,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-white",
      subColor: "text-white/70",
      iconBg: "bg-white/20",
    },
    {
      id: "stat-down",
      label: "Chưa hài lòng 👎",
      value: downCount,
      sub: `${100 - upPct}% tổng số`,
      icon: <ThumbsDown className="w-5 h-5" />,
      color: "from-red-400 to-red-500",
      textColor: "text-white",
      subColor: "text-white/70",
      iconBg: "bg-white/20",
    },
    {
      id: "stat-tool",
      label: "Tool phổ biến nhất",
      value: topTool,
      sub: "được dùng nhiều nhất",
      icon: <Wrench className="w-5 h-5" />,
      color: "from-violet-500 to-violet-600",
      textColor: "text-white",
      subColor: "text-white/70",
      iconBg: "bg-white/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.id}
          id={c.id}
          className={`relative bg-gradient-to-br ${c.color} rounded-2xl p-5 overflow-hidden shadow-lg`}
        >
          {/* Background decoration */}
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />

          <div className="relative">
            <div
              className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${c.iconBg} ${c.textColor} mb-3`}
            >
              {c.icon}
            </div>
            <p className={`text-sm font-medium ${c.subColor} mb-1`}>
              {c.label}
            </p>
            <p className={`text-3xl font-bold ${c.textColor} leading-none`}>
              {c.value}
            </p>
            <p className={`text-xs ${c.subColor} mt-1.5`}>{c.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
