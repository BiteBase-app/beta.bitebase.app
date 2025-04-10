import random
from typing import Dict, Any, List, Optional
import requests
import json

from app.core.config import settings


def get_location_data(latitude: float, longitude: float, radius: float) -> Dict[str, Any]:
    """
    Get comprehensive location data for a given coordinate.
    
    In a real implementation, this would integrate with various APIs
    to get real location data. This is a mock implementation.
    """
    # Try to get real data if API keys are available
    if settings.GOOGLE_PLACES_API_KEY:
        try:
            return _get_google_places_data(latitude, longitude, radius)
        except Exception as e:
            print(f"Error getting Google Places data: {str(e)}")
    
    # Fallback to mock data
    return {
        "location_score": round(random.uniform(50, 95), 1),
        "nearby_places": _generate_mock_nearby_places(),
        "accessibility": {
            "public_transport": round(random.uniform(1, 5), 1),
            "walking": round(random.uniform(1, 5), 1),
            "parking": round(random.uniform(1, 5), 1),
        },
        "visibility": round(random.uniform(1, 5), 1),
        "foot_traffic": _generate_mock_foot_traffic(),
        "competitors": _generate_mock_competitors(5),
    }


def get_nearby_competitors(
    latitude: float, 
    longitude: float, 
    radius: float, 
    cuisine_type: Optional[str] = None
) -> Dict[str, Any]:
    """
    Get nearby competitors for a given location.
    
    In a real implementation, this would use Google Places API or Yelp API
    to get real competitor data. This is a mock implementation.
    """
    # Try to get real data if API keys are available
    if settings.GOOGLE_PLACES_API_KEY:
        try:
            return _get_google_places_competitors(latitude, longitude, radius, cuisine_type)
        except Exception as e:
            print(f"Error getting Google Places competitors: {str(e)}")
    
    # Fallback to mock data
    competitor_count = random.randint(3, 12)
    return {
        "total_competitors": competitor_count,
        "competitors": _generate_mock_competitors(competitor_count, cuisine_type),
        "average_rating": round(random.uniform(3.0, 4.5), 1),
        "price_level_distribution": {
            "$": random.randint(10, 40),
            "$$": random.randint(30, 60),
            "$$$": random.randint(10, 40),
            "$$$$": random.randint(0, 20),
        },
    }


def get_foot_traffic(latitude: float, longitude: float) -> Dict[str, Any]:
    """
    Get foot traffic data for a given location.
    
    In a real implementation, this would use specialized foot traffic APIs
    or data providers. This is a mock implementation.
    """
    return {
        "daily_average": random.randint(500, 5000),
        "hourly_distribution": _generate_mock_hourly_distribution(),
        "weekly_distribution": _generate_mock_weekly_distribution(),
        "peak_hours": [
            {"day": "Monday", "hour": "12:00-13:00", "traffic": random.randint(100, 500)},
            {"day": "Friday", "hour": "18:00-19:00", "traffic": random.randint(200, 800)},
            {"day": "Saturday", "hour": "19:00-20:00", "traffic": random.randint(300, 1000)},
        ],
        "seasonal_variations": {
            "high_season": {
                "months": ["November", "December", "January"],
                "increase_percentage": round(random.uniform(10, 50), 1),
            },
            "low_season": {
                "months": ["April", "May", "September"],
                "decrease_percentage": round(random.uniform(10, 30), 1),
            },
        },
    }


