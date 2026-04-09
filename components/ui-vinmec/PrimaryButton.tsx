import { cn } from "@/lib/utils";

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-vinmec-primary hover:bg-vinmec-primary-dark",
        "text-white font-medium rounded-xl px-6 py-3",
        "transition-colors active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
