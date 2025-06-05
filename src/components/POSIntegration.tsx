import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  BarChart3, 
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Clock,
  Users
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface POSIntegrationProps {
  restaurantId: string;
}

interface POSConnection {
  pos_type: string;
  status: string;
  connected_at: string;
  last_sync: string;
}

interface POSAnalytics {
  today_metrics: {
    total_revenue: number;
    total_orders: number;
    average_order_value: number;
  };
  hourly_breakdown: Record<string, { revenue: number; orders: number }>;
  current_hour_revenue: number;
  current_hour_orders: number;
}

interface POSInsights {
  period_summary: {
    total_revenue: number;
    total_orders: number;
    average_order_value: number;
    period_days: number;
  };
  peak_hours: Record<string, number>;
  peak_days: Record<string, number>;
  payment_method_breakdown: Record<string, number>;
  revenue_trend: Record<string, number>;
  recommendations: string[];
}

const POSIntegration: React.FC<POSIntegrationProps> = ({ restaurantId }) => {
  const [connections, setConnections] = useState<POSConnection[]>([]);
  const [analytics, setAnalytics] = useState<POSAnalytics | null>(null);
  const [insights, setInsights] = useState<POSInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  
  // Connection form state
  const [selectedPOS, setSelectedPOS] = useState('');
  const [credentials, setCredentials] = useState<Record<string, string>>({});

  const posTypes = [
    { value: 'square', label: 'Square', fields: ['access_token', 'location_id'] },
    { value: 'toast', label: 'Toast', fields: ['access_token', 'restaurant_guid'] },
    { value: 'clover', label: 'Clover', fields: ['access_token', 'merchant_id'] }
  ];

  useEffect(() => {
    fetchPOSData();
  }, [restaurantId]);

  const fetchPOSData = async () => {
    try {
      setLoading(true);
      
      // Fetch analytics
      const analyticsResponse = await fetch(`/api/v1/intelligence/pos/${restaurantId}/analytics`);
      const analyticsData = await analyticsResponse.json();
      if (analyticsData.success) {
        setAnalytics(analyticsData.data);
      }

      // Fetch insights
      const insightsResponse = await fetch(`/api/v1/intelligence/pos/${restaurantId}/insights`);
      const insightsData = await insightsResponse.json();
      if (insightsData.success) {
        setInsights(insightsData.data);
      }
      
    } catch (error) {
      console.error('Error fetching POS data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!selectedPOS || !credentials) return;

    try {
      setConnecting(true);
      
      const response = await fetch('/api/v1/intelligence/pos/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          pos_type: selectedPOS,
          credentials: credentials
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setSelectedPOS('');
        setCredentials({});
        // Refresh data
        await fetchPOSData();
      }
      
    } catch (error) {
      console.error('Error connecting POS:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleSync = async () => {
    if (!selectedPOS) return;

    try {
      setSyncing(true);
      
      const response = await fetch(`/api/v1/intelligence/pos/${restaurantId}/sync?pos_type=${selectedPOS}`, {
        method: 'POST',
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchPOSData();
      }
      
    } catch (error) {
      console.error('Error syncing POS data:', error);
    } finally {
      setSyncing(false);
    }
  };

  const getSelectedPOSFields = () => {
    const posType = posTypes.find(pos => pos.value === selectedPOS);
    return posType?.fields || [];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatHourlyData = () => {
    if (!analytics?.hourly_breakdown) return [];
    
    return Object.entries(analytics.hourly_breakdown).map(([hour, data]) => ({
      hour: `${hour}:00`,
      revenue: data.revenue,
      orders: data.orders
    }));
  };

  const formatRevenueData = () => {
    if (!insights?.revenue_trend) return [];
    
    return Object.entries(insights.revenue_trend).map(([date, revenue]) => ({
      date,
      revenue
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CreditCard className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">POS Integration</h1>
            <p className="text-muted-foreground">Connect and analyze your point-of-sale data</p>
          </div>
        </div>
        <Button onClick={handleSync} disabled={syncing || !selectedPOS}>
          <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
          Sync Data
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="connect">Connect POS</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics?.today_metrics?.total_revenue || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current hour: {formatCurrency(analytics?.current_hour_revenue || 0)}
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
                  {analytics?.today_metrics?.total_orders || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current hour: {analytics?.current_hour_orders || 0}
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
                  {formatCurrency(analytics?.today_metrics?.average_order_value || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Today's average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">
                  Last sync: {new Date().toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Hourly Performance</CardTitle>
              <CardDescription>Revenue and order volume by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formatHourlyData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                  <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Daily revenue over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatRevenueData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Peak Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
                <CardDescription>Highest revenue hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights?.peak_hours && Object.entries(insights.peak_hours)
                    .slice(0, 5)
                    .map(([hour, revenue]) => (
                    <div key={hour} className="flex justify-between items-center">
                      <span>{hour}:00</span>
                      <Badge variant="outline">{formatCurrency(revenue)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Days</CardTitle>
                <CardDescription>Highest revenue days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {insights?.peak_days && Object.entries(insights.peak_days)
                    .slice(0, 5)
                    .map(([day, revenue]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span>{day}</span>
                      <Badge variant="outline">{formatCurrency(revenue)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method Breakdown</CardTitle>
              <CardDescription>Distribution of payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {insights?.payment_method_breakdown && Object.entries(insights.payment_method_breakdown).map(([method, count]) => (
                  <div key={method} className="text-center">
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground capitalize">{method}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Period Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Period Summary</CardTitle>
              <CardDescription>
                Performance over the last {insights?.period_summary?.period_days || 30} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {formatCurrency(insights?.period_summary?.total_revenue || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {insights?.period_summary?.total_orders || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {formatCurrency(insights?.period_summary?.average_order_value || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Order Value</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Data-driven suggestions to improve performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights?.recommendations?.map((recommendation, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{recommendation}</AlertDescription>
                  </Alert>
                )) || <div>No recommendations available</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connect" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect POS System</CardTitle>
              <CardDescription>
                Connect your point-of-sale system to enable real-time analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pos-type">POS System</Label>
                <Select value={selectedPOS} onValueChange={setSelectedPOS}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your POS system" />
                  </SelectTrigger>
                  <SelectContent>
                    {posTypes.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPOS && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connection Details</h3>
                  {getSelectedPOSFields().map((field) => (
                    <div key={field}>
                      <Label htmlFor={field}>
                        {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                      <Input
                        id={field}
                        type={field.includes('token') ? 'password' : 'text'}
                        value={credentials[field] || ''}
                        onChange={(e) => setCredentials(prev => ({
                          ...prev,
                          [field]: e.target.value
                        }))}
                        placeholder={`Enter your ${field.replace('_', ' ')}`}
                      />
                    </div>
                  ))}
                  
                  <Button 
                    onClick={handleConnect} 
                    disabled={connecting || !Object.keys(credentials).length}
                    className="w-full"
                  >
                    {connecting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Connect {selectedPOS}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Connections</CardTitle>
            </CardHeader>
            <CardContent>
              {connections.length > 0 ? (
                <div className="space-y-2">
                  {connections.map((connection, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium capitalize">{connection.pos_type}</div>
                          <div className="text-sm text-muted-foreground">
                            Connected: {new Date(connection.connected_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50">
                        {connection.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No POS systems connected yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default POSIntegration;