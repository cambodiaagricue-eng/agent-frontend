import { request } from "./auth-api";
import type { PublicCoinPrice, PublicMemberProfile, WeatherData } from "./types";

export async function getWallet(accessToken: string) {
  return request<{
    success: boolean;
    message?: string;
    data: {
      userId: string;
      coins: number;
      usdBalance: number;
      createdAt?: string;
      updatedAt?: string;
    };
  }>("/wallet", {
    method: "GET",
    authToken: accessToken,
  });
}

export async function buyCoins(accessToken: string, amountUsd: number) {
  return request<{
    success: boolean;
    message?: string;
    data: {
      wallet: {
        userId: string;
        coins: number;
        usdBalance: number;
      };
      payment: {
        paymentId: string;
        provider: string;
        status: string;
      };
    };
  }>("/wallet/buy-coins", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({ amountUsd }),
  });
}

export async function chargeSoilTest(accessToken: string) {
  return request<{
    success: boolean;
    message?: string;
    data: {
      userId: string;
      coins: number;
      usdBalance: number;
    };
  }>("/wallet/soil-test", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({}),
  });
}

export async function chargeMayurGpt(accessToken: string) {
  return request<{
    success: boolean;
    message?: string;
    data: {
      userId: string;
      coins: number;
      usdBalance: number;
    };
  }>("/wallet/mayur-gpt", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({}),
  });
}

export async function createListing(
  accessToken: string,
  payload: {
    title: string;
    description: string;
    basePriceUsd: number;
    quantity: number;
    images: File[];
  },
) {
  const body = new FormData();
  body.set("title", payload.title);
  body.set("description", payload.description);
  body.set("basePriceUsd", String(payload.basePriceUsd));
  body.set("quantity", String(payload.quantity));
  for (const file of payload.images) {
    body.append("images", file);
  }

  return request<{
    success: boolean;
    message?: string;
    data: unknown;
  }>("/marketplace/listings", {
    method: "POST",
    authToken: accessToken,
    body,
  });
}

export async function listMarketplaceListings(
  accessToken: string,
  params?: { mine?: boolean; sellerId?: string },
) {
  const search = new URLSearchParams();
  if (params?.mine) {
    search.set("mine", "true");
  }
  if (params?.sellerId) {
    search.set("sellerId", params.sellerId);
  }

  const path = search.toString()
    ? `/marketplace/listings?${search.toString()}`
    : "/marketplace/listings";

  return request<{
    success: boolean;
    message?: string;
    data: Array<{
      _id: string;
      title: string;
      description: string;
      imageUrls: string[];
      basePriceUsd: number;
      quantity: number;
      isActive: boolean;
      highestBidUsd: number;
      highestBidByUserId: string | null;
      createdAt?: string;
      seller: {
        id: string;
        username: string;
        phone: string;
        role: string;
        marketplaceMode: string;
        memberQrCode: string;
      } | null;
    }>;
  }>(path, {
    method: "GET",
    authToken: accessToken,
  });
}

export async function placeBid(
  accessToken: string,
  payload: {
    listingId: string;
    amountUsd: number;
  },
) {
  return request<{
    success: boolean;
    message?: string;
    data: unknown;
  }>("/marketplace/bids", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify(payload),
  });
}

export async function getSellerBids(accessToken: string) {
  return request<{
    success: boolean;
    message?: string;
    data: Array<{
      _id: string;
      listingId: string;
      bidderId: string;
      amountUsd: number;
      status: string;
      createdAt?: string;
    }>;
  }>("/marketplace/seller/bids", {
    method: "GET",
    authToken: accessToken,
  });
}

export async function createPoolOrder(
  accessToken: string,
  payload: {
    title: string;
    description: string;
    coinsPerUnit: number;
    minParticipants: number;
    maxParticipants?: number;
  },
) {
  return request<{
    success: boolean;
    message?: string;
    data: unknown;
  }>("/pool-orders/create", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify(payload),
  });
}

export async function joinPoolOrder(
  accessToken: string,
  payload: {
    poolOrderId: string;
    units: number;
    deliveryAddress: string;
  },
) {
  return request<{
    success: boolean;
    message?: string;
    data: unknown;
  }>("/pool-orders/join", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify(payload),
  });
}

export async function getAdminPoolOrderJoins(accessToken: string) {
  return request<{
    success: boolean;
    message?: string;
    data: Array<{
      _id: string;
      deliveryAddress: string;
      units: number;
      coinsCharged: number;
      poolOrderId?: unknown;
      buyerId?: {
        username?: string;
        phone?: string;
        role?: string;
      };
    }>;
  }>("/pool-orders/admin/joins", {
    method: "GET",
    authToken: accessToken,
  });
}

export async function getPublicWeather(location?: string) {
  const search = new URLSearchParams();
  if (location?.trim()) {
    search.set("location", location.trim());
  }

  const path = search.toString()
    ? `/public/weather?${search.toString()}`
    : "/public/weather";

  return request<{
    success: boolean;
    message?: string;
    data: WeatherData;
  }>(path, {
    method: "GET",
  });
}

export async function getPublicWeatherByCoordinates(latitude: number, longitude: number) {
  return getPublicWeather(
    `lat:${latitude.toFixed(6)},lng:${longitude.toFixed(6)}`,
  );
}

export async function getPublicMarketPrices() {
  return request<{
    success: boolean;
    message?: string;
    data: {
      prices: PublicCoinPrice[];
    };
  }>("/public/market/prices", {
    method: "GET",
  });
}

export async function getPublicMemberProfile(memberQrCode: string) {
  return request<{
    success: boolean;
    message?: string;
    data: PublicMemberProfile;
  }>(`/public/member/${encodeURIComponent(memberQrCode)}`, {
    method: "GET",
  });
}
