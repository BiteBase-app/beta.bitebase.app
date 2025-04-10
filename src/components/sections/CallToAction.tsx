
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { StripePaymentButton } from "@/components/StripePaymentButton";

const features = [
  "Location analysis",
  "Market research",
  "Consumer insights",
  "Competitive analysis",
  "Revenue projections",
  "Menu optimization",
  "Marketing strategy",
  "Unlimited reports",
];

export function CallToAction() {
  return (
    <div className="bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start making data-driven decisions today
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of successful restaurant owners who use BiteBaseAI to gain a competitive edge.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-lg">
          <Card className="shadow-lg shadow-bite-900/5 relative glass">
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-bite-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <CardContent className="p-8">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Professional</h3>
                  <p className="text-muted-foreground">For restaurant entrepreneurs</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-foreground">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-bite-600 mr-3" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <StripePaymentButton
                productName="Professional Plan"
                amount={19900}
                buttonText="Start Free Trial"
                className="mt-8 w-full"
              />
              <p className="mt-3 text-sm text-center text-muted-foreground">
                No credit card required. 14-day free trial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
