
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkflowCard from "./WorkflowCard";
import { ResearchStep } from "@/data/researchWorkflowData";

interface ResearchWorkflowProps {
  businessType: "new" | "existing";
  businessSteps: ResearchStep[];
}

const ResearchWorkflow = ({ businessType, businessSteps }: ResearchWorkflowProps) => {
  const { toast } = useToast();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {businessType === "new" 
            ? "New Restaurant Research Workflow" 
            : "Restaurant Optimization Workflow"}
        </h2>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Resources Downloaded",
              description: "Market research templates and resources have been downloaded.",
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Get Templates
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-6">
        {businessType === "new"
          ? "Follow this comprehensive workflow to research and plan your new restaurant business."
          : "Use this workflow to analyze and optimize your existing restaurant operations."}
      </p>
      
      {businessSteps.map((step, index) => (
        <WorkflowCard
          key={step.id}
          title={step.title}
          description={step.description}
          items={step.items}
          isExpanded={index === 0}
        />
      ))}
      
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-medium mb-2">Need help with your research?</h3>
        <p className="text-muted-foreground mb-4">
          Our team of experts can help you with market research, business planning, and more.
        </p>
        <Button
          onClick={() => {
            toast({
              title: "Contact Request Sent",
              description: "Our team will contact you shortly to discuss your restaurant research needs.",
            });
          }}
        >
          Contact Our Expert Team
        </Button>
      </div>
    </div>
  );
};

export default ResearchWorkflow;
