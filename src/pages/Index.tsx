import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BarChart2, 
  ChevronDown, 
  Clock, 
  Clipboard, 
  DollarSign, 
  Download, 
  MapPin, 
  Play, 
  Star, 
  Store, 
  Users,
  TrendingUp,
  Shield,
  Zap,
  Award,
  Target,
  Brain,
  Globe,
  CheckCircle
} from "lucide-react";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { Features } from "@/components/sections/Features";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BiteBaseLogo } from "@/components/ui/BiteBaseLogo";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>BiteBase Intelligence - AI-Powered Restaurant Analytics & Location Intelligence</title>
        <meta name="description" content="Transform your restaurant business with AI-driven market analysis, competitor insights, and location intelligence. Increase revenue by 87% with data-driven decisions. Start your free trial today." />
        <meta name="keywords" content="restaurant analytics, AI restaurant intelligence, location analysis, competitor tracking, restaurant market research" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-200 to-teal-200 blur-3xl opacity-70"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 blur-3xl opacity-70"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 h-60 w-60 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 blur-3xl opacity-50"
            animate={{ 
              y: [-20, 20, -20],
              x: [-10, 10, -10]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <motion.div 
              className="lg:col-span-6 flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-200">
                  <Brain className="h-4 w-4" />
                  AI-Powered Restaurant Intelligence
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="block text-gray-900">Transform Your</span>
                <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Restaurant Empire
                </span>
                <span className="block text-gray-900 text-3xl md:text-4xl lg:text-5xl mt-2">
                  with AI Intelligence
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Harness cutting-edge AI to analyze markets, predict trends, optimize locations, and outperform competitors. 
                <span className="font-semibold text-emerald-600"> Join 5,000+ restaurants increasing revenue by 87%</span> with data-driven decisions.
              </motion.p>

              {/* Key Benefits */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">14-day free trial</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">No credit card required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">24/7 AI insights</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button asChild size="lg" className="px-8 py-6 text-base font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/signup" className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Start Free Trial Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base font-medium border-2 hover:bg-gray-50 transition-all duration-300">
                  <a href="#demo" className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Watch 2-Min Demo
                  </a>
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-sm text-gray-500">
                  <div className="font-medium text-gray-700 mb-1">Trusted by 5,000+ restaurants</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">4.8/5</span>
                    <span className="text-gray-500">• 2,847 reviews</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-12 lg:mt-0 lg:col-span-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative mx-auto w-full">
                <motion.div 
                  className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    className="w-full h-auto rounded-2xl" 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80" 
                    alt="BiteBase Intelligence AI-powered restaurant analytics dashboard showing market analysis, competitor insights, and location intelligence" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Floating Stats Cards */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium">+87% Revenue</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="absolute top-20 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">AI Predictions</span>
                    </div>
                  </motion.div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">See AI Intelligence in Action</h3>
                    <p className="text-sm text-gray-200 mb-4">Real-time market analysis, competitor tracking, and location optimization powered by advanced AI algorithms.</p>
                    <Button variant="secondary" size="sm" asChild className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                      <a href="#demo" className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Watch Interactive Demo
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </section>
      
      {/* Enhanced Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Results That Speak for Themselves
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful restaurants already using BiteBase Intelligence to transform their business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">87%</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Revenue Increase</p>
              <p className="text-xs text-gray-500">Within first 6 months</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 mb-6">
                <Store className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Restaurants</p>
              <p className="text-xs text-gray-500">Across 50+ countries</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 mb-6">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">$2.4M</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Revenue Generated</p>
              <p className="text-xs text-gray-500">Per restaurant annually</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">Time Saved on Research</p>
              <p className="text-xs text-gray-500">40+ hours per month</p>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 mb-6">Trusted by leading restaurant brands worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Industry Leader 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Global Coverage</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section Header */}
      <section id="features">
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center mb-12">
            <div className="inline-block text-primary text-sm font-semibold tracking-wide uppercase mb-2">Features</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need to succeed</h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
              Our platform provides comprehensive tools to analyze every aspect of your restaurant business.
            </p>
          </div>
        </div>
      </section>
      
      <Features />
      

      
      {/* Imported Components with proper IDs */}
      <div id="how-it-works">
        <BenefitsSection />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <CallToAction />
    </Layout>
  );
};

export default Index;
