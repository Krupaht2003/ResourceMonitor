import { useState, useEffect } from "react";
import Speedometer from "./Speedometer.jsx";
import Graph from "./Graph.jsx";
import SystemHealth from "./SystemHealth.jsx";
import OptimizationRecommendations from "./OptimizationRecommendations.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function KubernetesDashboard() {
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const [historicalMetrics, setHistoricalMetrics] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showHistorical, setShowHistorical] = useState(false);
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [loadingHistorical, setLoadingHistorical] = useState(false);
  const [error, setError] = useState("");

  // Fetch current metrics
  const fetchCurrentMetrics = async () => {
    setLoadingCurrent(true);
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/api/metrics/current`);
      if (!response.ok) throw new Error("Failed to fetch current metrics");
      const data = await response.json();
      setCurrentMetrics(data);
    } catch (err) {
      setError(err.message);
    }
    setLoadingCurrent(false);
  };

  // Fetch historical metrics & recommendations
  const fetchHistoricalMetrics = async () => {
    setLoadingHistorical(true);
    setError("");
    try {
      if (!showHistorical) {
        const response = await fetch(`${BACKEND_URL}/api/metrics/historical`);
        if (!response.ok) throw new Error("Failed to fetch historical metrics");
        const data = await response.json();
        setHistoricalMetrics(data);

        // Fetch recommendations
        const recResponse = await fetch(`${BACKEND_URL}/api/services/optimization/recommendations`);
        if (!recResponse.ok) throw new Error("Failed to fetch recommendations");
        const recData = await recResponse.json();
        setRecommendations(recData.length > 0 ? recData : []);
      }
      setShowHistorical(!showHistorical);
    } catch (err) {
      setError(err.message);
    }
    setLoadingHistorical(false);
  };

  useEffect(() => {
    fetchCurrentMetrics();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Dashboard</h2>
        <button 
          onClick={fetchCurrentMetrics} 
          className="px-4 py-2 bg-gray-700 text-white rounded shadow hover:bg-gray-600 transition"
          disabled={loadingCurrent}
        >
          {loadingCurrent ? "Refreshing..." : "Refresh 🔄"}
        </button>
      </div>

      {error && !currentMetrics && !historicalMetrics && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          ⚠️ {error}
        </div>
      )}

      {/* System Health */}
      <SystemHealth />

      {/* Current Metrics */}
      {currentMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">CPU Usage</h3>
            <Speedometer value={currentMetrics.cpu_usage} />
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">Memory Usage</h3>
            <Speedometer value={currentMetrics.memory_usage} />
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">Disk Usage</h3>
            <Speedometer value={currentMetrics.disk_usage} />
          </div>
        </div>
      )}

      {/* Historical Metrics Button */}
      <div className="mt-4">
        <button 
          onClick={fetchHistoricalMetrics} 
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-400 transition"
          disabled={loadingHistorical}
        >
          {loadingHistorical ? "Loading..." : showHistorical ? "Hide Historical Metrics" : "Show Historical Metrics"}
        </button>
      </div>

      {/* Historical Metrics & Recommendations */}
      {showHistorical && (
        <>
          {historicalMetrics && (
            <div className="p-4 bg-white rounded shadow-md mt-4">
              <h3 className="text-lg font-semibold">Historical Metrics</h3>
              <Graph data={historicalMetrics} xAxis="timestamp" yAxis={["cpu_usage", "memory_usage", "disk_usage"]} type="line" />
            </div>
          )}
          <div className="p-4 bg-yellow-100 rounded shadow-md mt-4">
            <h3 className="text-lg font-semibold">Optimization Recommendations</h3>
            {recommendations.length > 0 ? (
              <ul className="list-disc list-inside">
                {recommendations.map((rec, index) => (
                  <li key={index} className="mt-1">
                    <strong>{rec.resource_type}:</strong> Reduce from {rec.current_value} to {rec.recommended_value} ({rec.reason})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No recommendations available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default KubernetesDashboard;
