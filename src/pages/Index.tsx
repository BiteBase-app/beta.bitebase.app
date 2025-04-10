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
  Users 
} from "lucide-react";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { Features } from "@/components/sections/Features";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-bitebase-green-100 blur-3xl"></div>
          <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-bitebase-yellow-100 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="mb-4">
                <div className="inline-block rounded-full bg-bitebase-green-50 px-3 py-1 text-sm font-medium text-bitebase-green-700">
                  Introducing BiteBase Intelligence
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                <span className="block">Data-Driven</span>
                <span className="block text-gradient bg-gradient-to-r from-primary to-secondary">Restaurant Success</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Harness the power of AI to analyze markets, optimize locations, and outperform competitors with BiteBase Intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="px-8 py-6 text-base font-medium">
                  <Link to="/restaurant-setup">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base font-medium">
                  <a href="#demo">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </a>
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                Trusted by 5,000+ restaurants worldwide
                <span className="text-primary ml-2 flex items-center space-x-1 mt-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-gray-700 ml-1">4.8/5</span>
                </span>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden">
                <img 
                  className="w-full h-auto rounded-lg" 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Restaurant analytics dashboard" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-lg font-medium text-white">See it in action</h3>
                  <p className="text-sm text-gray-300 mb-2">Our AI-powered dashboard gives you real-time insights</p>
                  <Button variant="secondary" size="sm" asChild className="mt-2">
                    <a href="#demo" className="flex items-center">
                      Watch demo <Play className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">87%</h3>
              <p className="mt-2 text-sm text-gray-500">Increase in success rate</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10 text-secondary mb-4">
                <Store className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">5,000+</h3>
              <p className="mt-2 text-sm text-gray-500">Restaurants using our platform</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-bitebase-green-100 text-bitebase-green-600 mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">$1.2M</h3>
              <p className="mt-2 text-sm text-gray-500">Average revenue increase</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">40h</h3>
              <p className="mt-2 text-sm text-gray-500">Saved per month on research</p>
            </div>
          </div>
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