def get_demographic_data(latitude: float, longitude: float, radius: float) -> Dict[str, Any]:
    """
    Get demographic data for a given location.
    
    In a real implementation, this would use census data or specialized
    demographic data providers. This is a mock implementation.
    """
    # Try to get real data if API keys are available
    if settings.CENSUS_API_KEY:
        try:
            return _get_census_data(latitude, longitude, radius)
        except Exception as e:
            print(f"Error getting census data: {str(e)}")
    
    # Fallback to mock data
    return {
        "population": {
            "total": random.randint(5000, 50000),
            "density": round(random.uniform(1000, 10000), 2),
            "growth_rate": round(random.uniform(-2, 5), 1),
        },
        "age_distribution": {
            "0-17": random.randint(5, 25),
            "18-24": random.randint(5, 25),
            "25-34": random.randint(15, 35),
            "35-44": random.randint(15, 30),
            "45-54": random.randint(10, 25),
            "55-64": random.randint(5, 20),
            "65+": random.randint(5, 15),
        },
        "income_levels": {
            "low": random.randint(10, 40),
            "medium": random.randint(30, 60),
            "high": random.randint(10, 40),
        },
        "education_levels": {
            "high_school": random.randint(10, 40),
            "bachelor": random.randint(20, 50),
            "graduate": random.randint(10, 30),
        },
        "household_types": {
            "single": random.randint(20, 40),
            "couples": random.randint(20, 40),
            "families": random.randint(20, 40),
        },
    }


# Helper functions for mock data generation

def _generate_mock_nearby_places() -> List[Dict[str, Any]]:
    """Generate mock nearby places"""
    place_types = [
        "Shopping Mall", "Office Building", "Hotel", "Park", 
        "School", "Hospital", "Residential Area", "Tourist Attraction"
    ]
    
    places = []
    for _ in range(random.randint(5, 10)):
        places.append({
            "name": f"{random.choice(place_types)} {random.randint(1, 100)}",
            "type": random.choice(place_types),
            "distance": round(random.uniform(0.1, 2.0), 1),
            "popularity": round(random.uniform(1, 5), 1),
        })
    
    return places


def _generate_mock_foot_traffic() -> Dict[str, Any]:
    """Generate mock foot traffic data"""
    return {
        "weekday_average": random.randint(500, 5000),
        "weekend_average": random.randint(1000, 8000),
        "morning_rush": random.randint(100, 1000),
        "lunch_rush": random.randint(300, 3000),
        "evening_rush": random.randint(500, 5000),
    }


def _generate_mock_competitors(count: int, cuisine_type: Optional[str] = None) -> List[Dict[str, Any]]:
    """Generate mock competitor data"""
    cuisines = ["Thai", "Italian", "Japanese", "American", "Chinese", "Indian", "French", "Mexican"]
    if cuisine_type:
        cuisines = [cuisine_type] + [c for c in cuisines if c != cuisine_type]
    
    competitors = []
    for i in range(count):
        competitors.append({
            "name": f"Restaurant {i+1}",
            "cuisine": random.choice(cuisines),
            "rating": round(random.uniform(3.0, 4.8), 1),
            "reviews": random.randint(10, 500),
            "price_level": "$" * random.randint(1, 4),
            "distance": round(random.uniform(0.1, 2.0), 1),
            "popular_dishes": [f"Dish {j+1}" for j in range(random.randint(2, 5))],
        })
    
    return competitors


def _generate_mock_hourly_distribution() -> Dict[str, int]:
    """Generate mock hourly distribution"""
    hours = {}
    for hour in range(24):
        if hour < 6:
            hours[f"{hour:02d}:00"] = random.randint(0, 50)
        elif hour < 11:
            hours[f"{hour:02d}:00"] = random.randint(50, 200)
        elif hour < 14:
            hours[f"{hour:02d}:00"] = random.randint(200, 500)
        elif hour < 17:
            hours[f"{hour:02d}:00"] = random.randint(100, 300)
        elif hour < 21:
            hours[f"{hour:02d}:00"] = random.randint(300, 600)
        else:
            hours[f"{hour:02d}:00"] = random.randint(50, 300)
    
    return hours


def _generate_mock_weekly_distribution() -> Dict[str, int]:
    """Generate mock weekly distribution"""
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    distribution = {}
    
    for day in days:
        if day in ["Saturday", "Sunday"]:
            distribution[day] = random.randint(1000, 3000)
        elif day in ["Friday"]:
            distribution[day] = random.randint(800, 2000)
        else:
            distribution[day] = random.randint(500, 1500)
    
    return distribution


# Functions for real API integrations

