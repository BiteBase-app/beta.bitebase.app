
import { FeatureCard } from "@/components/ui/feature-card";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Map, TrendingUp, Users, Building, DollarSign, BarChart } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-bitebase-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GradientHeading as="h2" className="mb-4">
            Powerful Location Intelligence Features
          </GradientHeading>
          <p className="text-lg text-gray-600 mx-auto max-w-2xl">
            Everything you need to make data-driven decisions for your restaurant expansion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Map}
            title="Location Analysis"
            description="Analyze foot traffic, accessibility, and neighborhood dynamics for potential locations."
          />
          
          <FeatureCard
            icon={Users}
            title="Demographic Insights"
            description="Understand the local population, income levels, and dining preferences in your target areas."
          />
          
          <FeatureCard
            icon={Building}
            title="Competitor Mapping"
            description="Identify nearby competitors, their performance, and market saturation levels."
          />
          
          <FeatureCard
            icon={TrendingUp}
            title="Growth Forecasting"
            description="Project revenue potential based on location factors and market trends."
          />
          
          <FeatureCard
            icon={DollarSign}
            title="Investment Analysis"
            description="Evaluate rent costs, renovation needs, and expected ROI for each location."
          />
          
          <FeatureCard
            icon={BarChart}
            title="Performance Tracking"
            description="Monitor how your locations perform against predictions over time."
          />
        </div>
      </div>
    </section>
  );
}
