import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env

function OptimizationRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/services/optimization/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);  // Debugging API response
        setRecommendations(data);  // Removed filtering logic for now
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      })
      .finally(() => setLoading(false));  // Ensure loading state is handled
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-bold text-blue-600 mb-4">
        Optimization Recommendations
      </h3>

      {loading ? (
        <p className="text-gray-500">Loading recommendations...</p>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-lg bg-white shadow-md hover:shadow-lg transition 
                          ${rec.potential_savings > 0 ? "border-green-500" : "border-red-500"}`}
            >
              <h4 className="text-lg font-semibold capitalize text-gray-700">
                {rec.resource_type.toUpperCase()}
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Current Value:</strong> {rec.current_value}%
              </p>
              <p className="text-sm text-gray-500">
                <strong>Recommended Value:</strong> {rec.recommended_value}%
              </p>
              <p className="text-sm text-gray-500">
                <strong>Reason:</strong> {rec.reason}
              </p>
              {rec.potential_savings > 0 && (
                <p className="text-green-500 font-medium mt-2">
                  Potential Savings: {rec.potential_savings}%
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recommendations available.</p>
      )}
    </div>
  );
}

export default OptimizationRecommendations;
