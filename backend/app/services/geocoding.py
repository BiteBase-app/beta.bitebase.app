from typing import Tuple, Optional
import requests
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

from app.core.config import settings


def geocode_address(
    street: str,
    city: str,
    state: Optional[str] = None,
    zip_code: Optional[str] = None,
    country: str = "Thailand",
) -> Tuple[float, float]:
    """
    Geocode an address to get latitude and longitude.
    
    Args:
        street: Street address
        city: City
        state: State/Province (optional)
        zip_code: ZIP/Postal code (optional)
        country: Country (default: Thailand)
        
    Returns:
        Tuple of (latitude, longitude)
        
    Raises:
        ValueError: If geocoding fails
    """
    # Try using Google Places API if key is available
    if settings.GOOGLE_PLACES_API_KEY:
        return _geocode_with_google(street, city, state, zip_code, country)
    
    # Fallback to Nominatim (OpenStreetMap)
    return _geocode_with_nominatim(street, city, state, zip_code, country)


def _geocode_with_google(
    street: str,
    city: str,
    state: Optional[str] = None,
    zip_code: Optional[str] = None,
    country: str = "Thailand",
) -> Tuple[float, float]:
    """Geocode using Google Places API"""
    address_parts = [part for part in [street, city, state, zip_code, country] if part]
    address = ", ".join(address_parts)
    
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": settings.GOOGLE_PLACES_API_KEY
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    if data["status"] != "OK":
        raise ValueError(f"Geocoding failed: {data['status']}")
    
    location = data["results"][0]["geometry"]["location"]
    return location["lat"], location["lng"]


def _geocode_with_nominatim(
    street: str,
    city: str,
    state: Optional[str] = None,
    zip_code: Optional[str] = None,
    country: str = "Thailand",
) -> Tuple[float, float]:
    """Geocode using Nominatim (OpenStreetMap)"""
    geolocator = Nominatim(user_agent="bitebase-intelligence")
    
    address_parts = [part for part in [street, city, state, zip_code, country] if part]
    address = ", ".join(address_parts)
    
    try:
        location = geolocator.geocode(address, timeout=10)
        if location:
            return location.latitude, location.longitude
        raise ValueError("Address could not be geocoded")
    except (GeocoderTimedOut, GeocoderServiceError) as e:
        raise ValueError(f"Geocoding service error: {str(e)}")
