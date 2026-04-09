import { prisma } from "@/lib/db/client";
import { FeedbackTable } from "@/components/admin/FeedbackTable";
import { StatsCards } from "@/components/admin/StatsCards";
import { Download, ShieldAlert } from "lucide-react";
import type { Prisma } from "@prisma/client";

const ADMIN_KEY = process.env.ADMIN_KEY ?? "vinmec-demo-2026";

// Export the type for client components
export type FeedbackWithUser = Prisma.FeedbackGetPayload<{
  include: { user: { select: { name: true } } };
}>;

interface PageProps {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminFeedbackPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const key = params.key;

  // Auth check
  if (key !== ADMIN_KEY) {
    return (
      <div className="min-h-screen bg-[#F7F9FA] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-[#E5E9ED] shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-[#1A2B3C] mb-2">
            Truy cập bị từ chối
          </h1>
          <p className="text-[#6B7885] text-sm mb-4">
            Bạn cần cung cấp key hợp lệ để xem trang admin.
          </p>
          <div className="bg-[#F7F9FA] rounded-xl p-3 text-left">
            <p className="text-xs text-[#9AA5B1] font-mono">
              Gợi ý: thêm{" "}
              <code className="bg-[#E6F7F6] text-[#00918A] px-1.5 py-0.5 rounded">
                ?key=your-admin-key
              </code>{" "}
              vào URL
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fetch feedbacks (server-side)
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
    take: 1000,
    include: {
      user: { select: { name: true } },
    },
  });

  // Build export URL preserving query param
  const exportUrl = `/api/admin/feedback?format=jsonl&key=${key}`;

  return (
    <div className="min-h-screen bg-[#F7F9FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E9ED] sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Vinmec logo accent */}
            <div className="w-9 h-9 bg-gradient-to-br from-[#00B5AD] to-[#00918A] rounded-xl flex items-center justify-center shadow-md shadow-[#00B5AD]/30">
              <span className="text-white text-base font-bold">V</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1A2B3C] leading-tight">
                Feedback Dashboard
              </h1>
              <p className="text-xs text-[#9AA5B1]">
                Vinmec AI Agent — Data Flywheel
              </p>
            </div>
          </div>

          {/* Export Button */}
          <a
            id="btn-export-jsonl"
            href={exportUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A2B3C] hover:bg-[#243447] text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export JSONL
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <section>
          <h2 className="text-sm font-semibold text-[#9AA5B1] uppercase tracking-wider mb-4">
            Tổng quan
          </h2>
          <StatsCards feedbacks={feedbacks} />
        </section>

        {/* Table section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#9AA5B1] uppercase tracking-wider">
              Danh sách phản hồi
            </h2>
            <span className="text-xs text-[#9AA5B1]">
              Hiển thị tối đa 1,000 bản ghi · Sắp xếp mới nhất trước
            </span>
          </div>
          <FeedbackTable feedbacks={feedbacks} />
        </section>

        {/* Footer note */}
        <div className="text-center text-xs text-[#CED4DA] pb-4">
          Admin Dashboard · Vinmec AI Agent Demo ·{" "}
          <span className="font-mono">key=••••</span>
        </div>
      </div>
    </div>
  );
}
