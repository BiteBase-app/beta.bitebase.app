import React, { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const SimplestAITest = () => {
  const [prompt, setPrompt] = useState("Hello, how are you?");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    setResponse("");
    setError("");

    try {
      console.log('Calling Cloudflare AI...');
      
      const apiResponse = await fetch(
        'https://api.cloudflare.com/client/v4/accounts/dc95c232d76cc4df23a5ca452a4046ab/ai/run/@cf/meta/llama-3-8b-instruct',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
          }),
        }
      );
      
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`API error (${apiResponse.status}): ${errorText}`);
      }
      
      const data = await apiResponse.json();
      console.log('Success! Response:', data);
      
      if (data.result && data.result.response) {
        setResponse(data.result.response);
      } else {
        throw new Error(`API returned success=false or missing response: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      console.error('Error:', err);
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
            <h1 className="text-4xl font-bold mb-2">Simplest AI Test</h1>
            <p className="text-muted-foreground">
              Direct test of Cloudflare AI API with minimal code
            </p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Cloudflare AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              onClick={handleTest} 
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
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Using model: @cf/meta/llama-3-8b-instruct
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SimplestAITest;
