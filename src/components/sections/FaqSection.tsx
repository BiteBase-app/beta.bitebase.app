
import { useState } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-bitebase-green-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pr-12">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What type of businesses does BiteBase Intelligence support?",
      answer: "BiteBase Intelligence is designed for all food service businesses, including independent restaurants, franchises, food trucks, cafes, and ghost kitchens. Our platform is flexible enough to support businesses at any stage, from concept development to expansion."
    },
    {
      question: "How accurate is your location analytics data?",
      answer: "Our data comes from multiple trusted sources, including public records, mobile location data, consumer surveys, and proprietary algorithms. We regularly validate our data against actual business outcomes to ensure accuracy rates above 85% for most predictions."
    },
    {
      question: "Can I analyze multiple potential locations at once?",
      answer: "Yes! Our Growth and Pro plans allow you to analyze and compare multiple locations simultaneously. You can save location analyses and compare them side-by-side to make the optimal site selection decision."
    },
    {
      question: "Do you provide data on foot traffic patterns?",
      answer: "Absolutely. Our platform offers detailed foot traffic analysis including hourly patterns, weekday vs. weekend comparisons, and seasonal trends. This helps you understand exactly when your potential customers are in the area."
    },
    {
      question: "How often is your market data updated?",
      answer: "Most of our market data is updated monthly, while some specialized datasets like consumer spending patterns are updated quarterly. Our demographic data is refreshed annually with the latest census and survey information."
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GradientHeading as="h2" className="mb-4">
            Frequently Asked Questions
          </GradientHeading>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about BiteBase Intelligence
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
