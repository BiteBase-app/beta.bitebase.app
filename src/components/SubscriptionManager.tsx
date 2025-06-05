import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Settings,
  ExternalLink,
  MapPin,
  Loader2
} from 'lucide-react';
import { subscriptionService, type Subscription, type Customer } from '@/services/subscriptionService';

interface AddOn {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}

export const SubscriptionManager: React.FC = () => {
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Mock customer ID - in real app, this would come from auth context
  const customerId = 'cus_mock_customer_id';

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      
      // Load customer data
      const customerResult = await subscriptionService.getCustomer(customerId);
      if (customerResult.success) {
        setCustomer(customerResult.customer);
      }

      // Load subscriptions
      const subscriptionsResult = await subscriptionService.getCustomerSubscriptions(customerId);
      if (subscriptionsResult.success && subscriptionsResult.subscriptions.length > 0) {
        // Get the first active subscription
        const activeSubscription = subscriptionsResult.subscriptions.find(sub => 
          subscriptionService.isActiveSubscription(sub)
        ) || subscriptionsResult.subscriptions[0];
        
        setSubscription(activeSubscription);
      }

      // Mock add-ons for now - in real implementation, these would be additional subscription items
      setAddOns([
        {
          id: 'addon_extra_location',
          name: 'Extra Location',
          amount: 5,
          quantity: 2
        }
      ]);

    } catch (error) {
      console.error('Error loading subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data. Using demo data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'trialing':
        return <Calendar className="h-4 w-4" />;
      case 'past_due':
      case 'canceled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const calculateTotal = () => {
    const subscriptionAmount = subscription ? subscriptionService.getSubscriptionAmount(subscription) : 0;
    const addOnTotal = addOns.reduce((total, addon) => total + (addon.amount * addon.quantity), 0);
    return subscriptionAmount + addOnTotal;
  };

  const handleUpgrade = (planKey: string) => {
    subscriptionService.openCheckout(planKey);
  };

  const handleAddLocation = () => {
    subscriptionService.openCheckout('extra_location');
  };

  const handleManageSubscription = async () => {
    if (!customer) return;
    
    try {
      setActionLoading(true);
      await subscriptionService.openBillingPortal(customer.id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    try {
      setActionLoading(true);
      const result = await subscriptionService.cancelSubscription(subscription.id, true);
      
      if (result.success) {
        toast({
          title: "Subscription Canceled",
          description: "Your subscription will be canceled at the end of the current period.",
        });
        await loadSubscriptionData(); // Reload data
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!subscription) return;
    
    try {
      setActionLoading(true);
      const result = await subscriptionService.reactivateSubscription(subscription.id);
      
      if (result.success) {
        toast({
          title: "Subscription Reactivated",
          description: "Your subscription has been reactivated successfully.",
        });
        await loadSubscriptionData(); // Reload data
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Loading Subscription Data</h3>
          <p className="text-gray-600">
            Please wait while we load your subscription information...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
          <p className="text-gray-600 mb-4">
            You don't have an active subscription. Choose a plan to get started.
          </p>
          <Button onClick={() => window.location.href = '/pricing'}>
            View Pricing Plans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Subscription
              </CardTitle>
              <CardDescription>
                Manage your BiteBase Intelligence subscription
              </CardDescription>
            </div>
            <Badge className={getStatusColor(subscription.status)}>
              {getStatusIcon(subscription.status)}
              <span className="ml-1 capitalize">{subscription.status}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-lg">{subscriptionService.getSubscriptionPlanName(subscription)} Plan</h4>
              <p className="text-2xl font-bold">
                ${subscriptionService.getSubscriptionAmount(subscription)}
                <span className="text-sm font-normal text-gray-600">
                  /{subscriptionService.getSubscriptionInterval(subscription)}
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Next billing: {subscriptionService.formatDate(subscription.current_period_end)}
              </div>
              {subscription.trial_end && (
                <div className="flex items-center text-sm text-blue-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Trial ends: {subscriptionService.formatDate(subscription.trial_end)}
                  <span className="ml-2 text-xs">
                    ({subscriptionService.calculateTrialDaysRemaining(subscription)} days left)
                  </span>
                </div>
              )}
            </div>
          </div>

          {subscription.cancel_at_period_end && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your subscription will be canceled on {subscriptionService.formatDate(subscription.current_period_end)}.
                You can reactivate it anytime before then.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleManageSubscription} 
              variant="outline"
              disabled={actionLoading}
            >
              {actionLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Settings className="h-4 w-4 mr-2" />
              )}
              Manage Subscription
            </Button>
            <Button onClick={() => handleUpgrade('pro_monthly')} variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
            {subscription.cancel_at_period_end ? (
              <Button 
                onClick={handleReactivateSubscription} 
                variant="default"
                disabled={actionLoading}
              >
                Reactivate
              </Button>
            ) : (
              <Button 
                onClick={handleCancelSubscription} 
                variant="destructive"
                disabled={actionLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add-ons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Add-ons & Extras
          </CardTitle>
          <CardDescription>
            Additional services and features for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {addOns.length > 0 ? (
            <div className="space-y-3">
              {addOns.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{addon.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {addon.quantity} × ${addon.amount}/month
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${addon.amount * addon.quantity}/month
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">
              No add-ons currently active
            </p>
          )}

          <div className="border-t pt-4">
            <Button onClick={handleAddLocation} variant="outline" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Add Extra Location (+$5/month)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Summary</CardTitle>
          <CardDescription>
            Your next billing amount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{subscriptionService.getSubscriptionPlanName(subscription)} Plan</span>
              <span>${subscriptionService.getSubscriptionAmount(subscription)}</span>
            </div>
            {addOns.map((addon) => (
              <div key={addon.id} className="flex justify-between text-sm text-gray-600">
                <span>{addon.name} (×{addon.quantity})</span>
                <span>${addon.amount * addon.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${calculateTotal()}/{subscriptionService.getSubscriptionInterval(subscription)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              onClick={() => window.location.href = '/pricing'} 
              variant="outline"
              className="w-full"
            >
              View All Plans
            </Button>
            <Button 
              onClick={() => window.open('mailto:support@bitebase.app', '_blank')} 
              variant="outline"
              className="w-full"
            >
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManager;