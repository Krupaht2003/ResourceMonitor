# from fastapi import APIRouter

# router = APIRouter()

# @router.get("/health")
# async def health_check():
#     """Health check endpoint"""
#     return {"status": "healthy"}


import psutil
from fastapi import APIRouter

router = APIRouter()

# Define thresholds
THRESHOLDS = {
    "cpu": {"optimal": 1, "warning": 85, "critical": 90},
    "memory": {"optimal": 1, "warning": 85, "critical": 90},
    "disk": {"optimal": 1, "warning": 85, "critical": 90},
}

def get_health_status(value, thresholds):
    """Determine the health status based on given value and thresholds."""
    if value >= thresholds["critical"]:
        return "critical"
    elif value >= thresholds["warning"]:
        return "warning"
    elif value >= thresholds["optimal"]:
        return "healthy"
    return "optimal"

@router.get("/health")
async def health_check():
    """Health check endpoint with system metrics"""
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_usage = psutil.virtual_memory().percent
    disk_usage = psutil.disk_usage('/').percent

    # Determine health statuses
    cpu_status = get_health_status(cpu_usage, THRESHOLDS["cpu"])
    memory_status = get_health_status(memory_usage, THRESHOLDS["memory"])
    disk_status = get_health_status(disk_usage, THRESHOLDS["disk"])

    # Overall system health logic
    if "critical" in [cpu_status, memory_status, disk_status]:
        overall_status = "critical"
    elif "warning" in [cpu_status, memory_status, disk_status]:
        overall_status = "warning"
    else:
        overall_status = "healthy"

    return {
        "status": overall_status,
        "metrics": {
            "cpu": {"value": cpu_usage, "status": cpu_status},
            "memory": {"value": memory_usage, "status": memory_status},
            "disk": {"value": disk_usage, "status": disk_status},
        }
    }
