import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function OptimizationRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/services/optimization/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        // Remove duplicates based on resource_type and recommended_value
        const uniqueRecommendations = Array.from(
          new Map(
            data.map((rec) => [`${rec.resource_type}-${rec.recommended_value}`, rec])
          ).values()
        );
        setRecommendations(uniqueRecommendations);
      });
  }, []);

  return (
    <div className="p-4 bg-yellow-100 rounded shadow-md mt-4">
      <h3 className="text-lg font-semibold">Optimization Recommendations</h3>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <strong>{rec.resource_type}:</strong> Reduce from {rec.current_value} to {rec.recommended_value} ({rec.reason})
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
}

export default OptimizationRecommendations;
