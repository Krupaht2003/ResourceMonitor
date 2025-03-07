import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/dashboard"); // Show Sidebar only on Dashboard

  return (
    <div className="flex">
      {/* Show Sidebar Only on Dashboard Page */}
      {showSidebar && <Sidebar />}

      <div className={`flex-1 min-h-screen ${showSidebar ? "ml-64" : ""}`}>
        <Navbar />
        <div className="mt-16 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
