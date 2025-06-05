/**
 * Subscription Service for handling Stripe subscription management
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Customer {
  id: string;
  email: string;
  name: string;
  created: number;
  metadata: Record<string, any>;
}

export interface Subscription {
  id: string;
  customer: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  trial_end?: number;
  items: {
    data: Array<{
      id: string;
      price: {
        id: string;
        nickname?: string;
        unit_amount: number;
        recurring: {
          interval: 'month' | 'year';
        };
      };
      quantity: number;
    }>;
  };
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface Invoice {
  id: string;
  amount_due: number;
  amount_paid: number;
  currency: string;
  status: string;
  period_start: number;
  period_end: number;
  lines: {
    data: Array<{
      description: string;
      amount: number;
      quantity: number;
    }>;
  };
}

export interface PlanInfo {
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  limits: {
    locations: number;
    api_calls_per_month: number;
    storage_gb: number;
  };
}

class SubscriptionService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/api/v1/subscriptions${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.detail || error.message || 'Request failed');
    }

    return response.json();
  }

  async createCustomer(email: string, name: string, metadata?: Record<string, any>) {
    return this.makeRequest('/customers', {
      method: 'POST',
      body: JSON.stringify({ email, name, metadata }),
    });
  }

  async getCustomer(customerId: string): Promise<{ success: boolean; customer: Customer }> {
    return this.makeRequest(`/customers/${customerId}`);
  }

  async getCustomerSubscriptions(customerId: string): Promise<{ success: boolean; subscriptions: Subscription[] }> {
    return this.makeRequest(`/customers/${customerId}/subscriptions`);
  }

  async getSubscription(subscriptionId: string): Promise<{ success: boolean; subscription: Subscription }> {
    return this.makeRequest(`/subscriptions/${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId: string, atPeriodEnd: boolean = true) {
    return this.makeRequest('/subscriptions/cancel', {
      method: 'POST',
      body: JSON.stringify({ subscription_id: subscriptionId, at_period_end: atPeriodEnd }),
    });
  }

  async reactivateSubscription(subscriptionId: string) {
    return this.makeRequest('/subscriptions/reactivate', {
      method: 'POST',
      body: JSON.stringify({ subscription_id: subscriptionId }),
    });
  }

  async createBillingPortalSession(customerId: string, returnUrl: string): Promise<{ success: boolean; url: string }> {
    return this.makeRequest('/billing-portal', {
      method: 'POST',
      body: JSON.stringify({ customer_id: customerId, return_url: returnUrl }),
    });
  }

  async getUpcomingInvoice(customerId: string): Promise<{ success: boolean; invoice: Invoice }> {
    return this.makeRequest(`/customers/${customerId}/upcoming-invoice`);
  }

  async getPaymentMethods(customerId: string): Promise<{ success: boolean; payment_methods: PaymentMethod[] }> {
    return this.makeRequest(`/customers/${customerId}/payment-methods`);
  }

  async getPlanFeatures(planName: string): Promise<{ success: boolean; plan: PlanInfo }> {
    return this.makeRequest(`/plans/${planName}`);
  }

  async getAllPlans(): Promise<{ success: boolean; plans: Record<string, PlanInfo> }> {
    return this.makeRequest('/plans');
  }

  async getPricingLinks(): Promise<{ success: boolean; links: Record<string, string> }> {
    return this.makeRequest('/pricing-links');
  }

  // Helper methods for subscription status
  isActiveSubscription(subscription: Subscription): boolean {
    return subscription.status === 'active' || subscription.status === 'trialing';
  }

  isTrialSubscription(subscription: Subscription): boolean {
    return subscription.status === 'trialing';
  }

  isCanceledSubscription(subscription: Subscription): boolean {
    return subscription.status === 'canceled' || subscription.cancel_at_period_end;
  }

  isPastDueSubscription(subscription: Subscription): boolean {
    return subscription.status === 'past_due';
  }

  getSubscriptionPlanName(subscription: Subscription): string {
    const priceNickname = subscription.items.data[0]?.price?.nickname;
    if (priceNickname) {
      return priceNickname;
    }

    // Fallback to price ID mapping
    const priceId = subscription.items.data[0]?.price?.id;
    const planMapping: Record<string, string> = {
      // Add your actual Stripe price IDs here
      'price_growth_monthly': 'Growth',
      'price_growth_yearly': 'Growth',
      'price_pro_monthly': 'Pro',
      'price_pro_yearly': 'Pro',
      'price_enterprise_monthly': 'Enterprise',
      'price_enterprise_yearly': 'Enterprise',
    };

    return planMapping[priceId] || 'Unknown Plan';
  }

  getSubscriptionAmount(subscription: Subscription): number {
    return subscription.items.data.reduce((total, item) => {
      return total + (item.price.unit_amount * item.quantity);
    }, 0) / 100; // Convert from cents to dollars
  }

  getSubscriptionInterval(subscription: Subscription): 'month' | 'year' {
    return subscription.items.data[0]?.price?.recurring?.interval || 'month';
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  calculateTrialDaysRemaining(subscription: Subscription): number {
    if (!subscription.trial_end) return 0;
    
    const now = Math.floor(Date.now() / 1000);
    const daysRemaining = Math.ceil((subscription.trial_end - now) / (24 * 60 * 60));
    
    return Math.max(0, daysRemaining);
  }

  // Get pricing links (these should match your actual Stripe payment links)
  private getPricingLinksData() {
    return {
      growth_monthly: 'https://buy.stripe.com/cN23eSeqgfPVdi04go',
      growth_yearly: 'https://buy.stripe.com/cN23eSeqgfPVdi04go',
      pro_monthly: 'https://buy.stripe.com/fZe2aO5TKavBa5OaEN',
      pro_yearly: 'https://buy.stripe.com/fZe2aO5TKavBa5OaEN',
      enterprise_monthly: 'https://buy.stripe.com/fZeg1EfukgTZ3Hq28i',
      enterprise_yearly: 'https://buy.stripe.com/fZeg1EfukgTZ3Hq28i',
      extra_location: 'https://buy.stripe.com/aEUbLo4PG3390veaEL',
    };
  }

  // Open Stripe checkout for a specific plan
  openCheckout(planKey: string) {
    const links = this.getPricingLinksData();
    const link = links[planKey as keyof typeof links];
    
    if (link) {
      window.open(link, '_blank');
    } else {
      console.error(`No pricing link found for plan: ${planKey}`);
    }
  }

  // Open billing portal for customer self-service
  async openBillingPortal(customerId: string) {
    try {
      const returnUrl = window.location.origin + '/settings?tab=subscription';
      const result = await this.createBillingPortalSession(customerId, returnUrl);
      
      if (result.success) {
        window.open(result.url, '_blank');
      } else {
        throw new Error('Failed to create billing portal session');
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      throw error;
    }
  }
}

export const subscriptionService = new SubscriptionService();
export default subscriptionService;