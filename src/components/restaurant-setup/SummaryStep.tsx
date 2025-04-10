
import { CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CheckCircle, Store, Info, MapPin, LineChart, Building, Navigation, DollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SummaryStepProps {
  businessType: string;
  formData: {
    restaurantName: string;
    conceptDescription: string;
    targetAudience: string;
    cuisineType?: string;
    priceRange?: string;
    neighborhood?: string;
    isLocalBrand?: boolean;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    district?: string;
    buildingName?: string;
    floor?: string;
    nearestBTS?: string;
    nearestMRT?: string;
    locationRadius: number;
    competitiveAnalysis: boolean;
    marketSizing: boolean;
    demographicAnalysis: boolean;
    locationIntelligence: boolean;
  };
}

const SummaryStep = ({ businessType, formData }: SummaryStepProps) => {
  return (
    <>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <CardTitle>Setup Summary</CardTitle>
        </div>
        <CardDescription>
          Review your Bangkok restaurant profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Restaurant Type */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Store className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Restaurant Type</h3>
            </div>
            <p className="text-sm ml-7">
              {businessType === "new" ? "New Restaurant" : "Existing Restaurant"}
            </p>
          </div>

          {/* Basic Information */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Basic Information</h3>
            </div>
            <div className="text-sm space-y-1 ml-7">
              <p className="flex flex-wrap gap-1">
                <span className="text-muted-foreground">Name:</span>
                <span className="break-words">{formData.restaurantName}</span>
              </p>
              <p className="flex flex-wrap gap-1">
                <span className="text-muted-foreground">Concept:</span>
                <span className="break-words">{formData.conceptDescription || "Not provided"}</span>
              </p>
              <p className="flex flex-wrap gap-1">
                <span className="text-muted-foreground">Target Audience:</span>
                <span className="break-words">{formData.targetAudience || "Not provided"}</span>
              </p>
              {formData.cuisineType && (
                <p className="flex flex-wrap gap-1">
                  <span className="text-muted-foreground">Cuisine:</span>
                  <span className="break-words">{formData.cuisineType.charAt(0).toUpperCase() + formData.cuisineType.slice(1).replace('-', ' ')}</span>
                </p>
              )}
              {formData.priceRange && (
                <p className="flex flex-wrap gap-1">
                  <span className="text-muted-foreground">Price Range:</span>
                  <span className="break-words">{formData.priceRange.charAt(0).toUpperCase() + formData.priceRange.slice(1)}</span>
                </p>
              )}
              {formData.isLocalBrand !== undefined && (
                <p className="flex flex-wrap gap-1">
                  <span className="text-muted-foreground">Brand Type:</span>
                  <Badge variant="outline" className="text-xs font-normal">
                    {formData.isLocalBrand ? "Local Thai Brand" : "International Brand"}
                  </Badge>
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Location</h3>
            </div>
            <div className="text-sm ml-7 space-y-1">
              {formData.district && (
                <p className="flex flex-wrap gap-1">
                  <span className="text-muted-foreground">District:</span>
                  <span className="break-words">{formData.district.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                </p>
              )}
              {formData.buildingName && (
                <p className="flex flex-wrap gap-1">
                  <span className="text-muted-foreground">Building:</span>
                  <span className="break-words">{formData.buildingName}</span>
                  {formData.floor && <span>({formData.floor})</span>}
                </p>
              )}
              <p className="break-words">{formData.streetAddress}</p>
              <p className="break-words">Bangkok, Thailand {formData.zipCode}</p>

              <div className="mt-2 space-y-1">
                {(formData.nearestBTS || formData.nearestMRT) && (
                  <p className="text-muted-foreground text-xs">Public Transportation:</p>
                )}
                {formData.nearestBTS && formData.nearestBTS !== "none" && (
                  <p className="flex items-center gap-1 text-xs ml-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px]">BTS</Badge>
                    <span>{formData.nearestBTS.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                  </p>
                )}
                {formData.nearestMRT && formData.nearestMRT !== "none" && (
                  <p className="flex items-center gap-1 text-xs ml-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">MRT</Badge>
                    <span>{formData.nearestMRT.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                  </p>
                )}
              </div>

              <p className="text-muted-foreground mt-2">Analysis Radius: {formData.locationRadius} km</p>
            </div>
          </div>

          {/* Research Goals */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <LineChart className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Research Goals</h3>
            </div>
            <ul className="ml-7 text-sm space-y-1">
              {formData.competitiveAnalysis && <li className="flex items-center text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>Competitive Analysis</li>}
              {formData.marketSizing && <li className="flex items-center text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>Market Sizing & Trends</li>}
              {formData.demographicAnalysis && <li className="flex items-center text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>Demographic Analysis</li>}
              {formData.locationIntelligence && <li className="flex items-center text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>Location Intelligence</li>}
              {!formData.competitiveAnalysis && !formData.marketSizing && !formData.demographicAnalysis && !formData.locationIntelligence &&
                <li className="text-muted-foreground">No research goals selected</li>
              }
            </ul>
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-4">
          <div className="flex items-center space-x-2 mb-1">
            <CheckCircle className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">Ready to launch your Bangkok restaurant intelligence!</p>
          </div>
          <p className="text-xs text-muted-foreground ml-6">
            Click "Complete Setup" below to finalize your profile and start receiving personalized market insights for your restaurant in Bangkok.
          </p>
        </div>
      </CardContent>
    </>
  );
};

export default SummaryStep;
