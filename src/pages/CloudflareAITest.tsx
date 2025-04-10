import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import cloudflareAI from "@/services/cloudflareAIService";
import cloudflareAIUtils from "@/utils/cloudflareAI";

const CloudflareAITest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState("Write a short story about a llama that goes on a journey to find an orange cloud");

  const runTest = async () => {
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      // First try using our service
      try {
        console.log('Testing with cloudflareAI service...');
        const result = await cloudflareAI.chatCompletion({
          messages: [
            {
              role: "system",
              content: "You are a friendly assistant that helps write stories",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        setResponse(result.result.content);
        return; // Exit if successful
      } catch (serviceError) {
        console.error('Error with cloudflareAI service:', serviceError);
        // Continue to fallback method if service fails
      }

      // Fallback to direct fetch using utility function
      console.log('Falling back to direct fetch using utility function...');
      const aiResponse = await cloudflareAIUtils.callCloudflareAI([
        {
          role: "system",
          content: "You are a friendly assistant that helps write stories",
        },
        {
          role: "user",
          content: prompt,
        },
      ]);

      setResponse(aiResponse);
    } catch (err) {
      console.error('Error testing Cloudflare AI:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Cloudflare AI Test</h1>
            <p className="text-muted-foreground">Test the integration with Cloudflare AI</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Cloudflare AI Integration</CardTitle>
            <CardDescription>
              This page tests the direct integration with Cloudflare AI using the Llama 3 model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full"
                  placeholder="Enter your prompt here..."
                />
              </div>

              <Button
                onClick={runTest}
                disabled={isLoading || !prompt.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Test Cloudflare AI'
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 text-red-800 rounded-md">
                  <p className="font-semibold">Error:</p>
                  <p className="whitespace-pre-wrap">{error}</p>
                </div>
              )}

              {response && (
                <div>
                  <label className="block text-sm font-medium mb-2">Response</label>
                  <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Using model: @cf/meta/llama-3-8b-instruct
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CloudflareAITest;
