"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/lib/store/user-session";
import { ChatScreen } from "@/components/chat/ChatScreen";

export default function ChatPage() {
  const user = useUserSession((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.replace("/login");
  }, [user, router]);

  if (!user) return null;

  return <ChatScreen />;
}
