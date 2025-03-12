from fastapi import APIRouter
from app.services.metrics_service import get_current_metrics, get_historical_metrics
from app.models.schemas import SystemMetrics
from typing import List

router = APIRouter()

@router.get("/current", response_model=SystemMetrics)
async def get_metrics():
    """Get current system metrics"""
    return get_current_metrics()

@router.get("/historical", response_model=List[SystemMetrics])
async def historical_metrics(hours: int = 1):
    """Get historical metrics"""
    return get_historical_metrics(hours)








