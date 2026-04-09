import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function Avatar({ name, size = 48, className }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "rounded-full bg-vinmec-primary-light flex items-center justify-center",
        "text-vinmec-primary-dark font-semibold select-none shrink-0",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
