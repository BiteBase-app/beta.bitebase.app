import React, { useState } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StandaloneChatbot } from "@/components/StandaloneChatbot";
import { config } from "@/config";

const ChatbotDemo = () => {
  const [chatbotConfig, setChatbotConfig] = useState({
    apiUrl: config.chatbotUrl,
    initialMessage: "Hello! I'm your BiteBase AI Assistant. How can I help you with your restaurant analytics today?",
    title: "BiteBase AI Assistant",
    primaryColor: "#4f46e5",
    secondaryColor: "#818cf8",
    position: "bottom-right",
    width: "350px",
    height: "500px",
  });

  const [embedCode, setEmbedCode] = useState('');

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChatbotConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePositionChange = (position: string) => {
    setChatbotConfig(prev => ({
      ...prev,
      position
    }));
  };

  const generateEmbedCode = () => {
    const code = `
<!-- BiteBase AI Chatbot -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.bitebase.ai/chatbot/v1/standalone.js"></script>
<div id="bitebase-chatbot"></div>
<script>
  BiteBaseChatbot.init({
    apiUrl: "${chatbotConfig.apiUrl}",
    initialMessage: "${chatbotConfig.initialMessage}",
    title: "${chatbotConfig.title}",
    primaryColor: "${chatbotConfig.primaryColor}",
    secondaryColor: "${chatbotConfig.secondaryColor}",
    position: "${chatbotConfig.position}",
    width: "${chatbotConfig.width}",
    height: "${chatbotConfig.height}",
    containerId: "bitebase-chatbot"
  });
</script>
`;
    setEmbedCode(code);
  };

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Chatbot Integration</h1>
            <p className="text-muted-foreground">Configure and embed the BiteBase AI Chatbot on your website</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Chatbot Configuration</CardTitle>
                <CardDescription>Customize the appearance and behavior of your chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="appearance">
                  <TabsList className="mb-4">
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="appearance">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Chatbot Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={chatbotConfig.title}
                          onChange={handleConfigChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="primaryColor"
                            name="primaryColor"
                            value={chatbotConfig.primaryColor}
                            onChange={handleConfigChange}
                          />
                          <div 
                            className="w-10 h-10 rounded-md border"
                            style={{ backgroundColor: chatbotConfig.primaryColor }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          name="width"
                          value={chatbotConfig.width}
                          onChange={handleConfigChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          name="height"
                          value={chatbotConfig.height}
                          onChange={handleConfigChange}
                        />
                      </div>

                      <div className="space-y-2 col-span-2">
                        <Label>Position</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={chatbotConfig.position === "bottom-right" ? "default" : "outline"}
                            onClick={() => handlePositionChange("bottom-right")}
                          >
                            Bottom Right
                          </Button>
                          <Button
                            variant={chatbotConfig.position === "bottom-left" ? "default" : "outline"}
                            onClick={() => handlePositionChange("bottom-left")}
                          >
                            Bottom Left
                          </Button>
                          <Button
                            variant={chatbotConfig.position === "top-right" ? "default" : "outline"}
                            onClick={() => handlePositionChange("top-right")}
                          >
                            Top Right
                          </Button>
                          <Button
                            variant={chatbotConfig.position === "top-left" ? "default" : "outline"}
                            onClick={() => handlePositionChange("top-left")}
                          >
                            Top Left
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="behavior">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="initialMessage">Initial Message</Label>
                        <Input
                          id="initialMessage"
                          name="initialMessage"
                          value={chatbotConfig.initialMessage}
                          onChange={handleConfigChange}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiUrl">API URL</Label>
                        <Input
                          id="apiUrl"
                          name="apiUrl"
                          value={chatbotConfig.apiUrl}
                          onChange={handleConfigChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Button onClick={generateEmbedCode}>Generate Embed Code</Button>
                </div>

                {embedCode && (
                  <div className="mt-4">
                    <Label>Embed Code</Label>
                    <div className="relative mt-2">
                      <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
                        {embedCode}
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          navigator.clipboard.writeText(embedCode);
                          alert('Copied to clipboard!');
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See how your chatbot will appear</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] relative">
                <div className="absolute inset-0 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground text-center px-4">
                    The chatbot will appear in the {chatbotConfig.position.replace('-', ' ')} corner of your website.
                    <br /><br />
                    Click the chat button below to test it.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Render the actual chatbot with current configuration */}
      <StandaloneChatbot
        apiUrl={chatbotConfig.apiUrl}
        initialMessage={chatbotConfig.initialMessage}
        title={chatbotConfig.title}
        primaryColor={chatbotConfig.primaryColor}
        secondaryColor={chatbotConfig.secondaryColor}
        position={chatbotConfig.position as "bottom-right" | "bottom-left" | "top-right" | "top-left"}
        width={chatbotConfig.width}
        height={chatbotConfig.height}
      />
    </DashboardLayout>
  );
};

export default ChatbotDemo;
