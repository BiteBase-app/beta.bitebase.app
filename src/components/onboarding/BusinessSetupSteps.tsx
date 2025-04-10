
import React from "react";
import ResearchStep from "./ResearchStep";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ResearchStep as ResearchStepType } from "@/data/researchWorkflowData";
import { useToast } from "@/hooks/use-toast";

interface BusinessSetupStepsProps {
  businessSteps: ResearchStepType[];
}

const BusinessSetupSteps = ({ businessSteps }: BusinessSetupStepsProps) => {
  const { toast } = useToast();
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {businessSteps.map((step) => (
          <ResearchStep
            key={step.id}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isActive={false}
            isCompleted={false}
            onClick={() => {
              toast({
                title: "Coming Soon",
                description: `The ${step.title} step will be available soon.`,
              });
            }}
          />
        ))}
      </div>
      
      <Button
        onClick={() => {
          toast({
            title: "Demo Version",
            description: "This is a demo of the restaurant setup flow. Additional functionality will be added in future updates.",
          });
        }}
        className="w-full"
      >
        Start Research Process <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default BusinessSetupSteps;
