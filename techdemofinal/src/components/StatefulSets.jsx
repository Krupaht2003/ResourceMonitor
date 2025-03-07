import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function StatefulSets() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/metrics/statefulsets`)
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold">StatefulSets</h3>
      <p>{count} StatefulSets</p>
    </div>
  );
}

export default StatefulSets;
