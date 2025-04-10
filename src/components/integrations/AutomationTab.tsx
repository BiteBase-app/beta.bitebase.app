
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Workflow } from "lucide-react";
import { N8NWebhookForm } from "@/components/N8NWebhookForm";

export const AutomationTab = () => {
  return (
    <div className="grid gap-6">
      <N8NIntegrationCard />
      <WorkflowTemplatesCard />
    </div>
  );
};

const N8NIntegrationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>n8n Cognitive Workflow Automation</CardTitle>
        <CardDescription>
          Connect your cognitive enhancement programs to n8n to automate assessment and progress tracking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">What is n8n?</h3>
            <p className="text-muted-foreground mb-4">
              n8n is a workflow automation tool that allows you to connect your cognitive enhancement platform with thousands of other apps and services.
            </p>
            <h3 className="text-lg font-medium mb-2">Use Cases</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Schedule automated cognitive assessments</li>
              <li>• Send notifications when performance metrics change</li>
              <li>• Sync progress data with your calendar or CRM</li>
              <li>• Create personalized training tasks</li>
              <li>• Trigger follow-up sessions based on performance</li>
            </ul>
            <div className="mt-6">
              <Button variant="outline" className="flex items-center" asChild>
                <a href="https://n8n.io" target="_blank" rel="noopener noreferrer">
                  Learn more about n8n
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <N8NWebhookForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WorkflowTemplatesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ready-made Cognitive Workflow Templates</CardTitle>
        <CardDescription>
          Get started quickly with these pre-built workflow templates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WorkflowTemplateCard 
            title="Daily Brain Training" 
            description="Automatically schedule and track daily cognitive exercises."
          />
          <WorkflowTemplateCard 
            title="Performance Alerts" 
            description="Get notified when cognitive metrics reach targets or decline."
          />
          <WorkflowTemplateCard 
            title="Progress Reports" 
            description="Automatically generate and deliver personalized progress reports."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const WorkflowTemplateCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <Card className="bg-muted/50">
      <CardHeader className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">Import Template</Button>
      </CardFooter>
    </Card>
  );
};

export default AutomationTab;
