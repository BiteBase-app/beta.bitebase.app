# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.user import User  # noqa
from app.models.restaurant_profile import RestaurantProfile  # noqa
from app.models.research_project import ResearchProject  # noqa
from app.models.integration import Integration  # noqa
from app.models.report import Report  # noqa
