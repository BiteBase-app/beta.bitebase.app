import random
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta

from app.models.restaurant_profile import RestaurantProfile


def get_market_trends(cuisine_type: Optional[str] = None, location: Optional[str] = None) -> Dict[str, Any]:
    """
    Get market trends for restaurants.
    
    In a real implementation, this would use real market data.
    This is a mock implementation.
    """
    # Filter trends by cuisine type if provided
    cuisine_trends = _get_cuisine_trends()
    if cuisine_type:
        cuisine_trends = {k: v for k, v in cuisine_trends.items() if cuisine_type.lower() in k.lower()}
    
    # Filter trends by location if provided
    location_trends = _get_location_trends()
    if location:
        location_trends = {k: v for k, v in location_trends.items() if location.lower() in k.lower()}
    
    return {
        "industry_growth_rate": round(random.uniform(2.0, 8.0), 1),
        "cuisine_trends": cuisine_trends,
        "location_trends": location_trends,
        "consumer_preferences": _get_consumer_preferences(),
        "emerging_trends": [
            "Plant-based menu options",
            "Sustainable packaging",
            "Ghost kitchens",
            "Contactless ordering",
            "Hyper-local sourcing",
        ],
    }


def get_competitor_analysis(restaurant_profile: RestaurantProfile) -> Dict[str, Any]:
    """
    Get competitor analysis for a restaurant profile.
    
    In a real implementation, this would use real competitor data.
    This is a mock implementation.
    """
    competitors = []
    for i in range(random.randint(5, 10)):
        competitors.append({
            "name": f"Competitor {i+1}",
            "cuisine": restaurant_profile.cuisine_type or "Thai",
            "distance": round(random.uniform(0.2, 2.0), 1),
            "rating": round(random.uniform(3.0, 4.8), 1),
            "price_level": "$" * random.randint(1, 4),
            "strengths": _get_random_strengths(),
            "weaknesses": _get_random_weaknesses(),
            "market_share": round(random.uniform(2.0, 15.0), 1),
        })
    
    return {
        "total_competitors": len(competitors),
        "competitors": competitors,
        "market_saturation": round(random.uniform(30.0, 90.0), 1),
        "competitive_positioning": {
            "price": _get_competitive_position(),
            "quality": _get_competitive_position(),
            "variety": _get_competitive_position(),
            "service": _get_competitive_position(),
            "ambiance": _get_competitive_position(),
        },
        "opportunity_areas": _get_opportunity_areas(),
    }


def get_performance_forecast(restaurant_profile: RestaurantProfile, months: int = 12) -> Dict[str, Any]:
    """
    Get performance forecast for a restaurant profile.
    
    In a real implementation, this would use real market data and ML models.
    This is a mock implementation.
    """
    # Generate monthly revenue forecast
    revenue_forecast = []
    customer_forecast = []
    
    # Start with a base value and add some randomness and growth
    base_revenue = random.randint(300000, 1000000)
    base_customers = random.randint(1000, 5000)
    growth_rate = random.uniform(1.01, 1.05)  # 1-5% monthly growth
    
    for i in range(months):
        # Add seasonality effect
        month = (datetime.now().month + i) % 12 + 1
        seasonality = _get_seasonality_factor(month)
        
        # Calculate revenue and customers with growth and seasonality
        revenue = base_revenue * (growth_rate ** i) * seasonality
        customers = base_customers * (growth_rate ** i) * seasonality
        
        # Add some randomness
        revenue *= random.uniform(0.9, 1.1)
        customers *= random.uniform(0.9, 1.1)
        
        revenue_forecast.append(round(revenue))
        customer_forecast.append(round(customers))
    
    # Generate monthly profit forecast (assume 15-25% profit margin)
    profit_margin = random.uniform(0.15, 0.25)
    profit_forecast = [round(revenue * profit_margin) for revenue in revenue_forecast]
    
    return {
        "revenue_forecast": revenue_forecast,
        "customer_forecast": customer_forecast,
        "profit_forecast": profit_forecast,
        "break_even_point": round(base_revenue * 0.7),  # Simplified break-even calculation
        "roi_estimate": round(random.uniform(15.0, 40.0), 1),
        "key_performance_indicators": {
            "average_check": round(revenue_forecast[0] / customer_forecast[0]),
            "customer_retention_rate": round(random.uniform(20.0, 60.0), 1),
            "table_turnover_rate": round(random.uniform(1.5, 4.0), 1),
            "food_cost_percentage": round(random.uniform(25.0, 35.0), 1),
            "labor_cost_percentage": round(random.uniform(25.0, 40.0), 1),
        },
    }


