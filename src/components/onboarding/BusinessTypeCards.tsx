
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

interface BusinessTypeCardsProps {
  setBusinessType: (type: "new" | "existing" | null) => void;
}

const BusinessTypeCards = ({ setBusinessType }: BusinessTypeCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card className="overflow-hidden relative">
        <CardHeader>
          <CardTitle>New Restaurant</CardTitle>
          <CardDescription>
            I'm planning to open a new restaurant and need market research.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Building className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-medium">Start from scratch</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive research for a new restaurant concept
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Location analysis & site selection</span>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Target market & customer research</span>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Competitor analysis & positioning</span>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Financial planning & feasibility studies</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => setBusinessType("new")} 
            className="w-full"
          >
            Choose This Option
          </Button>
        </CardFooter>
      </Card>

      <Card className="overflow-hidden relative">
        <CardHeader>
          <CardTitle>Existing Restaurant</CardTitle>
          <CardDescription>
            I already have a restaurant and want to improve my business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Building className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-medium">Optimize existing business</h3>
              <p className="text-sm text-muted-foreground">
                Growth strategies for your current restaurant
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Performance analysis & benchmarking</span>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Menu optimization & pricing strategy</span>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Customer retention & acquisition</span>
            </div>
            <div className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Operational efficiency improvements</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => setBusinessType("existing")} 
            className="w-full"
          >
            Choose This Option
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessTypeCards;
