from typing import List, Optional, Dict, Any
import uuid

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.report import Report, ReportType, ReportFormat
from app.schemas.report import ReportCreate, ReportUpdate


class CRUDReport(CRUDBase[Report, ReportCreate, ReportUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: ReportCreate, owner_id: str, data: Dict[str, Any] = None, file_path: str = None
    ) -> Report:
        report_id = str(uuid.uuid4())
        db_obj = Report(
            id=report_id,
            owner_id=owner_id,
            data=data,
            file_path=file_path,
            **obj_in.dict(),
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: int = 100
    ) -> List[Report]:
        return (
            db.query(self.model)
            .filter(Report.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_by_research_project(
        self, db: Session, *, research_project_id: str, skip: int = 0, limit: int = 100
    ) -> List[Report]:
        return (
            db.query(self.model)
            .filter(Report.research_project_id == research_project_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_by_type_and_research_project(
        self, db: Session, *, type: ReportType, research_project_id: str
    ) -> List[Report]:
        return (
            db.query(self.model)
            .filter(Report.type == type, Report.research_project_id == research_project_id)
            .all()
        )


report = CRUDReport(Report)
