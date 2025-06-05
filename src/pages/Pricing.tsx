import React from 'react';
import { PricingPlans } from '@/components/PricingPlans';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Clock,
  HeadphonesIcon
} from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-8 w-8 text-blue-600" />,
    title: 'AI-Powered Intelligence',
    description: 'Advanced machine learning algorithms analyze your restaurant data to provide actionable insights and predictions.'
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" />,
    title: 'Predictive Analytics',
    description: 'Forecast revenue, demand, and trends with 95% accuracy using our proprietary forecasting models.'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    title: 'Real-time Monitoring',
    description: 'Monitor your restaurant performance in real-time with live dashboards and automated alerts.'
  },
  {
    icon: <Users className="h-8 w-8 text-orange-600" />,
    title: 'Multi-Platform Integration',
    description: 'Seamlessly connect with POS systems, social media, maps, and other business tools.'
  },
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: 'Enterprise Security',
    description: 'Bank-level security with encryption, compliance, and secure data handling for your business.'
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-600" />,
    title: 'Instant Insights',
    description: 'Get immediate recommendations and insights to optimize operations and increase profitability.'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Owner, Golden Dragon Restaurant',
    content: 'BiteBase Intelligence helped us increase revenue by 23% in just 3 months. The AI insights are incredible!',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'Operations Manager, Bella Vista Chain',
    content: 'The predictive analytics saved us thousands in inventory costs. We can now plan ahead with confidence.',
    rating: 5
  },
  {
    name: 'Jennifer Park',
    role: 'CEO, Urban Eats Group',
    content: 'Finally, a solution that understands restaurants. The ROI was evident within the first month.',
    rating: 5
  }
];

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'Start with a risk-free trial (3-7 days depending on plan). No credit card required for setup. Cancel anytime during the trial period.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
  },
  {
    question: 'What POS systems do you support?',
    answer: 'We support Square, Toast, Clover, and many others. Our team can help integrate custom POS systems as well.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption, comply with industry standards, and never share your data with third parties.'
  },
  {
    question: 'Do you offer custom integrations?',
    answer: 'Yes! Our Pro and Enterprise plans include custom integrations. Contact our team to discuss your specific needs.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer email support for Growth, priority support for Pro, and dedicated account management for Enterprise customers.'
  }
];

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            🚀 Transform Your Restaurant Business
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pricing That Scales With Your Success
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your restaurant. Start with a free trial and experience 
            the power of AI-driven business intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-500" />
              Free trial included
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              No setup fees
            </div>
            <div className="flex items-center">
              <HeadphonesIcon className="h-4 w-4 mr-2 text-green-500" />
              24/7 support
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BiteBase Intelligence?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with deep restaurant industry expertise 
              to deliver insights that drive real business results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Restaurant Owners Worldwide
            </h2>
            <p className="text-lg text-gray-600">
              See how BiteBase Intelligence is transforming restaurants of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about BiteBase Intelligence pricing and features.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of restaurant owners who are already using AI to grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://buy.stripe.com/cN23eSeqgfPVdi04go', '_blank')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;