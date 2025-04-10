
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin } from "lucide-react";
import { MapAnalysisProps } from "./types";

interface AnalysisControlsProps extends MapAnalysisProps {
  radius: number[];
  setRadius: React.Dispatch<React.SetStateAction<number[]>>;
  isAnalyzing: boolean;
  startAnalysis: () => void;
}

const AnalysisControls = ({ 
  formData, 
  radius, 
  setRadius, 
  isAnalyzing, 
  startAnalysis 
}: AnalysisControlsProps) => {
  return (
    <div className="md:col-span-1 p-4 space-y-6 border border-border rounded-lg shadow-md bg-card">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Location Analysis</h3>
        <p className="text-sm text-muted-foreground">Analyze your restaurant location to understand market potential.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="radius">Search Radius</Label>
            <span className="text-sm text-muted-foreground">{radius[0]} km</span>
          </div>
          <Slider 
            id="radius"
            min={0.5} 
            max={5} 
            step={0.5} 
            value={radius} 
            onValueChange={setRadius} 
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Location:</p>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm truncate">
              {formData.streetAddress ? 
                `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}` :
                "No address provided"}
            </p>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={startAnalysis} 
          disabled={isAnalyzing || !formData.streetAddress || !formData.city}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Location"}
        </Button>
      </div>
    </div>
  );
};

export default AnalysisControls;
