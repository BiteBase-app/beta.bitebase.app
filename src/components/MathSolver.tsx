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
      <Card className="w-full overflow-hidden border-border/60">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="bg-primary/10 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 12h10"></path><path d="M9 4v16"></path><path d="M14 9l3 3-3 3"></path><path d="M17 6v12"></path><path d="M22 12h-2"></path></svg>
            </span>
            Math Problem Solver
          </CardTitle>
          <CardDescription>Solve complex mathematical problems using DeepSeek Math AI</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
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
                className="min-h-[100px] resize-y"
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-secondary/10 p-1 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <h3 className="text-base font-medium">Solution</h3>
                </div>
                <Card className="bg-muted/50 border-border/40">
                  <CardContent className="pt-4">
                    <div className="whitespace-pre-wrap font-mono text-sm">
                      {response}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground bg-muted/30 py-3 border-t border-border/30">
          Powered by DeepSeek Math 7B
        </CardFooter>
      </Card>
    </div>
  );
};

export default MathSolver;