def _get_google_places_data(latitude: float, longitude: float, radius: float) -> Dict[str, Any]:
    """Get location data from Google Places API"""
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{latitude},{longitude}",
        "radius": radius * 1000,  # Convert km to meters
        "key": settings.GOOGLE_PLACES_API_KEY
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    if data["status"] != "OK":
        raise ValueError(f"Google Places API error: {data['status']}")
    
    # Process the data into our format
    nearby_places = []
    for place in data["results"]:
        nearby_places.append({
            "name": place["name"],
            "type": place.get("types", ["unknown"])[0],
            "distance": _calculate_distance(
                latitude, longitude, 
                place["geometry"]["location"]["lat"], 
                place["geometry"]["location"]["lng"]
            ),
            "popularity": place.get("user_ratings_total", 0) / 100 if place.get("user_ratings_total") else 1,
        })
    
    return {
        "location_score": _calculate_location_score(data["results"]),
        "nearby_places": nearby_places,
        "accessibility": _calculate_accessibility(data["results"]),
        "visibility": _calculate_visibility(data["results"]),
        # We don't have real foot traffic data from Google Places
        "foot_traffic": _generate_mock_foot_traffic(),
        # We'll get competitors separately
        "competitors": [],
    }


def _get_google_places_competitors(
    latitude: float, 
    longitude: float, 
    radius: float, 
    cuisine_type: Optional[str] = None
) -> Dict[str, Any]:
    """Get competitor data from Google Places API"""
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{latitude},{longitude}",
        "radius": radius * 1000,  # Convert km to meters
        "type": "restaurant",
        "key": settings.GOOGLE_PLACES_API_KEY
    }
    
    if cuisine_type:
        params["keyword"] = cuisine_type
    
    response = requests.get(url, params=params)
    data = response.json()
    
    if data["status"] != "OK":
        raise ValueError(f"Google Places API error: {data['status']}")
    
    # Process the data into our format
    competitors = []
    price_levels = {"$": 0, "$$": 0, "$$$": 0, "$$$$": 0}
    total_rating = 0
    
    for place in data["results"]:
        price_level = "$" * (place.get("price_level", 1) or 1)
        price_levels[price_level] += 1
        total_rating += place.get("rating", 0)
        
        # Get place details to get popular dishes
        place_details = _get_place_details(place["place_id"])
        popular_dishes = _extract_popular_dishes(place_details)
        
        competitors.append({
            "name": place["name"],
            "cuisine": _extract_cuisine_type(place),
            "rating": place.get("rating", 0),
            "reviews": place.get("user_ratings_total", 0),
            "price_level": price_level,
            "distance": _calculate_distance(
                latitude, longitude, 
                place["geometry"]["location"]["lat"], 
                place["geometry"]["location"]["lng"]
            ),
            "popular_dishes": popular_dishes,
        })
    
    # Calculate price level distribution percentages
    total_places = len(data["results"])
    if total_places > 0:
        for level in price_levels:
            price_levels[level] = round((price_levels[level] / total_places) * 100)
        average_rating = round(total_rating / total_places, 1)
    else:
        average_rating = 0
    
    return {
        "total_competitors": total_places,
        "competitors": competitors,
        "average_rating": average_rating,
        "price_level_distribution": price_levels,
    }


def _get_place_details(place_id: str) -> Dict[str, Any]:
    """Get place details from Google Places API"""
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "reviews,price_level,types",
        "key": settings.GOOGLE_PLACES_API_KEY
    }
    
    response = requests.get(url, params=params)
    return response.json()


def _extract_popular_dishes(place_details: Dict[str, Any]) -> List[str]:
    """Extract popular dishes from place reviews"""
    popular_dishes = []
    if "result" in place_details and "reviews" in place_details["result"]:
        for review in place_details["result"]["reviews"]:
            text = review.get("text", "")
            # Very simple extraction - in a real implementation, use NLP
            if "tried" in text.lower() or "ordered" in text.lower() or "dish" in text.lower():
                words = text.split()
                for i, word in enumerate(words):
                    if word.lower() in ["tried", "ordered", "dish", "food"] and i < len(words) - 1:
                        dish = words[i+1]
                        if len(dish) > 3 and dish not in popular_dishes:
                            popular_dishes.append(dish)
    
    # If we couldn't extract dishes, return some generic ones
    if not popular_dishes:
        return [f"Popular Dish {i+1}" for i in range(random.randint(2, 4))]
    
    return popular_dishes[:5]  # Return at most 5 dishes


