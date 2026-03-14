"use client";

import type { User } from "./types";

const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const API_ROOT = RAW_API_BASE_URL.replace(/\/+$/, "");
const API_V1 = `${API_ROOT}/api/v1`;

export type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type AgentFarmerRow = {
  userId: string;
  username: string;
  phone: string;
  memberQrCode?: string;
  isActive: boolean;
  onboardingCompleted: boolean;
  agentCreatedPendingApproval: boolean;
  createdAt?: string;
  updatedAt?: string;
  profile?: {
    fullName?: string | null;
    address?: string | null;
    gender?: string | null;
    age?: number | null;
  } | null;
  onboarding?: {
    currentStep?: number;
  } | null;
};

type AuthUser = {
  id: string;
  username: string;
  phone: string;
  role: User["role"];
  memberQrCode?: string;
};

type RequestOptions = RequestInit & {
  authToken?: string | null;
};

export async function request<T>(path: string, init?: RequestOptions): Promise<T> {
  const headers = new Headers(init?.headers ?? {});
  if (!headers.has("Content-Type") && !(init?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (init?.authToken) {
    headers.set("Authorization", `Bearer ${init.authToken}`);
  }

  const response = await fetch(`${API_V1}${path}`, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  let json: unknown = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok) {
    const message =
      typeof json === "object" &&
      json !== null &&
      "message" in json &&
      typeof (json as { message?: unknown }).message === "string"
        ? (json as { message: string }).message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return json as T;
}

export function toAppUser(user: AuthUser): User {
  return {
    id: user.id,
    username: user.username,
    name: user.username,
    phone: user.phone,
    role: user.role,
    memberQrCode: user.memberQrCode,
    joinedAt: new Date().toISOString(),
  };
}

export async function login(payload: {
  username: string;
  password: string;
  location: string;
}) {
  return request<
    ApiEnvelope<{
      accessToken: string;
      refreshToken: string;
      user: AuthUser;
    }>
  >("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function refresh() {
  return request<ApiEnvelope<Record<string, never>>>("/auth/refresh-token", {
    method: "POST",
  });
}

export async function me(accessToken: string) {
  return request<ApiEnvelope<{ user: AuthUser }>>("/auth/me", {
    method: "GET",
    authToken: accessToken,
  });
}

export async function logout() {
  return request<ApiEnvelope<Record<string, never>>>("/auth/logout", {
    method: "POST",
  });
}

export async function agentOnboardFarmer(
  accessToken: string,
  payload: {
    username: string;
    phone: string;
    password: string;
    fullName: string;
    address: string;
    gender: string;
    age: string;
    selfie: File;
    govId: File;
    landDocuments: File[];
  },
) {
  const body = new FormData();
  body.set("username", payload.username);
  body.set("phone", payload.phone);
  body.set("password", payload.password);
  body.set("fullName", payload.fullName);
  body.set("address", payload.address);
  body.set("gender", payload.gender);
  body.set("age", payload.age);
  body.set("selfie", payload.selfie);
  body.set("govId", payload.govId);
  payload.landDocuments.forEach((file) => body.append("landDocuments", file));

  return request<
    ApiEnvelope<{
      farmer: {
        _id: string;
        username: string;
        phone: string;
        createdByAgentId: string;
        agentCreatedPendingApproval: boolean;
      };
      onboarding: {
        onboardingCompleted: boolean;
        currentStep: number;
      };
    }>
  >("/agent/onboard-farmer", {
    method: "POST",
    authToken: accessToken,
    body,
  });
}

export async function listAgentFarmers(accessToken: string) {
  return request<ApiEnvelope<AgentFarmerRow[]>>("/agent/farmers", {
    method: "GET",
    authToken: accessToken,
  });
}
