import { VinmecLogo } from "@/components/brand/VinmecLogo";
import { MobileStatusBar } from "@/components/layout/MobileStatusBar";
import { ChipButton } from "@/components/ui-vinmec/ChipButton";
import { PrimaryButton } from "@/components/ui-vinmec/PrimaryButton";
import { TypingDots } from "@/components/ui-vinmec/TypingDots";

const colorSwatches = [
  { name: "primary", bg: "bg-vinmec-primary", hex: "#00B5AD" },
  { name: "primary-dark", bg: "bg-vinmec-primary-dark", hex: "#00918A" },
  { name: "primary-light", bg: "bg-vinmec-primary-light", hex: "#E6F7F6" },
  { name: "primary-50", bg: "bg-vinmec-primary-50", hex: "#F0FBFA" },
  { name: "bg", bg: "bg-vinmec-bg border border-vinmec-border", hex: "#FFFFFF" },
  { name: "surface", bg: "bg-vinmec-surface", hex: "#F7F9FA" },
  { name: "surface-2", bg: "bg-vinmec-surface-2", hex: "#EEF2F5" },
  { name: "text", bg: "bg-vinmec-text", hex: "#1A2B3C" },
  { name: "text-muted", bg: "bg-vinmec-text-muted", hex: "#6B7885" },
  { name: "text-subtle", bg: "bg-vinmec-text-subtle", hex: "#9AA5B1" },
  { name: "border", bg: "bg-vinmec-border", hex: "#E5E9ED" },
  { name: "border-strong", bg: "bg-vinmec-border-strong", hex: "#CED4DA" },
  { name: "success", bg: "bg-vinmec-success", hex: "#10B981" },
  { name: "warning", bg: "bg-vinmec-warning", hex: "#F59E0B" },
  { name: "error", bg: "bg-vinmec-error", hex: "#EF4444" },
];

export default function DesignPreviewPage() {
  return (
    <div className="bg-vinmec-surface-2 min-h-screen p-6 space-y-10">
      <h1 className="text-2xl font-bold text-vinmec-text">
        Design System — Vinmec Kitchen Sink
      </h1>

      {/* Color Palette */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Color Palette</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {colorSwatches.map(({ name, bg, hex }) => (
            <div key={name} className="space-y-1">
              <div className={`h-12 rounded-lg ${bg}`} />
              <p className="text-xs font-medium text-vinmec-text">{name}</p>
              <p className="text-xs text-vinmec-text-muted">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Typography</h2>
        <div className="space-y-3 bg-white p-5 rounded-xl shadow-card-soft">
          <p className="text-2xl font-bold text-vinmec-text">Tiêu đề lớn (700) — Trợ lý ảo VinmecCare</p>
          <p className="text-xl font-semibold text-vinmec-text">Tiêu đề (600) — Đặt lịch khám bệnh</p>
          <p className="text-base font-medium text-vinmec-text">Button / Label (500) — Xác nhận</p>
          <p className="text-base font-normal text-vinmec-text">Body (400) — Vui lòng nhập thông tin của bạn để tiếp tục.</p>
          <p className="text-sm text-vinmec-text-muted">Muted text (400) — Thông tin bổ sung</p>
          <p className="text-xs text-vinmec-text-subtle">Subtle text — Nhãn phụ</p>
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Shadows</h2>
        <div className="flex gap-6 flex-wrap">
          <div className="bg-white p-6 rounded-xl shadow-chat-bubble text-sm text-vinmec-text-muted">shadow-chat-bubble</div>
          <div className="bg-white p-6 rounded-xl shadow-chat-input text-sm text-vinmec-text-muted">shadow-chat-input</div>
          <div className="bg-white p-6 rounded-xl shadow-card-soft text-sm text-vinmec-text-muted">shadow-card-soft</div>
        </div>
      </section>

      {/* Chat Bubbles */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Chat Bubbles</h2>
        <div className="space-y-3 max-w-sm">
          <div className="flex justify-end">
            <div className="chat-bubble-user max-w-[80%]">
              Tôi muốn đặt lịch khám tim mạch
            </div>
          </div>
          <div className="flex justify-start">
            <div className="chat-bubble-bot max-w-[80%]">
              Xin chào! Tôi có thể giúp bạn đặt lịch khám tim mạch tại Vinmec.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="chat-bubble-tool">
              <span>🔍</span>
              <span>Đang tìm kiếm lịch trống...</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="chat-bubble-bot">
              <TypingDots />
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <PrimaryButton>Đặt lịch ngay</PrimaryButton>
          <PrimaryButton disabled>Đã đặt</PrimaryButton>
          <ChipButton>Khám tổng quát</ChipButton>
          <ChipButton>Tim mạch</ChipButton>
          <ChipButton>Nhi khoa</ChipButton>
        </div>
      </section>

      {/* Logo Variants */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">VinmecLogo</h2>
        <div className="flex gap-6 flex-wrap items-center">
          <div className="bg-vinmec-primary p-4 rounded-xl">
            <VinmecLogo size={40} variant="light" />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-card-soft">
            <VinmecLogo size={40} variant="dark" />
          </div>
          <div className="bg-vinmec-primary p-4 rounded-xl">
            <VinmecLogo size={28} variant="light" />
          </div>
        </div>
      </section>

      {/* Phone Frame Preview */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Phone Frame + Status Bar</h2>
        <div className="border border-vinmec-border rounded-2xl overflow-hidden max-w-sm shadow-card-soft">
          <MobileStatusBar />
          <div className="bg-vinmec-primary px-4 py-3 flex items-center gap-3">
            <VinmecLogo size={32} variant="light" />
          </div>
          <div className="p-4 bg-vinmec-bg space-y-3 min-h-[200px]">
            <div className="flex justify-end">
              <div className="chat-bubble-user text-sm">Xin chào!</div>
            </div>
            <div className="flex justify-start">
              <div className="chat-bubble-bot text-sm">Xin chào! Tôi có thể giúp gì cho bạn?</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-vinmec-text-muted mt-2">
          PhoneFrame wraps pages with max-w-[480px] centered — use at the page level.
        </p>
      </section>

      {/* Animations */}
      <section>
        <h2 className="text-lg font-semibold text-vinmec-text mb-4">Animations</h2>
        <div className="flex gap-6 flex-wrap items-center">
          <div className="animate-fade-in-up bg-white p-4 rounded-xl shadow-card-soft text-sm text-vinmec-text-muted">
            fade-in-up
          </div>
          <div className="animate-slide-in-right bg-white p-4 rounded-xl shadow-card-soft text-sm text-vinmec-text-muted">
            slide-in-right
          </div>
          <div className="animate-pulse-soft bg-vinmec-primary text-white p-4 rounded-xl text-sm">
            pulse-soft
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded-xl shadow-card-soft">
            <span className="text-sm text-vinmec-text-muted">typing-dot:</span>
            <TypingDots />
          </div>
        </div>
      </section>
    </div>
  );
}