def get_customer_demographics(restaurant_profile: RestaurantProfile) -> Dict[str, Any]:
    """
    Get customer demographics for a restaurant profile.
    
    In a real implementation, this would use real customer data.
    This is a mock implementation.
    """
    return {
        "age_distribution": {
            "18-24": random.randint(5, 25),
            "25-34": random.randint(15, 35),
            "35-44": random.randint(15, 30),
            "45-54": random.randint(10, 25),
            "55-64": random.randint(5, 20),
            "65+": random.randint(5, 15),
        },
        "gender_distribution": {
            "male": random.randint(40, 60),
            "female": random.randint(40, 60),
            "other": random.randint(0, 5),
        },
        "income_levels": {
            "low": random.randint(10, 30),
            "medium": random.randint(30, 60),
            "high": random.randint(10, 40),
        },
        "dining_preferences": {
            "dine_in": random.randint(40, 70),
            "takeout": random.randint(20, 40),
            "delivery": random.randint(10, 30),
        },
        "visit_frequency": {
            "first_time": random.randint(10, 30),
            "occasional": random.randint(30, 50),
            "regular": random.randint(20, 40),
        },
        "customer_personas": _get_customer_personas(),
    }


# Helper functions for mock data generation

def _get_cuisine_trends() -> Dict[str, float]:
    """Get mock cuisine trends"""
    return {
        "Thai": round(random.uniform(-5.0, 15.0), 1),
        "Japanese": round(random.uniform(-5.0, 15.0), 1),
        "Italian": round(random.uniform(-5.0, 15.0), 1),
        "Chinese": round(random.uniform(-5.0, 15.0), 1),
        "Indian": round(random.uniform(-5.0, 15.0), 1),
        "American": round(random.uniform(-5.0, 15.0), 1),
        "Mexican": round(random.uniform(-5.0, 15.0), 1),
        "Mediterranean": round(random.uniform(-5.0, 15.0), 1),
        "Plant-based": round(random.uniform(5.0, 20.0), 1),
        "Fusion": round(random.uniform(0.0, 15.0), 1),
    }


def _get_location_trends() -> Dict[str, float]:
    """Get mock location trends"""
    return {
        "Downtown": round(random.uniform(-5.0, 15.0), 1),
        "Suburban": round(random.uniform(-5.0, 15.0), 1),
        "Shopping Centers": round(random.uniform(-5.0, 15.0), 1),
        "Tourist Areas": round(random.uniform(-5.0, 15.0), 1),
        "Business Districts": round(random.uniform(-5.0, 15.0), 1),
        "Residential Areas": round(random.uniform(-5.0, 15.0), 1),
        "Food Courts": round(random.uniform(-5.0, 15.0), 1),
        "Ghost Kitchens": round(random.uniform(5.0, 20.0), 1),
    }


def _get_consumer_preferences() -> List[Dict[str, Any]]:
    """Get mock consumer preferences"""
    return [
        {"factor": "Taste", "importance": random.randint(80, 95)},
        {"factor": "Price", "importance": random.randint(70, 90)},
        {"factor": "Service", "importance": random.randint(60, 85)},
        {"factor": "Ambiance", "importance": random.randint(50, 80)},
        {"factor": "Convenience", "importance": random.randint(60, 85)},
        {"factor": "Healthiness", "importance": random.randint(50, 80)},
        {"factor": "Sustainability", "importance": random.randint(40, 70)},
        {"factor": "Uniqueness", "importance": random.randint(40, 70)},
    ]


