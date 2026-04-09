import { cn } from "@/lib/utils";

export function ChipButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "border border-vinmec-primary text-vinmec-primary",
        "hover:bg-vinmec-primary-50 active:scale-[0.98]",
        "rounded-full px-4 py-2 text-sm font-medium",
        "transition-all whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
