import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  score: number;
  metadata?: Record<string, any>;
}

const AutoRagSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get the API URL from environment variables or use the default
      const apiUrl = import.meta.env.VITE_API_URL ?
        `${import.meta.env.VITE_API_URL}/autorag/search` :
        'https://bitebase-direct-backend.bitebase.workers.dev/autorag/search';

      console.log('Using API URL:', apiUrl);

      const response = await axios.post(apiUrl, {
        query: query
      });

      console.log('Search response:', response.data);

      if (response.data.success && response.data.result && response.data.result.result) {
        setResults(response.data.result.result.matches || []);
      } else {
        setResults([]);
        toast({
          title: "No Results",
          description: "No matching results found",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error('Error performing search:', error);
      console.error('Error details:', error.response?.data || error.message);

      toast({
        title: "Search Error",
        description: `Failed to perform search: ${error.response?.data?.error || error.message || 'Unknown error'}`,
        variant: "destructive",
      });

      setResults([]);
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </span>
            Knowledge Search
          </CardTitle>
          <CardDescription>Search through your knowledge base using Cloudflare AutoRAG</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="flex w-full items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter your search query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                disabled={loading}
                className="pr-10"
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setQuery('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
              )}
            </div>
            <Button onClick={handleSearch} disabled={loading} size="sm">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching
                </>
              ) : 'Search'}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-secondary/10 p-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <h3 className="text-base font-medium">Results ({results.length})</h3>
              </div>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <Card key={result.id || index} className="overflow-hidden border-border/40">
                    <CardHeader className="p-3 bg-muted/30">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm font-medium">{result.title || `Result ${index + 1}`}</CardTitle>
                        <span className="text-xs px-1.5 py-0.5 bg-secondary/10 text-secondary rounded-full">
                          Score: {result.score.toFixed(2)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 text-sm">
                      <p>{result.content}</p>
                    </CardContent>
                    {result.metadata && Object.keys(result.metadata).length > 0 && (
                      <CardFooter className="p-3 text-xs text-muted-foreground border-t border-border/30 bg-muted/20">
                        <div className="w-full">
                          <div className="font-medium mb-1">Metadata</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {Object.entries(result.metadata).map(([key, value]) => (
                              <div key={key} className="flex">
                                <span className="font-medium mr-1">{key}:</span>
                                <span className="truncate">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoRagSearch;
