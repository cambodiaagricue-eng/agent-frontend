"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { ExternalLink, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MemberQrCardProps {
  memberQrCode?: string;
  fullName?: string | null;
}

export function MemberQrCard({ memberQrCode, fullName }: MemberQrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const publicUrl = useMemo(() => {
    if (!memberQrCode || typeof window === "undefined") {
      return null;
    }

    return `${window.location.origin}/member/${encodeURIComponent(memberQrCode)}`;
  }, [memberQrCode]);

  useEffect(() => {
    let cancelled = false;

    async function generateQrCode() {
      if (!publicUrl) {
        setQrDataUrl(null);
        return;
      }

      const dataUrl = await QRCode.toDataURL(publicUrl, {
        margin: 1,
        width: 220,
        color: {
          dark: "#173f29",
          light: "#ffffff",
        },
      });

      if (!cancelled) {
        setQrDataUrl(dataUrl);
      }
    }

    void generateQrCode();

    return () => {
      cancelled = true;
    };
  }, [publicUrl]);

  const label = useMemo(() => fullName || memberQrCode || "Mayura member", [fullName, memberQrCode]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Member QR
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {memberQrCode ? (
          <>
            <div className="rounded-3xl bg-emerald-50 p-3">
              <div className="flex items-center justify-center rounded-2xl bg-white p-3 shadow-sm">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt={`QR for ${label}`} className="h-36 w-36 rounded-xl sm:h-44 sm:w-44" />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-xl bg-slate-50 text-muted-foreground sm:h-44 sm:w-44">
                    Generating QR...
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-2xl bg-slate-50 px-3 py-2">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Member code</p>
                <p className="mt-1 break-all text-sm font-medium text-slate-900">{memberQrCode}</p>
              </div>
              <p className="text-xs leading-6 text-muted-foreground">
                Scan this badge to open the public farmer card with the member’s basic information.
              </p>
            </div>

            {publicUrl ? (
              <Link href={publicUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full">
                  Open public profile
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            ) : null}
          </>
        ) : (
          <p className="text-muted-foreground">Member QR is not available for this account yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
