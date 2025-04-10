from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
import uuid
import json
from datetime import datetime, timedelta
from jose import JWTError, jwt

# Constants
SECRET_KEY = "your-secret-key-for-testing"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    subscription_tier: str = "free"

class UserInDB(User):
    hashed_password: str

class RestaurantProfile(BaseModel):
    id: str
    restaurant_name: str
    concept_description: Optional[str] = None
    cuisine_type: Optional[str] = None
    business_type: str
    owner_id: str
    created_at: datetime

# Mock database
users_db = {
    "admin@example.com": {
        "id": str(uuid.uuid4()),
        "email": "admin@example.com",
        "full_name": "Admin User",
        "hashed_password": "admin123",  # In a real app, this would be hashed
        "is_active": True,
        "subscription_tier": "enterprise"
    },
    "test@example.com": {
        "id": str(uuid.uuid4()),
        "email": "test@example.com",
        "full_name": "Test User",
        "hashed_password": "test123",  # In a real app, this would be hashed
        "is_active": True,
        "subscription_tier": "free"
    }
}

restaurant_profiles_db = {}
research_projects_db = {}

# Create FastAPI app
app = FastAPI(title="BiteBase Intelligence API", debug=True)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Helper functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(email: str):
    if email in users_db:
        user_dict = users_db[email]
        return UserInDB(**user_dict)
    return None

def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not password == user.hashed_password:  # In a real app, use proper password verification
        return False
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Routes
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/v1/users/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return current_user

@app.get("/api/v1/restaurant-profiles/")
async def read_restaurant_profiles(current_user: UserInDB = Depends(get_current_active_user)):
    # Return profiles owned by the current user
    return [profile for profile in restaurant_profiles_db.values() if profile["owner_id"] == current_user.id]

@app.post("/api/v1/restaurant-profiles/")
async def create_restaurant_profile(
    restaurant_name: str,
    business_type: str,
    concept_description: Optional[str] = None,
    cuisine_type: Optional[str] = None,
    current_user: UserInDB = Depends(get_current_active_user)
):
    profile_id = str(uuid.uuid4())
    profile = {
        "id": profile_id,
        "restaurant_name": restaurant_name,
        "concept_description": concept_description,
        "cuisine_type": cuisine_type,
        "business_type": business_type,
        "owner_id": current_user.id,
        "created_at": datetime.now()
    }
    restaurant_profiles_db[profile_id] = profile
    return profile

@app.get("/api/v1/research-projects/")
async def read_research_projects(current_user: UserInDB = Depends(get_current_active_user)):
    # Return projects owned by the current user
    return [project for project in research_projects_db.values() if project["owner_id"] == current_user.id]

@app.post("/api/v1/research-projects/")
async def create_research_project(
    name: str,
    restaurant_profile_id: str,
    description: Optional[str] = None,
    current_user: UserInDB = Depends(get_current_active_user)
):
    # Check if restaurant profile exists and belongs to user
    if restaurant_profile_id not in restaurant_profiles_db or restaurant_profiles_db[restaurant_profile_id]["owner_id"] != current_user.id:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")

    project_id = str(uuid.uuid4())
    project = {
        "id": project_id,
        "name": name,
        "description": description,
        "restaurant_profile_id": restaurant_profile_id,
        "owner_id": current_user.id,
        "status": "pending",
        "progress": 0,
        "created_at": datetime.now()
    }
    research_projects_db[project_id] = project
    return project

@app.get("/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}

@app.get("/api/v1/analytics/market-trends")
async def get_market_trends(
    cuisine_type: Optional[str] = None,
    location: Optional[str] = None,
    current_user: UserInDB = Depends(get_current_active_user)
):
    # Mock data
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
async def analyze_location(
    latitude: float,
    longitude: float,
    radius: float = 1.0,
    current_user: UserInDB = Depends(get_current_active_user)
):
    # Mock data
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
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
