import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-vinmec-surface-2 flex items-stretch justify-center">
      <div className={cn("phone-frame shadow-card-soft", className)}>
        {children}
      </div>
    </div>
  );
}
