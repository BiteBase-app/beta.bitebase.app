import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRestaurantProfiles } from "@/hooks/useRestaurantProfiles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Info } from "lucide-react";

const ChatbotPage = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const { profiles, isLoading } = useRestaurantProfiles();

  // Set the first profile as default when profiles are loaded
  useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfileId) {
      setSelectedProfileId(profiles[0].id);
    }
  }, [profiles, selectedProfileId]);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
            <p className="text-muted-foreground">
              Get insights and answers about your restaurant business
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Select
              value={selectedProfileId || ""}
              onValueChange={(value) => setSelectedProfileId(value)}
              disabled={isLoading || !profiles || profiles.length === 0}
            >
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Select restaurant profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles && profiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.restaurant_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ChatBot
              fullScreen={true}
              title="BiteBase AI Assistant"
              restaurantProfileId={selectedProfileId || undefined}
              initialMessage={`Hello! I'm your BiteBase AI Assistant. ${selectedProfileId ? "I'm ready to help with insights about your restaurant." : "Please select a restaurant profile to get personalized insights."}`}
              useMockUser={true}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  About the AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The BiteBase AI Assistant can help you with:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Bot className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span>Market research and competitor analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Bot className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span>Location intelligence and demographic insights</span>
                  </li>
                  <li className="flex items-start">
                    <Bot className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span>Menu optimization and pricing strategies</span>
                  </li>
                  <li className="flex items-start">
                    <Bot className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span>Business performance analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Bot className="mr-2 h-4 w-4 text-primary mt-0.5" />
                    <span>Industry trends and best practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Questions</CardTitle>
                <CardDescription>Try asking these questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-2" size="sm">
                    What are the current food trends?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-2" size="sm">
                    How can I improve my restaurant's profitability?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-2" size="sm">
                    What marketing strategies work best for restaurants?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-2" size="sm">
                    How do I analyze my competitors?
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-auto py-2" size="sm">
                    What's the best location for a new restaurant?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatbotPage;
