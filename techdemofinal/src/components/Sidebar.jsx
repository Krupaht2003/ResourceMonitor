import { useState } from "react";
import { FaServer, FaCubes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Sidebar({ setActiveComponent }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button at the Top */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-semibold">Menu</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white">
          {isCollapsed ? <FaChevronRight size={24} /> : <FaChevronLeft size={24} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4">
        <button
          className="flex items-center w-full py-3 px-4 hover:bg-gray-700"
          onClick={() => setActiveComponent("system")}
        >
          <FaServer className="mr-2" />
          {!isCollapsed && <span>System</span>}
        </button>
        <button
          className="flex items-center w-full py-3 px-4 hover:bg-gray-700"
          onClick={() => setActiveComponent("kubernetes")}
        >
          <FaCubes className="mr-2" />
          {!isCollapsed && <span>Kubernetes</span>}
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
