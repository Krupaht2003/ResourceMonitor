import { useState, useEffect } from "react";
import SystemHealth from "./SystemHealth.jsx";
import Speedometer from "./Speedometer.jsx";
import LineGraph from "./LineGraph.jsx";
import OptimizationRecommendations from "./OptimizationRecommendations.jsx";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function SystemDashboard() {
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const [historicalMetrics, setHistoricalMetrics] = useState(null);
  const [showHistorical, setShowHistorical] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Fetch Current System Metrics
  const fetchCurrentMetrics = async () => {
    const response = await fetch(`${BACKEND_URL}/api/metrics/current`);
    const data = await response.json();
    setCurrentMetrics(data);
  };

  // Fetch Historical Metrics
  const fetchHistoricalMetrics = async () => {
    if (!showHistorical) {
      const response = await fetch(`${BACKEND_URL}/api/metrics/historical`);
      const data = await response.json();
      setHistoricalMetrics(data);
    }
    setShowHistorical(!showHistorical);
  };

  useEffect(() => {
    fetchCurrentMetrics();
    setShowRecommendations(true); // Ensure recommendations only appear once
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Dashboard</h2>
        <button 
          onClick={fetchCurrentMetrics} 
          className="px-4 py-2 bg-gray-700 text-white rounded shadow hover:bg-gray-600 transition"
        >
          Refresh 🔄
        </button>
      </div>

      {/* System Health Card */}
      <SystemHealth />

      {/* Current Metrics - Speedometers Only */}
      {currentMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* CPU Usage */}
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">CPU Usage</h3>
            <Speedometer value={currentMetrics.cpu_usage} />
          </div>

          {/* Memory Usage */}
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">Memory Usage</h3>
            <Speedometer value={currentMetrics.memory_usage} />
          </div>

          {/* Disk Usage */}
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
        >
          {showHistorical ? "Hide Historical Metrics" : "Show Historical Metrics"}
        </button>
      </div>

      {/* Historical Metrics - Separated Graphs with Shadows */}
      {showHistorical && historicalMetrics && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">Historical CPU Usage</h3>
            <LineGraph data={historicalMetrics} metric="cpu_usage" />
          </div>
          <div className="p-4 bg-gray-50 rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">Historical Memory Usage</h3>
            <LineGraph data={historicalMetrics} metric="memory_usage" />
          </div>
          <div className="p-4 bg-gray-50 rounded shadow-md">
            <h3 className="text-lg font-semibold text-center">Historical Disk Usage</h3>
            <LineGraph data={historicalMetrics} metric="disk_usage" />
          </div>
        </div>
      )}

      {/* Optimization Recommendations - Ensure It Renders Only Once */}
      {showRecommendations && <OptimizationRecommendations />}
    </div>
  );
}

export default SystemDashboard;