def _extract_cuisine_type(place: Dict[str, Any]) -> str:
    """Extract cuisine type from place types"""
    cuisine_mapping = {
        "thai_restaurant": "Thai",
        "italian_restaurant": "Italian",
        "japanese_restaurant": "Japanese",
        "chinese_restaurant": "Chinese",
        "indian_restaurant": "Indian",
        "french_restaurant": "French",
        "mexican_restaurant": "Mexican",
        "american_restaurant": "American",
    }
    
    for place_type in place.get("types", []):
        if place_type in cuisine_mapping:
            return cuisine_mapping[place_type]
    
    return "Restaurant"


def _calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates in km (simplified)"""
    # This is a simplified calculation - in a real implementation, use haversine formula
    return round(((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) ** 0.5 * 111, 1)  # 111 km per degree


def _calculate_location_score(places: List[Dict[str, Any]]) -> float:
    """Calculate location score based on nearby places"""
    # This is a simplified calculation - in a real implementation, use more factors
    if not places:
        return 50.0
    
    total_rating = sum(place.get("rating", 0) for place in places)
    total_reviews = sum(place.get("user_ratings_total", 0) for place in places)
    
    # More places, higher ratings, and more reviews indicate a better location
    score = 50 + (len(places) * 2) + (total_rating / len(places) * 5) + (min(total_reviews / 1000, 10))
    return min(round(score, 1), 95.0)


def _calculate_accessibility(places: List[Dict[str, Any]]) -> Dict[str, float]:
    """Calculate accessibility scores based on nearby places"""
    # This is a simplified calculation - in a real implementation, use more factors
    transit_count = sum(1 for place in places if any(t in ["bus_station", "subway_station", "train_station"] for t in place.get("types", [])))
    parking_count = sum(1 for place in places if any(t in ["parking"] for t in place.get("types", [])))
    
    return {
        "public_transport": min(round(transit_count / 2, 1), 5.0) if transit_count else random.uniform(1, 3),
        "walking": min(round(len(places) / 10, 1), 5.0),
        "parking": min(round(parking_count, 1), 5.0) if parking_count else random.uniform(1, 3),
    }


def _calculate_visibility(places: List[Dict[str, Any]]) -> float:
    """Calculate visibility score based on nearby places"""
    # This is a simplified calculation - in a real implementation, use more factors
    if not places:
        return 3.0
    
    # More high-traffic places nearby indicate better visibility
    high_traffic_places = sum(1 for place in places if any(t in ["store", "shopping_mall", "tourist_attraction"] for t in place.get("types", [])))
    return min(round(high_traffic_places / 2, 1), 5.0)


def _get_census_data(latitude: float, longitude: float, radius: float) -> Dict[str, Any]:
    """Get demographic data from Census API"""
    # This would be implemented with a real Census API integration
    # For now, return mock data
    return {
        "population": {
            "total": random.randint(5000, 50000),
            "density": round(random.uniform(1000, 10000), 2),
            "growth_rate": round(random.uniform(-2, 5), 1),
        },
        "age_distribution": {
            "0-17": random.randint(5, 25),
            "18-24": random.randint(5, 25),
            "25-34": random.randint(15, 35),
            "35-44": random.randint(15, 30),
            "45-54": random.randint(10, 25),
            "55-64": random.randint(5, 20),
            "65+": random.randint(5, 15),
        },
        "income_levels": {
            "low": random.randint(10, 40),
            "medium": random.randint(30, 60),
            "high": random.randint(10, 40),
        },
        "education_levels": {
            "high_school": random.randint(10, 40),
            "bachelor": random.randint(20, 50),
            "graduate": random.randint(10, 30),
        },
        "household_types": {
            "single": random.randint(20, 40),
            "couples": random.randint(20, 40),
            "families": random.randint(20, 40),
        },
    }
