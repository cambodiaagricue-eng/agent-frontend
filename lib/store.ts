"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "./types";
import { mockConversations } from "./mock-data";
import type { ChatConversation, ChatMessage } from "./types";

type SafeStorage = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
};

function createSafeStorage(): SafeStorage {
  return {
    getItem: (name) => {
      if (typeof window === "undefined") {
        return null;
      }
      try {
        return window.localStorage.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      if (typeof window === "undefined") {
        return;
      }
      try {
        window.localStorage.setItem(name, value);
      } catch {
        // Ignore storage quota/private mode failures.
      }
    },
    removeItem: (name) => {
      if (typeof window === "undefined") {
        return;
      }
      try {
        window.localStorage.removeItem(name);
      } catch {
        // Ignore storage failures.
      }
    },
  };
}

const safeStorage = createJSONStorage(() => createSafeStorage());

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  sessionChecked: boolean;
  login: (user: User, accessToken: string) => void;
  setHydrated: (value: boolean) => void;
  setSessionChecked: (value: boolean) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hydrated: false,
      sessionChecked: false,
      login: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
          sessionChecked: true,
        }),
      setHydrated: (value) => set({ hydrated: value }),
      setSessionChecked: (value) => set({ sessionChecked: value }),
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : (user as User),
        })),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          sessionChecked: true,
        }),
    }),
    {
      name: "mayura-auth",
      storage: safeStorage,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

interface SidebarState {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  isMobileOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  closeMobile: () => set({ isMobileOpen: false }),
}));

interface ChatState {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  isTyping: boolean;
  setActiveConversation: (conversationId: string) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  createConversation: (title: string) => string;
  setTyping: (value: boolean) => void;
  clearConversations: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: mockConversations,
      activeConversationId: mockConversations[0]?.id ?? null,
      isTyping: false,
      setActiveConversation: (conversationId) =>
        set({ activeConversationId: conversationId }),
      addMessage: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? {
                  ...conversation,
                  messages: [...conversation.messages, message],
                  updatedAt: message.timestamp,
                }
              : conversation,
          ),
        })),
      createConversation: (title) => {
        const id = `c${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();
        set((state) => ({
          conversations: [
            {
              id,
              title: title.trim() || "New conversation",
              messages: [],
              createdAt: now,
              updatedAt: now,
            },
            ...state.conversations,
          ],
          activeConversationId: id,
        }));
        return id;
      },
      setTyping: (value) => set({ isTyping: value }),
      clearConversations: () =>
        set({
          conversations: [],
          activeConversationId: null,
          isTyping: false,
        }),
    }),
    {
      name: "mayura-chat",
      storage: safeStorage,
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    },
  ),
);
