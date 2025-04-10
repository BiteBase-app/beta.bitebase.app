
import React from "react";
import { TierLevel, useTier } from "@/contexts/TierContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function TierSelector() {
  const { currentTier, setCurrentTier } = useTier();
  
  const tiers: { value: TierLevel; label: string }[] = [
    { value: "free", label: "Free Trial" },
    { value: "growth", label: "Growth ($14.99/month)" },
    { value: "pro", label: "Pro ($109/month)" },
    { value: "enterprise", label: "Enterprise ($599/month)" },
    { value: "franchise", label: "Franchise ($999/month)" }
  ];

  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
      <h3 className="text-lg font-medium mb-3 text-gradient">Simulate Tier Access</h3>
      <p className="text-sm text-muted-foreground mb-6">
        For demonstration purposes only. Change your subscription tier to see how access changes.
      </p>
      
      <RadioGroup
        value={currentTier}
        onValueChange={(value) => setCurrentTier(value as TierLevel)}
        className="space-y-3"
      >
        {tiers.map((tier) => (
          <div 
            key={tier.value} 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              currentTier === tier.value 
                ? "bg-primary/10 backdrop-blur-sm border border-primary/20" 
                : "hover:bg-background/50"
            }`}
          >
            <RadioGroupItem value={tier.value} id={`tier-${tier.value}`} />
            <Label 
              htmlFor={`tier-${tier.value}`}
              className={`font-medium ${currentTier === tier.value ? "text-primary" : ""}`}
            >
              {tier.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
