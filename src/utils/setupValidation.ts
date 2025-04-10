
import { useToast } from "@/hooks/use-toast";

interface FormData {
  restaurantName?: string;
  conceptDescription?: string;
  cuisineType?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  district?: string;
  buildingName?: string;
  nearestBTS?: string;
  nearestMRT?: string;
  competitiveAnalysis?: boolean;
  marketSizing?: boolean;
  demographicAnalysis?: boolean;
  locationIntelligence?: boolean;
  touristAnalysis?: boolean;
  localCompetition?: boolean;
  pricingStrategy?: boolean;
  foodDeliveryAnalysis?: boolean;
}

export const validateBusinessType = (businessType: string, toast: ReturnType<typeof useToast>['toast']) => {
  if (!businessType) {
    toast({
      title: "Please select an option",
      description: "Choose whether you have an existing restaurant or are starting a new one",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

export const validateBasicInfo = (formData: FormData, toast: ReturnType<typeof useToast>['toast']) => {
  if (!formData.restaurantName) {
    toast({
      title: "Restaurant name required",
      description: "Please enter a name for your restaurant",
      variant: "destructive",
    });
    return false;
  }

  if (!formData.conceptDescription) {
    toast({
      title: "Concept description required",
      description: "Please provide a brief description of your restaurant concept",
      variant: "destructive",
    });
    return false;
  }

  if (!formData.cuisineType) {
    toast({
      title: "Cuisine type required",
      description: "Please select a cuisine type for your restaurant",
      variant: "destructive",
    });
    return false;
  }

  return true;
};

export const validateLocation = (formData: FormData, toast: ReturnType<typeof useToast>['toast']) => {
  // For Bangkok setup, we only require street address, district, and postal code
  // City is pre-filled as "Bangkok" and state is not needed for Thailand
  if (!formData.streetAddress) {
    toast({
      title: "Street address required",
      description: "Please enter the street address of your restaurant",
      variant: "destructive",
    });
    return false;
  }

  if (!formData.district) {
    toast({
      title: "District required",
      description: "Please select a Bangkok district for your restaurant",
      variant: "destructive",
    });
    return false;
  }

  if (!formData.zipCode) {
    toast({
      title: "Postal code required",
      description: "Please enter the postal code for your restaurant location",
      variant: "destructive",
    });
    return false;
  }

  return true;
};

export const validateResearchGoals = (formData: FormData, toast: ReturnType<typeof useToast>['toast']) => {
  const hasSelectedGoal = formData.competitiveAnalysis || formData.marketSizing ||
                          formData.demographicAnalysis || formData.locationIntelligence ||
                          formData.touristAnalysis || formData.localCompetition ||
                          formData.pricingStrategy || formData.foodDeliveryAnalysis;
  if (!hasSelectedGoal) {
    toast({
      title: "Research goals required",
      description: "Please select at least one research goal for your Bangkok restaurant",
      variant: "destructive",
    });
    return false;
  }
  return true;
};
