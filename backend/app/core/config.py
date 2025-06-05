import secrets
from typing import Any, Dict, List, Optional, Union

from pydantic import BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    # Environment
    ENVIRONMENT: str = "development"  # development, staging, production

    # OpenAI
    OPENAI_API_KEY: str = ""

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "http://localhost:8080", "*"]

    @validator("CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            try:
                # Try to parse as JSON
                import json
                return json.loads(v)
            except json.JSONDecodeError:
                # If not JSON, split by comma
                if v.strip() == "":
                    return []
                return [i.strip() for i in v.split(",")]
        return v

    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "bitebase"
    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        postgres_user = values.get("POSTGRES_USER")
        postgres_password = values.get("POSTGRES_PASSWORD")
        postgres_server = values.get("POSTGRES_SERVER")
        postgres_db = values.get("POSTGRES_DB", "")

        return f"postgresql://{postgres_user}:{postgres_password}@{postgres_server}/{postgres_db}"

    # External APIs
    GOOGLE_PLACES_API_KEY: Optional[str] = None
    GOOGLE_MAPS_API_KEY: Optional[str] = None
    YELP_API_KEY: Optional[str] = None
    CENSUS_API_KEY: Optional[str] = None
    
    # AWS Configuration
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "us-east-1"
    S3_BUCKET_NAME: str = "bitebase-intelligence-data"
    
    # Meta (Facebook) API
    META_ACCESS_TOKEN: Optional[str] = None
    META_APP_ID: Optional[str] = None
    META_APP_SECRET: Optional[str] = None
    
    # POS System APIs
    SQUARE_ACCESS_TOKEN: Optional[str] = None
    TOAST_ACCESS_TOKEN: Optional[str] = None
    CLOVER_ACCESS_TOKEN: Optional[str] = None
    
    # AI/ML Configuration
    OPENAI_MODEL: str = "gpt-4"
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: Optional[str] = None
    
    # Stripe Configuration
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_PUBLISHABLE_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # Project
    PROJECT_NAME: str = "BiteBase Intelligence"

    # Sentry
    SENTRY_DSN: Optional[str] = None

    # First superuser
    FIRST_SUPERUSER_EMAIL: str = "admin@example.com"
    FIRST_SUPERUSER_PASSWORD: str = "admin"

    # Test user
    EMAIL_TEST_USER: str = "test@example.com"

    model_config = {
        "case_sensitive": True,
        "env_file": ".env"
    }


settings = Settings()
