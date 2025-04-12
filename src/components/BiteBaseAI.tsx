import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

interface BiteBaseAIProps {
  className?: string;
}

export function BiteBaseAI({ className = "" }: BiteBaseAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your BiteBase AI Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
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
      // Prepare messages for Cloudflare AI
      const systemPrompt = "You are BiteBase AI, an intelligent assistant for restaurant owners and managers. You help with market research, location analysis, competitive analysis, and business strategy. Be concise, professional, and helpful.";

      const aiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: userMessage.role, content: userMessage.content }
      ];

      console.log('Sending request to backend with messages:', aiMessages);

      // Get the API URL from environment variables or use the default
      const apiUrl = import.meta.env.VITE_API_URL ?
        `${import.meta.env.VITE_API_URL}/cloudflare-ai/chat` :
        'https://bitebase-direct-backend.bitebase.workers.dev/cloudflare-ai/chat';

      console.log('Using API URL:', apiUrl);

      // Call our backend proxy to Cloudflare AI
      const response = await axios.post(apiUrl, {
        messages: aiMessages
      });

      console.log('Received response from backend:', response.data);

      // Extract the AI response
      const aiResponse = response.data.result?.response || "I'm sorry, I couldn't generate a response.";

      // Add AI response to chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      console.error('Error details:', error.response?.data || error.message);

      // Add a fallback AI response to the chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to my services right now. Please try again in a moment.",
          timestamp: new Date()
        }
      ]);

      // Show a toast notification
      toast({
        title: "Connection Issue",
        description: "There was a problem connecting to the AI service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className} overflow-hidden border-border/60`}>
      <CardHeader className="bg-muted/50 border-b border-border/30 py-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="bg-primary/10 p-1.5 rounded-md">
            <Bot className="h-4 w-4 text-primary" />
          </span>
          BiteBase AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[85%]">
                {message.role !== 'user' && (
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-secondary/10 text-secondary flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-3 py-2 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-primary/90 text-primary-foreground'
                      : 'bg-muted border border-border/40'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  {message.timestamp && (
                    <p className="text-[10px] opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[85%]">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-secondary/10 text-secondary flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted border border-border/40 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/30 p-3 bg-muted/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full gap-2 items-center"
        >
          <div className="relative flex-1">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="pr-10"
            />
            {input && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setInput('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            )}
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-9 w-9 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default BiteBaseAI;
