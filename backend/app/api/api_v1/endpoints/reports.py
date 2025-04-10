from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Query, Header, Request
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.models.report import ReportType, ReportFormat
from app.services.report_generator import generate_report, get_report_file_path
from app.api.api_v1.endpoints.mock_data import MOCK_REPORTS

router = APIRouter()


@router.get("/", response_model=List[schemas.Report])
def read_reports(
    request: Request,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user_or_mock),
    x_mock_data: str = Header(None)
) -> Any:
    """
    Retrieve reports.
    """
    # Use mock data if header is present or if we're using a mock user
    if x_mock_data == "true" or current_user.id == "mock-user-id":
        return MOCK_REPORTS

    # Otherwise use real data
    reports = crud.report.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
    return reports


@router.post("/", response_model=schemas.Report)
def create_report(
    *,
    db: Session = Depends(deps.get_db),
    background_tasks: BackgroundTasks,
    report_in: schemas.ReportCreate,
    current_user: models.User = Depends(deps.get_current_active_user_or_mock),
    x_mock_data: str = Header(None)
) -> Any:
    """
    Create new report.
    """
    # Use mock data if header is present or if we're using a mock user
    if x_mock_data == "true" or current_user.id == "mock-user-id":
        # Create a new mock report
        import uuid
        from datetime import datetime

        new_report = {
            "id": str(uuid.uuid4()),
            "name": report_in.name,
            "type": report_in.type,
            "format": report_in.format,
            "research_project_id": report_in.research_project_id,
            "owner_id": current_user.id,
            "status": "pending",
            "created_at": datetime.now().isoformat(),
            "download_url": None
        }

        # Add to mock reports
        MOCK_REPORTS.append(new_report)
        return new_report

    # Otherwise use real data
    # Check if the research project exists and belongs to the user
    research_project = crud.research_project.get(db=db, id=report_in.research_project_id)
    if not research_project:
        raise HTTPException(status_code=404, detail="Research project not found")
    if research_project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Removed tier restriction for report formats
    # All users can access all report formats

    # Create the report
    report = crud.report.create_with_owner(
        db=db, obj_in=report_in, owner_id=current_user.id
    )

    # Generate the report in the background
    background_tasks.add_task(
        generate_report,
        db=db,
        report_id=report.id,
        user_id=current_user.id
    )

    return report


@router.get("/{id}", response_model=schemas.Report)
def read_report(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get report by ID.
    """
    report = crud.report.get(db=db, id=id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if report.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return report


@router.delete("/{id}", response_model=schemas.Report)
def delete_report(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a report.
    """
    report = crud.report.get(db=db, id=id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if report.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    report = crud.report.remove(db=db, id=id)
    return report


@router.get("/{id}/download")
def download_report(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Download a report file.
    """
    report = crud.report.get(db=db, id=id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if report.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if not report.file_path:
        raise HTTPException(status_code=404, detail="Report file not found")

    file_path = get_report_file_path(report)

    # Determine content type based on format
    content_type = "application/json"
    if report.format == ReportFormat.PDF:
        content_type = "application/pdf"
    elif report.format == ReportFormat.EXCEL:
        content_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    elif report.format == ReportFormat.CSV:
        content_type = "text/csv"

    return FileResponse(
        path=file_path,
        filename=f"{report.name.replace(' ', '_').lower()}.{report.format.value}",
        media_type=content_type
    )


@router.get("/by-project/{research_project_id}", response_model=List[schemas.Report])
def read_reports_by_project(
    *,
    db: Session = Depends(deps.get_db),
    research_project_id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get reports by research project ID.
    """
    # Check if the research project exists and belongs to the user
    research_project = crud.research_project.get(db=db, id=research_project_id)
    if not research_project:
        raise HTTPException(status_code=404, detail="Research project not found")
    if research_project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    reports = crud.report.get_by_research_project(
        db=db, research_project_id=research_project_id
    )
    return reports


@router.get("/by-type/{report_type}", response_model=List[schemas.Report])
def read_reports_by_type(
    *,
    db: Session = Depends(deps.get_db),
    report_type: ReportType,
    research_project_id: str = Query(None),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get reports by type and optionally by research project.
    """
    if research_project_id:
        # Check if the research project exists and belongs to the user
        research_project = crud.research_project.get(db=db, id=research_project_id)
        if not research_project:
            raise HTTPException(status_code=404, detail="Research project not found")
        if research_project.owner_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not enough permissions")

        reports = crud.report.get_by_type_and_research_project(
            db=db, type=report_type, research_project_id=research_project_id
        )
    else:
        # Get all reports of this type owned by the user
        all_reports = crud.report.get_multi_by_owner(db=db, owner_id=current_user.id)
        reports = [r for r in all_reports if r.type == report_type]

    return reports
