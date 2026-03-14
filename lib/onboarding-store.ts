"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface OnboardingStateData {
  fullName: string;
  address: string;
  gender: string;
  age: string;
  currentStep: number;
}

interface OnboardingState {
  hydrated: boolean;
  completed: boolean;
  data: OnboardingStateData;
  setHydrated: (value: boolean) => void;
  updateData: (payload: Partial<OnboardingStateData>) => void;
  setFromServer: (payload: {
    onboardingCompleted?: boolean;
    currentStep?: number;
    profile?: {
      fullName?: string | null;
      address?: string | null;
      gender?: string | null;
      age?: number | null;
    } | null;
  }) => void;
  resetOnboarding: () => void;
}

const initialData: OnboardingStateData = {
  fullName: "",
  address: "",
  gender: "",
  age: "",
  currentStep: 1,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hydrated: false,
      completed: false,
      data: initialData,
      setHydrated: (value) => set({ hydrated: value }),
      updateData: (payload) =>
        set((state) => ({
          data: {
            ...state.data,
            ...payload,
          },
        })),
      setFromServer: (payload) =>
        set((state) => ({
          completed: Boolean(payload.onboardingCompleted),
          data: {
            ...state.data,
            fullName: payload.profile?.fullName ?? state.data.fullName,
            address: payload.profile?.address ?? state.data.address,
            gender: payload.profile?.gender ?? state.data.gender,
            age:
              payload.profile?.age != null
                ? String(payload.profile.age)
                : state.data.age,
            currentStep: payload.currentStep ?? state.data.currentStep,
          },
        })),
      resetOnboarding: () =>
        set({
          completed: false,
          data: initialData,
        }),
    }),
    {
      name: "mayura-onboarding",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completed: state.completed,
        data: state.data,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
