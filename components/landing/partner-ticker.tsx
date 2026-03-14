"use client";

import Image from "next/image";

interface CryptoTickerItem {
  name: string;
  symbol: string;
  priceUsd: number;
  changePercent: number;
  logoUrl?: string;
}

interface PartnerTickerProps {
  partners: CryptoTickerItem[];
}

export function PartnerTicker({ partners }: PartnerTickerProps) {
  // Duplicate for infinite scroll
  const items = [...partners, ...partners];

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="animate-ticker flex items-center gap-12 py-4">
        {items.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="shrink-0 flex items-center gap-3 px-6 py-3 bg-gray-50 border border-gray-200 rounded hover:shadow-md transition-shadow"
          >
            {p.logoUrl ? (
              <div className="h-9 w-9 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={p.logoUrl}
                  alt={`${p.name} logo`}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-9 w-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-700">
                {p.symbol}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                {p.name}
              </span>
              <span className="text-[11px] text-gray-500">
                $
                {p.priceUsd.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <span
              className={`text-[11px] font-semibold ${
                p.changePercent >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {p.changePercent >= 0 ? "+" : ""}
              {p.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
