"""
Stripe Service for handling subscription management and payments
"""
import stripe
import logging
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from app.core.config import settings

logger = logging.getLogger(__name__)

# Configure Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeService:
    """Service for handling Stripe operations"""
    
    def __init__(self):
        self.webhook_secret = settings.STRIPE_WEBHOOK_SECRET
        
    async def create_customer(self, email: str, name: str, metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        """Create a new Stripe customer"""
        try:
            customer = stripe.Customer.create(
                email=email,
                name=name,
                metadata=metadata or {}
            )
            return {
                "success": True,
                "customer_id": customer.id,
                "customer": customer
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error creating Stripe customer: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_customer(self, customer_id: str) -> Dict[str, Any]:
        """Get customer details"""
        try:
            customer = stripe.Customer.retrieve(customer_id)
            return {
                "success": True,
                "customer": customer
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error retrieving customer: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_customer_subscriptions(self, customer_id: str) -> Dict[str, Any]:
        """Get all subscriptions for a customer"""
        try:
            subscriptions = stripe.Subscription.list(
                customer=customer_id,
                status='all'
            )
            return {
                "success": True,
                "subscriptions": subscriptions.data
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error retrieving subscriptions: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_subscription(self, subscription_id: str) -> Dict[str, Any]:
        """Get subscription details"""
        try:
            subscription = stripe.Subscription.retrieve(subscription_id)
            return {
                "success": True,
                "subscription": subscription
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error retrieving subscription: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def cancel_subscription(self, subscription_id: str, at_period_end: bool = True) -> Dict[str, Any]:
        """Cancel a subscription"""
        try:
            subscription = stripe.Subscription.modify(
                subscription_id,
                cancel_at_period_end=at_period_end
            )
            return {
                "success": True,
                "subscription": subscription
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error canceling subscription: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def reactivate_subscription(self, subscription_id: str) -> Dict[str, Any]:
        """Reactivate a canceled subscription"""
        try:
            subscription = stripe.Subscription.modify(
                subscription_id,
                cancel_at_period_end=False
            )
            return {
                "success": True,
                "subscription": subscription
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error reactivating subscription: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def create_billing_portal_session(self, customer_id: str, return_url: str) -> Dict[str, Any]:
        """Create a billing portal session for customer self-service"""
        try:
            session = stripe.billing_portal.Session.create(
                customer=customer_id,
                return_url=return_url
            )
            return {
                "success": True,
                "url": session.url
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error creating billing portal session: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_upcoming_invoice(self, customer_id: str) -> Dict[str, Any]:
        """Get the upcoming invoice for a customer"""
        try:
            invoice = stripe.Invoice.upcoming(customer=customer_id)
            return {
                "success": True,
                "invoice": invoice
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error retrieving upcoming invoice: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_payment_methods(self, customer_id: str) -> Dict[str, Any]:
        """Get payment methods for a customer"""
        try:
            payment_methods = stripe.PaymentMethod.list(
                customer=customer_id,
                type="card"
            )
            return {
                "success": True,
                "payment_methods": payment_methods.data
            }
        except stripe.error.StripeError as e:
            logger.error(f"Error retrieving payment methods: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify webhook signature"""
        try:
            stripe.Webhook.construct_event(
                payload, signature, self.webhook_secret
            )
            return True
        except ValueError:
            logger.error("Invalid payload")
            return False
        except stripe.error.SignatureVerificationError:
            logger.error("Invalid signature")
            return False
    
    async def handle_webhook_event(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """Handle Stripe webhook events"""
        event_type = event['type']
        
        try:
            if event_type == 'customer.subscription.created':
                return await self._handle_subscription_created(event['data']['object'])
            elif event_type == 'customer.subscription.updated':
                return await self._handle_subscription_updated(event['data']['object'])
            elif event_type == 'customer.subscription.deleted':
                return await self._handle_subscription_deleted(event['data']['object'])
            elif event_type == 'invoice.payment_succeeded':
                return await self._handle_payment_succeeded(event['data']['object'])
            elif event_type == 'invoice.payment_failed':
                return await self._handle_payment_failed(event['data']['object'])
            elif event_type == 'customer.subscription.trial_will_end':
                return await self._handle_trial_will_end(event['data']['object'])
            else:
                logger.info(f"Unhandled event type: {event_type}")
                return {"success": True, "message": f"Unhandled event type: {event_type}"}
                
        except Exception as e:
            logger.error(f"Error handling webhook event {event_type}: {e}")
            return {"success": False, "error": str(e)}
    
    async def _handle_subscription_created(self, subscription: Dict[str, Any]) -> Dict[str, Any]:
        """Handle subscription created event"""
        logger.info(f"Subscription created: {subscription['id']}")
        
        # Update user subscription status in database
        # This would typically involve updating your user model
        
        return {"success": True, "message": "Subscription created"}
    
    async def _handle_subscription_updated(self, subscription: Dict[str, Any]) -> Dict[str, Any]:
        """Handle subscription updated event"""
        logger.info(f"Subscription updated: {subscription['id']}")
        
        # Update user subscription status in database
        
        return {"success": True, "message": "Subscription updated"}
    
    async def _handle_subscription_deleted(self, subscription: Dict[str, Any]) -> Dict[str, Any]:
        """Handle subscription deleted event"""
        logger.info(f"Subscription deleted: {subscription['id']}")
        
        # Update user subscription status in database
        
        return {"success": True, "message": "Subscription deleted"}
    
    async def _handle_payment_succeeded(self, invoice: Dict[str, Any]) -> Dict[str, Any]:
        """Handle successful payment"""
        logger.info(f"Payment succeeded for invoice: {invoice['id']}")
        
        # Update payment records in database
        
        return {"success": True, "message": "Payment succeeded"}
    
    async def _handle_payment_failed(self, invoice: Dict[str, Any]) -> Dict[str, Any]:
        """Handle failed payment"""
        logger.info(f"Payment failed for invoice: {invoice['id']}")
        
        # Handle failed payment (send notifications, update status, etc.)
        
        return {"success": True, "message": "Payment failed handled"}
    
    async def _handle_trial_will_end(self, subscription: Dict[str, Any]) -> Dict[str, Any]:
        """Handle trial ending soon"""
        logger.info(f"Trial will end for subscription: {subscription['id']}")
        
        # Send trial ending notification
        
        return {"success": True, "message": "Trial ending notification sent"}
    
    def get_plan_features(self, plan_name: str) -> Dict[str, Any]:
        """Get features for a specific plan"""
        plans = {
            "growth": {
                "name": "Growth",
                "price_monthly": 14.99,
                "price_yearly": 9.99,
                "features": [
                    "Restaurant Brain AI insights",
                    "Basic POS integration",
                    "Real-time monitoring",
                    "Monthly reports",
                    "Email support",
                    "Up to 1 location",
                    "Basic forecasting",
                    "Social media analytics"
                ],
                "limits": {
                    "locations": 1,
                    "api_calls_per_month": 10000,
                    "storage_gb": 5
                }
            },
            "pro": {
                "name": "Pro",
                "price_monthly": 109,
                "price_yearly": 89,
                "features": [
                    "Everything in Growth",
                    "Advanced AI research engine",
                    "Multi-POS integration",
                    "Google Maps intelligence",
                    "Competitor tracking",
                    "Advanced forecasting",
                    "Procurement optimization",
                    "Daily/weekly reports",
                    "Priority support",
                    "Up to 3 locations",
                    "Custom integrations",
                    "API access"
                ],
                "limits": {
                    "locations": 3,
                    "api_calls_per_month": 100000,
                    "storage_gb": 50
                }
            },
            "enterprise": {
                "name": "Enterprise",
                "price_monthly": 599,
                "price_yearly": 499,
                "features": [
                    "Everything in Pro",
                    "Unlimited locations",
                    "White-label solution",
                    "Custom AI models",
                    "Advanced analytics",
                    "Real-time alerts",
                    "Dedicated account manager",
                    "Custom integrations",
                    "SLA guarantee",
                    "Advanced security",
                    "Custom reporting",
                    "Training & onboarding"
                ],
                "limits": {
                    "locations": -1,  # Unlimited
                    "api_calls_per_month": -1,  # Unlimited
                    "storage_gb": -1  # Unlimited
                }
            }
        }
        
        return plans.get(plan_name.lower(), {})

# Global instance
stripe_service = StripeService()