"""
POS Integration Service for BiteBase Intelligence
Handles integration with various POS systems and transaction data processing
"""

import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union
import pandas as pd
import requests
import json
from abc import ABC, abstractmethod

from app.services.aws_s3_service import s3_service
from app.core.config import settings

logger = logging.getLogger(__name__)

class BasePOSIntegration(ABC):
    """Base class for POS integrations"""
    
    @abstractmethod
    async def authenticate(self, credentials: Dict[str, str]) -> bool:
        pass
    
    @abstractmethod
    async def fetch_transactions(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        pass
    
    @abstractmethod
    async def fetch_menu_items(self) -> List[Dict[str, Any]]:
        pass
    
    @abstractmethod
    async def fetch_inventory(self) -> List[Dict[str, Any]]:
        pass

class SquarePOSIntegration(BasePOSIntegration):
    """Square POS integration"""
    
    def __init__(self):
        self.base_url = "https://connect.squareup.com/v2"
        self.access_token = None
        self.location_id = None
    
    async def authenticate(self, credentials: Dict[str, str]) -> bool:
        try:
            self.access_token = credentials.get('access_token')
            self.location_id = credentials.get('location_id')
            
            # Test authentication
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Content-Type': 'application/json'
            }
            
            response = requests.get(f"{self.base_url}/locations", headers=headers)
            return response.status_code == 200
            
        except Exception as e:
            logger.error(f"Square authentication failed: {e}")
            return False
    
    async def fetch_transactions(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        try:
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Content-Type': 'application/json'
            }
            
            body = {
                'location_ids': [self.location_id],
                'begin_time': start_date.isoformat(),
                'end_time': end_date.isoformat()
            }
            
            response = requests.post(
                f"{self.base_url}/payments/search",
                headers=headers,
                json=body
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('payments', [])
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Square transactions: {e}")
            return []
    
    async def fetch_menu_items(self) -> List[Dict[str, Any]]:
        try:
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Content-Type': 'application/json'
            }
            
            response = requests.get(
                f"{self.base_url}/catalog/list?types=ITEM",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('objects', [])
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Square menu items: {e}")
            return []
    
    async def fetch_inventory(self) -> List[Dict[str, Any]]:
        try:
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Content-Type': 'application/json'
            }
            
            response = requests.post(
                f"{self.base_url}/inventory/batch-retrieve-counts",
                headers=headers,
                json={'location_ids': [self.location_id]}
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('counts', [])
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Square inventory: {e}")
            return []

class ToastPOSIntegration(BasePOSIntegration):
    """Toast POS integration"""
    
    def __init__(self):
        self.base_url = "https://ws-api.toasttab.com"
        self.access_token = None
        self.restaurant_guid = None
    
    async def authenticate(self, credentials: Dict[str, str]) -> bool:
        try:
            self.access_token = credentials.get('access_token')
            self.restaurant_guid = credentials.get('restaurant_guid')
            
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Toast-Restaurant-External-ID': self.restaurant_guid
            }
            
            response = requests.get(f"{self.base_url}/restaurants/v1/restaurants", headers=headers)
            return response.status_code == 200
            
        except Exception as e:
            logger.error(f"Toast authentication failed: {e}")
            return False
    
    async def fetch_transactions(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        try:
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Toast-Restaurant-External-ID': self.restaurant_guid
            }
            
            params = {
                'startDate': start_date.strftime('%Y-%m-%d'),
                'endDate': end_date.strftime('%Y-%m-%d')
            }
            
            response = requests.get(
                f"{self.base_url}/orders/v2/orders",
                headers=headers,
                params=params
            )
            
            if response.status_code == 200:
                return response.json()
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Toast transactions: {e}")
            return []
    
    async def fetch_menu_items(self) -> List[Dict[str, Any]]:
        try:
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Toast-Restaurant-External-ID': self.restaurant_guid
            }
            
            response = requests.get(
                f"{self.base_url}/config/v1/menuitems",
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Toast menu items: {e}")
            return []
    
    async def fetch_inventory(self) -> List[Dict[str, Any]]:
        # Toast doesn't have a direct inventory API, return empty for now
        return []

class CloverPOSIntegration(BasePOSIntegration):
    """Clover POS integration"""
    
    def __init__(self):
        self.base_url = "https://api.clover.com/v3"
        self.access_token = None
        self.merchant_id = None
    
    async def authenticate(self, credentials: Dict[str, str]) -> bool:
        try:
            self.access_token = credentials.get('access_token')
            self.merchant_id = credentials.get('merchant_id')
            
            headers = {'Authorization': f'Bearer {self.access_token}'}
            
            response = requests.get(
                f"{self.base_url}/merchants/{self.merchant_id}",
                headers=headers
            )
            return response.status_code == 200
            
        except Exception as e:
            logger.error(f"Clover authentication failed: {e}")
            return False
    
    async def fetch_transactions(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        try:
            headers = {'Authorization': f'Bearer {self.access_token}'}
            
            params = {
                'filter': f'createdTime>={int(start_date.timestamp() * 1000)} AND createdTime<={int(end_date.timestamp() * 1000)}'
            }
            
            response = requests.get(
                f"{self.base_url}/merchants/{self.merchant_id}/orders",
                headers=headers,
                params=params
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('elements', [])
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Clover transactions: {e}")
            return []
    
    async def fetch_menu_items(self) -> List[Dict[str, Any]]:
        try:
            headers = {'Authorization': f'Bearer {self.access_token}'}
            
            response = requests.get(
                f"{self.base_url}/merchants/{self.merchant_id}/items",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('elements', [])
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Clover menu items: {e}")
            return []
    
    async def fetch_inventory(self) -> List[Dict[str, Any]]:
        try:
            headers = {'Authorization': f'Bearer {self.access_token}'}
            
            response = requests.get(
                f"{self.base_url}/merchants/{self.merchant_id}/inventory_items",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get('elements', [])
            
            return []
            
        except Exception as e:
            logger.error(f"Failed to fetch Clover inventory: {e}")
            return []

class POSIntegrationService:
    """Main POS integration service"""
    
    def __init__(self):
        self.integrations = {
            'square': SquarePOSIntegration(),
            'toast': ToastPOSIntegration(),
            'clover': CloverPOSIntegration()
        }
    
    async def connect_pos(self, restaurant_id: str, pos_type: str, credentials: Dict[str, str]) -> bool:
        """Connect to a POS system"""
        try:
            if pos_type not in self.integrations:
                logger.error(f"Unsupported POS type: {pos_type}")
                return False
            
            integration = self.integrations[pos_type]
            success = await integration.authenticate(credentials)
            
            if success:
                # Store connection info
                connection_data = {
                    "restaurant_id": restaurant_id,
                    "pos_type": pos_type,
                    "connected_at": datetime.now().isoformat(),
                    "status": "active"
                }
                
                await s3_service.store_restaurant_data(
                    restaurant_id, "pos_connection", connection_data
                )
                
                logger.info(f"Successfully connected {pos_type} POS for restaurant {restaurant_id}")
            
            return success
            
        except Exception as e:
            logger.error(f"POS connection failed: {e}")
            return False
    
    async def sync_pos_data(self, restaurant_id: str, pos_type: str, days_back: int = 7) -> Dict[str, Any]:
        """Sync data from POS system"""
        try:
            if pos_type not in self.integrations:
                return {"error": f"Unsupported POS type: {pos_type}"}
            
            integration = self.integrations[pos_type]
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days_back)
            
            # Fetch all data types
            transactions = await integration.fetch_transactions(start_date, end_date)
            menu_items = await integration.fetch_menu_items()
            inventory = await integration.fetch_inventory()
            
            # Process and analyze data
            processed_data = await self._process_pos_data(transactions, menu_items, inventory)
            
            # Store in S3
            sync_data = {
                "restaurant_id": restaurant_id,
                "pos_type": pos_type,
                "sync_timestamp": datetime.now().isoformat(),
                "date_range": {
                    "start": start_date.isoformat(),
                    "end": end_date.isoformat()
                },
                "raw_data": {
                    "transactions": transactions,
                    "menu_items": menu_items,
                    "inventory": inventory
                },
                "processed_data": processed_data
            }
            
            await s3_service.store_pos_data(restaurant_id, sync_data)
            
            return {
                "success": True,
                "transactions_count": len(transactions),
                "menu_items_count": len(menu_items),
                "inventory_items_count": len(inventory),
                "processed_data": processed_data
            }
            
        except Exception as e:
            logger.error(f"POS data sync failed: {e}")
            return {"error": str(e)}
    
    async def get_real_time_analytics(self, restaurant_id: str) -> Dict[str, Any]:
        """Get real-time analytics from POS data"""
        try:
            # Get recent POS data
            pos_data = await s3_service.retrieve_restaurant_data(
                restaurant_id, "pos_data", days_back=1
            )
            
            if not pos_data:
                return {"error": "No recent POS data available"}
            
            latest_data = pos_data[0] if pos_data else {}
            transactions = latest_data.get('raw_data', {}).get('transactions', [])
            
            # Calculate real-time metrics
            analytics = await self._calculate_real_time_metrics(transactions)
            
            return analytics
            
        except Exception as e:
            logger.error(f"Real-time analytics failed: {e}")
            return {"error": str(e)}
    
    async def generate_pos_insights(self, restaurant_id: str, period_days: int = 30) -> Dict[str, Any]:
        """Generate insights from POS data"""
        try:
            # Get POS data for the period
            pos_data = await s3_service.retrieve_restaurant_data(
                restaurant_id, "pos_data", days_back=period_days
            )
            
            if not pos_data:
                return {"error": "Insufficient POS data for insights"}
            
            # Aggregate all transactions
            all_transactions = []
            for data in pos_data:
                transactions = data.get('raw_data', {}).get('transactions', [])
                all_transactions.extend(transactions)
            
            # Generate insights
            insights = await self._generate_insights(all_transactions, period_days)
            
            return insights
            
        except Exception as e:
            logger.error(f"POS insights generation failed: {e}")
            return {"error": str(e)}
    
    async def _process_pos_data(self, transactions: List[Dict[str, Any]], 
                              menu_items: List[Dict[str, Any]], 
                              inventory: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Process raw POS data into structured format"""
        try:
            # Process transactions
            processed_transactions = []
            total_revenue = 0
            total_orders = len(transactions)
            
            for transaction in transactions:
                processed_transaction = {
                    "id": transaction.get('id'),
                    "timestamp": transaction.get('created_at') or transaction.get('createdTime'),
                    "amount": self._extract_amount(transaction),
                    "items": self._extract_items(transaction),
                    "payment_method": self._extract_payment_method(transaction),
                    "customer_info": self._extract_customer_info(transaction)
                }
                processed_transactions.append(processed_transaction)
                total_revenue += processed_transaction['amount']
            
            # Calculate metrics
            avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
            
            # Process menu items
            processed_menu = []
            for item in menu_items:
                processed_item = {
                    "id": item.get('id'),
                    "name": item.get('name'),
                    "price": self._extract_price(item),
                    "category": item.get('category'),
                    "availability": item.get('availability', True)
                }
                processed_menu.append(processed_item)
            
            # Process inventory
            processed_inventory = []
            for item in inventory:
                processed_inv_item = {
                    "id": item.get('id'),
                    "name": item.get('name'),
                    "quantity": item.get('quantity', 0),
                    "unit": item.get('unit'),
                    "cost": item.get('cost', 0)
                }
                processed_inventory.append(processed_inv_item)
            
            return {
                "summary": {
                    "total_revenue": total_revenue,
                    "total_orders": total_orders,
                    "average_order_value": avg_order_value,
                    "menu_items_count": len(processed_menu),
                    "inventory_items_count": len(processed_inventory)
                },
                "transactions": processed_transactions,
                "menu_items": processed_menu,
                "inventory": processed_inventory
            }
            
        except Exception as e:
            logger.error(f"POS data processing failed: {e}")
            return {}
    
    async def _calculate_real_time_metrics(self, transactions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate real-time metrics from transactions"""
        try:
            now = datetime.now()
            today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
            
            # Filter today's transactions
            today_transactions = []
            for transaction in transactions:
                transaction_time = self._parse_timestamp(transaction.get('timestamp'))
                if transaction_time and transaction_time >= today_start:
                    today_transactions.append(transaction)
            
            # Calculate metrics
            total_revenue_today = sum(self._extract_amount(t) for t in today_transactions)
            total_orders_today = len(today_transactions)
            avg_order_value = total_revenue_today / total_orders_today if total_orders_today > 0 else 0
            
            # Hourly breakdown
            hourly_sales = {}
            for transaction in today_transactions:
                hour = self._parse_timestamp(transaction.get('timestamp')).hour
                if hour not in hourly_sales:
                    hourly_sales[hour] = {"revenue": 0, "orders": 0}
                hourly_sales[hour]["revenue"] += self._extract_amount(transaction)
                hourly_sales[hour]["orders"] += 1
            
            return {
                "timestamp": now.isoformat(),
                "today_metrics": {
                    "total_revenue": total_revenue_today,
                    "total_orders": total_orders_today,
                    "average_order_value": avg_order_value
                },
                "hourly_breakdown": hourly_sales,
                "current_hour_revenue": hourly_sales.get(now.hour, {}).get("revenue", 0),
                "current_hour_orders": hourly_sales.get(now.hour, {}).get("orders", 0)
            }
            
        except Exception as e:
            logger.error(f"Real-time metrics calculation failed: {e}")
            return {}
    
    async def _generate_insights(self, transactions: List[Dict[str, Any]], period_days: int) -> Dict[str, Any]:
        """Generate business insights from POS data"""
        try:
            if not transactions:
                return {"error": "No transaction data available"}
            
            # Convert to DataFrame for analysis
            df_data = []
            for transaction in transactions:
                df_data.append({
                    "timestamp": self._parse_timestamp(transaction.get('timestamp')),
                    "amount": self._extract_amount(transaction),
                    "items": len(self._extract_items(transaction)),
                    "payment_method": self._extract_payment_method(transaction)
                })
            
            df = pd.DataFrame(df_data)
            df['timestamp'] = pd.to_datetime(df['timestamp'])
            df['hour'] = df['timestamp'].dt.hour
            df['day_of_week'] = df['timestamp'].dt.day_name()
            
            # Generate insights
            insights = {
                "period_summary": {
                    "total_revenue": df['amount'].sum(),
                    "total_orders": len(df),
                    "average_order_value": df['amount'].mean(),
                    "period_days": period_days
                },
                "peak_hours": df.groupby('hour')['amount'].sum().nlargest(3).to_dict(),
                "peak_days": df.groupby('day_of_week')['amount'].sum().nlargest(3).to_dict(),
                "payment_method_breakdown": df['payment_method'].value_counts().to_dict(),
                "revenue_trend": df.groupby(df['timestamp'].dt.date)['amount'].sum().to_dict(),
                "recommendations": await self._generate_pos_recommendations(df)
            }
            
            return insights
            
        except Exception as e:
            logger.error(f"Insights generation failed: {e}")
            return {"error": str(e)}
    
    async def _generate_pos_recommendations(self, df: pd.DataFrame) -> List[str]:
        """Generate recommendations based on POS data analysis"""
        recommendations = []
        
        try:
            # Peak hour analysis
            peak_hour = df.groupby('hour')['amount'].sum().idxmax()
            recommendations.append(f"Peak sales hour is {peak_hour}:00. Consider staffing optimization.")
            
            # Average order value analysis
            avg_order = df['amount'].mean()
            if avg_order < 25:
                recommendations.append("Average order value is low. Consider upselling strategies.")
            
            # Payment method analysis
            payment_methods = df['payment_method'].value_counts()
            if 'cash' in payment_methods and payment_methods['cash'] > len(df) * 0.3:
                recommendations.append("High cash usage detected. Consider promoting digital payments.")
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Recommendation generation failed: {e}")
            return ["Unable to generate recommendations due to data processing error."]
    
    # Helper methods for data extraction
    def _extract_amount(self, transaction: Dict[str, Any]) -> float:
        """Extract transaction amount"""
        amount = transaction.get('amount') or transaction.get('total_money', {}).get('amount', 0)
        if isinstance(amount, dict):
            return float(amount.get('amount', 0)) / 100  # Convert cents to dollars
        return float(amount) if amount else 0.0
    
    def _extract_items(self, transaction: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract items from transaction"""
        items = transaction.get('items') or transaction.get('line_items', [])
        return items if isinstance(items, list) else []
    
    def _extract_payment_method(self, transaction: Dict[str, Any]) -> str:
        """Extract payment method"""
        return transaction.get('payment_method') or transaction.get('tender_type', 'unknown')
    
    def _extract_customer_info(self, transaction: Dict[str, Any]) -> Dict[str, Any]:
        """Extract customer information"""
        return transaction.get('customer') or {}
    
    def _extract_price(self, item: Dict[str, Any]) -> float:
        """Extract item price"""
        price = item.get('price') or item.get('base_price_money', {}).get('amount', 0)
        if isinstance(price, dict):
            return float(price.get('amount', 0)) / 100
        return float(price) if price else 0.0
    
    def _parse_timestamp(self, timestamp: str) -> Optional[datetime]:
        """Parse timestamp string to datetime"""
        if not timestamp:
            return None
        
        try:
            # Handle different timestamp formats
            if 'T' in timestamp:
                return datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
            else:
                return datetime.fromtimestamp(int(timestamp) / 1000)
        except (ValueError, TypeError):
            return None

# Global instance
pos_integration_service = POSIntegrationService()