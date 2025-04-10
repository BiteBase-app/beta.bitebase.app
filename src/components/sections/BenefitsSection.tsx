
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Clock, Star, TrendingUp, Users, DollarSign, ShieldCheck } from "lucide-react";

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bitebase-green-100">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export function BenefitsSection() {
  const benefits = [
    {
      icon: <TrendingUp className="h-5 w-5 text-bitebase-green-600" />,
      title: "Data-Driven Decisions",
      description: "Make informed choices based on comprehensive market research and analytics."
    },
    {
      icon: <Clock className="h-5 w-5 text-bitebase-green-600" />,
      title: "Save Valuable Time",
      description: "Eliminate weeks of manual research with our automated analysis tools."
    },
    {
      icon: <DollarSign className="h-5 w-5 text-bitebase-green-600" />,
      title: "Maximize ROI",
      description: "Choose the right location and concept to maximize your return on investment."
    },
    {
      icon: <Users className="h-5 w-5 text-bitebase-green-600" />,
      title: "Understand Your Audience",
      description: "Gain deep insights into customer demographics and preferences."
    },
    {
      icon: <Star className="h-5 w-5 text-bitebase-green-600" />,
      title: "Competitive Edge",
      description: "Stay ahead of competitors with actionable intelligence and market gaps."
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-bitebase-green-600" />,
      title: "Reduce Risk",
      description: "Minimize business risks with thorough location and market validation."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GradientHeading as="h2" className="mb-4">
            Why Choose BiteBase Intelligence
          </GradientHeading>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform helps restaurant entrepreneurs and operators make smarter decisions with data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitItem 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
