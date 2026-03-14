"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import type { ReactNode } from "react";

type IconAnimation = "pulse" | "bounce" | "float" | "spin" | "wiggle" | "none";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  className?: string;
  iconColor?: string;
  iconBg?: string;
  iconAnimation?: IconAnimation;
  visual?: ReactNode;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  iconAnimation = "none",
  visual,
}: StatCardProps) {
  const animationMap: Record<
    Exclude<IconAnimation, "none">,
    { animate: TargetAndTransition; transition: Transition }
  > = {
    pulse: {
      animate: { scale: [1, 1.08, 1] },
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    },
    bounce: {
      animate: { y: [0, -3, 0] },
      transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
    },
    float: {
      animate: { y: [0, -2, 0], rotate: [0, 2, 0] },
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    },
    spin: {
      animate: { rotate: [0, 360] },
      transition: { duration: 6, repeat: Infinity, ease: "linear" },
    },
    wiggle: {
      animate: { rotate: [0, -6, 6, -4, 4, 0] },
      transition: { duration: 1.6, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" },
    },
  };

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend.value >= 0 ? "text-green-600" : "text-red-500"
                )}
              >
                {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        {visual ? (
          <div className={cn("p-1 rounded-xl", iconBg)}>{visual}</div>
        ) : (
          <motion.div
            className={cn("p-3 rounded-xl", iconBg)}
            animate={iconAnimation === "none" ? undefined : animationMap[iconAnimation].animate}
            transition={iconAnimation === "none" ? undefined : animationMap[iconAnimation].transition}
          >
            <Icon className={cn("h-6 w-6", iconColor)} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
