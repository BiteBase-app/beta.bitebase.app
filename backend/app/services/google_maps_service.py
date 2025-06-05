"""
Google Maps Integration Service for BiteBase Intelligence
Handles location analysis, competitor mapping, and demographic insights
"""

import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
import googlemaps
import requests
import json
from geopy.distance import geodesic

from app.services.aws_s3_service import s3_service
from app.core.config import settings

logger = logging.getLogger(__name__)

class GoogleMapsService:
    """Service for Google Maps API integration and location intelligence"""
    
    def __init__(self):
        self.api_key = getattr(settings, 'GOOGLE_MAPS_API_KEY', '')
        self.gmaps = googlemaps.Client(key=self.api_key) if self.api_key else None
        self.places_base_url = "https://maps.googleapis.com/maps/api/place"
    
    async def analyze_location(self, address: str, cuisine_type: str = None) -> Dict[str, Any]:
        """Comprehensive location analysis for restaurant placement"""
        try:
            if not self.gmaps:
                return {"error": "Google Maps API key not configured"}
            
            # Geocode the address
            geocode_result = self.gmaps.geocode(address)
            if not geocode_result:
                return {"error": "Address not found"}
            
            location = geocode_result[0]
            lat_lng = location['geometry']['location']
            
            # Perform various analyses
            competitor_analysis = await self._analyze_competitors(lat_lng, cuisine_type)
            demographic_analysis = await self._analyze_demographics(lat_lng)
            foot_traffic_analysis = await self._analyze_foot_traffic(lat_lng)
            accessibility_analysis = await self._analyze_accessibility(lat_lng)
            nearby_amenities = await self._find_nearby_amenities(lat_lng)
            transportation_analysis = await self._analyze_transportation(lat_lng)
            
            # Calculate location score
            location_score = await self._calculate_location_score(
                competitor_analysis, demographic_analysis, foot_traffic_analysis,
                accessibility_analysis, nearby_amenities, transportation_analysis
            )
            
            analysis_result = {
                "timestamp": datetime.now().isoformat(),
                "address": address,
                "coordinates": lat_lng,
                "location_details": location,
                "competitor_analysis": competitor_analysis,
                "demographic_analysis": demographic_analysis,
                "foot_traffic_analysis": foot_traffic_analysis,
                "accessibility_analysis": accessibility_analysis,
                "nearby_amenities": nearby_amenities,
                "transportation_analysis": transportation_analysis,
                "location_score": location_score,
                "recommendations": await self._generate_location_recommendations(
                    competitor_analysis, demographic_analysis, location_score
                )
            }
            
            # Store analysis in S3
            await s3_service.store_restaurant_data(
                f"location_{lat_lng['lat']}_{lat_lng['lng']}", 
                "location_analysis", 
                analysis_result
            )
            
            return analysis_result
            
        except Exception as e:
            logger.error(f"Location analysis failed: {e}")
            return {"error": str(e)}
    
    async def find_optimal_locations(self, city: str, cuisine_type: str, 
                                   budget_range: Tuple[float, float]) -> List[Dict[str, Any]]:
        """Find optimal locations for restaurant placement"""
        try:
            # Search for potential areas in the city
            city_geocode = self.gmaps.geocode(city)
            if not city_geocode:
                return []
            
            city_center = city_geocode[0]['geometry']['location']
            
            # Define search areas (grid-based approach)
            search_areas = await self._generate_search_grid(city_center, radius_km=10)
            
            optimal_locations = []
            
            for area in search_areas:
                # Analyze each area
                area_analysis = await self._analyze_area_potential(
                    area, cuisine_type, budget_range
                )
                
                if area_analysis['potential_score'] > 7.0:  # High potential threshold
                    optimal_locations.append(area_analysis)
            
            # Sort by potential score
            optimal_locations.sort(key=lambda x: x['potential_score'], reverse=True)
            
            return optimal_locations[:10]  # Return top 10
            
        except Exception as e:
            logger.error(f"Optimal location search failed: {e}")
            return []
    
    async def track_competitor_changes(self, restaurant_id: str, location: Dict[str, float], 
                                     radius_km: float = 2.0) -> Dict[str, Any]:
        """Track changes in competitor landscape"""
        try:
            # Get current competitors
            current_competitors = await self._get_nearby_restaurants(location, radius_km)
            
            # Get historical competitor data
            historical_data = await s3_service.retrieve_restaurant_data(
                restaurant_id, "competitor_tracking", days_back=30
            )
            
            changes = {
                "new_competitors": [],
                "closed_competitors": [],
                "updated_competitors": []
            }
            
            if historical_data:
                last_scan = historical_data[0] if historical_data else {}
                last_competitors = last_scan.get('competitors', [])
                
                # Identify changes
                changes = await self._identify_competitor_changes(
                    last_competitors, current_competitors
                )
            
            tracking_result = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "location": location,
                "radius_km": radius_km,
                "current_competitors": current_competitors,
                "changes": changes,
                "competitor_count": len(current_competitors),
                "market_saturation": await self._calculate_market_saturation(
                    current_competitors, location, radius_km
                )
            }
            
            # Store tracking data
            await s3_service.store_restaurant_data(
                restaurant_id, "competitor_tracking", tracking_result
            )
            
            return tracking_result
            
        except Exception as e:
            logger.error(f"Competitor tracking failed: {e}")
            return {"error": str(e)}
    
    async def analyze_delivery_zones(self, restaurant_location: Dict[str, float], 
                                   max_delivery_time: int = 30) -> Dict[str, Any]:
        """Analyze optimal delivery zones and coverage"""
        try:
            # Calculate delivery radius based on time
            delivery_radius_km = (max_delivery_time / 60) * 25  # Assuming 25 km/h average speed
            
            # Generate delivery zone grid
            delivery_zones = await self._generate_delivery_zones(
                restaurant_location, delivery_radius_km
            )
            
            zone_analysis = []
            
            for zone in delivery_zones:
                zone_data = await self._analyze_delivery_zone(zone, restaurant_location)
                zone_analysis.append(zone_data)
            
            # Calculate overall delivery metrics
            total_population = sum(zone['population'] for zone in zone_analysis)
            avg_delivery_time = sum(zone['avg_delivery_time'] for zone in zone_analysis) / len(zone_analysis)
            
            delivery_analysis = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_location": restaurant_location,
                "max_delivery_time": max_delivery_time,
                "delivery_radius_km": delivery_radius_km,
                "zones": zone_analysis,
                "total_coverage_population": total_population,
                "average_delivery_time": avg_delivery_time,
                "high_potential_zones": [zone for zone in zone_analysis if zone['potential_score'] > 8.0],
                "recommendations": await self._generate_delivery_recommendations(zone_analysis)
            }
            
            return delivery_analysis
            
        except Exception as e:
            logger.error(f"Delivery zone analysis failed: {e}")
            return {"error": str(e)}
    
    async def get_real_estate_insights(self, location: Dict[str, float], 
                                     property_type: str = "commercial") -> Dict[str, Any]:
        """Get real estate insights for restaurant locations"""
        try:
            # Search for available properties
            properties = await self._search_commercial_properties(location)
            
            # Analyze rent trends
            rent_analysis = await self._analyze_rent_trends(location, property_type)
            
            # Get market conditions
            market_conditions = await self._get_real_estate_market_conditions(location)
            
            real_estate_insights = {
                "timestamp": datetime.now().isoformat(),
                "location": location,
                "property_type": property_type,
                "available_properties": properties,
                "rent_analysis": rent_analysis,
                "market_conditions": market_conditions,
                "investment_score": await self._calculate_investment_score(
                    properties, rent_analysis, market_conditions
                ),
                "recommendations": await self._generate_real_estate_recommendations(
                    properties, rent_analysis, market_conditions
                )
            }
            
            return real_estate_insights
            
        except Exception as e:
            logger.error(f"Real estate insights failed: {e}")
            return {"error": str(e)}
    
    # Helper methods
    async def _analyze_competitors(self, location: Dict[str, float], 
                                 cuisine_type: str = None) -> Dict[str, Any]:
        """Analyze competitors in the area"""
        try:
            # Search for restaurants nearby
            restaurants = await self._get_nearby_restaurants(location, radius_km=1.0)
            
            # Filter by cuisine type if specified
            if cuisine_type:
                filtered_restaurants = []
                for restaurant in restaurants:
                    if cuisine_type.lower() in restaurant.get('types', []):
                        filtered_restaurants.append(restaurant)
                restaurants = filtered_restaurants
            
            # Analyze competitor density
            competitor_density = len(restaurants) / (3.14159 * 1.0 * 1.0)  # per km²
            
            # Get detailed info for top competitors
            detailed_competitors = []
            for restaurant in restaurants[:10]:  # Top 10 competitors
                details = await self._get_restaurant_details(restaurant['place_id'])
                detailed_competitors.append(details)
            
            return {
                "total_competitors": len(restaurants),
                "competitor_density_per_km2": competitor_density,
                "direct_competitors": detailed_competitors,
                "competition_level": self._assess_competition_level(competitor_density),
                "market_gaps": await self._identify_market_gaps(detailed_competitors)
            }
            
        except Exception as e:
            logger.error(f"Competitor analysis failed: {e}")
            return {}
    
    async def _analyze_demographics(self, location: Dict[str, float]) -> Dict[str, Any]:
        """Analyze demographics around the location"""
        try:
            # This would integrate with census data APIs
            # For now, returning mock structure
            return {
                "population_density": 2500,  # per km²
                "median_age": 32,
                "median_income": 65000,
                "education_level": {
                    "high_school": 0.25,
                    "college": 0.45,
                    "graduate": 0.30
                },
                "lifestyle_segments": {
                    "young_professionals": 0.35,
                    "families": 0.40,
                    "students": 0.15,
                    "seniors": 0.10
                },
                "dining_preferences": {
                    "casual_dining": 0.45,
                    "fast_casual": 0.30,
                    "fine_dining": 0.15,
                    "delivery": 0.60
                }
            }
            
        except Exception as e:
            logger.error(f"Demographic analysis failed: {e}")
            return {}
    
    async def _analyze_foot_traffic(self, location: Dict[str, float]) -> Dict[str, Any]:
        """Analyze foot traffic patterns"""
        try:
            # Search for nearby points of interest that generate foot traffic
            nearby_places = await self._get_nearby_places(location, types=[
                'shopping_mall', 'university', 'school', 'hospital', 
                'transit_station', 'tourist_attraction', 'park'
            ])
            
            # Calculate foot traffic score based on nearby attractions
            traffic_score = 0
            traffic_sources = []
            
            for place in nearby_places:
                distance = geodesic(
                    (location['lat'], location['lng']),
                    (place['geometry']['location']['lat'], place['geometry']['location']['lng'])
                ).kilometers
                
                # Weight by distance and type
                weight = max(0, 1 - (distance / 2.0))  # Decrease weight with distance
                type_multiplier = self._get_traffic_multiplier(place['types'])
                
                traffic_score += weight * type_multiplier
                traffic_sources.append({
                    "name": place['name'],
                    "type": place['types'][0] if place['types'] else 'unknown',
                    "distance_km": distance,
                    "traffic_contribution": weight * type_multiplier
                })
            
            return {
                "foot_traffic_score": min(traffic_score, 10.0),  # Cap at 10
                "traffic_sources": traffic_sources,
                "peak_hours": await self._estimate_peak_hours(nearby_places),
                "seasonal_patterns": await self._estimate_seasonal_patterns(nearby_places)
            }
            
        except Exception as e:
            logger.error(f"Foot traffic analysis failed: {e}")
            return {}
    
    async def _analyze_accessibility(self, location: Dict[str, float]) -> Dict[str, Any]:
        """Analyze accessibility of the location"""
        try:
            # Check for nearby transportation
            transit_stations = await self._get_nearby_places(location, types=['transit_station'])
            parking_areas = await self._get_nearby_places(location, types=['parking'])
            
            # Calculate accessibility scores
            transit_score = min(len(transit_stations) * 2, 10)
            parking_score = min(len(parking_areas) * 1.5, 10)
            
            return {
                "transit_accessibility": transit_score,
                "parking_availability": parking_score,
                "nearby_transit": transit_stations[:5],
                "nearby_parking": parking_areas[:5],
                "walkability_score": await self._calculate_walkability_score(location),
                "accessibility_rating": (transit_score + parking_score) / 2
            }
            
        except Exception as e:
            logger.error(f"Accessibility analysis failed: {e}")
            return {}
    
    async def _find_nearby_amenities(self, location: Dict[str, float]) -> Dict[str, Any]:
        """Find nearby amenities that could benefit the restaurant"""
        try:
            amenity_types = [
                'bank', 'atm', 'hospital', 'pharmacy', 'gas_station',
                'shopping_mall', 'supermarket', 'gym', 'movie_theater'
            ]
            
            amenities = {}
            for amenity_type in amenity_types:
                places = await self._get_nearby_places(location, types=[amenity_type])
                amenities[amenity_type] = places[:3]  # Top 3 of each type
            
            return amenities
            
        except Exception as e:
            logger.error(f"Amenity search failed: {e}")
            return {}
    
    async def _analyze_transportation(self, location: Dict[str, float]) -> Dict[str, Any]:
        """Analyze transportation options"""
        try:
            # Get nearby transportation hubs
            transit_stations = await self._get_nearby_places(location, types=['transit_station'])
            bus_stations = await self._get_nearby_places(location, types=['bus_station'])
            
            return {
                "public_transit_access": len(transit_stations) > 0,
                "transit_stations": transit_stations[:3],
                "bus_stations": bus_stations[:3],
                "highway_access": await self._check_highway_access(location),
                "transportation_score": min((len(transit_stations) + len(bus_stations)) * 2, 10)
            }
            
        except Exception as e:
            logger.error(f"Transportation analysis failed: {e}")
            return {}
    
    async def _calculate_location_score(self, *analyses) -> float:
        """Calculate overall location score"""
        try:
            competitor_analysis, demographic_analysis, foot_traffic_analysis, \
            accessibility_analysis, nearby_amenities, transportation_analysis = analyses
            
            # Weight different factors
            weights = {
                'competition': 0.25,
                'demographics': 0.20,
                'foot_traffic': 0.25,
                'accessibility': 0.15,
                'amenities': 0.10,
                'transportation': 0.05
            }
            
            # Calculate component scores
            competition_score = 10 - min(competitor_analysis.get('competitor_density_per_km2', 0) / 10, 10)
            demographic_score = min(demographic_analysis.get('median_income', 0) / 10000, 10)
            traffic_score = foot_traffic_analysis.get('foot_traffic_score', 0)
            accessibility_score = accessibility_analysis.get('accessibility_rating', 0)
            amenity_score = min(sum(len(amenities) for amenities in nearby_amenities.values()) / 5, 10)
            transport_score = transportation_analysis.get('transportation_score', 0)
            
            # Calculate weighted score
            total_score = (
                competition_score * weights['competition'] +
                demographic_score * weights['demographics'] +
                traffic_score * weights['foot_traffic'] +
                accessibility_score * weights['accessibility'] +
                amenity_score * weights['amenities'] +
                transport_score * weights['transportation']
            )
            
            return round(total_score, 2)
            
        except Exception as e:
            logger.error(f"Location score calculation failed: {e}")
            return 5.0  # Default middle score
    
    async def _generate_location_recommendations(self, competitor_analysis: Dict[str, Any],
                                               demographic_analysis: Dict[str, Any],
                                               location_score: float) -> List[str]:
        """Generate location-specific recommendations"""
        recommendations = []
        
        try:
            # Competition-based recommendations
            if competitor_analysis.get('competitor_density_per_km2', 0) > 20:
                recommendations.append("High competition area - focus on unique value proposition")
            elif competitor_analysis.get('competitor_density_per_km2', 0) < 5:
                recommendations.append("Low competition area - opportunity for market leadership")
            
            # Demographic-based recommendations
            median_income = demographic_analysis.get('median_income', 0)
            if median_income > 80000:
                recommendations.append("High-income area - consider premium pricing and upscale offerings")
            elif median_income < 40000:
                recommendations.append("Budget-conscious area - focus on value pricing and portions")
            
            # Overall score recommendations
            if location_score > 8.0:
                recommendations.append("Excellent location - high potential for success")
            elif location_score < 5.0:
                recommendations.append("Consider alternative locations or significant marketing investment")
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Recommendation generation failed: {e}")
            return ["Unable to generate specific recommendations"]
    
    async def _get_nearby_restaurants(self, location: Dict[str, float], 
                                    radius_km: float = 1.0) -> List[Dict[str, Any]]:
        """Get nearby restaurants"""
        try:
            if not self.gmaps:
                return []
            
            places_result = self.gmaps.places_nearby(
                location=(location['lat'], location['lng']),
                radius=radius_km * 1000,  # Convert to meters
                type='restaurant'
            )
            
            return places_result.get('results', [])
            
        except Exception as e:
            logger.error(f"Nearby restaurants search failed: {e}")
            return []
    
    async def _get_nearby_places(self, location: Dict[str, float], 
                               types: List[str], radius_km: float = 2.0) -> List[Dict[str, Any]]:
        """Get nearby places of specified types"""
        try:
            if not self.gmaps:
                return []
            
            all_places = []
            for place_type in types:
                places_result = self.gmaps.places_nearby(
                    location=(location['lat'], location['lng']),
                    radius=radius_km * 1000,
                    type=place_type
                )
                all_places.extend(places_result.get('results', []))
            
            return all_places
            
        except Exception as e:
            logger.error(f"Nearby places search failed: {e}")
            return []
    
    async def _get_restaurant_details(self, place_id: str) -> Dict[str, Any]:
        """Get detailed restaurant information"""
        try:
            if not self.gmaps:
                return {}
            
            details = self.gmaps.place(place_id=place_id)
            return details.get('result', {})
            
        except Exception as e:
            logger.error(f"Restaurant details fetch failed: {e}")
            return {}
    
    def _assess_competition_level(self, density: float) -> str:
        """Assess competition level based on density"""
        if density > 20:
            return "Very High"
        elif density > 15:
            return "High"
        elif density > 10:
            return "Moderate"
        elif density > 5:
            return "Low"
        else:
            return "Very Low"
    
    async def _identify_market_gaps(self, competitors: List[Dict[str, Any]]) -> List[str]:
        """Identify market gaps based on competitor analysis"""
        gaps = []
        
        # Analyze cuisine types
        cuisine_types = set()
        for competitor in competitors:
            types = competitor.get('types', [])
            cuisine_types.update(types)
        
        # Common gaps to check
        potential_gaps = [
            'healthy_food', 'vegan_restaurant', 'breakfast_restaurant',
            'late_night_food', 'family_restaurant', 'fast_food'
        ]
        
        for gap in potential_gaps:
            if gap not in cuisine_types:
                gaps.append(gap.replace('_', ' ').title())
        
        return gaps
    
    def _get_traffic_multiplier(self, place_types: List[str]) -> float:
        """Get traffic multiplier based on place type"""
        multipliers = {
            'shopping_mall': 3.0,
            'university': 2.5,
            'hospital': 2.0,
            'transit_station': 2.5,
            'tourist_attraction': 2.0,
            'school': 1.5,
            'park': 1.0
        }
        
        max_multiplier = 0
        for place_type in place_types:
            if place_type in multipliers:
                max_multiplier = max(max_multiplier, multipliers[place_type])
        
        return max_multiplier if max_multiplier > 0 else 0.5
    
    async def _estimate_peak_hours(self, nearby_places: List[Dict[str, Any]]) -> Dict[str, float]:
        """Estimate peak hours based on nearby places"""
        # This is a simplified estimation
        return {
            "breakfast": 8.0,
            "lunch": 12.5,
            "dinner": 19.0,
            "late_night": 22.0
        }
    
    async def _estimate_seasonal_patterns(self, nearby_places: List[Dict[str, Any]]) -> Dict[str, float]:
        """Estimate seasonal patterns"""
        return {
            "spring": 1.0,
            "summer": 1.2,
            "fall": 1.1,
            "winter": 0.9
        }
    
    async def _calculate_walkability_score(self, location: Dict[str, float]) -> float:
        """Calculate walkability score"""
        # This would integrate with walkability APIs
        return 7.5  # Mock score
    
    async def _check_highway_access(self, location: Dict[str, float]) -> bool:
        """Check highway access"""
        # This would check for nearby highway access
        return True  # Mock result
    
    # Additional helper methods for other features...
    async def _generate_search_grid(self, center: Dict[str, float], radius_km: float) -> List[Dict[str, float]]:
        """Generate search grid for optimal location finding"""
        grid_points = []
        step = 0.01  # Approximately 1km
        
        for lat_offset in [-step, 0, step]:
            for lng_offset in [-step, 0, step]:
                grid_points.append({
                    'lat': center['lat'] + lat_offset,
                    'lng': center['lng'] + lng_offset
                })
        
        return grid_points
    
    async def _analyze_area_potential(self, area: Dict[str, float], cuisine_type: str, 
                                    budget_range: Tuple[float, float]) -> Dict[str, Any]:
        """Analyze potential of an area"""
        return {
            "location": area,
            "potential_score": 8.5,  # Mock score
            "estimated_rent": 5000,
            "competition_level": "Moderate",
            "target_demographics": "Young Professionals"
        }
    
    async def _identify_competitor_changes(self, old_competitors: List[Dict[str, Any]], 
                                         new_competitors: List[Dict[str, Any]]) -> Dict[str, List]:
        """Identify changes in competitor landscape"""
        old_ids = {comp.get('place_id') for comp in old_competitors}
        new_ids = {comp.get('place_id') for comp in new_competitors}
        
        return {
            "new_competitors": [comp for comp in new_competitors if comp.get('place_id') not in old_ids],
            "closed_competitors": [comp for comp in old_competitors if comp.get('place_id') not in new_ids],
            "updated_competitors": []
        }
    
    async def _calculate_market_saturation(self, competitors: List[Dict[str, Any]], 
                                         location: Dict[str, float], radius_km: float) -> float:
        """Calculate market saturation"""
        area_km2 = 3.14159 * radius_km * radius_km
        density = len(competitors) / area_km2
        return min(density / 20, 1.0)  # Normalize to 0-1 scale
    
    async def _generate_delivery_zones(self, restaurant_location: Dict[str, float], 
                                     radius_km: float) -> List[Dict[str, Any]]:
        """Generate delivery zones"""
        zones = []
        # Create concentric zones
        for i in range(1, 4):
            zone_radius = radius_km * i / 3
            zones.append({
                "zone_id": f"zone_{i}",
                "center": restaurant_location,
                "radius_km": zone_radius
            })
        return zones
    
    async def _analyze_delivery_zone(self, zone: Dict[str, Any], 
                                   restaurant_location: Dict[str, float]) -> Dict[str, Any]:
        """Analyze a delivery zone"""
        return {
            "zone_id": zone["zone_id"],
            "population": 5000,  # Mock data
            "avg_delivery_time": zone["radius_km"] * 2,  # Estimate
            "potential_score": 8.0,
            "demographics": {}
        }
    
    async def _generate_delivery_recommendations(self, zone_analysis: List[Dict[str, Any]]) -> List[str]:
        """Generate delivery recommendations"""
        return [
            "Focus marketing on high-potential zones",
            "Consider zone-specific pricing",
            "Optimize delivery routes for efficiency"
        ]
    
    async def _search_commercial_properties(self, location: Dict[str, float]) -> List[Dict[str, Any]]:
        """Search for commercial properties"""
        # This would integrate with real estate APIs
        return []
    
    async def _analyze_rent_trends(self, location: Dict[str, float], property_type: str) -> Dict[str, Any]:
        """Analyze rent trends"""
        return {
            "average_rent_per_sqft": 25.0,
            "trend": "stable",
            "market_comparison": "below_average"
        }
    
    async def _get_real_estate_market_conditions(self, location: Dict[str, float]) -> Dict[str, Any]:
        """Get real estate market conditions"""
        return {
            "market_temperature": "balanced",
            "vacancy_rate": 0.08,
            "price_trend": "stable"
        }
    
    async def _calculate_investment_score(self, properties: List[Dict[str, Any]], 
                                        rent_analysis: Dict[str, Any], 
                                        market_conditions: Dict[str, Any]) -> float:
        """Calculate investment score"""
        return 7.5  # Mock score
    
    async def _generate_real_estate_recommendations(self, properties: List[Dict[str, Any]], 
                                                  rent_analysis: Dict[str, Any], 
                                                  market_conditions: Dict[str, Any]) -> List[str]:
        """Generate real estate recommendations"""
        return [
            "Consider negotiating rent based on market conditions",
            "Look for properties with growth potential",
            "Factor in renovation costs"
        ]

# Global instance
google_maps_service = GoogleMapsService()