
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Users,
  DollarSign,
  Clock,
  Car,
  Building,
  ShoppingBag,
  Utensils,
  Home,
  Briefcase,
  School,
  Bus
} from "lucide-react";
import { TierRestriction } from "@/components/TierRestriction";

interface LocationFeature {
  name: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  score?: number;
  tier?: "free" | "pro" | "enterprise";
}

interface LocationFeaturesProps {
  features: LocationFeature[];
  showScores?: boolean;
}

export function LocationFeatures({ features, showScores = false }: LocationFeaturesProps) {
  // Group features by tier
  const freeFeatures = features.filter(f => !f.tier || f.tier === "free");
  const proFeatures = features.filter(f => f.tier === "pro");
  const enterpriseFeatures = features.filter(f => f.tier === "enterprise");

  return (
    <div className="space-y-6">
      {/* Free tier features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {freeFeatures.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base">{feature.name}</CardTitle>
                </div>
                {feature.tier && (
                  <Badge variant={feature.tier === "free" ? "default" : feature.tier === "pro" ? "secondary" : "outline"}>
                    {feature.tier}
                  </Badge>
                )}
              </div>
              {feature.description && (
                <CardDescription>{feature.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feature.value}</div>
              {showScores && feature.score !== undefined && (
                <div className="mt-2">
                  <Progress value={feature.score} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>{feature.score}/100</span>
                    <span>100</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced features */}
      {proFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proFeatures.map((feature, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-base">{feature.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">Advanced</Badge>
                  </div>
                  {feature.description && (
                    <CardDescription>{feature.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{feature.value}</div>
                  {showScores && feature.score !== undefined && (
                    <div className="mt-2">
                      <Progress value={feature.score} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>{feature.score}/100</span>
                        <span>100</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
      )}

      {/* Premium features */}
      {enterpriseFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterpriseFeatures.map((feature, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-base">{feature.name}</CardTitle>
                    </div>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  {feature.description && (
                    <CardDescription>{feature.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{feature.value}</div>
                  {showScores && feature.score !== undefined && (
                    <div className="mt-2">
                      <Progress value={feature.score} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>{feature.score}/100</span>
                        <span>100</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
      )}
    </div>
  );
}

export default LocationFeatures;
