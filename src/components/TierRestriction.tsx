import React from "react";
import { Badge } from "@/components/ui/badge";
import { LockIcon } from "lucide-react";

interface TierRestrictionProps {
  requiredTier: "pro" | "enterprise";
  children: React.ReactNode;
  currentTier?: string;
  showMessage?: boolean;
}

export function TierRestriction({
  requiredTier,
  children,
  currentTier = "free",
  showMessage = true,
}: TierRestrictionProps) {
  // Keep this for reference but suppress unused variable warnings
  // @ts-ignore
  const tierLevels = {
    free: 0,
    growth: 0.5,
    pro: 1,
    enterprise: 2,
    franchise: 3,
  };

  // Always allow access to all features
  const hasAccess = true; // tierLevels[currentTier as keyof typeof tierLevels] >= tierLevels[requiredTier];

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none blur-[1px]">{children}</div>
      {showMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <LockIcon className="h-8 w-8 text-muted-foreground" />
            <div className="font-medium">
              This feature requires a{" "}
              <Badge variant="outline" className="font-semibold">
                {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
              </Badge>{" "}
              subscription
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
