from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.models.integration import IntegrationStatus, IntegrationType
from app.services.integration_manager import connect_integration, sync_integration_data

router = APIRouter()


@router.get("/", response_model=List[schemas.Integration])
def read_integrations(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve integrations.
    """
    integrations = crud.integration.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )
    return integrations


@router.post("/", response_model=schemas.Integration)
def create_integration(
    *,
    db: Session = Depends(deps.get_db),
    integration_in: schemas.IntegrationCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new integration.
    """
    # Check subscription tier for certain integration types
    if current_user.subscription_tier == "free" and integration_in.type in [IntegrationType.YELP, IntegrationType.GOOGLE_PLACES]:
        raise HTTPException(
            status_code=403,
            detail=f"Integration with {integration_in.type} requires a Pro or Enterprise subscription"
        )
    
    integration = crud.integration.create_with_owner(
        db=db, obj_in=integration_in, owner_id=current_user.id
    )
    return integration


@router.get("/{id}", response_model=schemas.Integration)
def read_integration(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get integration by ID.
    """
    integration = crud.integration.get(db=db, id=id)
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    if integration.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return integration


@router.put("/{id}", response_model=schemas.Integration)
def update_integration(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    integration_in: schemas.IntegrationUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an integration.
    """
    integration = crud.integration.get(db=db, id=id)
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    if integration.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    integration = crud.integration.update(
        db=db, db_obj=integration, obj_in=integration_in
    )
    return integration


@router.delete("/{id}", response_model=schemas.Integration)
def delete_integration(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an integration.
    """
    integration = crud.integration.get(db=db, id=id)
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    if integration.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    integration = crud.integration.remove(db=db, id=id)
    return integration


@router.post("/{id}/connect", response_model=schemas.Integration)
def connect_integration_endpoint(
    *,
    db: Session = Depends(deps.get_db),
    background_tasks: BackgroundTasks,
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Connect an integration.
    """
    integration = crud.integration.get(db=db, id=id)
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    if integration.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    try:
        # Update status to indicate connection is in progress
        integration = crud.integration.update_status(
            db=db, db_obj=integration, status=IntegrationStatus.CONNECTED
        )
        
        # Connect the integration
        connect_integration(integration)
        
        return integration
    except Exception as e:
        # Update status to indicate error
        integration = crud.integration.update_status(
            db=db, db_obj=integration, status=IntegrationStatus.ERROR
        )
        raise HTTPException(status_code=500, detail=f"Error connecting integration: {str(e)}")


@router.post("/{id}/sync", response_model=schemas.Integration)
def sync_integration_endpoint(
    *,
    db: Session = Depends(deps.get_db),
    background_tasks: BackgroundTasks,
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Sync data from an integration.
    """
    integration = crud.integration.get(db=db, id=id)
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    if integration.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    if integration.status != IntegrationStatus.CONNECTED:
        raise HTTPException(status_code=400, detail="Integration is not connected")
    
    # Start background task for syncing
    background_tasks.add_task(
        sync_integration_data,
        db=db,
        integration_id=id,
        user_id=current_user.id
    )
    
    return integration
