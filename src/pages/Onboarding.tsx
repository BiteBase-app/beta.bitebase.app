
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import BusinessTypeCards from "@/components/onboarding/BusinessTypeCards";
import RestaurantInfoForm, { RestaurantInfoFormValues } from "@/components/onboarding/RestaurantInfoForm";
import BusinessSetupSteps from "@/components/onboarding/BusinessSetupSteps";
import ResearchWorkflow from "@/components/onboarding/ResearchWorkflow";
import { newBusinessSteps, existingBusinessSteps } from "@/data/researchWorkflowData";

const Onboarding = () => {
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState<"new" | "existing" | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const onSubmit = (data: RestaurantInfoFormValues) => {
    console.log("Form data:", data);
    toast({
      title: "Restaurant information saved",
      description: "Your restaurant details have been saved successfully.",
    });
    setCurrentStep(1);
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Restaurant Setup</h1>
            <p className="text-xl text-muted-foreground">
              Set up your restaurant profile and get started with market research.
            </p>
          </div>

          {!businessType ? (
            <BusinessTypeCards setBusinessType={setBusinessType} />
          ) : (
            <div>
              <Button
                variant="outline"
                onClick={() => setBusinessType(null)}
                className="mb-6"
              >
                Back to Selection
              </Button>

              <Tabs defaultValue="steps" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="steps">Setup Steps</TabsTrigger>
                  <TabsTrigger value="workflow">Research Workflow</TabsTrigger>
                </TabsList>

                <TabsContent value="steps">
                  <div className="space-y-6">
                    {currentStep === 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Basic Restaurant Information</CardTitle>
                          <CardDescription>
                            Let's start with the basic details about your restaurant.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <RestaurantInfoForm onSubmit={onSubmit} />
                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 1 && (
                      <div>
                        <h2 className="text-2xl font-bold mb-4">
                          {businessType === "new" ? "New Restaurant Setup" : "Restaurant Optimization"}
                        </h2>
                        
                        <BusinessSetupSteps 
                          businessSteps={businessType === "new" ? newBusinessSteps : existingBusinessSteps} 
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="workflow">
                  <ResearchWorkflow 
                    businessType={businessType}
                    businessSteps={businessType === "new" ? newBusinessSteps : existingBusinessSteps}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding;
