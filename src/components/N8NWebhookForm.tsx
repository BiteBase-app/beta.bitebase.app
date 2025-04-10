
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const N8NWebhookForm = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your n8n webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering n8n webhook:", webhookUrl);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Handle CORS for external webhook calls
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          event: "cognitive_assessment_requested",
          data: {
            assessmentType: "Cognitive Function",
            duration: "30 minutes",
            focusAreas: ["Memory", "Attention", "Processing Speed"]
          },
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Request Sent",
        description: "The request was sent to n8n. Check your workflow execution to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the n8n webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>n8n Workflow Integration</CardTitle>
        <CardDescription>
          Connect your cognitive enhancement services to n8n workflows to automate assessment and tracking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrigger}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-n8n-instance.com/webhook/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setWebhookUrl('')}>Reset</Button>
        <Button disabled={isLoading} onClick={handleTrigger}>
          {isLoading ? "Sending..." : "Test Webhook"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default N8NWebhookForm;