def _get_random_strengths() -> List[str]:
    """Get random restaurant strengths"""
    all_strengths = [
        "Great food quality",
        "Excellent service",
        "Unique menu items",
        "Strong brand recognition",
        "Prime location",
        "Competitive pricing",
        "Attractive ambiance",
        "Efficient operations",
        "Strong social media presence",
        "Loyal customer base",
    ]
    return random.sample(all_strengths, random.randint(2, 4))


def _get_random_weaknesses() -> List[str]:
    """Get random restaurant weaknesses"""
    all_weaknesses = [
        "Inconsistent food quality",
        "Slow service",
        "Limited menu variety",
        "Weak brand recognition",
        "Poor location",
        "High prices",
        "Outdated decor",
        "Inefficient operations",
        "Weak online presence",
        "Low customer loyalty",
    ]
    return random.sample(all_weaknesses, random.randint(2, 4))


def _get_competitive_position() -> Dict[str, Any]:
    """Get mock competitive position"""
    position = random.randint(1, 5)
    percentile = random.randint(max(0, (position-1)*20), min(100, position*20))
    
    return {
        "rating": position,
        "percentile": percentile,
        "description": _get_position_description(position),
    }


def _get_position_description(position: int) -> str:
    """Get description for competitive position"""
    descriptions = {
        1: "Significantly below competitors",
        2: "Somewhat below competitors",
        3: "On par with competitors",
        4: "Somewhat above competitors",
        5: "Significantly above competitors",
    }
    return descriptions.get(position, "Unknown")


def _get_opportunity_areas() -> List[str]:
    """Get mock opportunity areas"""
    all_opportunities = [
        "Expand menu with plant-based options",
        "Improve online ordering experience",
        "Develop loyalty program",
        "Enhance social media marketing",
        "Optimize pricing strategy",
        "Improve table turnover efficiency",
        "Expand delivery radius",
        "Introduce seasonal menu items",
        "Enhance ambiance and decor",
        "Implement sustainability initiatives",
        "Offer cooking classes or events",
        "Develop signature dishes",
    ]
    return random.sample(all_opportunities, random.randint(3, 5))


def _get_seasonality_factor(month: int) -> float:
    """Get seasonality factor for a given month"""
    # Higher values in tourist season and holidays
    seasonality_factors = {
        1: 1.1,  # January (New Year)
        2: 1.05,  # February (Valentine's Day)
        3: 1.0,   # March
        4: 1.0,   # April
        5: 0.95,  # May
        6: 0.9,   # June
        7: 0.9,   # July
        8: 0.95,  # August
        9: 1.0,   # September
        10: 1.0,  # October
        11: 1.05, # November (Thanksgiving)
        12: 1.15, # December (Holidays)
    }
    return seasonality_factors.get(month, 1.0)


def _get_customer_personas() -> List[Dict[str, Any]]:
    """Get mock customer personas"""
    return [
        {
            "name": "Young Professionals",
            "percentage": random.randint(20, 40),
            "characteristics": [
                "Age 25-35",
                "Higher disposable income",
                "Tech-savvy",
                "Values experience",
                "Frequent social media users",
            ],
            "dining_preferences": [
                "After-work dining",
                "Weekend brunches",
                "Delivery during weekdays",
            ],
        },
        {
            "name": "Families",
            "percentage": random.randint(15, 35),
            "characteristics": [
                "Parents with children",
                "Value-conscious",
                "Prioritize convenience",
                "Look for kid-friendly options",
                "Plan meals in advance",
            ],
            "dining_preferences": [
                "Early dinners",
                "Weekend lunches",
                "Special occasion dining",
            ],
        },
        {
            "name": "Tourists",
            "percentage": random.randint(10, 30),
            "characteristics": [
                "Visiting the area",
                "Looking for local experiences",
                "Less price-sensitive",
                "Interested in authentic cuisine",
                "Rely on reviews and recommendations",
            ],
            "dining_preferences": [
                "Lunch and dinner",
                "Willing to wait for popular spots",
                "Interested in signature dishes",
            ],
        },
    ]
