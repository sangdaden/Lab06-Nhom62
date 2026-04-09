import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionUser = {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatarUrl?: string | null;
  medicalNotes?: string | null;
};

type State = {
  user: SessionUser | null;
  setUser: (u: SessionUser) => void;
  logout: () => void;
};

export const useUserSession = create<State>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "vinmec-user-session" }
  )
);
