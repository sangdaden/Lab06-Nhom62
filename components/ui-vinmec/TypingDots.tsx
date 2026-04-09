export function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-vinmec-primary rounded-full animate-typing-dot"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}
