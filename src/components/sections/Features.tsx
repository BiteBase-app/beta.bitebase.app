
import { FeatureCard } from "@/components/ui/feature-card";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Map, TrendingUp, Users, Building, DollarSign, BarChart, Brain, Zap, Target, Shield, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Market Analysis",
      description: "Advanced machine learning algorithms analyze thousands of data points to predict market opportunities and risks with 95% accuracy.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Map,
      title: "Smart Location Intelligence",
      description: "Comprehensive location scoring based on foot traffic, demographics, accessibility, and 50+ other critical factors.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Deep Customer Insights",
      description: "Understand your target audience with detailed demographic analysis, spending patterns, and dining preferences.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Building,
      title: "Competitive Intelligence",
      description: "Real-time competitor tracking, performance analysis, and market positioning insights to stay ahead.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast revenue, customer flow, and market trends up to 24 months in advance with AI-driven predictions.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: DollarSign,
      title: "ROI Optimization",
      description: "Maximize your investment returns with detailed financial modeling and cost-benefit analysis tools.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Site Selection AI",
      description: "Our proprietary AI ranks and scores potential locations based on your specific business model and requirements.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: BarChart,
      title: "Real-Time Performance",
      description: "Monitor your locations' performance with live dashboards and automated alerts for key metrics.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get actionable insights in seconds, not weeks. Our AI processes complex data instantly for immediate decision-making.",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="h-4 w-4" />
            AI-Powered Intelligence
          </div>
          <GradientHeading as="h2" className="mb-6 text-4xl md:text-5xl">
            Revolutionary Restaurant Intelligence Platform
          </GradientHeading>
          <p className="text-xl text-gray-600 mx-auto max-w-3xl leading-relaxed">
            Harness the power of artificial intelligence to make smarter decisions, reduce risks, and 
            <span className="font-semibold text-blue-600"> increase your success rate by 87%</span> with our comprehensive suite of tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                iconClassName={`bg-gradient-to-r ${feature.gradient} text-white`}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Value Props */}
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Leading Restaurants Choose BiteBase Intelligence
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful restaurants that have transformed their business with our AI-powered platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Enterprise-Grade Security</h4>
              <p className="text-gray-600">Bank-level encryption and SOC 2 compliance ensure your data is always protected.</p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Global Market Coverage</h4>
              <p className="text-gray-600">Access market intelligence for 50+ countries with localized insights and data.</p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">24/7 AI Monitoring</h4>
              <p className="text-gray-600">Continuous market monitoring with instant alerts for opportunities and threats.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
