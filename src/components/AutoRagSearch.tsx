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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AutoRAG Search</CardTitle>
          <CardDescription>Search through your knowledge base using Cloudflare AutoRAG</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter your search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Search Results</h3>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <Card key={result.id || index} className="p-4">
                    <CardHeader className="p-2">
                      <CardTitle className="text-md">{result.title || `Result ${index + 1}`}</CardTitle>
                      <CardDescription>Score: {result.score.toFixed(2)}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-sm">{result.content}</p>
                    </CardContent>
                    {result.metadata && (
                      <CardFooter className="p-2 text-xs text-gray-500">
                        <div>
                          {Object.entries(result.metadata).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-semibold">{key}:</span> {JSON.stringify(value)}
                            </div>
                          ))}
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
