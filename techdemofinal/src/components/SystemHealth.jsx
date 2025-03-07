import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function SystemHealth() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md mt-4 flex items-center">
      <h3 className="text-lg font-semibold">System Health:</h3>
      {status === "healthy" ? (
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
