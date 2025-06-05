import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown, Rocket, Building2, Sparkles, ArrowRight, Shield, Clock } from "lucide-react";
import { useTier, TierLevel } from "@/contexts/TierContext";
import { useToast } from "@/hooks/use-toast";
import { StripePaymentButton } from "@/components/StripePaymentButton";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PricingTierProps {
  title: string;
  price: string;
  priceInCents: number;
  description: string;
  features: string[];
  tierLevel: TierLevel;
  popular?: boolean;
  buttonText?: string;
  icon?: React.ComponentType<any>;
  gradient?: string;
  badge?: string;
  originalPrice?: string;
  savings?: string;
}

const PricingTier = ({
  title,
  price,
  priceInCents,
  description,
  features,
  tierLevel,
  popular,
  buttonText = "Start Free Trial",
  icon: Icon = Zap,
  gradient = "from-gray-50 to-white",
  badge,
  originalPrice,
  savings
}: PricingTierProps) => {
  const { currentTier, setCurrentTier } = useTier();
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (tierLevel === "enterprise" || tierLevel === "franchise") {
      toast({
        title: "Contact Sales",
        description: "Please contact our sales team for Enterprise or Franchise plans.",
        duration: 5000,
      });
      return;
    }

    if (tierLevel === "free") {
      setCurrentTier(tierLevel);
      toast({
        title: "Free Trial Activated",
        description: "You are now on the Free Trial plan.",
        duration: 3000,
      });
    }
  };

  const isCurrentTier = currentTier === tierLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className={`
        ${popular ? "border-2 border-emerald-500 shadow-2xl scale-105" : "border border-gray-200 shadow-lg"} 
        flex flex-col h-full relative overflow-hidden bg-gradient-to-br ${gradient}
        hover:shadow-2xl transition-all duration-300
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-600"></div>
        </div>

        {/* Popular Badge */}
        {popular && (
          <div className="absolute -top-1 -right-1">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-bl-2xl rounded-tr-2xl text-sm font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Most Popular
            </div>
          </div>
        )}

        {/* Current Plan Badge */}
        {isCurrentTier && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Star className="h-3 w-3 mr-1" />
              Current Plan
            </Badge>
          </div>
        )}

        {/* Special Badge */}
        {badge && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
              {badge}
            </Badge>
          </div>
        )}

        <CardHeader className="pb-6 pt-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${
              popular ? "from-emerald-500 to-teal-500" : "from-gray-400 to-gray-500"
            } text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              {originalPrice && (
                <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
              )}
              <span className="text-5xl font-bold text-gray-900">{price}</span>
              {price !== "Free" && <span className="text-gray-500 text-lg">/month</span>}
            </div>
            {savings && (
              <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <Sparkles className="h-3 w-3" />
                Save {savings}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-grow relative z-10">
          <ul className="space-y-4">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-emerald-600" />
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-6 relative z-10">
          {isCurrentTier ? (
            <Button className="w-full" disabled>
              <Star className="h-4 w-4 mr-2" />
              Current Plan
            </Button>
          ) : tierLevel === "free" ? (
            <Button
              className={`w-full group ${
                popular 
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" 
                  : ""
              }`}
              onClick={handleSubscribe}
              size="lg"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : tierLevel === "enterprise" || tierLevel === "franchise" ? (
            <Button
              className="w-full group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={handleSubscribe}
              size="lg"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="w-full">
              <StripePaymentButton
                productName={`${title} Plan Subscription`}
                amount={priceInCents}
                buttonText={
                  <div className="flex items-center justify-center gap-2">
                    {buttonText}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                }
              />
            </div>
          )}
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
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
      icon: Zap,
      gradient: "from-blue-50 to-indigo-50",
      features: [
        "14-day access to ALL features",
        "AI market analysis",
        "Location intelligence",
        "Competitor tracking (up to 5)",
        "Basic reporting",
        "Email support",
        "No credit card required",
        "Cancel anytime"
      ],
      buttonText: "Start Free Trial"
    },
    {
      title: "Growth",
      price: "$49",
      originalPrice: "$79",
      priceInCents: 4900,
      description: "Perfect for single locations",
      tierLevel: "growth" as TierLevel,
      icon: Rocket,
      gradient: "from-emerald-50 to-teal-50",
      popular: true,
      savings: "38%",
      badge: "Most Popular",
      features: [
        "1 restaurant location",
        "AI-powered market analysis",
        "Competitor tracking (up to 10)",
        "Location optimization tools",
        "Customer behavior insights",
        "Menu performance analytics",
        "Priority email support (24h)",
        "6 months historical data",
        "Custom reports & dashboards",
        "Mobile app access"
      ],
      buttonText: "Start Free Trial"
    },
    {
      title: "Professional",
      price: "$149",
      originalPrice: "$199",
      priceInCents: 14900,
      description: "For multi-location restaurants",
      tierLevel: "pro" as TierLevel,
      icon: Crown,
      gradient: "from-purple-50 to-pink-50",
      savings: "25%",
      features: [
        "Up to 5 restaurant locations",
        "Unlimited competitor tracking",
        "Advanced predictive analytics",
        "Real-time market monitoring",
        "Custom AI model training",
        "Phone & chat support",
        "2 years historical data",
        "White-label reporting",
        "API access & webhooks",
        "Dedicated account manager"
      ],
      buttonText: "Start Free Trial"
    },
    {
      title: "Enterprise",
      price: "Custom",
      priceInCents: 0,
      description: "For franchises & large chains",
      tierLevel: "franchise" as TierLevel,
      icon: Building2,
      gradient: "from-gray-50 to-slate-50",
      features: [
        "Unlimited locations & users",
        "Custom AI model development",
        "Enterprise-grade security",
        "24/7 dedicated support",
        "On-premise deployment",
        "Custom integrations",
        "Franchise management suite",
        "Custom training & onboarding",
        "SLA guarantees",
        "Priority feature development"
      ],
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50" id="pricing">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Limited Time - Save up to 38% on Annual Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start with a <span className="font-semibold text-emerald-600">completely free 14-day trial</span> of all features. 
            No credit card required. Choose your plan after you see the results.
          </p>
          
          {/* Clear Trial Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How Our Free Trial Works</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>✓ Access ALL features for 14 days</p>
              <p>✓ No credit card required to start</p>
              <p>✓ Choose your plan only after you see results</p>
              <p>✓ Cancel anytime during or after trial</p>
            </div>
          </div>
          
          {/* Value Proposition */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>No setup fees</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <PricingTier {...tier} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA and Trust Signals */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Not sure which plan is right for you?
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI experts will analyze your business needs and recommend the perfect plan. 
              Book a free 15-minute consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                Book Free Consultation
              </Button>
              <Button variant="outline" size="lg">
                Compare All Features
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Enterprise Security</h4>
              <p className="text-sm text-gray-600">SOC 2 certified with bank-level encryption</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Quick Setup</h4>
              <p className="text-sm text-gray-600">Get started in under 5 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Proven Results</h4>
              <p className="text-sm text-gray-600">87% average revenue increase</p>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Questions? Contact our sales team at{" "}
            <a href="mailto:sales@bitebase.app" className="text-emerald-600 hover:underline font-medium">
              sales@bitebase.app
            </a>{" "}
            or call{" "}
            <a href="tel:+1-555-BITEBASE" className="text-emerald-600 hover:underline font-medium">
              +1 (555) BITE-BASE
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
