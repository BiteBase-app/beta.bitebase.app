"""
Subscription management API endpoints
"""
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, Any, Optional
import logging

from app.services.stripe_service import stripe_service

logger = logging.getLogger(__name__)

router = APIRouter()

class CreateCustomerRequest(BaseModel):
    email: str
    name: str
    metadata: Optional[Dict[str, Any]] = None

class BillingPortalRequest(BaseModel):
    customer_id: str
    return_url: str

class SubscriptionActionRequest(BaseModel):
    subscription_id: str
    at_period_end: Optional[bool] = True

@router.post("/customers")
async def create_customer(request: CreateCustomerRequest):
    """Create a new Stripe customer"""
    try:
        result = await stripe_service.create_customer(
            email=request.email,
            name=request.name,
            metadata=request.metadata
        )
        
        if result["success"]:
            return {
                "success": True,
                "customer_id": result["customer_id"],
                "message": "Customer created successfully"
            }
        else:
            raise HTTPException(status_code=400, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error creating customer: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/customers/{customer_id}")
async def get_customer(customer_id: str):
    """Get customer details"""
    try:
        result = await stripe_service.get_customer(customer_id)
        
        if result["success"]:
            return {
                "success": True,
                "customer": result["customer"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error retrieving customer: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/customers/{customer_id}/subscriptions")
async def get_customer_subscriptions(customer_id: str):
    """Get all subscriptions for a customer"""
    try:
        result = await stripe_service.get_customer_subscriptions(customer_id)
        
        if result["success"]:
            return {
                "success": True,
                "subscriptions": result["subscriptions"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error retrieving subscriptions: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/subscriptions/{subscription_id}")
async def get_subscription(subscription_id: str):
    """Get subscription details"""
    try:
        result = await stripe_service.get_subscription(subscription_id)
        
        if result["success"]:
            return {
                "success": True,
                "subscription": result["subscription"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error retrieving subscription: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/subscriptions/cancel")
async def cancel_subscription(request: SubscriptionActionRequest):
    """Cancel a subscription"""
    try:
        result = await stripe_service.cancel_subscription(
            subscription_id=request.subscription_id,
            at_period_end=request.at_period_end
        )
        
        if result["success"]:
            return {
                "success": True,
                "subscription": result["subscription"],
                "message": "Subscription canceled successfully"
            }
        else:
            raise HTTPException(status_code=400, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error canceling subscription: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/subscriptions/reactivate")
async def reactivate_subscription(request: SubscriptionActionRequest):
    """Reactivate a canceled subscription"""
    try:
        result = await stripe_service.reactivate_subscription(
            subscription_id=request.subscription_id
        )
        
        if result["success"]:
            return {
                "success": True,
                "subscription": result["subscription"],
                "message": "Subscription reactivated successfully"
            }
        else:
            raise HTTPException(status_code=400, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error reactivating subscription: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/billing-portal")
async def create_billing_portal_session(request: BillingPortalRequest):
    """Create a billing portal session for customer self-service"""
    try:
        result = await stripe_service.create_billing_portal_session(
            customer_id=request.customer_id,
            return_url=request.return_url
        )
        
        if result["success"]:
            return {
                "success": True,
                "url": result["url"]
            }
        else:
            raise HTTPException(status_code=400, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error creating billing portal session: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/customers/{customer_id}/upcoming-invoice")
async def get_upcoming_invoice(customer_id: str):
    """Get the upcoming invoice for a customer"""
    try:
        result = await stripe_service.get_upcoming_invoice(customer_id)
        
        if result["success"]:
            return {
                "success": True,
                "invoice": result["invoice"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error retrieving upcoming invoice: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/customers/{customer_id}/payment-methods")
async def get_payment_methods(customer_id: str):
    """Get payment methods for a customer"""
    try:
        result = await stripe_service.get_payment_methods(customer_id)
        
        if result["success"]:
            return {
                "success": True,
                "payment_methods": result["payment_methods"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["error"])
            
    except Exception as e:
        logger.error(f"Error retrieving payment methods: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/plans/{plan_name}")
async def get_plan_features(plan_name: str):
    """Get features and limits for a specific plan"""
    try:
        plan_info = stripe_service.get_plan_features(plan_name)
        
        if plan_info:
            return {
                "success": True,
                "plan": plan_info
            }
        else:
            raise HTTPException(status_code=404, detail="Plan not found")
            
    except Exception as e:
        logger.error(f"Error retrieving plan features: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/plans")
async def get_all_plans():
    """Get all available plans"""
    try:
        plans = {
            "growth": stripe_service.get_plan_features("growth"),
            "pro": stripe_service.get_plan_features("pro"),
            "enterprise": stripe_service.get_plan_features("enterprise")
        }
        
        return {
            "success": True,
            "plans": plans
        }
        
    except Exception as e:
        logger.error(f"Error retrieving plans: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        payload = await request.body()
        signature = request.headers.get("stripe-signature")
        
        if not signature:
            raise HTTPException(status_code=400, detail="Missing stripe-signature header")
        
        # Verify webhook signature
        if not stripe_service.verify_webhook_signature(payload, signature):
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Parse the event
        import json
        event = json.loads(payload)
        
        # Handle the event
        result = await stripe_service.handle_webhook_event(event)
        
        if result["success"]:
            return JSONResponse(content={"received": True})
        else:
            logger.error(f"Webhook handling failed: {result['error']}")
            return JSONResponse(content={"received": False}, status_code=400)
            
    except Exception as e:
        logger.error(f"Error handling webhook: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Pricing links for easy access
@router.get("/pricing-links")
async def get_pricing_links():
    """Get all Stripe pricing links"""
    return {
        "success": True,
        "links": {
            "growth_monthly": "https://buy.stripe.com/cN23eSeqgfPVdi04go",
            "growth_yearly": "https://buy.stripe.com/cN23eSeqgfPVdi04go",
            "pro_monthly": "https://buy.stripe.com/fZe2aO5TKavBa5OaEN",
            "pro_yearly": "https://buy.stripe.com/fZe2aO5TKavBa5OaEN",
            "enterprise_monthly": "https://buy.stripe.com/fZeg1EfukgTZ3Hq28i",
            "enterprise_yearly": "https://buy.stripe.com/fZeg1EfukgTZ3Hq28i",
            "extra_location": "https://buy.stripe.com/aEUbLo4PG3390veaEL"
        }
    }