from celery import Celery
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Celery
redis_host = os.getenv("REDIS_HOST", "localhost")
redis_port = os.getenv("REDIS_PORT", "6379")
redis_url = f"redis://{redis_host}:{redis_port}/0"

celery_app = Celery("worker", broker=redis_url, backend=redis_url)

# Configure Celery
celery_app.conf.task_routes = {
    "app.worker.test_celery": "main-queue",
    "app.services.research_processor.process_research_project": "research-queue",
    "app.services.report_generator.generate_report": "report-queue",
    "app.services.integration_manager.sync_integration_data": "integration-queue",
}

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)


@celery_app.task(acks_late=True)
def test_celery(word: str) -> str:
    """
    Test Celery task.
    """
    return f"test task return {word}"
