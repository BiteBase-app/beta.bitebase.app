import React from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import BiteBaseAI from "@/components/BiteBaseAI";

const BiteBaseAIPage = () => {
  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">BiteBase AI Assistant</h1>
            <p className="text-muted-foreground">
              Chat with your AI assistant powered by Cloudflare AI
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <BiteBaseAI />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BiteBaseAIPage;
