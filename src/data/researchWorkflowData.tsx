
import {
  Building,
  BarChart2,
  Users,
  Briefcase,
  DollarSign,
  Target,
  PieChart,
} from "lucide-react";

export interface ResearchStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  items: string[];
}

export const newBusinessSteps: ResearchStep[] = [
  {
    id: "define",
    title: "Define Business Idea & Objectives",
    description: "Identify your core restaurant concept and goals",
    icon: Briefcase,
    items: [
      "Define your restaurant concept and cuisine type",
      "Identify target customers and dining experience",
      "Set measurable business objectives",
      "Research industry trends and regulations",
    ],
  },
  {
    id: "market",
    title: "Industry & Market Analysis",
    description: "Understand market size, trends, and competition",
    icon: BarChart2,
    items: [
      "Analyze local restaurant market size and growth trends",
      "Identify key industry drivers and seasonal factors",
      "Conduct SWOT analysis for your restaurant concept",
      "Research local food trends and customer preferences",
    ],
  },
  {
    id: "customer",
    title: "Customer Research & Segmentation",
    description: "Identify your ideal customers and their preferences",
    icon: Users,
    items: [
      "Create detailed customer personas for your target audience",
      "Segment customers by demographics, income, and dining habits",
      "Conduct surveys and interviews with potential customers",
      "Analyze dining preferences and frequency patterns",
    ],
  },
  {
    id: "competition",
    title: "Competitive Landscape & Positioning",
    description: "Analyze competitors and position your restaurant",
    icon: Target,
    items: [
      "Identify direct and indirect competitors in your area",
      "Analyze competitor menus, pricing, and positioning",
      "Conduct on-site visits to analyze customer experience",
      "Identify gaps in the market and opportunities",
    ],
  },
  {
    id: "pricing",
    title: "Menu & Pricing Strategy",
    description: "Develop your menu and pricing strategy",
    icon: DollarSign,
    items: [
      "Develop menu items based on target customer preferences",
      "Conduct food cost analysis and pricing strategy",
      "Test menu items with focus groups or soft openings",
      "Analyze profit margins and break-even points",
    ],
  },
  {
    id: "financial",
    title: "Financial Feasibility & Planning",
    description: "Estimate costs, revenue, and profitability",
    icon: PieChart,
    items: [
      "Estimate startup costs (rent, renovations, equipment)",
      "Calculate operational costs (labor, food, utilities)",
      "Create revenue projections based on capacity and turnover",
      "Develop cash flow forecasts and break-even analysis",
    ],
  },
];

export const existingBusinessSteps: ResearchStep[] = [
  {
    id: "reassess",
    title: "Reassess Business Goals & Market Position",
    description: "Evaluate your current position and set new goals",
    icon: Briefcase,
    items: [
      "Define new business goals (growth, profit increase, expansion)",
      "Conduct a SWOT analysis of your current operations",
      "Benchmark your current vs. ideal market positioning",
      "Identify operational strengths and weaknesses",
    ],
  },
  {
    id: "customer-research",
    title: "Customer Research & Retention Strategies",
    description: "Understand and improve customer satisfaction",
    icon: Users,
    items: [
      "Analyze customer feedback, reviews, and satisfaction data",
      "Calculate customer lifetime value and repeat visit rate",
      "Implement loyalty programs and personalization strategies",
      "Identify opportunities to attract new customer segments",
    ],
  },
  {
    id: "competitive",
    title: "Competitive & Market Analysis",
    description: "Analyze market trends and competition",
    icon: Target,
    items: [
      "Conduct competitor benchmarking (menu, pricing, marketing)",
      "Identify emerging food trends and customer preferences",
      "Analyze seasonal patterns in your business",
      "Research new technologies or service models in the industry",
    ],
  },
  {
    id: "menu-optimization",
    title: "Menu & Pricing Optimization",
    description: "Improve your menu performance and pricing",
    icon: DollarSign,
    items: [
      "Analyze menu item performance (sales volume vs. profit margin)",
      "Conduct menu engineering analysis (stars, puzzles, plowhorses, dogs)",
      "Test price elasticity of popular menu items",
      "Develop seasonal or special menu strategies",
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Customer Acquisition",
    description: "Improve your marketing and customer acquisition",
    icon: BarChart2,
    items: [
      "Optimize online presence (website, SEO, social media)",
      "Implement targeted marketing campaigns",
      "Develop partnerships with delivery platforms or local businesses",
      "Analyze marketing ROI and customer acquisition costs",
    ],
  },
  {
    id: "operational",
    title: "Operational & Cost Optimization",
    description: "Improve efficiency and reduce costs",
    icon: PieChart,
    items: [
      "Analyze labor costs and scheduling efficiency",
      "Optimize inventory management and reduce food waste",
      "Negotiate better vendor deals and supply contracts",
      "Implement technology solutions for operational efficiency",
    ],
  },
];
