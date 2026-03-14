import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({ src, alt, name, size = "md", className, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  if (src && !imgError) {
    return (
      <div className={cn("relative rounded-full overflow-hidden flex-shrink-0", sizeMap[size], className)} {...props}>
        <Image
          src={src}
          alt={alt || name || "Avatar"}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-full flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary font-semibold",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}
