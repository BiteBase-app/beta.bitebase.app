import React from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import BiteBaseAI from "@/components/BiteBaseAI";

const BiteBaseAIPage = () => {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <h1 className="text-2xl font-medium">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground mb-6 ml-9">
          Chat with your AI assistant powered by Cloudflare AI
        </p>

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          <BiteBaseAI />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BiteBaseAIPage;
