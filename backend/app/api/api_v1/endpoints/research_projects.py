from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Header, Request
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.models.research_project import ProjectStatus
from app.services.research_processor import process_research_project
from app.api.api_v1.endpoints.mock_data import MOCK_RESEARCH_PROJECTS

router = APIRouter()


@router.get("/", response_model=List[schemas.ResearchProject])
def read_research_projects(
    request: Request,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user_or_mock),
    x_mock_data: str = Header(None)
) -> Any:
    """
    Retrieve research projects.
    """
    # Use mock data if header is present or if we're using a mock user
    if x_mock_data == "true" or current_user.id == "mock-user-id":
        return MOCK_RESEARCH_PROJECTS

    # Otherwise use real data
    research_projects = crud.research_project.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
    return research_projects


@router.post("/", response_model=schemas.ResearchProject)
def create_research_project(
    *,
    db: Session = Depends(deps.get_db),
    research_project_in: schemas.ResearchProjectCreate,
    current_user: models.User = Depends(deps.get_current_active_user_or_mock),
    x_mock_data: str = Header(None)
) -> Any:
    """
    Create new research project.
    """
    # Use mock data if header is present or if we're using a mock user
    if x_mock_data == "true" or current_user.id == "mock-user-id":
        # Create a new mock project
        import uuid
        from datetime import datetime

        new_project = {
            "id": str(uuid.uuid4()),
            "name": research_project_in.name,
            "description": research_project_in.description,
            "restaurant_profile_id": research_project_in.restaurant_profile_id,
            "owner_id": current_user.id,
            "status": "pending",
            "progress": 0,
            "created_at": datetime.now().isoformat(),
            "competitive_analysis": research_project_in.competitive_analysis,
            "market_sizing": research_project_in.market_sizing,
            "demographic_analysis": research_project_in.demographic_analysis,
            "location_intelligence": research_project_in.location_intelligence
        }

        # Add to mock projects
        MOCK_RESEARCH_PROJECTS.append(new_project)
        return new_project

    # Otherwise use real data
    # Check if the restaurant profile exists and belongs to the user
    restaurant_profile = crud.restaurant_profile.get(db=db, id=research_project_in.restaurant_profile_id)
    if not restaurant_profile:
        raise HTTPException(status_code=404, detail="Restaurant profile not found")
    if restaurant_profile.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    research_project = crud.research_project.create_with_owner(
        db=db, obj_in=research_project_in, owner_id=current_user.id
    )
    return research_project


@router.get("/{id}", response_model=schemas.ResearchProject)
def read_research_project(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get research project by ID.
    """
    research_project = crud.research_project.get(db=db, id=id)
    if not research_project:
        raise HTTPException(status_code=404, detail="Research project not found")
    if research_project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return research_project


@router.put("/{id}", response_model=schemas.ResearchProject)
def update_research_project(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    research_project_in: schemas.ResearchProjectUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a research project.
    """
    research_project = crud.research_project.get(db=db, id=id)
    if not research_project:
        raise HTTPException(status_code=404, detail="Research project not found")
    if research_project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # If status is completed, don't allow updates
    if research_project.status == ProjectStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Completed projects cannot be updated")

    research_project = crud.research_project.update(
        db=db, db_obj=research_project, obj_in=research_project_in
    )
    return research_project


@router.delete("/{id}", response_model=schemas.ResearchProject)
def delete_research_project(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a research project.
    """
    research_project = crud.research_project.get(db=db, id=id)
    if not research_project:
        raise HTTPException(status_code=404, detail="Research project not found")
    if research_project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    research_project = crud.research_project.remove(db=db, id=id)
    return research_project


@router.post("/{id}/analyze", response_model=schemas.ResearchProject)
def analyze_research_project(
    *,
    db: Session = Depends(deps.get_db),
    background_tasks: BackgroundTasks,
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Start analysis of a research project.
    """
    research_project = crud.research_project.get(db=db, id=id)
    if not research_project:
        raise HTTPException(status_code=404, detail="Research project not found")
    if research_project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Removed tier restriction for analysis types
    # All users can access all analysis types

    # Update status to in progress
    research_project = crud.research_project.update_status(
        db=db, db_obj=research_project, status=ProjectStatus.IN_PROGRESS, progress=10
    )

    # Start background task for analysis
    background_tasks.add_task(
        process_research_project,
        db=db,
        research_project_id=id,
        user_id=current_user.id
    )

    return research_project
