import { Button } from "@/components/ui/button";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  BarChart2,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Globe,
  Utensils,
  LineChart,
  Search,
  Layers,
  Filter,
  Plus,
  Star,
  Clock,
  Coffee,
  ShoppingBag,
  ChevronRight,
  Building,
  PieChart,
  BarChartHorizontal,
  Bell,
  ChevronDown,
  User,
  Wallet,
  ArrowUp,
  ArrowDown,
  Store,
  Receipt,
  UserCheck,
  Check,
  AlertTriangle,
  LightbulbIcon,
  X
} from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TierRestriction } from "@/components/TierRestriction";
import { useTier } from "@/contexts/TierContext";
import { DashboardLayout } from "@/components/DashboardLayout";

const Dashboard = () => {
  const { toast } = useToast();
  const { currentTier } = useTier();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "Downtown Bistro",
      score: 92,
      location: "123 Main St, Downtown",
      status: "active",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Waterfront Grill",
      score: 87,
      location: "45 Harbor View, Bayside",
      status: "pending",
      lastUpdated: "5 days ago"
    },
    {
      id: 3,
      name: "Tech Hub Café",
      score: 78,
      location: "789 Innovation Park",
      status: "active",
      lastUpdated: "1 week ago"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "analysis",
      name: "Competitor Analysis",
      date: "Today, 10:30am",
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 2,
      type: "location",
      name: "New Location Scouting",
      date: "Yesterday, 4:15pm",
      icon: <MapPin className="h-4 w-4" />
    },
    {
      id: 3,
      type: "report",
      name: "Monthly Performance Report",
      date: "Jul 15, 2:45pm",
      icon: <BarChart2 className="h-4 w-4" />
    },
    {
      id: 4,
      type: "update",
      name: "Menu Optimization",
      date: "Jul 12, 11:20am",
      icon: <Coffee className="h-4 w-4" />
    }
  ];

  const topLocations = [
    {
      rank: 1,
      name: "Downtown West",
      score: 92,
      competitors: 8,
      rent: "$4,200/mo"
    },
    {
      rank: 2,
      name: "Riverside District",
      score: 88,
      competitors: 6,
      rent: "$3,800/mo"
    },
    {
      rank: 3,
      name: "Northside Plaza",
      score: 85,
      competitors: 10,
      rent: "$3,500/mo"
    },
    {
      rank: 4,
      name: "South Market",
      score: 83,
      competitors: 12,
      rent: "$3,200/mo"
    },
    {
      rank: 5,
      name: "East Village",
      score: 81,
      competitors: 9,
      rent: "$4,000/mo"
    }
  ];

  const quickAnalysis = [
    {
      title: "Cuisine Opportunity",
      description: "Your area has high demand for Mediterranean cuisine with limited competition.",
      score: 78,
      level: "High",
      icon: <Utensils className="h-4 w-4 text-yellow-500" />
    },
    {
      title: "Price Positioning",
      description: "Area can support premium pricing with 15% higher than current average.",
      score: 65,
      level: "Moderate",
      icon: <DollarSign className="h-4 w-4 text-green-500" />
    },
    {
      title: "Peak Hours",
      description: "Highest foot traffic occurs between 6-8PM on weekends.",
      score: 92,
      level: "Very High",
      icon: <Clock className="h-4 w-4 text-red-500" />
    }
  ];

  const recentActivity = [
    {
      title: "Analysis Completed",
      description: "Market potential analysis for Downtown West location is ready",
      time: "10 min ago",
      icon: <Check className="h-4 w-4 text-green-500" />
    },
    {
      title: "New Competitor Alert",
      description: '"Mediterranean Bistro" opened in your target area with 4.8★ rating',
      time: "45 min ago",
      icon: <Bell className="h-4 w-4 text-blue-500" />
    },
    {
      title: "Trend Identified",
      description: "Increased demand for plant-based options in your area (up 22% YoY)",
      time: "2 hours ago",
      icon: <TrendingUp className="h-4 w-4 text-purple-500" />
    },
    {
      title: "Menu Recommendation",
      description: "AI suggests adding falafel wrap based on competitor gaps",
      time: "4 hours ago",
      icon: <LightbulbIcon className="h-4 w-4 text-yellow-500" />
    }
  ];

  const handleCreateReport = () => {
    toast({
      title: "Creating new report",
      description: "Your report is being generated..."
    });
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Restaurant Intelligence Dashboard</h1>
            </div>
            <p className="text-muted-foreground mt-1">Welcome back to your restaurant intelligence platform</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleCreateReport}>
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Button>
            <Button asChild>
              <Link to="/restaurant-setup">
                <Search className="mr-2 h-4 w-4" /> New Analysis
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Market Potential</p>
                  <h3 className="text-2xl font-bold mt-1">87/100</h3>
                  <p className="text-sm mt-2 flex items-center text-green-600">
                    <ArrowUp className="h-3 w-3 mr-1" /> 8.2% vs last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Progress value={87} className="h-2 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Competitor Density</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                  <p className="text-sm mt-2 flex items-center text-red-600">
                    <ArrowDown className="h-3 w-3 mr-1" /> 3.4% vs last quarter
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={60} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Check (Area)</p>
                  <h3 className="text-2xl font-bold mt-1">$28.50</h3>
                  <p className="text-sm mt-2 flex items-center text-green-600">
                    <ArrowUp className="h-3 w-3 mr-1" /> 5.1% vs last year
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <span>$15</span>
                <div className="flex-1 mx-2">
                  <Progress value={70} className="h-2" />
                </div>
                <span>$40</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Foot Traffic</p>
                  <h3 className="text-2xl font-bold mt-1">1,240</h3>
                  <p className="text-sm mt-2 flex items-center text-green-600">
                    <ArrowUp className="h-3 w-3 mr-1" /> 12.7% vs last week
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <span>500</span>
                <div className="flex-1 mx-2">
                  <Progress value={80} className="h-2" />
                </div>
                <span>2,000</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Market Potential Trend</CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="secondary">Monthly</Badge>
                  <Badge variant="outline">Quarterly</Badge>
                </div>
              </div>
              <CardDescription>Performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              {/* All features enabled */}

              <div className="h-full w-full bg-card overflow-hidden rounded-md">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 border-b border-border/20"></div>
                    <div className="flex-1 border-b border-border/20"></div>
                    <div className="flex-1 border-b border-border/20"></div>
                    <div className="flex-1 border-b border-border/20"></div>
                    <div className="flex-1"></div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 h-[60%] bg-gradient-to-t from-green-500/10 to-transparent"></div>

                  <div className="absolute bottom-0 inset-x-0 h-[80%] flex items-end">
                    <div className="flex-1 h-[40%] bg-gradient-to-t from-green-500 to-green-500/80 rounded-tl-md"></div>
                    <div className="flex-1 h-[50%] bg-gradient-to-t from-green-500 to-green-500/80"></div>
                    <div className="flex-1 h-[60%] bg-gradient-to-t from-green-500 to-green-500/80"></div>
                    <div className="flex-1 h-[75%] bg-gradient-to-t from-green-500 to-green-500/80"></div>
                    <div className="flex-1 h-[85%] bg-gradient-to-t from-green-500 to-green-500/80"></div>
                    <div className="flex-1 h-[90%] bg-gradient-to-t from-green-500 to-green-500/80 rounded-tr-md"></div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-muted-foreground px-2 pb-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>

                  <div className="absolute top-2 left-2 flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Market Score: 87/100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Competitor Comparison</CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="destructive">By Rating</Badge>
                  <Badge variant="outline">By Price</Badge>
                </div>
              </div>
              <CardDescription>Businesses within 1 mile radius</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <div className="h-full w-full bg-card overflow-hidden rounded-md">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 p-4 flex flex-col justify-center space-y-6">
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Your Concept</span>
                      <div className="flex-1 h-8 bg-green-100 rounded overflow-hidden flex items-center">
                        <div className="h-full bg-green-500 rounded w-[90%]"></div>
                        <span className="text-xs ml-2">4.5★</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Bistro 42</span>
                      <div className="flex-1 h-8 bg-green-100 rounded overflow-hidden flex items-center">
                        <div className="h-full bg-red-500 rounded w-[96%]"></div>
                        <span className="text-xs ml-2">4.8★</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Cafe Luna</span>
                      <div className="flex-1 h-8 bg-green-100 rounded overflow-hidden flex items-center">
                        <div className="h-full bg-red-500 rounded w-[86%]"></div>
                        <span className="text-xs ml-2">4.3★</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Green Fork</span>
                      <div className="flex-1 h-8 bg-green-100 rounded overflow-hidden flex items-center">
                        <div className="h-full bg-red-500 rounded w-[92%]"></div>
                        <span className="text-xs ml-2">4.6★</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Urban Eats</span>
                      <div className="flex-1 h-8 bg-green-100 rounded overflow-hidden flex items-center">
                        <div className="h-full bg-red-500 rounded w-[84%]"></div>
                        <span className="text-xs ml-2">4.2★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Top Recommended Locations</CardTitle>
                <Button variant="ghost" size="sm">
                  <ArrowDown className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
              <CardDescription>
                Ranked by market potential score
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rank</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Market Score</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Competition</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Avg. Rent</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topLocations.map((location) => (
                      <tr key={location.rank} className="border-b border-border hover:bg-muted/50">
                        <td className="p-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${location.rank === 1 ? 'bg-green-500' : location.rank === 2 ? 'bg-red-500' : location.rank === 3 ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                            {location.rank}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{location.name}</td>
                        <td className="p-4 font-bold text-green-600">{location.score}/100</td>
                        <td className="p-4 text-sm">{location.competitors} competitors</td>
                        <td className="p-4">{location.rent}</td>
                        <td className="p-4">
                          <Button variant="default" size="sm">Analyze</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Analysis</CardTitle>
              <CardDescription>
                Key insights for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickAnalysis.map((item, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:border-primary transition-all">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <Progress value={item.score} className="h-1.5" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Score: {item.score}/100</span>
                        <span>{item.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Run Full Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                <Clock className="h-4 w-4 mr-2" /> View All
              </Button>
            </div>
            <CardDescription>
              Your latest interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start hover:bg-muted/50 p-3 rounded-lg transition-all">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3 mt-1">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg animate-pulse-slow"
          onClick={() => setShowAiAssistant(!showAiAssistant)}
        >
          <User className="h-6 w-6" />
        </Button>
      </div>

      {showAiAssistant && (
        <div className="fixed bottom-24 right-6 z-50">
          <ChatBot
            onClose={() => setShowAiAssistant(false)}
            className="shadow-xl"
            useMockUser={true}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
