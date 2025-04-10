
import React, { useEffect, useState } from "react";
import { Users, Building, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { MapMetric } from "./location/types";
import AnalysisControls from "./location/AnalysisControls";
import MapContainer from "./location/MapContainer";

interface MapAnalysisStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const MapAnalysisStep = ({ formData, updateFormData }: MapAnalysisStepProps) => {
  const [radius, setRadius] = useState([formData.locationRadius || 1]); // km
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<MapMetric[]>([
    {
      id: "foot-traffic",
      title: "Foot Traffic",
      value: null,
      change: null,
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "competition",
      title: "Competition",
      value: null,
      change: null,
      icon: <Building className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "rent-avg",
      title: "Avg. Rent",
      value: null,
      change: null,
      icon: <DollarSign className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "growth",
      title: "Market Growth",
      value: null,
      change: null,
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />
    },
    {
      id: "demand",
      title: "Cuisine Demand",
      value: null,
      change: null,
      icon: <ShoppingBag className="h-5 w-5 text-muted-foreground" />
    },
  ]);

  useEffect(() => {
    // Update form data when radius changes
    updateFormData("locationRadius", radius[0]);
  }, [radius, updateFormData]);

  const startAnalysis = async () => {
    if (!formData.streetAddress || !formData.city) {
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In production, this would call an API endpoint to analyze the location
      const requestData = { 
        address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        radius: radius[0]
      };
      
      console.log("Starting analysis for location:", requestData);
      
      // In production, replace with real API call
      // const response = await fetch('/api/analyze-location', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestData)
      // });
      // const data = await response.json();
      
      // For now, set placeholder "loading" state
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: "Awaiting data",
        change: null
      })));
      
    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full h-[600px]">
      {/* Left Sidebar - Analysis Controls */}
      <AnalysisControls 
        formData={formData}
        updateFormData={updateFormData}
        radius={radius}
        setRadius={setRadius}
        isAnalyzing={isAnalyzing}
        startAnalysis={startAnalysis}
      />
      
      {/* Main content - Map and visualization */}
      <MapContainer 
        formData={formData}
        metrics={metrics}
      />
    </div>
  );
};

export default MapAnalysisStep;
