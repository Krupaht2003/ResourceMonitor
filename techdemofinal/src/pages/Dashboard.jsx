import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import System from "../components/System.jsx";
import Kubernetes from "../components/Kubernetes.jsx";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function Dashboard() {
  const [message, setMessage] = useState("");
  const [activeComponent, setActiveComponent] = useState("system");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`{BACKEND_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to fetch dashboard"));
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold">{message}</h2>
        <div className="mt-4">
          {activeComponent === "system" && <System />}
          {activeComponent === "kubernetes" && <Kubernetes />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
