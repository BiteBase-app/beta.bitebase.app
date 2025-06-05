import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Brain, 
  CreditCard, 
  MapPin, 
  Share2, 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
  DollarSign
} from 'lucide-react';

import RestaurantBrainDashboard from '@/components/RestaurantBrainDashboard';
import POSIntegration from '@/components/POSIntegration';

interface RestaurantIntelligenceProps {
  restaurantId?: string;
}

interface QuickStats {
  revenue_today: number;
  orders_today: number;
  avg_order_value: number;
  customer_satisfaction: number;
  brain_health_score: number;
  active_integrations: number;
}

interface SystemStatus {
  pos_connected: boolean;
  social_connected: boolean;
  location_active: boolean;
  ai_research_active: boolean;
  overall_health: number;
}

const RestaurantIntelligence: React.FC<RestaurantIntelligenceProps> = ({ 
  restaurantId = "demo-restaurant-1" 
}) => {
  const [quickStats, setQuickStats] = useState<QuickStats | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchQuickData();
  }, [restaurantId]);

  const fetchQuickData = async () => {
    try {
      setLoading(true);
      
      // Fetch quick stats
      const statsResponse = await fetch(`/api/v1/intelligence/restaurant/${restaurantId}/status`);
      const statsData = await statsResponse.json();
      
      if (statsData.success) {
        setSystemStatus({
          pos_connected: statsData.data.data_sources.pos === 'connected',
          social_connected: statsData.data.data_sources.social === 'connected',
          location_active: statsData.data.data_sources.location === 'active',
          ai_research_active: statsData.data.data_sources.ai_research === 'active',
          overall_health: statsData.data.health_score
        });
      }

      // Mock quick stats for demo
      setQuickStats({
        revenue_today: 2450.75,
        orders_today: 87,
        avg_order_value: 28.17,
        customer_satisfaction: 4.3,
        brain_health_score: 8.7,
        active_integrations: 3
      });
      
    } catch (error) {
      console.error('Error fetching quick data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getHealthColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBadgeVariant = (score: number) => {
    if (score >= 8) return 'default';
    if (score >= 6) return 'secondary';
    return 'destructive';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Brain className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">BiteBase Intelligence</h1>
            <p className="text-xl text-muted-foreground">
              AI-Powered Restaurant Business Intelligence Platform
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={getHealthBadgeVariant(systemStatus?.overall_health || 0)}
            className="text-lg px-3 py-1"
          >
            Health: {systemStatus?.overall_health || 0}/10
          </Badge>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(quickStats?.revenue_today || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quickStats?.orders_today || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(quickStats?.avg_order_value || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +3.8% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quickStats?.customer_satisfaction || 0}/5
            </div>
            <p className="text-xs text-muted-foreground">
              Based on recent reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brain Health</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(quickStats?.brain_health_score || 0)}`}>
              {quickStats?.brain_health_score || 0}/10
            </div>
            <p className="text-xs text-muted-foreground">
              System performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integrations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quickStats?.active_integrations || 0}/4
            </div>
            <p className="text-xs text-muted-foreground">
              Data sources active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>System Integration Status</span>
          </CardTitle>
          <CardDescription>
            Monitor the status of all connected data sources and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <CreditCard className="h-5 w-5" />
              <div>
                <div className="font-medium">POS System</div>
                <Badge variant={systemStatus?.pos_connected ? 'default' : 'secondary'}>
                  {systemStatus?.pos_connected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Share2 className="h-5 w-5" />
              <div>
                <div className="font-medium">Social Media</div>
                <Badge variant={systemStatus?.social_connected ? 'default' : 'secondary'}>
                  {systemStatus?.social_connected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MapPin className="h-5 w-5" />
              <div>
                <div className="font-medium">Location Intel</div>
                <Badge variant={systemStatus?.location_active ? 'default' : 'secondary'}>
                  {systemStatus?.location_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Brain className="h-5 w-5" />
              <div>
                <div className="font-medium">AI Research</div>
                <Badge variant={systemStatus?.ai_research_active ? 'default' : 'secondary'}>
                  {systemStatus?.ai_research_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Restaurant Brain</span>
            </CardTitle>
            <CardDescription>
              Central AI system that processes all your restaurant data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time performance monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Predictive analytics & forecasting</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Automated insights & recommendations</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Comprehensive business reports</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Market Intelligence</span>
            </CardTitle>
            <CardDescription>
              AI-powered market research and competitive analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time market research</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Location analysis & optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Competitor tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>4Ps strategy recommendations</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Operations Optimization</span>
            </CardTitle>
            <CardDescription>
              Streamline operations with data-driven insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Procurement planning & optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Menu performance analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Staff performance insights</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cost optimization recommendations</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="brain">Restaurant Brain</TabsTrigger>
          <TabsTrigger value="pos">POS Integration</TabsTrigger>
          <TabsTrigger value="market">Market Intel</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Today's Key Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Revenue Growth</AlertTitle>
                    <AlertDescription>
                      Revenue is up 12.5% compared to yesterday, driven by higher average order values.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Peak Hour Optimization</AlertTitle>
                    <AlertDescription>
                      Consider increasing staff during 12-2 PM to handle lunch rush more efficiently.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <Target className="h-4 w-4" />
                    <AlertTitle>Menu Performance</AlertTitle>
                    <AlertDescription>
                      Your signature burger is performing 23% above average - consider promoting it more.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Action Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="destructive">High</Badge>
                      <span className="text-sm">Connect social media accounts</span>
                    </div>
                    <Button size="sm">Setup</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="default">Medium</Badge>
                      <span className="text-sm">Review inventory levels</span>
                    </div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">Low</Badge>
                      <span className="text-sm">Update menu pricing</span>
                    </div>
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="brain">
          <RestaurantBrainDashboard restaurantId={restaurantId} />
        </TabsContent>

        <TabsContent value="pos">
          <POSIntegration restaurantId={restaurantId} />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Intelligence</CardTitle>
              <CardDescription>
                AI-powered market research and competitive analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Market Intelligence Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced location analysis, competitor tracking, and market research features
                </p>
                <Button>Learn More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Integration</CardTitle>
              <CardDescription>
                Connect and analyze your social media presence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Share2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Social Media Analytics Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Facebook, Instagram integration with sentiment analysis and content recommendations
                </p>
                <Button>Connect Accounts</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantIntelligence;