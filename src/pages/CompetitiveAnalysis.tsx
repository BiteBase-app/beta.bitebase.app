import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
import { Search, Filter, MapPin, Info, ExternalLink, SlidersHorizontal, Download, RefreshCw, Plus, TrendingUp, Users, Percent, DollarSign, Heart, Clock, Store, Lightbulb as LightbulbIcon } from "lucide-react";
import { TierRestriction } from "@/components/TierRestriction";

const CompetitiveAnalysis = () => {
  const [activeTab, setActiveTab] = useState("competition");

  // Helper function to render price level
  const renderPriceLevel = (priceLevel: number): React.ReactNode => {
    const dollarSigns = "$".repeat(priceLevel);
    return <span className="text-green-600 font-medium">{dollarSigns}</span>;
  };

  // Helper function to render icon
  const renderIcon = (iconName: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      lightbulb: <LightbulbIcon className="h-5 w-5 text-amber-600" />,
      clock: <Clock className="h-5 w-5 text-primary" />,
      users: <Users className="h-5 w-5 text-blue-600" />,
      trendingUp: <TrendingUp className="h-5 w-5 text-green-600" />,
      store: <Store className="h-5 w-5 text-purple-600" />,
      heart: <Heart className="h-5 w-5 text-red-600" />
    };

    return (
      <div className={`p-2 rounded-full ${iconName === 'lightbulb' ? 'bg-amber-100' : iconName === 'clock' ? 'bg-primary-100' : 'bg-blue-100'}`}>
        {iconMap[iconName] || <Info className="h-5 w-5" />}
      </div>
    );
  };

  // Sample data for the charts
  const marketShareData = [
    { name: "Your Restaurant", value: 22, color: "#74C365" },
    { name: "Bistro 42", value: 18, color: "#E23D28" },
    { name: "Cafe Luna", value: 15, color: "#F4C431" },
    { name: "The Green Fork", value: 12, color: "#3B82F6" },
    { name: "Others", value: 33, color: "#E5E7EB" }
  ];

  const priceComparisonData = [
    { name: "Appetizers", "Your Restaurant": 12, "Market Avg.": 10 },
    { name: "Main Courses", "Your Restaurant": 28, "Market Avg.": 24 },
    { name: "Desserts", "Your Restaurant": 10, "Market Avg.": 8 },
    { name: "Drinks", "Your Restaurant": 8, "Market Avg.": 7 }
  ];

  const ratingData = [
    { subject: "Food Quality", "Your Restaurant": 4.6, "Top Competitor": 4.5, fullMark: 5 },
    { subject: "Service", "Your Restaurant": 4.5, "Top Competitor": 4.3, fullMark: 5 },
    { subject: "Ambiance", "Your Restaurant": 4.4, "Top Competitor": 4.6, fullMark: 5 },
    { subject: "Value", "Your Restaurant": 4.3, "Top Competitor": 4.2, fullMark: 5 },
    { subject: "Cleanliness", "Your Restaurant": 4.7, "Top Competitor": 4.5, fullMark: 5 },
    { subject: "Location", "Your Restaurant": 4.5, "Top Competitor": 4.4, fullMark: 5 }
  ];

  // Consumer insights data
  const demographicData = [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 35 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 15 },
    { name: "55+", value: 10 }
  ];

  const consumerTrendsData = [
    { month: "Jan", visits: 320, orders: 240 },
    { month: "Feb", visits: 332, orders: 254 },
    { month: "Mar", visits: 301, orders: 234 },
    { month: "Apr", visits: 334, orders: 246 },
    { month: "May", visits: 390, orders: 300 },
    { month: "Jun", visits: 430, orders: 320 }
  ];

  const sentimentData = [
    { name: "Positive", value: 68, color: "#74C365" },
    { name: "Neutral", value: 21, color: "#F4C431" },
    { name: "Negative", value: 11, color: "#E23D28" }
  ];

  const competitors = [
    {
      id: 1,
      name: "Bistro 42",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      rating: 4.5,
      distance: "0.3 mi away",
      priceLevel: 3,
      rank: "#1 Competitor",
      rankClass: "bg-green-100 text-green-800",
      description: "Contemporary American cuisine with seasonal ingredients and craft cocktails.",
      avgCheck: "$42",
      seats: "85",
      waitTime: "25 min"
    },
    {
      id: 2,
      name: "Cafe Luna",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      rating: 4.0,
      distance: "0.5 mi away",
      priceLevel: 2,
      rank: "#2 Competitor",
      rankClass: "bg-blue-100 text-blue-800",
      description: "Cozy Italian café known for homemade pasta and wood-fired pizzas.",
      avgCheck: "$28",
      seats: "60",
      waitTime: "15 min"
    },
    {
      id: 3,
      name: "The Green Fork",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      rating: 4.8,
      distance: "0.7 mi away",
      priceLevel: 3,
      rank: "Trending",
      rankClass: "bg-yellow-100 text-yellow-800",
      description: "Farm-to-table vegetarian restaurant with organic wines and craft beers.",
      avgCheck: "$38",
      seats: "45",
      waitTime: "40 min"
    }
  ];

  const benchmarkingData = [
    { metric: "Average Rating", yourRestaurant: "4.6★", bistro42: "4.5★", cafeLuna: "4.0★", greenFork: "4.8★", marketAvg: "4.3★" },
    { metric: "Average Check", yourRestaurant: "$36", bistro42: "$42", cafeLuna: "$28", greenFork: "$38", marketAvg: "$34" },
    { metric: "Seat Turnover", yourRestaurant: "2.1x", bistro42: "1.8x", cafeLuna: "2.3x", greenFork: "1.9x", marketAvg: "2.0x" },
    { metric: "Wait Time", yourRestaurant: "20 min", bistro42: "25 min", cafeLuna: "15 min", greenFork: "40 min", marketAvg: "25 min" },
    { metric: "Social Followers", yourRestaurant: "8,450", bistro42: "12,300", cafeLuna: "5,600", greenFork: "9,800", marketAvg: "8,500" },
    { metric: "Online Orders", yourRestaurant: "42%", bistro42: "35%", cafeLuna: "28%", greenFork: "45%", marketAvg: "37%" }
  ];

  const recommendations = [
    {
      icon: "lightbulb",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Pricing Strategy",
      description: "Introduce a mid-range prix fixe menu to compete with Cafe Luna's value proposition.",
      tags: [
        { text: "High Impact", className: "bg-green-100 text-green-800" },
        { text: "Easy to Implement", className: "bg-blue-100 text-blue-800" }
      ]
    },
    {
      icon: "clock",
      iconBg: "bg-primary-100",
      iconColor: "text-primary",
      title: "Wait Time",
      description: "Implement a digital waitlist system to reduce perceived wait times by 15%.",
      tags: [
        { text: "High Impact", className: "bg-green-100 text-green-800" },
        { text: "Tech Required", className: "bg-purple-100 text-purple-800" }
      ]
    },
    {
      icon: "tag",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Loyalty Program",
      description: "Launch a referral program to match Bistro 42's strong social following.",
      tags: [
        { text: "Medium Impact", className: "bg-yellow-100 text-yellow-800" },
        { text: "Easy to Implement", className: "bg-blue-100 text-blue-800" }
      ]
    }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Market Intelligence</h1>
            <p className="text-muted-foreground">Analyze competition and consumer insights in your target market area</p>
          </div>
        </div>

        <Tabs defaultValue="competition" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="competition">Competitive Analysis</TabsTrigger>
            <TabsTrigger value="consumer">Consumer Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="competition">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="w-full lg:w-1/2">
                    <h3 className="font-bold text-lg mb-2">Analyze Competition</h3>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input placeholder="Enter your restaurant location" className="pl-10" />
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      <Button>
                        <Search className="mr-2 h-4 w-4" /> Search
                      </Button>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="flex flex-wrap gap-3">
                      <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
                        <div className="flex items-center space-x-2">
                          <input type="range" min="0.1" max="5" step="0.1" defaultValue="1" className="w-full" />
                          <span className="text-sm font-medium w-12">1.0 mi</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none text-sm">
                          <option>All Cuisines</option>
                          <option>American</option>
                          <option>Italian</option>
                          <option>Mexican</option>
                          <option>Asian</option>
                          <option>Mediterranean</option>
                        </select>
                      </div>
                      <Button variant="secondary" className="self-end">
                        <Search className="mr-2 h-4 w-4" /> Analyze
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Market Share</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Percentage of total restaurant visits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={marketShareData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {marketShareData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}% market share`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Price Comparison</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Average menu prices compared to market</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={priceComparisonData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <Tooltip formatter={(value) => `$${value}`} />
                          <Legend />
                          <Bar dataKey="Your Restaurant" fill="#74C365" />
                          <Bar dataKey="Market Avg." fill="#E5E7EB" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Rating Distribution</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Customer ratings across categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} width={730} height={250} data={ratingData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[3, 5]} />
                          <Radar name="Your Restaurant" dataKey="Your Restaurant" stroke="#74C365" fill="#74C365" fillOpacity={0.2} />
                          <Radar name="Top Competitor" dataKey="Top Competitor" stroke="#E23D28" fill="#E23D28" fillOpacity={0.2} />
                          <Legend />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Top Competitors (12 within 1 mile)</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal className="mr-2 h-4 w-4" /> Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {competitors.map((competitor) => (
                    <div key={competitor.id} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition">
                      <div className="relative h-40 bg-muted">
                        <img src={competitor.image} alt={competitor.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <span className="mr-1">★</span>
                          {competitor.rating}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
                          <span className="mr-1">👥</span> {competitor.seats} seats
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg">{competitor.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {competitor.distance} • {renderPriceLevel(competitor.priceLevel)}
                            </p>
                          </div>
                          <div className={`text-xs font-bold px-2 py-1 rounded-full ${competitor.rankClass}`}>
                            {competitor.rank}
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-3">{competitor.description}</p>
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-muted-foreground">Avg. Check</p>
                            <p className="font-bold">{competitor.avgCheck}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Seats</p>
                            <p className="font-bold">{competitor.seats}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Wait Time</p>
                            <p className="font-bold">{competitor.waitTime}</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-muted/50 border-t border-border flex justify-between">
                        <Button variant="ghost" size="sm">
                          <Search className="mr-2 h-4 w-4" /> Analyze
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" /> Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Load More Competitors
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Competitive Benchmarking</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <SlidersHorizontal className="mr-2 h-4 w-4" /> Customize
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-border">
                          <th className="pb-2 text-sm font-medium text-muted-foreground">Metric</th>
                          <th className="pb-2 text-sm font-medium text-muted-foreground">Your Restaurant</th>
                          <th className="pb-2 text-sm font-medium text-muted-foreground">Bistro 42</th>
                          <th className="pb-2 text-sm font-medium text-muted-foreground">Cafe Luna</th>
                          <th className="pb-2 text-sm font-medium text-muted-foreground">The Green Fork</th>
                          <th className="pb-2 text-sm font-medium text-muted-foreground">Market Avg.</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benchmarkingData.map((row, index) => (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 font-medium">{row.metric}</td>
                            <td className="py-3 font-bold text-primary">{row.yourRestaurant}</td>
                            <td className="py-3">{row.bistro42}</td>
                            <td className="py-3">{row.cafeLuna}</td>
                            <td className="py-3">{row.greenFork}</td>
                            <td className="py-3">{row.marketAvg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>AI-Powered Competitive Strategies</CardTitle>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition">
                      <div className="flex items-start space-x-3">
                        {renderIcon(rec.icon)}
                        <div>
                          <h4 className="font-medium mb-1">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                          <div className="mt-2 flex space-x-2">
                            {rec.tags.map((tag, i) => (
                              <span key={i} className={`text-xs px-2 py-1 rounded-full ${tag.className}`}>
                                {tag.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consumer">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="w-full lg:w-1/2">
                    <h3 className="font-bold text-lg mb-2">Consumer Insights Analysis</h3>
                    <p className="text-muted-foreground">Understand your target audience demographics and preferences</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button>
                      <RefreshCw className="mr-2 h-4 w-4" /> Update Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Customer Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">+12.5%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">From previous month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold">8,745</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Unique visitors</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Repeat Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Percent className="h-5 w-5 text-purple-500" />
                    <span className="text-2xl font-bold">42%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Return customers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Spend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">$38.50</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Per customer</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Age Demographics</CardTitle>
                  <CardDescription>Customer age distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={demographicData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {demographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Visit & Order Trends</CardTitle>
                  <CardDescription>6-month performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={consumerTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#8884d8" />
                        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Customer Sentiment</CardTitle>
                  <CardDescription>Based on reviews & feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer Preferences</CardTitle>
                <CardDescription>Most popular menu items and customer interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Top Menu Items</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Grilled Salmon", popularity: 85 },
                        { name: "Truffle Pasta", popularity: 75 },
                        { name: "Chocolate Souffle", popularity: 68 },
                        { name: "Craft Cocktails", popularity: 62 },
                        { name: "Artisan Bread Basket", popularity: 55 }
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span>{item.name}</span>
                            <span className="font-medium">{item.popularity}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${item.popularity}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Customer Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { text: "Local Ingredients", count: 245 },
                        { text: "Outdoor Seating", count: 210 },
                        { text: "Craft Cocktails", count: 185 },
                        { text: "Vegetarian Options", count: 170 },
                        { text: "Private Events", count: 155 },
                        { text: "Wine Pairings", count: 140 },
                        { text: "Live Music", count: 125 },
                        { text: "Chef's Table", count: 110 },
                        { text: "Happy Hour", count: 100 },
                        { text: "Gluten Free", count: 95 }
                      ].map((tag, i) => (
                        <div key={i} className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-2">
                          <Heart className="h-3 w-3 text-red-500" />
                          {tag.text}
                          <span className="text-xs bg-background rounded-full px-2">{tag.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompetitiveAnalysis;
