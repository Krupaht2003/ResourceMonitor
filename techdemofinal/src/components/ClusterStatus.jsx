import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env

function ClusterStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/metrics/cluster-status`)
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
      <h3 className="text-lg font-semibold">Cluster Status</h3>
      {status && (
        <div className="flex space-x-4 mt-2">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white">
            {status.total_pods} Pods
          </div>
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white">
            {status.total_nodes} Nodes
          </div>
        </div>
      )}
    </div>
  );
}

export default ClusterStatus;
