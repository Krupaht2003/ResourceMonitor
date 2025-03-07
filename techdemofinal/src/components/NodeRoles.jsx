import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function NodeRoles() {
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/metrics/node-roles`)
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
      <h3 className="text-lg font-semibold">Node Roles</h3>
      {roles && (
        <div>
          <p>Worker Nodes: {roles.worker_nodes}</p>
          <p>Master Nodes: {roles.master_nodes}</p>
        </div>
      )}
    </div>
  );
}

export default NodeRoles;
