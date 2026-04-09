"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/lib/store/user-session";

export default function RootPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand persist to hydrate from localStorage
  useEffect(() => {
    setHydrated(true);
  }, []);

  const user = useUserSession((s) => s.user);

  useEffect(() => {
    if (!hydrated) return;
    if (user) {
      router.replace("/chat");
    } else {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  // Brief loading state to avoid flash before hydration
  return (
    <div className="min-h-screen bg-vinmec-primary flex items-center justify-center">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 bg-white rounded-full animate-typing-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
    </div>
  );
}
