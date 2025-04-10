
import React from 'react';
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ActivitySquare } from "lucide-react";
import { IntegrationsHeader } from "@/components/integrations/IntegrationsHeader";
import { CognitiveServicesTab } from "@/components/integrations/CognitiveServicesTab";
import { AutomationTab } from "@/components/integrations/AutomationTab";

const Integrations = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <IntegrationsHeader />

        <Tabs defaultValue="services" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">
              <Brain className="mr-2 h-4 w-4" />
              Cognitive Services
            </TabsTrigger>
            <TabsTrigger value="automation">
              <ActivitySquare className="mr-2 h-4 w-4" />
              Automation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="mt-6">
            <CognitiveServicesTab />
          </TabsContent>
          
          <TabsContent value="automation" className="mt-6">
            <AutomationTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Integrations;
