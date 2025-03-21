import psutil
from datetime import datetime, timedelta
from app.models.schemas import SystemMetrics
from app.utils.prometheus_metrics import CPU_USAGE, MEMORY_USAGE, DISK_USAGE
import threading
import time

historical_data = []
data_lock = threading.Lock()  

def get_current_metrics() -> SystemMetrics:
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')

    CPU_USAGE.set(cpu_percent)
    MEMORY_USAGE.set(memory.percent)
    DISK_USAGE.set(disk.percent)


    metrics = SystemMetrics(
        timestamp=datetime.now(),
        cpu_usage=cpu_percent,
        memory_usage=memory.percent,
        disk_usage=disk.percent,
        
    )

    with data_lock:
        historical_data.append(metrics)
        if len(historical_data) > 1000:
            historical_data.pop(0)

    return metrics

def get_historical_metrics(hours: int):
    cutoff_time = datetime.now() - timedelta(hours=hours)
    
    with data_lock:
        return [metric for metric in historical_data if metric.timestamp > cutoff_time]

def collect_metrics_periodically(interval_seconds=60):
    while True:
        get_current_metrics()
        time.sleep(interval_seconds)

metrics_thread = threading.Thread(target=collect_metrics_periodically, daemon=True)
metrics_thread.start()

