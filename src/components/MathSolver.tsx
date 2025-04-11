import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const MathSolver: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSolve = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a math problem",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get the API URL from environment variables or use the default
      const apiUrl = import.meta.env.VITE_API_URL ? 
        `${import.meta.env.VITE_API_URL}/math/solve` : 
        'https://bitebase-direct-backend.bitebase.workers.dev/math/solve';

      console.log('Using API URL:', apiUrl);

      const response = await axios.post(apiUrl, {
        messages: [
          {
            role: "system",
            content: "You are a helpful math assistant. Solve the given problem step by step, showing your work clearly."
          },
          {
            role: "user",
            content: query
          }
        ]
      });

      console.log('Solve response:', response.data);

      if (response.data.success && response.data.result) {
        setResponse(response.data.result.response);
      } else {
        setResponse("Sorry, I couldn't solve this problem. Please try again with a different query.");
        toast({
          title: "Error",
          description: "Failed to solve the math problem",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error solving math problem:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      setResponse("Sorry, I encountered an error while trying to solve this problem. Please try again later.");
      
      toast({
        title: "Error",
        description: `Failed to solve the math problem: ${error.response?.data?.error || error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Math Problem Solver</CardTitle>
          <CardDescription>Solve complex mathematical problems using DeepSeek Math AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="math-problem" className="block text-sm font-medium mb-2">
                Enter your math problem:
              </label>
              <Textarea
                id="math-problem"
                placeholder="e.g., Solve the equation: 3x^2 + 5x - 2 = 0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[100px]"
                disabled={loading}
              />
            </div>
            
            <Button 
              onClick={handleSolve} 
              disabled={loading} 
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Solving...
                </>
              ) : (
                'Solve Problem'
              )}
            </Button>

            {response && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Solution:</h3>
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="whitespace-pre-wrap font-mono text-sm">
                      {response}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Powered by DeepSeek Math 7B
        </CardFooter>
      </Card>
    </div>
  );
};

export default MathSolver;
