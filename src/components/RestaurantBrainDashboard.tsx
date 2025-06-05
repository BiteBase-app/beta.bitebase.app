import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Brain, 
  TrendingUp, 
  MapPin, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Lightbulb
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface RestaurantBrainDashboardProps {
  restaurantId: string;
}

interface BrainStatus {
  restaurant_id: string;
  brain_status: string;
  data_sources: {
    pos: string;
    social: string;
    location: string;
    ai_research: string;
  };
  last_updated: string;
  health_score: number;
}

interface ComprehensiveInsights {
  timestamp: string;
  restaurant_id: string;
  business_performance: any;
  customer_insights: any;
  operational_insights: any;
  market_insights: any;
  financial_insights: any;
  predictive_insights: any;
  action_plan: any;
  confidence_score: number;
}

interface RealTimeMonitoring {
  timestamp: string;
  restaurant_id: string;
  real_time_data: any;
  anomalies: any[];
  alerts: any[];
  real_time_kpis: any;
  performance_status: any;
  operational_status: any;
}

const RestaurantBrainDashboard: React.FC<RestaurantBrainDashboardProps> = ({ restaurantId }) => {
  const [brainStatus, setBrainStatus] = useState<BrainStatus | null>(null);
  const [insights, setInsights] = useState<ComprehensiveInsights | null>(null);
  const [monitoring, setMonitoring] = useState<RealTimeMonitoring | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchBrainData();
    const interval = setInterval(fetchRealTimeData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [restaurantId]);

  const fetchBrainData = async () => {
    try {
      setLoading(true);
      
      // Fetch brain status
      const statusResponse = await fetch(`/api/v1/intelligence/restaurant/${restaurantId}/status`);
      const statusData = await statusResponse.json();
      if (statusData.success) {
        setBrainStatus(statusData.data);
      }

      // Fetch comprehensive insights
      const insightsResponse = await fetch(`/api/v1/intelligence/restaurant/${restaurantId}/insights`);
      const insightsData = await insightsResponse.json();
      if (insightsData.success) {
        setInsights(insightsData.data);
      }

      // Fetch real-time monitoring
      await fetchRealTimeData();
      
    } catch (error) {
      console.error('Error fetching brain data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealTimeData = async () => {
    try {
      const monitoringResponse = await fetch(`/api/v1/intelligence/restaurant/${restaurantId}/monitoring`);
      const monitoringData = await monitoringResponse.json();
      if (monitoringData.success) {
        setMonitoring(monitoringData.data);
      }
    } catch (error) {
      console.error('Error fetching real-time data:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'error':
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'error':
      case 'disconnected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Restaurant Brain</h1>
            <p className="text-muted-foreground">AI-Powered Business Intelligence</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={brainStatus?.brain_status === 'active' ? 'default' : 'secondary'}>
            {brainStatus?.brain_status || 'Unknown'}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Health Score: {brainStatus?.health_score || 0}/10
          </div>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brainStatus?.data_sources && Object.entries(brainStatus.data_sources).map(([source, status]) => (
              <div key={source} className="flex items-center space-x-2">
                {getStatusIcon(status)}
                <span className="capitalize">{source.replace('_', ' ')}</span>
                <Badge className={getStatusColor(status)} variant="outline">
                  {status}
                </Badge>
              </div>
            ))}
          </div>
          {brainStatus?.health_score && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Health</span>
                <span>{brainStatus.health_score}/10</span>
              </div>
              <Progress value={brainStatus.health_score * 10} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alerts */}
      {monitoring?.alerts && monitoring.alerts.length > 0 && (
        <div className="space-y-2">
          {monitoring.alerts.map((alert, index) => (
            <Alert key={index} variant={alert.severity === 'high' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${monitoring?.real_time_kpis?.revenue_today || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{monitoring?.real_time_kpis?.revenue_growth || 0}% from yesterday
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
                  {monitoring?.real_time_kpis?.orders_today || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{monitoring?.real_time_kpis?.order_growth || 0}% from yesterday
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
                  ${monitoring?.real_time_kpis?.avg_order_value || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{monitoring?.real_time_kpis?.aov_growth || 0}% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monitoring?.real_time_kpis?.satisfaction_score || 0}/5
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on recent reviews
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monitoring?.real_time_data?.revenue_trend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Performance Score</CardTitle>
                <CardDescription>Overall performance across all metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">
                  {insights?.business_performance?.performance_score || 0}/10
                </div>
                <Progress 
                  value={(insights?.business_performance?.performance_score || 0) * 10} 
                  className="h-4 mb-4" 
                />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Revenue Growth</span>
                    <span>{insights?.business_performance?.growth_metrics?.revenue_growth || 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency Score</span>
                    <span>{insights?.business_performance?.efficiency_metrics?.overall_score || 0}/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights?.business_performance?.revenue_metrics && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Revenue</div>
                        <div className="text-2xl font-bold">
                          ${insights.business_performance.revenue_metrics.total_revenue}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Order Count</div>
                        <div className="text-2xl font-bold">
                          {insights.business_performance.revenue_metrics.order_count}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    {/* Pie chart implementation */}
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={insights?.customer_insights?.satisfaction_trends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="satisfaction" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Service Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {insights?.operational_insights?.service_efficiency?.score || 0}/10
                </div>
                <Progress 
                  value={(insights?.operational_insights?.service_efficiency?.score || 0) * 10} 
                  className="h-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Quality Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {insights?.operational_insights?.quality_metrics?.overall_score || 0}/10
                </div>
                <Progress 
                  value={(insights?.operational_insights?.quality_metrics?.overall_score || 0) * 10} 
                  className="h-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Cost Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {insights?.operational_insights?.cost_efficiency?.score || 0}/10
                </div>
                <Progress 
                  value={(insights?.operational_insights?.cost_efficiency?.score || 0) * 10} 
                  className="h-2" 
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Market Position</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Competitive Position</div>
                    <div className="text-lg font-semibold">
                      {insights?.market_insights?.positioning?.position || 'Analyzing...'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Share</div>
                    <div className="text-lg font-semibold">
                      {insights?.market_insights?.market_share?.percentage || 0}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights?.market_insights?.opportunities?.map((opportunity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  )) || <div>No opportunities identified</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Next 12 months prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={insights?.predictive_insights?.revenue_forecast?.forecast || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="predicted_revenue" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="confidence_lower" stroke="#82ca9d" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="confidence_upper" stroke="#82ca9d" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights?.predictive_insights?.risk_assessment?.risks?.map((risk: any, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle className={`h-4 w-4 mt-1 ${
                        risk.severity === 'high' ? 'text-red-500' : 
                        risk.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <div>
                        <div className="font-medium">{risk.title}</div>
                        <div className="text-sm text-muted-foreground">{risk.description}</div>
                      </div>
                    </div>
                  )) || <div>No significant risks identified</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Recommended Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights?.action_plan?.actions?.map((action: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'default' : 'secondary'}>
                    {action.priority}
                  </Badge>
                  <div>
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {action.timeline}
                </div>
              </div>
            )) || <div>No actions recommended at this time</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantBrainDashboard;