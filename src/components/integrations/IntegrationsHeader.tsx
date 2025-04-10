
import React from 'react';
import { GradientHeading } from "@/components/ui/gradient-heading";

export const IntegrationsHeader = () => {
  return (
    <div className="mb-12 text-center">
      <GradientHeading as="h1" className="mb-4">
        Mind Enhancement Services
      </GradientHeading>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Unlock your cognitive potential with our premium services and digital solutions.
      </p>
    </div>
  );
};

export default IntegrationsHeader;
