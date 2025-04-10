
import { CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, Users, BarChart2, MapPin, Globe, Utensils, Plane, DollarSign } from "lucide-react";

interface ResearchGoalsStepProps {
  formData: {
    competitiveAnalysis: boolean;
    marketSizing: boolean;
    demographicAnalysis: boolean;
    locationIntelligence: boolean;
    touristAnalysis?: boolean;
    localCompetition?: boolean;
    pricingStrategy?: boolean;
    foodDeliveryAnalysis?: boolean;
  };
  updateFormData: (key: string, value: any) => void;
}

const ResearchGoalsStep = ({ formData, updateFormData }: ResearchGoalsStepProps) => {
  return (
    <>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <LineChart className="h-5 w-5 text-primary" />
          <CardTitle>Research Goals</CardTitle>
        </div>
        <CardDescription>
          Select what Bangkok market research you'd like to conduct
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="competitiveAnalysis"
                  checked={formData.competitiveAnalysis}
                  onCheckedChange={(checked) => updateFormData("competitiveAnalysis", Boolean(checked))}
                />
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="competitiveAnalysis" className="font-medium">Competitive Analysis</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Analyze competition in your Bangkok district and identify market gaps
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="marketSizing"
                  checked={formData.marketSizing}
                  onCheckedChange={(checked) => updateFormData("marketSizing", Boolean(checked))}
                />
                <div className="flex items-center">
                  <LineChart className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="marketSizing" className="font-medium">Market Sizing & Trends</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Evaluate Bangkok market size, growth potential, and local food trends
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="demographicAnalysis"
                  checked={formData.demographicAnalysis}
                  onCheckedChange={(checked) => updateFormData("demographicAnalysis", Boolean(checked))}
                />
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="demographicAnalysis" className="font-medium">Demographic Analysis</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Understand Bangkok customer demographics, behaviors, and food preferences
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="locationIntelligence"
                  checked={formData.locationIntelligence}
                  onCheckedChange={(checked) => updateFormData("locationIntelligence", Boolean(checked))}
                />
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="locationIntelligence" className="font-medium">Location Intelligence</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Analyze BTS/MRT foot traffic, visibility, and accessibility of your Bangkok location
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="touristAnalysis"
                  checked={formData.touristAnalysis}
                  onCheckedChange={(checked) => updateFormData("touristAnalysis", Boolean(checked))}
                />
                <div className="flex items-center">
                  <Plane className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="touristAnalysis" className="font-medium">Tourist Market Analysis</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Understand tourist preferences, seasonal patterns, and target nationalities in Bangkok
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="localCompetition"
                  checked={formData.localCompetition}
                  onCheckedChange={(checked) => updateFormData("localCompetition", Boolean(checked))}
                />
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="localCompetition" className="font-medium">Local vs. International Competition</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Compare your concept against both local Thai restaurants and international chains
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="foodDeliveryAnalysis"
                  checked={formData.foodDeliveryAnalysis}
                  onCheckedChange={(checked) => updateFormData("foodDeliveryAnalysis", Boolean(checked))}
                />
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="foodDeliveryAnalysis" className="font-medium">Food Delivery Analysis</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Analyze Grab, Foodpanda, Lineman, and other delivery platforms in your area
              </p>
            </div>

            <div className="flex flex-col p-4 rounded-lg border border-border bg-muted/20 shadow-sm mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="pricingStrategy"
                  checked={formData.pricingStrategy}
                  onCheckedChange={(checked) => updateFormData("pricingStrategy", Boolean(checked))}
                />
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-primary mr-1" />
                  <Label htmlFor="pricingStrategy" className="font-medium">Bangkok Pricing Strategy</Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Optimize your menu pricing based on location, competition, and target audience
              </p>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-4">
            <p className="text-sm font-medium">Bangkok Restaurant Market Insights:</p>
            <p className="text-xs text-muted-foreground mt-1">
              Bangkok's restaurant scene is highly competitive with over 50,000 establishments. Proper market research can increase your restaurant's chance of success by up to 70% and help you navigate the unique challenges of the Thai market.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ResearchGoalsStep;
