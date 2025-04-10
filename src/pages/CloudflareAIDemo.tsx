import React, { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Bot, Search, Sparkles } from "lucide-react";
import cloudflareAI from "@/services/cloudflareAIService";
import { Message } from "@/services/cloudflareAIService";

const CloudflareAIDemo = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatInput, setChatInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'system', content: 'You are BiteBase AI, an intelligent assistant for restaurant owners and managers.' },
    { role: 'assistant', content: 'Hello! I\'m your BiteBase AI Assistant powered by Cloudflare AI. How can I help you with your restaurant analytics today?' }
  ]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: chatInput
    };

    // Add user message to chat
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    try {
      // Use Cloudflare AI Gateway
      const aiResponse = await cloudflareAI.createChatCompletionWithContext(
        [userMessage]
      );

      // Add AI response to chat
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiResponse
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to my services. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setIsLoading(true);

    try {
      // Use Cloudflare AI Search
      const response = await cloudflareAI.aiSearch({
        query: searchInput
      });

      setSearchResults(response.results || []);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Cloudflare AI Demo</h1>
            <p className="text-muted-foreground">Explore the capabilities of Cloudflare AI Gateway</p>
          </div>
        </div>

        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="chat">
              <Bot className="mr-2 h-4 w-4" />
              Chat Completion
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="mr-2 h-4 w-4" />
              AI Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chat with Cloudflare AI</CardTitle>
                  <CardDescription>
                    Interact with the Cloudflare AI Gateway using the chat completion API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4">
                    {chatMessages.map((message, index) => (
                      message.role !== 'system' && (
                        <div
                          key={index}
                          className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                        >
                          <div
                            className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      )
                    ))}
                    {isLoading && (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendChatMessage();
                        }
                      }}
                      disabled={isLoading}
                    />
                    <Button onClick={handleSendChatMessage} disabled={!chatInput.trim() || isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="search">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Search</CardTitle>
                  <CardDescription>
                    Search through your data using Cloudflare AI Search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6">
                    <Input
                      placeholder="Enter your search query..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearch();
                        }
                      }}
                      disabled={isLoading}
                    />
                    <Button onClick={handleSearch} disabled={!searchInput.trim() || isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                    </Button>
                  </div>

                  {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div>
                      {searchResults.length > 0 ? (
                        <div className="space-y-4">
                          {searchResults.map((result, index) => (
                            <Card key={index}>
                              <CardContent className="pt-6">
                                <div className="flex items-start gap-2">
                                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                  <div>
                                    <p className="text-sm">{result.text}</p>
                                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                      <span className="font-medium">Score: {result.score.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : searchInput.trim() !== "" ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No results found. Try a different search query.
                        </div>
                      ) : null}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CloudflareAIDemo;
