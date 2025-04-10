import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { useTier, TierLevel } from "@/contexts/TierContext";
import { useToast } from "@/hooks/use-toast";
import { StripePaymentButton } from "@/components/StripePaymentButton";

interface PricingTierProps {
  title: string;
  price: string;
  priceInCents: number;
  description: string;
  features: string[];
  tierLevel: TierLevel;
  popular?: boolean;
  buttonText?: string;
}

const PricingTier = ({
  title,
  price,
  priceInCents,
  description,
  features,
  tierLevel,
  popular,
  buttonText = "Start Free Trial"
}: PricingTierProps) => {
  const { currentTier, setCurrentTier } = useTier();
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (tierLevel === "enterprise" || tierLevel === "franchise") {
      // For high-tier plans, we'll need sales contact
      toast({
        title: "Contact Sales",
        description: "Please contact our sales team for Enterprise or Franchise plans.",
        duration: 5000,
      });
      return;
    }

    // For free tier, just set it directly
    if (tierLevel === "free") {
      setCurrentTier(tierLevel);
      toast({
        title: "Free Trial Activated",
        description: "You are now on the Free Trial plan.",
        duration: 3000,
      });
    }

    // Other tiers handled by StripePaymentButton through the payment flow
  };

  const isCurrentTier = currentTier === tierLevel;

  return (
    <Card className={`${popular ? "border-bite-500 shadow-lg" : ""} flex flex-col h-full relative glass mx-auto max-w-sm w-full`}>
      {popular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 bg-bite-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      {isCurrentTier && (
        <div className="absolute top-0 left-0 -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Star className="h-3 w-3" /> Current Plan
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-bite-600 mr-3 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isCurrentTier ? (
          <Button className="w-full" disabled>
            Current Plan
          </Button>
        ) : tierLevel === "free" ? (
          <Button
            className={`w-full ${popular ? "bg-bite-600 hover:bg-bite-700" : ""}`}
            onClick={handleSubscribe}
          >
            {buttonText}
          </Button>
        ) : tierLevel === "enterprise" || tierLevel === "franchise" ? (
          <Button
            className={`w-full ${popular ? "bg-bite-600 hover:bg-bite-700" : ""}`}
            onClick={handleSubscribe}
          >
            Contact Sales
          </Button>
        ) : (
          <StripePaymentButton
            productName={`${title} Plan Subscription`}
            amount={priceInCents}
            buttonText={buttonText}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export function Pricing() {
  const tiers = [
    {
      title: "Free Trial",
      price: "Free",
      priceInCents: 0,
      description: "Try all features for 14 days",
      tierLevel: "free" as TierLevel,
      features: [
        "Full access to all features for 14 days",
        "Basic analytics dashboard",
        "Limited historical data",
        "Email support",
        "Single restaurant location"
      ],
      buttonText: "Start Free Trial"
    },
    {
      title: "Growth",
      price: "$14.99",
      priceInCents: 1499,
      description: "For new restaurants getting started",
      tierLevel: "growth" as TierLevel,
      features: [
        "Basic restaurant performance metrics",
        "Limited competitor tracking (up to 5)",
        "Basic menu performance tracking",
        "Simple campaign creation",
        "Basic customer segmentation",
        "Email support with 48-hour response",
        "3 months of historical data",
        "Single restaurant location"
      ],
      popular: true,
      buttonText: "Start Free Trial"
    },
    {
      title: "Pro",
      price: "$109",
      priceInCents: 10900,
      description: "For established restaurants",
      tierLevel: "pro" as TierLevel,
      features: [
        "Comprehensive performance metrics",
        "Track up to 15 competitors",
        "AI-powered menu recommendations",
        "Advanced campaign tools with A/B testing",
        "Detailed customer behavior analysis",
        "Priority email support (24-hour)",
        "1 year of historical data",
        "Automated weekly reports",
        "Single restaurant location"
      ],
      buttonText: "Start Free Trial"
    },
    {
      title: "Franchise",
      price: "$999",
      priceInCents: 99900,
      description: "For restaurant franchises",
      tierLevel: "franchise" as TierLevel,
      features: [
        "All Enterprise features",
        "Franchise management dashboard",
        "Unlimited restaurant locations",
        "Brand consistency monitoring",
        "Cross-location performance comparison",
        "Centralized menu management",
        "Franchise-wide analytics",
        "Location-specific customization",
        "Franchise growth planning tools"
      ],
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section className="py-16 bg-muted/50" id="pricing">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose the plan that's right for you</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            All plans start with a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-center mx-auto max-w-7xl">
          {tiers.map((tier, i) => (
            <PricingTier key={i} {...tier} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom solution? <a href="#" className="text-bite-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
