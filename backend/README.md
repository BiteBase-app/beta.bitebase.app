# BiteBase Intelligence Backend

This is the backend service for BiteBase Intelligence, a restaurant market research and analytics platform.

## Features

- User authentication and authorization
- Restaurant profile management
- Market research and analysis
- Location intelligence
- Competitive analysis
- Data integration with external APIs
- Report generation
- Background task processing

## Tech Stack

- FastAPI: Modern, fast web framework for building APIs
- SQLAlchemy: SQL toolkit and ORM
- Pydantic: Data validation and settings management
- PostgreSQL: Relational database
- Redis: In-memory data store and message broker
- Celery: Distributed task queue
- Alembic: Database migration tool
- Docker: Containerization

## Getting Started

### Prerequisites

- Python 3.9+
- PostgreSQL
- Redis

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bitebase-intelligence.git
cd bitebase-intelligence/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

5. Edit the `.env` file with your configuration.

### Database Setup

1. Create the database:
```bash
createdb bitebase
```

2. Run migrations:
```bash
alembic upgrade head
```

### Running the Application

1. Start the backend server:
```bash
python run.py
```

2. The API will be available at http://localhost:8000

3. API documentation is available at:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Running with Docker

1. Build and start the containers:
```bash
docker-compose up -d
```

2. The API will be available at http://localhost:8000

## API Endpoints

The API provides the following endpoints:

- `/api/v1/auth`: Authentication endpoints
- `/api/v1/users`: User management
- `/api/v1/restaurant-profiles`: Restaurant profile management
- `/api/v1/research-projects`: Research project management
- `/api/v1/integrations`: External data integrations
- `/api/v1/reports`: Report generation and management
- `/api/v1/location`: Location intelligence
- `/api/v1/analytics`: Analytics and insights

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black .
```

### Linting

```bash
flake8
```

### Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:
```bash
alembic upgrade head
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
