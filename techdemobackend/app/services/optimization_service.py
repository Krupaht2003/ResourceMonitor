import numpy as np
from app.models.schemas import OptimizationRecommendation, SystemMetrics
from app.services.metrics_service import historical_data, data_lock

def generate_optimization_recommendations():
    with data_lock:  
        if len(historical_data) < 1:
            print("Not enough historical data. Available:", len(historical_data))
            print("Historical Data:", historical_data)  # Print actual data
            return []

        recent_data = historical_data[-10:]  # Get last 10 records

    # Convert raw dictionaries to SystemMetrics objects if needed
    recent_data = [SystemMetrics(**d) if isinstance(d, dict) else d for d in recent_data]

    cpu_values = [d.cpu_usage for d in recent_data if hasattr(d, "cpu_usage")]
    memory_values = [d.memory_usage for d in recent_data if hasattr(d, "memory_usage")]

    print(f"Extracted CPU Values: {cpu_values}")  
    print(f"Extracted Memory Values: {memory_values}")  

    if not cpu_values or not memory_values:
        print("No valid CPU or Memory data found.")
        return []

    avg_cpu = np.mean(cpu_values)
    max_cpu = np.max(cpu_values)
    avg_memory = np.mean(memory_values)
    max_memory = np.max(memory_values)

    print(f"CPU Usage - Avg: {avg_cpu}, Max: {max_cpu}")
    print(f"Memory Usage - Avg: {avg_memory}, Max: {max_memory}")

    recommendations = []

    if max_cpu < 70 and avg_cpu < 50:  # Fixed threshold
        recommended_value = max_cpu * 0.8
        savings = 100 * (1 - (recommended_value / max_cpu))
        recommendations.append(OptimizationRecommendation(
            resource_type="cpu", 
            current_value=max_cpu, 
            recommended_value=recommended_value, 
            reason="CPU underutilized", 
            potential_savings=savings
        ))

    if max_memory < 90 and avg_memory < 80:  # Fixed threshold
        recommended_value = max_memory * 0.8
        savings = 100 * (1 - (recommended_value / max_memory))
        recommendations.append(OptimizationRecommendation(
            resource_type="memory", 
            current_value=max_memory, 
            recommended_value=recommended_value, 
            reason="Memory underutilized", 
            potential_savings=savings
        ))

    print("Generated Recommendations:", recommendations)  
    return recommendations
