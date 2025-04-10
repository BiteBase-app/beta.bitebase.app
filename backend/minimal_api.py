from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}

@app.get("/api/v1/users/me")
async def read_users_me():
    return {
        "id": "123",
        "email": "test@example.com",
        "full_name": "Test User",
        "is_active": True,
        "subscription_tier": "free"
    }

@app.get("/api/v1/restaurant-profiles/")
async def read_restaurant_profiles():
    return [
        {
            "id": "456",
            "restaurant_name": "Test Restaurant",
            "concept_description": "A test restaurant",
            "cuisine_type": "Thai",
            "business_type": "new",
            "owner_id": "123",
            "created_at": "2023-01-01T00:00:00"
        }
    ]

@app.get("/api/v1/analytics/market-trends")
async def get_market_trends():
    return {
        "industry_growth_rate": 5.2,
        "cuisine_trends": {
            "Thai": 7.5,
            "Japanese": 10.2,
            "Italian": 3.1,
            "Chinese": 4.8,
            "Indian": 6.3
        },
        "location_trends": {
            "Downtown": 8.1,
            "Suburban": 4.5,
            "Shopping Centers": 6.7,
            "Tourist Areas": 9.2,
            "Business Districts": 5.8
        },
        "consumer_preferences": [
            {"factor": "Taste", "importance": 85},
            {"factor": "Price", "importance": 75},
            {"factor": "Service", "importance": 70},
            {"factor": "Ambiance", "importance": 65},
            {"factor": "Convenience", "importance": 80}
        ],
        "emerging_trends": [
            "Plant-based menu options",
            "Sustainable packaging",
            "Ghost kitchens",
            "Contactless ordering",
            "Hyper-local sourcing"
        ]
    }

@app.get("/api/v1/location/analyze")
async def analyze_location():
    return {
        "location_score": 78.5,
        "nearby_places": [
            {"name": "Shopping Mall", "type": "Shopping Mall", "distance": 0.5, "popularity": 4.2},
            {"name": "Office Building", "type": "Office Building", "distance": 0.3, "popularity": 3.8},
            {"name": "Hotel", "type": "Hotel", "distance": 0.7, "popularity": 4.5},
            {"name": "Park", "type": "Park", "distance": 1.2, "popularity": 4.0}
        ],
        "accessibility": {
            "public_transport": 4.2,
            "walking": 3.8,
            "parking": 3.5
        },
        "visibility": 4.0,
        "foot_traffic": {
            "weekday_average": 3500,
            "weekend_average": 5200,
            "morning_rush": 800,
            "lunch_rush": 1500,
            "evening_rush": 2200
        },
        "competitors": [
            {"name": "Restaurant 1", "cuisine": "Thai", "rating": 4.2, "price_level": "$$", "distance": 0.4},
            {"name": "Restaurant 2", "cuisine": "Japanese", "rating": 4.5, "price_level": "$$$", "distance": 0.6},
            {"name": "Restaurant 3", "cuisine": "Italian", "rating": 3.8, "price_level": "$$", "distance": 0.8}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
