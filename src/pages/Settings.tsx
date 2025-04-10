import React, { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // API settings
  const [cloudflareToken, setCloudflareToken] = useState(localStorage.getItem('cloudflareToken') || '');
  const [cloudflareAccountId, setCloudflareAccountId] = useState(localStorage.getItem('cloudflareAccountId') || '');
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('apiUrl') || 'http://localhost:8001');
  
  // AI settings
  const [aiModel, setAiModel] = useState(localStorage.getItem('aiModel') || '@cf/meta/llama-3-8b-instruct');
  const [systemPrompt, setSystemPrompt] = useState(
    localStorage.getItem('systemPrompt') || 
    "You are BiteBase AI, an intelligent assistant for restaurant owners and managers. You help with market research, location analysis, competitive analysis, and business strategy."
  );
  
  const handleSaveGeneral = () => {
    // Save general settings
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('notifications', notifications.toString());
    
    toast({
      title: "Settings Saved",
      description: "Your general settings have been saved.",
    });
  };
  
  const handleSaveAPI = () => {
    // Save API settings
    localStorage.setItem('cloudflareToken', cloudflareToken);
    localStorage.setItem('cloudflareAccountId', cloudflareAccountId);
    localStorage.setItem('apiUrl', apiUrl);
    
    toast({
      title: "API Settings Saved",
      description: "Your API settings have been saved.",
    });
  };
  
  const handleSaveAI = () => {
    // Save AI settings
    localStorage.setItem('aiModel', aiModel);
    localStorage.setItem('systemPrompt', systemPrompt);
    
    toast({
      title: "AI Settings Saved",
      description: "Your AI settings have been saved.",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Configure your BiteBase application settings
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general application settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for the application
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable notifications for important events
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Configure API settings for external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cloudflare-token">Cloudflare API Token</Label>
                  <Input
                    id="cloudflare-token"
                    type="password"
                    value={cloudflareToken}
                    onChange={(e) => setCloudflareToken(e.target.value)}
                    placeholder="Enter your Cloudflare API token"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your Cloudflare API token for accessing AI services
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cloudflare-account-id">Cloudflare Account ID</Label>
                  <Input
                    id="cloudflare-account-id"
                    value={cloudflareAccountId}
                    onChange={(e) => setCloudflareAccountId(e.target.value)}
                    placeholder="Enter your Cloudflare Account ID"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your Cloudflare Account ID for accessing AI services
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-url">API URL</Label>
                  <Input
                    id="api-url"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="Enter the API URL"
                  />
                  <p className="text-sm text-muted-foreground">
                    The URL for the backend API
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAPI}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Settings</CardTitle>
                <CardDescription>
                  Configure AI model and behavior settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Input
                    id="ai-model"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    placeholder="Enter the AI model name"
                  />
                  <p className="text-sm text-muted-foreground">
                    The AI model to use for chat completions (e.g., @cf/meta/llama-3-8b-instruct)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <textarea
                    id="system-prompt"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Enter the system prompt for the AI"
                  />
                  <p className="text-sm text-muted-foreground">
                    The system prompt that defines the AI's behavior and capabilities
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAI}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
