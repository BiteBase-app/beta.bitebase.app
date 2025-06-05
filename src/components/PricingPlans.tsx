import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Building2, MapPin } from 'lucide-react';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyLink: string;
  yearlyLink: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  trialDays: number;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Growth',
    description: 'Perfect for growing restaurants',
    monthlyPrice: 14.99,
    yearlyPrice: 9.99,
    monthlyLink: 'https://buy.stripe.com/cN23eSeqgfPVdi04go',
    yearlyLink: 'https://buy.stripe.com/cN23eSeqgfPVdi04go',
    trialDays: 7,
    icon: <Zap className="h-6 w-6" />,
    features: [
      'Restaurant Brain AI insights',
      'Basic POS integration',
      'Real-time monitoring',
      'Monthly reports',
      'Email support',
      'Up to 1 location',
      'Basic forecasting',
      'Social media analytics'
    ]
  },
  {
    name: 'Pro',
    description: 'Advanced features for established restaurants',
    monthlyPrice: 109,
    yearlyPrice: 89,
    monthlyLink: 'https://buy.stripe.com/fZe2aO5TKavBa5OaEN',
    yearlyLink: 'https://buy.stripe.com/fZe2aO5TKavBa5OaEN',
    trialDays: 7,
    popular: true,
    icon: <Star className="h-6 w-6" />,
    features: [
      'Everything in Growth',
      'Advanced AI research engine',
      'Multi-POS integration',
      'Google Maps intelligence',
      'Competitor tracking',
      'Advanced forecasting',
      'Procurement optimization',
      'Daily/weekly reports',
      'Priority support',
      'Up to 3 locations',
      'Custom integrations',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Complete solution for restaurant chains',
    monthlyPrice: 599,
    yearlyPrice: 499,
    monthlyLink: 'https://buy.stripe.com/fZeg1EfukgTZ3Hq28i',
    yearlyLink: 'https://buy.stripe.com/fZeg1EfukgTZ3Hq28i',
    trialDays: 3,
    icon: <Building2 className="h-6 w-6" />,
    features: [
      'Everything in Pro',
      'Unlimited locations',
      'White-label solution',
      'Custom AI models',
      'Advanced analytics',
      'Real-time alerts',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'Advanced security',
      'Custom reporting',
      'Training & onboarding'
    ]
  }
];

const addOnServices = [
  {
    name: 'Extra Location',
    description: 'Add additional restaurant locations',
    price: 5,
    link: 'https://buy.stripe.com/aEUbLo4PG3390veaEL',
    icon: <MapPin className="h-5 w-5" />
  }
];

export const PricingPlans: React.FC = () => {
  const handleSubscribe = (link: string, planName: string, billing: 'monthly' | 'yearly') => {
    // Track subscription attempt
    console.log(`Subscribing to ${planName} - ${billing} billing`);
    
    // Open Stripe checkout
    window.open(link, '_blank');
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12;
    const yearlyCost = yearly * 12;
    const savings = monthlyCost - yearlyCost;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Restaurant Intelligence Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your restaurant with AI-powered insights, real-time monitoring, and predictive analytics.
          Start with a free trial and scale as you grow.
        </p>
      </div>

      {/* Main Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan) => {
          const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);
          
          return (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center space-y-2">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      ${plan.monthlyPrice}
                      <span className="text-lg font-normal text-gray-600">/month</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      or ${plan.yearlyPrice}/month billed annually
                    </div>
                    {savings.percentage > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {savings.percentage}% with annual billing
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-blue-600 font-medium">
                    {plan.trialDays} days free trial
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="space-y-3">
                <Button
                  onClick={() => handleSubscribe(plan.monthlyLink, plan.name, 'monthly')}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Start {plan.trialDays}-Day Free Trial
                </Button>
                
                {savings.percentage > 0 && (
                  <Button
                    onClick={() => handleSubscribe(plan.yearlyLink, plan.name, 'yearly')}
                    variant="ghost"
                    className="w-full text-sm"
                  >
                    Choose Annual (Save {savings.percentage}%)
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Add-on Services */}
      <div className="border-t pt-12">
        <h3 className="text-2xl font-bold text-center mb-8">Add-on Services</h3>
        <div className="max-w-md mx-auto">
          {addOnServices.map((addon) => (
            <Card key={addon.name} className="mb-4">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">
                    {addon.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{addon.name}</h4>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">${addon.price}/month</div>
                  <Button
                    onClick={() => window.open(addon.link, '_blank')}
                    size="sm"
                    variant="outline"
                  >
                    Add Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ or Additional Info */}
      <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Need a custom solution?</h4>
        <p className="text-gray-600 mb-4">
          Contact our sales team for custom pricing and enterprise features tailored to your restaurant chain.
        </p>
        <Button variant="outline">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default PricingPlans;