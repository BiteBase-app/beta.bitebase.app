
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define available tier levels
export type TierLevel = "free" | "growth" | "pro" | "enterprise" | "franchise";

interface TierContextType {
  currentTier: TierLevel;
  setCurrentTier: (tier: TierLevel) => void;
  isTierAllowed: (requiredTier: TierLevel) => boolean;
  canAddMultipleLocations: () => boolean;
}

const tierHierarchy: Record<TierLevel, number> = {
  free: 0,
  growth: 1,
  pro: 2,
  enterprise: 3,
  franchise: 4
};

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider = ({ children, initialTier = "free" }: { children: ReactNode; initialTier?: TierLevel }) => {
  const [currentTier, setCurrentTier] = useState<TierLevel>(initialTier);

  const isTierAllowed = (requiredTier: TierLevel): boolean => {
    return tierHierarchy[currentTier] >= tierHierarchy[requiredTier];
  };

  const canAddMultipleLocations = (): boolean => {
    return currentTier === "franchise" || currentTier === "enterprise";
  };

  return (
    <TierContext.Provider value={{ currentTier, setCurrentTier, isTierAllowed, canAddMultipleLocations }}>
      {children}
    </TierContext.Provider>
  );
};

export const useTier = (): TierContextType => {
  const context = useContext(TierContext);
  if (context === undefined) {
    throw new Error("useTier must be used within a TierProvider");
  }
  return context;
};
