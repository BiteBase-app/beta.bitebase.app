
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface WorkflowCardProps { 
  title: string; 
  description: string; 
  items: string[];
  isExpanded?: boolean;
}

const WorkflowCard = ({ 
  title, 
  description, 
  items,
  isExpanded = false,
}: WorkflowCardProps) => {
  const [expanded, setExpanded] = useState(isExpanded);
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {expanded ? "Required data and steps" : `${items.length} steps in this phase`}
            </p>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {expanded ? "Hide details" : "Show details"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-2">
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
