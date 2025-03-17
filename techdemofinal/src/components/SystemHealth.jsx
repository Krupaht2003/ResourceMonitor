// import { useEffect, useState } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// function SystemHealth() {
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${BACKEND_URL}/health/health`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data?.status) {
//           setStatus(data.status);
//         } else {
//           throw new Error("Invalid response format");
//         }
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//         setStatus("unhealthy");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded shadow-md mt-4 flex items-center">
//       <h3 className="text-lg font-semibold">System Health:</h3>

//       {loading ? (
//         <span className="ml-2 text-gray-500 text-xl">Loading...</span>
//       ) : status === "healthy" ? (
//         <span className="ml-2 text-green-500 text-xl flex items-center">
//           <FaCheckCircle className="mr-1" /> Healthy
//         </span>
//       ) : (
//         <span className="ml-2 text-red-500 text-xl flex items-center">
//           <FaTimesCircle className="mr-1" /> Unhealthy
//         </span>
//       )}
//     </div>
//   );
// }

// export default SystemHealth;








import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SystemHealth() {
  const [status, setStatus] = useState(null);
  const [metrics, setMetrics] = useState(null);
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
        if (data?.status && data?.metrics) {
          setStatus(data.status);
          setMetrics(data.metrics);
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

  const getStatusComponent = (value, status) => {
    if (status === "healthy") {
      return (
        <span className="text-green-500 flex items-center">
          <FaCheckCircle className="mr-1" /> {value}%
        </span>
      );
    } else if (status === "warning") {
      return (
        <span className="text-yellow-500 flex items-center">
          <FaExclamationTriangle className="mr-1" /> {value}%
        </span>
      );
    } else {
      return (
        <span className="text-red-500 flex items-center">
          <FaTimesCircle className="mr-1" /> {value}%
        </span>
      );
    }
  };
   
  return (
    <div className="p-4 bg-white rounded shadow-md mt-4">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold mr-2">System Health:</h3>
  
        <span
          className={`text-xl font-bold flex items-center ${
            status === "healthy"
              ? "text-green-500"
              : status === "warning"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {status === "healthy" && (
            <>
              <FaCheckCircle className="mr-1" /> Healthy
            </>
          )}
          {status === "warning" && (
            <>
              <FaExclamationTriangle className="mr-1" /> Warning
            </>
          )}
          {status === "critical" && (
            <>
              <FaTimesCircle className="mr-1" /> Critical
            </>
          )}
        </span>
      </div>
  
      {/* Detailed Metrics */}
      {metrics && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-100 rounded">
            <h4 className="font-semibold">CPU Usage</h4>
            {getStatusComponent(metrics.cpu.value, metrics.cpu.status)}
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <h4 className="font-semibold">Memory Usage</h4>
            {getStatusComponent(metrics.memory.value, metrics.memory.status)}
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <h4 className="font-semibold">Disk Usage</h4>
            {getStatusComponent(metrics.disk.value, metrics.disk.status)}
          </div>
        </div>
      )}
    </div>
  );
  
}

export default SystemHealth;
