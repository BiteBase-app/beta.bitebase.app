import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, User, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";
import cloudflareAI from "@/services/cloudflareAIService";
import cloudflareAIUtils from "@/utils/cloudflareAI";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface ChatBotProps {
  onClose?: () => void;
  initialMessage?: string;
  restaurantProfileId?: string;
  className?: string;
  title?: string;
  fullScreen?: boolean;
  useMockUser?: boolean;
}

export const ChatBot: React.FC<ChatBotProps> = ({
  onClose,
  initialMessage = "Hello! I'm your BiteBase AI Assistant. How can I help you with your restaurant analytics today?",
  restaurantProfileId,
  className = "",
  title = "BiteBase AI Assistant",
  fullScreen = false,
  useMockUser = true,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let aiResponse = "";

      // First try using our Cloudflare AI service
      try {
        console.log('Using Cloudflare AI service...');
        aiResponse = await cloudflareAI.createChatCompletionWithContext(
          messages.concat(userMessage).map(m => ({ role: m.role, content: m.content })),
          restaurantProfileId
        );
      } catch (serviceError) {
        console.error('Error with Cloudflare AI service:', serviceError);

        // Fallback to direct fetch using utility function
        console.log('Falling back to direct fetch using utility function...');
        aiResponse = await cloudflareAIUtils.createChatCompletionWithContext(
          messages.concat(userMessage).map(m => ({ role: m.role, content: m.content })),
          restaurantProfileId
        );
      }

      // Add AI response to chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from the assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Predefined questions
  const predefinedQuestions = [
    "Show me top location recommendations",
    "Analyze competitor pricing",
    "What are the current food trends?",
    "How can I improve my restaurant's profitability?",
    "What marketing strategies work best for restaurants?"
  ];

  const handlePredefinedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <Card className={`${fullScreen ? 'h-full w-full' : 'w-80 h-[500px]'} flex flex-col ${className}`}>
      <CardHeader className="p-4 bg-primary text-white flex justify-between items-center">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-primary-foreground/20 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback className="bg-green-500 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-primary text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && !isLoading && (
          <div className="p-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
            <div className="space-y-2">
              {predefinedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-sm h-auto py-2"
                  size="sm"
                  onClick={() => handlePredefinedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t border-border">
        <div className="flex items-center w-full">
          <Input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="ml-2"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBot;
