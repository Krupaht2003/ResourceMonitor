import numpy as np
from app.models.schemas import OptimizationRecommendation, SystemMetrics
from app.services.metrics_service import historical_data, data_lock

def generate_optimization_recommendations():
    with data_lock:
        if len(historical_data) < 1:
            print("Not enough historical data. Available:", len(historical_data))
            print("Historical Data:", historical_data)
            return []

        recent_data = historical_data[-10:]

    recent_data = [SystemMetrics(**d) if isinstance(d, dict) else d for d in recent_data]

    cpu_values = [d.cpu_usage for d in recent_data if hasattr(d, "cpu_usage")]
    memory_values = [d.memory_usage for d in recent_data if hasattr(d, "memory_usage")]
    disk_values = [d.disk_usage for d in recent_data if hasattr(d, "disk_usage")]

    if not cpu_values or not memory_values or not disk_values:
        print("No valid CPU, Memory, or Disk data found.")
        return []

    avg_cpu, max_cpu = np.mean(cpu_values), np.max(cpu_values)
    avg_memory, max_memory = np.mean(memory_values), np.max(memory_values)
    avg_disk, max_disk = np.mean(disk_values), np.max(disk_values)

    recommendations = []

    # CPU Optimization Logic
    if max_cpu > 80:
        recommended_value = 80
        recommendations.append(OptimizationRecommendation(
            resource_type="cpu",
            current_value=max_cpu,
            recommended_value=recommended_value,
            reason="Critical CPU usage detected. Consider scaling up resources or optimizing CPU-heavy processes.",
            potential_savings=0
        ))
    elif max_cpu < 20:
        recommended_value = 20
        recommendations.append(OptimizationRecommendation(
            resource_type="cpu",
            current_value=max_cpu,
            recommended_value=recommended_value,
            reason="CPU underutilized. Consider downsizing resources for cost savings.",
            potential_savings=20
        ))

    # Memory Optimization Logic
    if max_memory > 80:
        recommended_value = 80
        recommendations.append(OptimizationRecommendation(
            resource_type="memory",
            current_value=max_memory,
            recommended_value=recommended_value,
            reason="Critical memory usage detected. Consider scaling up resources or improving memory-intensive processes.",
            potential_savings=0
        ))
    elif max_memory < 40:
        recommended_value = 40
        recommendations.append(OptimizationRecommendation(
            resource_type="memory",
            current_value=max_memory,
            recommended_value=recommended_value,
            reason="Memory underutilized. Consider downsizing resources for cost savings.",
            potential_savings=20
        ))

    # Disk Optimization Logic
    if max_disk > 80:
        recommended_value = 80
        recommendations.append(OptimizationRecommendation(
            resource_type="disk",
            current_value=max_disk,
            recommended_value=recommended_value,
            reason="Critical disk usage detected. Consider increasing storage capacity or clearing unnecessary data.",
            potential_savings=0
        ))
    elif max_disk < 30:
        recommended_value = 30
        recommendations.append(OptimizationRecommendation(
            resource_type="disk",
            current_value=max_disk,
            recommended_value=recommended_value,
            reason="Disk underutilized. Consider resizing storage to reduce costs.",
            potential_savings=20
        ))

    print("Generated Recommendations:", recommendations)
    return recommendations

