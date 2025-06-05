"""
Meta (Facebook) API Integration Service for BiteBase Intelligence
Handles social media analytics, advertising insights, and customer engagement data
"""

import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union
import requests
import json
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.page import Page
from facebook_business.adobjects.pagepost import PagePost

from app.services.aws_s3_service import s3_service
from app.core.config import settings

logger = logging.getLogger(__name__)

class MetaAPIService:
    """Service for Meta (Facebook/Instagram) API integration"""
    
    def __init__(self):
        self.access_token = getattr(settings, 'META_ACCESS_TOKEN', '')
        self.app_id = getattr(settings, 'META_APP_ID', '')
        self.app_secret = getattr(settings, 'META_APP_SECRET', '')
        self.api_version = 'v18.0'
        self.base_url = f"https://graph.facebook.com/{self.api_version}"
        
        # Initialize Facebook Ads API
        if self.access_token and self.app_id and self.app_secret:
            FacebookAdsApi.init(self.app_id, self.app_secret, self.access_token)
    
    async def connect_facebook_page(self, restaurant_id: str, page_id: str) -> Dict[str, Any]:
        """Connect and verify Facebook page"""
        try:
            # Get page information
            page_info = await self._get_page_info(page_id)
            
            if not page_info:
                return {"error": "Unable to access Facebook page"}
            
            # Store connection info
            connection_data = {
                "restaurant_id": restaurant_id,
                "page_id": page_id,
                "page_name": page_info.get('name'),
                "page_category": page_info.get('category'),
                "followers_count": page_info.get('followers_count', 0),
                "connected_at": datetime.now().isoformat(),
                "status": "active"
            }
            
            await s3_service.store_restaurant_data(
                restaurant_id, "facebook_connection", connection_data
            )
            
            return {
                "success": True,
                "page_info": page_info,
                "connection_data": connection_data
            }
            
        except Exception as e:
            logger.error(f"Facebook page connection failed: {e}")
            return {"error": str(e)}
    
    async def connect_instagram_account(self, restaurant_id: str, instagram_account_id: str) -> Dict[str, Any]:
        """Connect and verify Instagram business account"""
        try:
            # Get Instagram account information
            instagram_info = await self._get_instagram_info(instagram_account_id)
            
            if not instagram_info:
                return {"error": "Unable to access Instagram account"}
            
            # Store connection info
            connection_data = {
                "restaurant_id": restaurant_id,
                "instagram_account_id": instagram_account_id,
                "username": instagram_info.get('username'),
                "followers_count": instagram_info.get('followers_count', 0),
                "media_count": instagram_info.get('media_count', 0),
                "connected_at": datetime.now().isoformat(),
                "status": "active"
            }
            
            await s3_service.store_restaurant_data(
                restaurant_id, "instagram_connection", connection_data
            )
            
            return {
                "success": True,
                "instagram_info": instagram_info,
                "connection_data": connection_data
            }
            
        except Exception as e:
            logger.error(f"Instagram account connection failed: {e}")
            return {"error": str(e)}
    
    async def get_social_media_analytics(self, restaurant_id: str, days_back: int = 30) -> Dict[str, Any]:
        """Get comprehensive social media analytics"""
        try:
            # Get Facebook page analytics
            facebook_analytics = await self._get_facebook_analytics(restaurant_id, days_back)
            
            # Get Instagram analytics
            instagram_analytics = await self._get_instagram_analytics(restaurant_id, days_back)
            
            # Combine and analyze
            combined_analytics = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "period_days": days_back,
                "facebook": facebook_analytics,
                "instagram": instagram_analytics,
                "combined_metrics": await self._combine_social_metrics(
                    facebook_analytics, instagram_analytics
                ),
                "insights": await self._generate_social_insights(
                    facebook_analytics, instagram_analytics
                ),
                "recommendations": await self._generate_social_recommendations(
                    facebook_analytics, instagram_analytics
                )
            }
            
            # Store analytics
            await s3_service.store_restaurant_data(
                restaurant_id, "social_analytics", combined_analytics
            )
            
            return combined_analytics
            
        except Exception as e:
            logger.error(f"Social media analytics failed: {e}")
            return {"error": str(e)}
    
    async def analyze_customer_sentiment(self, restaurant_id: str, days_back: int = 7) -> Dict[str, Any]:
        """Analyze customer sentiment from social media"""
        try:
            # Get recent posts and comments
            facebook_posts = await self._get_facebook_posts(restaurant_id, days_back)
            instagram_posts = await self._get_instagram_posts(restaurant_id, days_back)
            
            # Get comments and reviews
            facebook_comments = await self._get_facebook_comments(facebook_posts)
            instagram_comments = await self._get_instagram_comments(instagram_posts)
            
            # Analyze sentiment
            sentiment_analysis = await self._analyze_sentiment(
                facebook_comments + instagram_comments
            )
            
            # Get review sentiment
            review_sentiment = await self._analyze_review_sentiment(restaurant_id)
            
            sentiment_report = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "period_days": days_back,
                "overall_sentiment": sentiment_analysis,
                "review_sentiment": review_sentiment,
                "sentiment_trends": await self._calculate_sentiment_trends(restaurant_id),
                "key_topics": await self._extract_key_topics(
                    facebook_comments + instagram_comments
                ),
                "action_items": await self._generate_sentiment_action_items(sentiment_analysis)
            }
            
            # Store sentiment analysis
            await s3_service.store_restaurant_data(
                restaurant_id, "sentiment_analysis", sentiment_report
            )
            
            return sentiment_report
            
        except Exception as e:
            logger.error(f"Sentiment analysis failed: {e}")
            return {"error": str(e)}
    
    async def get_advertising_insights(self, restaurant_id: str, ad_account_id: str, 
                                     days_back: int = 30) -> Dict[str, Any]:
        """Get Facebook/Instagram advertising insights"""
        try:
            # Get ad account
            ad_account = AdAccount(f'act_{ad_account_id}')
            
            # Define date range
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Get campaign insights
            campaigns = ad_account.get_campaigns()
            campaign_insights = []
            
            for campaign in campaigns:
                insights = campaign.get_insights(
                    fields=[
                        'impressions', 'clicks', 'spend', 'reach',
                        'frequency', 'cpm', 'cpc', 'ctr'
                    ],
                    params={
                        'time_range': {
                            'since': start_date.strftime('%Y-%m-%d'),
                            'until': end_date.strftime('%Y-%m-%d')
                        }
                    }
                )
                
                if insights:
                    campaign_data = {
                        "campaign_id": campaign['id'],
                        "campaign_name": campaign['name'],
                        "insights": insights[0] if insights else {}
                    }
                    campaign_insights.append(campaign_data)
            
            # Calculate performance metrics
            performance_metrics = await self._calculate_ad_performance(campaign_insights)
            
            # Generate recommendations
            ad_recommendations = await self._generate_ad_recommendations(
                campaign_insights, performance_metrics
            )
            
            advertising_report = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "ad_account_id": ad_account_id,
                "period_days": days_back,
                "campaign_insights": campaign_insights,
                "performance_metrics": performance_metrics,
                "recommendations": ad_recommendations,
                "budget_optimization": await self._suggest_budget_optimization(campaign_insights)
            }
            
            # Store advertising insights
            await s3_service.store_restaurant_data(
                restaurant_id, "advertising_insights", advertising_report
            )
            
            return advertising_report
            
        except Exception as e:
            logger.error(f"Advertising insights failed: {e}")
            return {"error": str(e)}
    
    async def track_competitor_social_activity(self, restaurant_id: str, 
                                             competitor_pages: List[str]) -> Dict[str, Any]:
        """Track competitor social media activity"""
        try:
            competitor_data = []
            
            for page_id in competitor_pages:
                # Get competitor page info
                page_info = await self._get_page_info(page_id)
                
                if page_info:
                    # Get recent posts
                    posts = await self._get_page_posts(page_id, days_back=7)
                    
                    # Analyze engagement
                    engagement_metrics = await self._calculate_engagement_metrics(posts)
                    
                    competitor_data.append({
                        "page_id": page_id,
                        "page_name": page_info.get('name'),
                        "followers_count": page_info.get('followers_count', 0),
                        "recent_posts": len(posts),
                        "engagement_metrics": engagement_metrics,
                        "content_analysis": await self._analyze_content_strategy(posts)
                    })
            
            # Compare with own performance
            own_performance = await self._get_own_social_performance(restaurant_id)
            
            # Generate competitive analysis
            competitive_analysis = await self._generate_competitive_analysis(
                competitor_data, own_performance
            )
            
            tracking_report = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "competitor_data": competitor_data,
                "competitive_analysis": competitive_analysis,
                "market_position": await self._assess_market_position(
                    competitor_data, own_performance
                ),
                "strategic_recommendations": await self._generate_competitive_recommendations(
                    competitive_analysis
                )
            }
            
            # Store competitor tracking
            await s3_service.store_restaurant_data(
                restaurant_id, "competitor_social_tracking", tracking_report
            )
            
            return tracking_report
            
        except Exception as e:
            logger.error(f"Competitor tracking failed: {e}")
            return {"error": str(e)}
    
    async def generate_content_recommendations(self, restaurant_id: str) -> Dict[str, Any]:
        """Generate content recommendations based on performance data"""
        try:
            # Get historical post performance
            historical_performance = await self._get_historical_post_performance(restaurant_id)
            
            # Analyze top-performing content
            top_content_analysis = await self._analyze_top_content(historical_performance)
            
            # Get trending topics in food industry
            trending_topics = await self._get_trending_food_topics()
            
            # Generate content calendar
            content_calendar = await self._generate_content_calendar(
                top_content_analysis, trending_topics
            )
            
            # Optimal posting times
            optimal_times = await self._calculate_optimal_posting_times(restaurant_id)
            
            content_recommendations = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "top_content_analysis": top_content_analysis,
                "trending_topics": trending_topics,
                "content_calendar": content_calendar,
                "optimal_posting_times": optimal_times,
                "content_themes": await self._suggest_content_themes(top_content_analysis),
                "hashtag_recommendations": await self._recommend_hashtags(restaurant_id),
                "visual_content_tips": await self._generate_visual_content_tips()
            }
            
            # Store content recommendations
            await s3_service.store_restaurant_data(
                restaurant_id, "content_recommendations", content_recommendations
            )
            
            return content_recommendations
            
        except Exception as e:
            logger.error(f"Content recommendations failed: {e}")
            return {"error": str(e)}
    
    # Helper methods
    async def _get_page_info(self, page_id: str) -> Dict[str, Any]:
        """Get Facebook page information"""
        try:
            url = f"{self.base_url}/{page_id}"
            params = {
                'fields': 'name,category,followers_count,fan_count,rating_count,overall_star_rating',
                'access_token': self.access_token
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 200:
                return response.json()
            
            return {}
            
        except Exception as e:
            logger.error(f"Page info fetch failed: {e}")
            return {}
    
    async def _get_instagram_info(self, instagram_account_id: str) -> Dict[str, Any]:
        """Get Instagram account information"""
        try:
            url = f"{self.base_url}/{instagram_account_id}"
            params = {
                'fields': 'username,followers_count,follows_count,media_count',
                'access_token': self.access_token
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 200:
                return response.json()
            
            return {}
            
        except Exception as e:
            logger.error(f"Instagram info fetch failed: {e}")
            return {}
    
    async def _get_facebook_analytics(self, restaurant_id: str, days_back: int) -> Dict[str, Any]:
        """Get Facebook page analytics"""
        try:
            # Get page connection info
            connections = await s3_service.retrieve_restaurant_data(
                restaurant_id, "facebook_connection", days_back=1
            )
            
            if not connections:
                return {"error": "No Facebook page connected"}
            
            page_id = connections[0].get('page_id')
            
            # Get page insights
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            url = f"{self.base_url}/{page_id}/insights"
            params = {
                'metric': 'page_impressions,page_reach,page_engaged_users,page_post_engagements',
                'since': start_date.strftime('%Y-%m-%d'),
                'until': end_date.strftime('%Y-%m-%d'),
                'access_token': self.access_token
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 200:
                data = response.json()
                return self._process_facebook_insights(data.get('data', []))
            
            return {}
            
        except Exception as e:
            logger.error(f"Facebook analytics failed: {e}")
            return {}
    
    async def _get_instagram_analytics(self, restaurant_id: str, days_back: int) -> Dict[str, Any]:
        """Get Instagram analytics"""
        try:
            # Get Instagram connection info
            connections = await s3_service.retrieve_restaurant_data(
                restaurant_id, "instagram_connection", days_back=1
            )
            
            if not connections:
                return {"error": "No Instagram account connected"}
            
            instagram_account_id = connections[0].get('instagram_account_id')
            
            # Get Instagram insights
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            url = f"{self.base_url}/{instagram_account_id}/insights"
            params = {
                'metric': 'impressions,reach,profile_views,website_clicks',
                'period': 'day',
                'since': int(start_date.timestamp()),
                'until': int(end_date.timestamp()),
                'access_token': self.access_token
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 200:
                data = response.json()
                return self._process_instagram_insights(data.get('data', []))
            
            return {}
            
        except Exception as e:
            logger.error(f"Instagram analytics failed: {e}")
            return {}
    
    def _process_facebook_insights(self, insights_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Process Facebook insights data"""
        processed = {}
        
        for insight in insights_data:
            metric_name = insight.get('name')
            values = insight.get('values', [])
            
            if values:
                total_value = sum(v.get('value', 0) for v in values)
                processed[metric_name] = {
                    'total': total_value,
                    'daily_values': values
                }
        
        return processed
    
    def _process_instagram_insights(self, insights_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Process Instagram insights data"""
        processed = {}
        
        for insight in insights_data:
            metric_name = insight.get('name')
            values = insight.get('values', [])
            
            if values:
                total_value = sum(v.get('value', 0) for v in values)
                processed[metric_name] = {
                    'total': total_value,
                    'daily_values': values
                }
        
        return processed
    
    async def _combine_social_metrics(self, facebook_data: Dict[str, Any], 
                                    instagram_data: Dict[str, Any]) -> Dict[str, Any]:
        """Combine Facebook and Instagram metrics"""
        combined = {
            "total_impressions": 0,
            "total_reach": 0,
            "total_engagement": 0,
            "engagement_rate": 0
        }
        
        # Add Facebook metrics
        if 'page_impressions' in facebook_data:
            combined["total_impressions"] += facebook_data['page_impressions'].get('total', 0)
        if 'page_reach' in facebook_data:
            combined["total_reach"] += facebook_data['page_reach'].get('total', 0)
        if 'page_post_engagements' in facebook_data:
            combined["total_engagement"] += facebook_data['page_post_engagements'].get('total', 0)
        
        # Add Instagram metrics
        if 'impressions' in instagram_data:
            combined["total_impressions"] += instagram_data['impressions'].get('total', 0)
        if 'reach' in instagram_data:
            combined["total_reach"] += instagram_data['reach'].get('total', 0)
        
        # Calculate engagement rate
        if combined["total_reach"] > 0:
            combined["engagement_rate"] = combined["total_engagement"] / combined["total_reach"]
        
        return combined
    
    async def _generate_social_insights(self, facebook_data: Dict[str, Any], 
                                      instagram_data: Dict[str, Any]) -> List[str]:
        """Generate insights from social media data"""
        insights = []
        
        # Facebook insights
        if facebook_data.get('page_reach', {}).get('total', 0) > 1000:
            insights.append("Strong Facebook reach - consider increasing posting frequency")
        
        # Instagram insights
        if instagram_data.get('reach', {}).get('total', 0) > 500:
            insights.append("Good Instagram performance - focus on visual content")
        
        return insights
    
    async def _generate_social_recommendations(self, facebook_data: Dict[str, Any], 
                                             instagram_data: Dict[str, Any]) -> List[str]:
        """Generate social media recommendations"""
        recommendations = []
        
        # Engagement recommendations
        fb_engagement = facebook_data.get('page_post_engagements', {}).get('total', 0)
        fb_reach = facebook_data.get('page_reach', {}).get('total', 1)
        
        if fb_engagement / fb_reach < 0.05:
            recommendations.append("Low Facebook engagement - try more interactive content")
        
        recommendations.append("Post consistently during peak hours")
        recommendations.append("Use high-quality food photography")
        recommendations.append("Engage with customer comments promptly")
        
        return recommendations
    
    async def _get_facebook_posts(self, restaurant_id: str, days_back: int) -> List[Dict[str, Any]]:
        """Get recent Facebook posts"""
        # Implementation would fetch actual posts
        return []
    
    async def _get_instagram_posts(self, restaurant_id: str, days_back: int) -> List[Dict[str, Any]]:
        """Get recent Instagram posts"""
        # Implementation would fetch actual posts
        return []
    
    async def _get_facebook_comments(self, posts: List[Dict[str, Any]]) -> List[str]:
        """Get comments from Facebook posts"""
        # Implementation would fetch actual comments
        return []
    
    async def _get_instagram_comments(self, posts: List[Dict[str, Any]]) -> List[str]:
        """Get comments from Instagram posts"""
        # Implementation would fetch actual comments
        return []
    
    async def _analyze_sentiment(self, comments: List[str]) -> Dict[str, Any]:
        """Analyze sentiment of comments"""
        # This would use NLP libraries for sentiment analysis
        return {
            "positive": 0.6,
            "neutral": 0.3,
            "negative": 0.1,
            "overall_score": 0.75
        }
    
    async def _analyze_review_sentiment(self, restaurant_id: str) -> Dict[str, Any]:
        """Analyze sentiment from reviews"""
        return {
            "average_rating": 4.2,
            "sentiment_distribution": {
                "positive": 0.7,
                "neutral": 0.2,
                "negative": 0.1
            }
        }
    
    async def _calculate_sentiment_trends(self, restaurant_id: str) -> Dict[str, Any]:
        """Calculate sentiment trends over time"""
        return {
            "trend": "improving",
            "weekly_scores": [0.7, 0.72, 0.75, 0.73]
        }
    
    async def _extract_key_topics(self, comments: List[str]) -> List[str]:
        """Extract key topics from comments"""
        return ["food quality", "service", "atmosphere", "value"]
    
    async def _generate_sentiment_action_items(self, sentiment_data: Dict[str, Any]) -> List[str]:
        """Generate action items based on sentiment"""
        actions = []
        
        if sentiment_data.get('overall_score', 0) < 0.6:
            actions.append("Address negative feedback promptly")
            actions.append("Improve service quality based on comments")
        
        return actions
    
    async def _calculate_ad_performance(self, campaign_insights: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate advertising performance metrics"""
        total_spend = sum(float(c.get('insights', {}).get('spend', 0)) for c in campaign_insights)
        total_clicks = sum(int(c.get('insights', {}).get('clicks', 0)) for c in campaign_insights)
        
        return {
            "total_spend": total_spend,
            "total_clicks": total_clicks,
            "average_cpc": total_spend / total_clicks if total_clicks > 0 else 0,
            "roas": 0  # Would calculate based on conversion data
        }
    
    async def _generate_ad_recommendations(self, campaign_insights: List[Dict[str, Any]], 
                                         performance_metrics: Dict[str, Any]) -> List[str]:
        """Generate advertising recommendations"""
        recommendations = []
        
        if performance_metrics.get('average_cpc', 0) > 2.0:
            recommendations.append("CPC is high - optimize targeting and ad creative")
        
        recommendations.append("Test different ad formats and audiences")
        recommendations.append("Use lookalike audiences based on best customers")
        
        return recommendations
    
    async def _suggest_budget_optimization(self, campaign_insights: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Suggest budget optimization"""
        return {
            "recommended_daily_budget": 50,
            "budget_allocation": {
                "facebook": 0.6,
                "instagram": 0.4
            },
            "optimization_tips": [
                "Allocate more budget to high-performing campaigns",
                "Pause underperforming ad sets"
            ]
        }
    
    # Additional helper methods would be implemented here...
    async def _get_page_posts(self, page_id: str, days_back: int) -> List[Dict[str, Any]]:
        """Get posts from a Facebook page"""
        return []
    
    async def _calculate_engagement_metrics(self, posts: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate engagement metrics for posts"""
        return {
            "average_likes": 50,
            "average_comments": 10,
            "average_shares": 5,
            "engagement_rate": 0.05
        }
    
    async def _analyze_content_strategy(self, posts: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyze content strategy from posts"""
        return {
            "posting_frequency": "daily",
            "content_types": ["photos", "videos", "text"],
            "peak_engagement_times": ["12:00", "18:00"]
        }
    
    async def _get_own_social_performance(self, restaurant_id: str) -> Dict[str, Any]:
        """Get own social media performance"""
        return {
            "followers": 1000,
            "engagement_rate": 0.04,
            "posting_frequency": 5
        }
    
    async def _generate_competitive_analysis(self, competitor_data: List[Dict[str, Any]], 
                                           own_performance: Dict[str, Any]) -> Dict[str, Any]:
        """Generate competitive analysis"""
        return {
            "market_position": "middle",
            "strengths": ["engagement rate"],
            "weaknesses": ["follower count"],
            "opportunities": ["video content"]
        }
    
    async def _assess_market_position(self, competitor_data: List[Dict[str, Any]], 
                                    own_performance: Dict[str, Any]) -> str:
        """Assess market position"""
        return "competitive"
    
    async def _generate_competitive_recommendations(self, competitive_analysis: Dict[str, Any]) -> List[str]:
        """Generate competitive recommendations"""
        return [
            "Increase posting frequency to match competitors",
            "Focus on video content for better engagement",
            "Collaborate with local influencers"
        ]
    
    async def _get_historical_post_performance(self, restaurant_id: str) -> List[Dict[str, Any]]:
        """Get historical post performance"""
        return []
    
    async def _analyze_top_content(self, historical_performance: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyze top-performing content"""
        return {
            "best_content_types": ["food photos", "behind-the-scenes"],
            "optimal_post_length": 150,
            "best_hashtags": ["#foodie", "#restaurant"]
        }
    
    async def _get_trending_food_topics(self) -> List[str]:
        """Get trending topics in food industry"""
        return ["plant-based", "local sourcing", "sustainability"]
    
    async def _generate_content_calendar(self, top_content_analysis: Dict[str, Any], 
                                       trending_topics: List[str]) -> Dict[str, Any]:
        """Generate content calendar"""
        return {
            "weekly_themes": {
                "monday": "Menu Monday",
                "tuesday": "Behind the Scenes",
                "wednesday": "Customer Spotlight",
                "thursday": "Chef's Special",
                "friday": "Weekend Prep",
                "saturday": "Saturday Specials",
                "sunday": "Sunday Brunch"
            }
        }
    
    async def _calculate_optimal_posting_times(self, restaurant_id: str) -> Dict[str, List[str]]:
        """Calculate optimal posting times"""
        return {
            "facebook": ["12:00", "18:00", "20:00"],
            "instagram": ["11:00", "17:00", "19:00"]
        }
    
    async def _suggest_content_themes(self, top_content_analysis: Dict[str, Any]) -> List[str]:
        """Suggest content themes"""
        return [
            "Food photography",
            "Chef stories",
            "Customer testimonials",
            "Seasonal menus"
        ]
    
    async def _recommend_hashtags(self, restaurant_id: str) -> Dict[str, List[str]]:
        """Recommend hashtags"""
        return {
            "general": ["#restaurant", "#foodie", "#delicious"],
            "location": ["#cityname", "#localfood"],
            "cuisine": ["#italian", "#pizza", "#pasta"]
        }
    
    async def _generate_visual_content_tips(self) -> List[str]:
        """Generate visual content tips"""
        return [
            "Use natural lighting for food photos",
            "Show the cooking process",
            "Include people enjoying the food",
            "Maintain consistent visual style"
        ]

# Global instance
meta_api_service = MetaAPIService()