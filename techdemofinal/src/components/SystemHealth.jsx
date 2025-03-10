import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SystemHealth() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/health/health`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.status) {
          setStatus(data.status);
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setStatus("unhealthy");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md mt-4 flex items-center">
      <h3 className="text-lg font-semibold">System Health:</h3>

      {loading ? (
        <span className="ml-2 text-gray-500 text-xl">Loading...</span>
      ) : status === "healthy" ? (
        <span className="ml-2 text-green-500 text-xl flex items-center">
          <FaCheckCircle className="mr-1" /> Healthy
        </span>
      ) : (
        <span className="ml-2 text-red-500 text-xl flex items-center">
          <FaTimesCircle className="mr-1" /> Unhealthy
        </span>
      )}
    </div>
  );
}

export default SystemHealth;
