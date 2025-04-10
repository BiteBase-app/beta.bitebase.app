
import React from "react";

interface ResearchStepProps { 
  title: string; 
  description: string; 
  icon: React.ComponentType<any>; 
  isActive?: boolean; 
  isCompleted?: boolean; 
  onClick: () => void;
}

const ResearchStep = ({ 
  title, 
  description, 
  icon: Icon, 
  isActive = false, 
  isCompleted = false, 
  onClick 
}: ResearchStepProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-start p-4 rounded-lg cursor-pointer transition-all ${
        isActive 
          ? "bg-primary/10 border border-primary" 
          : isCompleted 
          ? "bg-secondary/10 border border-secondary" 
          : "bg-muted/30 border border-border hover:bg-muted/50"
      }`}
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
        isActive 
          ? "bg-primary text-primary-foreground" 
          : isCompleted 
          ? "bg-secondary text-secondary-foreground" 
          : "bg-muted text-muted-foreground"
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ResearchStep;
