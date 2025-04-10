
import React from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Users,
  DollarSign,
  LineChart,
  Target,
  Coffee,
  BarChart3,
  PieChart,
  Calendar,
  ShoppingCart,
  Megaphone,
  Mail,
  Star,
  Settings,
  Database
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TierRestriction } from "@/components/TierRestriction";
import { TierLevel } from "@/contexts/TierContext";

const FEATURE_CATEGORIES = [
  {
    id: "analytics",
    label: "Analytics",
    description: "Comprehensive data insights for your restaurant business",
    features: [
      {
        title: "Dashboard & Overview",
        icon: BarChart3,
        items: [
          "Performance Dashboard - Real-time overview of key metrics",
          "Sales Overview - Comprehensive sales data and trends",
          "Revenue Forecasting - Projected revenue based on historical data",
          "Business KPIs - Key performance indicators tracking",
          "Custom Reports - Tailored reporting solutions",
          "Data Visualization - Interactive charts and graphs"
        ],
        requiredTier: "free" as TierLevel
      },
      {
        title: "Location Intelligence",
        icon: MapPin,
        items: [
          "Interactive Location Map - Visual representation of restaurant location",
          "Competitor Tracking - Monitor nearby competitors",
          "Demographic Analysis - Understand local population demographics",
          "Foot Traffic Analysis - Analyze pedestrian patterns",
          "Real Estate Metrics - Property values and location analytics"
        ],
        requiredTier: "free" as TierLevel
      },
      {
        title: "Menu Performance",
        icon: Coffee,
        items: [
          "Menu Item Analytics - Track performance of individual items",
          "Profitability Analysis - Calculate profit margins for each item",
          "Cost Analysis - Breakdown of ingredient and production costs",
          "Popularity Metrics - Track most and least popular items",
          "Menu Engineering - Categorize items by profitability and popularity"
        ],
        requiredTier: "growth" as TierLevel
      },
      {
        title: "Customer Analytics",
        icon: Users,
        items: [
          "Customer Segmentation - Group customers by behavior",
          "Spending Patterns - Analyze how different customer groups spend",
          "Visit Frequency - Track how often customers return",
          "Loyalty Analysis - Identify and analyze your most loyal customers",
          "Sentiment Analysis - Track customer sentiment over time"
        ],
        requiredTier: "growth" as TierLevel
      }
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Tools to promote your restaurant and engage customers",
    features: [
      {
        title: "Campaign Management",
        icon: Megaphone,
        items: [
          "Campaign Creation - Design marketing campaigns with specific goals",
          "Campaign Analytics - Track performance of marketing initiatives",
          "ROI Tracking - Measure return on investment for marketing efforts",
          "A/B Testing - Compare different marketing approaches",
          "Campaign Calendar - Schedule and visualize marketing activities"
        ],
        requiredTier: "growth" as TierLevel
      },
      {
        title: "Promotion Management",
        icon: ShoppingCart,
        items: [
          "Promotion Effectiveness - Analyze impact of promotions on revenue",
          "Discount Analysis - Measure the effectiveness of different discounts",
          "Special Offers Creation - Design and implement special offers",
          "Promotion Scheduling - Time-based promotion planning",
          "Promotion ROI - Calculate return on investment for each promotion"
        ],
        requiredTier: "pro" as TierLevel
      },
      {
        title: "Marketing Channels",
        icon: Mail,
        items: [
          "Social Media Integration - Connect with social media platforms",
          "Email Marketing - Create and send targeted email campaigns",
          "Local Marketing - Tools for neighborhood-focused marketing",
          "Digital Advertising - Track performance of digital ad campaigns",
          "Cross-Channel Analysis - Compare performance across channels"
        ],
        requiredTier: "pro" as TierLevel
      }
    ]
  },
  {
    id: "management",
    label: "Management",
    description: "Tools to manage your restaurant operations efficiently",
    features: [
      {
        title: "Restaurant Profile",
        icon: Settings,
        items: [
          "Restaurant Details - Manage basic restaurant information",
          "Business Settings - Configure operating hours, service types, etc.",
          "Menu Management - Digital menu creation and management",
          "Location Settings - Manage address and geographic information",
          "Brand Assets - Store and manage logos and brand materials"
        ],
        requiredTier: "free" as TierLevel
      },
      {
        title: "Team Management",
        icon: Users,
        items: [
          "Staff Profiles - Manage employee information",
          "Role-Based Permissions - Control access based on job roles",
          "Performance Tracking - Monitor staff sales and performance",
          "Scheduling Integration - Connect with staff scheduling systems"
        ],
        requiredTier: "growth" as TierLevel
      },
      {
        title: "Data Management",
        icon: Database,
        items: [
          "Sales Data Import - Import transaction data from POS systems",
          "CSV Import/Export - Easy data transfer via spreadsheets",
          "Manual Data Entry - Forms for entering data manually",
          "Historical Data - Access to past performance data",
          "Trend Comparison - Compare current performance with past periods"
        ],
        requiredTier: "pro" as TierLevel
      },
      {
        title: "Integrations",
        icon: Star,
        items: [
          "POS Integration - Connect with point-of-sale systems",
          "Accounting Software - Link with financial management tools",
          "Reservation Systems - Integrate with booking platforms",
          "Delivery Platforms - Connect with food delivery services",
          "API Access - Custom integrations (Enterprise tier)"
        ],
        requiredTier: "enterprise" as TierLevel
      }
    ]
  }
];

export function FeatureList() {
  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-12">
          <h2 className="text-base font-semibold uppercase tracking-wide text-bite-600">
            Complete Feature Set
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to grow your restaurant business
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            BiteBase provides comprehensive tools for analytics, marketing, and management
            tailored to your restaurant's needs.
          </p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {FEATURE_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {FEATURE_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <p className="text-muted-foreground mb-8 text-lg max-w-3xl mx-auto text-center">
                {category.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.features.map((feature, index) => (
                  <TierRestriction 
                    key={index} 
                    requiredTier={feature.requiredTier}
                    fallback={
                      <Card className="h-full opacity-70 border-dashed">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground">
                              <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                                {feature.title}
                                <span className="text-xs font-normal px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                  {feature.requiredTier.charAt(0).toUpperCase() + feature.requiredTier.slice(1)}+
                                </span>
                              </h3>
                              <ul className="mt-2 space-y-1 text-sm text-muted-foreground/70">
                                {feature.items.map((item, i) => (
                                  <li key={i} className="opacity-60">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    }
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-bite-100 text-bite-600">
                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              {feature.items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TierRestriction>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default FeatureList;
