"""
AWS S3 Service for BiteBase Intelligence
Handles data storage, retrieval, and management in S3
"""

import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import pandas as pd
import io
from app.core.config import settings

logger = logging.getLogger(__name__)

class S3DataService:
    """Service for managing restaurant data in AWS S3"""
    
    def __init__(self):
        try:
            self.s3_client = boto3.client(
                's3',
                aws_access_key_id=getattr(settings, 'AWS_ACCESS_KEY_ID', None),
                aws_secret_access_key=getattr(settings, 'AWS_SECRET_ACCESS_KEY', None),
                region_name=getattr(settings, 'AWS_REGION', 'us-east-1')
            )
            self.bucket_name = getattr(settings, 'S3_BUCKET_NAME', 'bitebase-intelligence-data')
            self._ensure_bucket_exists()
        except NoCredentialsError:
            logger.error("AWS credentials not found")
            self.s3_client = None
    
    def _ensure_bucket_exists(self):
        """Ensure the S3 bucket exists"""
        try:
            self.s3_client.head_bucket(Bucket=self.bucket_name)
        except ClientError as e:
            if e.response['Error']['Code'] == '404':
                try:
                    self.s3_client.create_bucket(Bucket=self.bucket_name)
                    logger.info(f"Created S3 bucket: {self.bucket_name}")
                except ClientError as create_error:
                    logger.error(f"Failed to create bucket: {create_error}")
    
    async def store_restaurant_data(self, restaurant_id: str, data_type: str, data: Dict[str, Any]) -> bool:
        """Store restaurant data in S3"""
        try:
            key = f"restaurants/{restaurant_id}/{data_type}/{datetime.now().isoformat()}.json"
            
            # Add metadata
            enriched_data = {
                "timestamp": datetime.now().isoformat(),
                "restaurant_id": restaurant_id,
                "data_type": data_type,
                "data": data
            }
            
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=json.dumps(enriched_data, default=str),
                ContentType='application/json',
                Metadata={
                    'restaurant_id': restaurant_id,
                    'data_type': data_type,
                    'timestamp': datetime.now().isoformat()
                }
            )
            
            logger.info(f"Stored data for restaurant {restaurant_id}, type: {data_type}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to store restaurant data: {e}")
            return False
    
    async def store_market_data(self, location: str, market_data: Dict[str, Any]) -> bool:
        """Store market research data"""
        try:
            key = f"market_data/{location}/{datetime.now().strftime('%Y/%m/%d')}/market_analysis.json"
            
            enriched_data = {
                "timestamp": datetime.now().isoformat(),
                "location": location,
                "market_data": market_data
            }
            
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=json.dumps(enriched_data, default=str),
                ContentType='application/json'
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to store market data: {e}")
            return False
    
    async def store_pos_data(self, restaurant_id: str, pos_data: Dict[str, Any]) -> bool:
        """Store POS system data"""
        try:
            key = f"pos_data/{restaurant_id}/{datetime.now().strftime('%Y/%m/%d')}/transactions.json"
            
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=json.dumps(pos_data, default=str),
                ContentType='application/json'
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to store POS data: {e}")
            return False
    
    async def store_forecast_data(self, restaurant_id: str, forecast_data: Dict[str, Any]) -> bool:
        """Store forecasting results"""
        try:
            key = f"forecasts/{restaurant_id}/{datetime.now().strftime('%Y/%m')}/forecast.json"
            
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=json.dumps(forecast_data, default=str),
                ContentType='application/json'
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to store forecast data: {e}")
            return False
    
    async def retrieve_restaurant_data(self, restaurant_id: str, data_type: str, 
                                     days_back: int = 30) -> List[Dict[str, Any]]:
        """Retrieve restaurant data from S3"""
        try:
            prefix = f"restaurants/{restaurant_id}/{data_type}/"
            
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )
            
            data_list = []
            cutoff_date = datetime.now() - timedelta(days=days_back)
            
            for obj in response.get('Contents', []):
                # Get object
                obj_response = self.s3_client.get_object(
                    Bucket=self.bucket_name,
                    Key=obj['Key']
                )
                
                data = json.loads(obj_response['Body'].read())
                
                # Filter by date
                if datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00')) >= cutoff_date:
                    data_list.append(data)
            
            return sorted(data_list, key=lambda x: x['timestamp'], reverse=True)
            
        except Exception as e:
            logger.error(f"Failed to retrieve restaurant data: {e}")
            return []
    
    async def retrieve_market_data(self, location: str, days_back: int = 7) -> List[Dict[str, Any]]:
        """Retrieve market data for a location"""
        try:
            prefix = f"market_data/{location}/"
            
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )
            
            data_list = []
            cutoff_date = datetime.now() - timedelta(days=days_back)
            
            for obj in response.get('Contents', []):
                if obj['LastModified'].replace(tzinfo=None) >= cutoff_date:
                    obj_response = self.s3_client.get_object(
                        Bucket=self.bucket_name,
                        Key=obj['Key']
                    )
                    
                    data = json.loads(obj_response['Body'].read())
                    data_list.append(data)
            
            return sorted(data_list, key=lambda x: x['timestamp'], reverse=True)
            
        except Exception as e:
            logger.error(f"Failed to retrieve market data: {e}")
            return []
    
    async def store_dataframe(self, key: str, df: pd.DataFrame) -> bool:
        """Store pandas DataFrame as parquet in S3"""
        try:
            buffer = io.BytesIO()
            df.to_parquet(buffer, index=False)
            buffer.seek(0)
            
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=f"{key}.parquet",
                Body=buffer.getvalue(),
                ContentType='application/octet-stream'
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to store DataFrame: {e}")
            return False
    
    async def retrieve_dataframe(self, key: str) -> Optional[pd.DataFrame]:
        """Retrieve pandas DataFrame from S3"""
        try:
            response = self.s3_client.get_object(
                Bucket=self.bucket_name,
                Key=f"{key}.parquet"
            )
            
            buffer = io.BytesIO(response['Body'].read())
            df = pd.read_parquet(buffer)
            
            return df
            
        except Exception as e:
            logger.error(f"Failed to retrieve DataFrame: {e}")
            return None
    
    async def store_ai_memory(self, memory_id: str, memory_data: Dict[str, Any]) -> bool:
        """Store AI memory data for recall"""
        try:
            key = f"ai_memory/{memory_id}/{datetime.now().isoformat()}.json"
            
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=json.dumps(memory_data, default=str),
                ContentType='application/json'
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Failed to store AI memory: {e}")
            return False
    
    async def retrieve_ai_memory(self, memory_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Retrieve AI memory data"""
        try:
            prefix = f"ai_memory/{memory_id}/"
            
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix,
                MaxKeys=limit
            )
            
            memories = []
            for obj in response.get('Contents', []):
                obj_response = self.s3_client.get_object(
                    Bucket=self.bucket_name,
                    Key=obj['Key']
                )
                
                memory = json.loads(obj_response['Body'].read())
                memories.append(memory)
            
            return sorted(memories, key=lambda x: x.get('timestamp', ''), reverse=True)
            
        except Exception as e:
            logger.error(f"Failed to retrieve AI memory: {e}")
            return []

# Global instance
s3_service = S3DataService()