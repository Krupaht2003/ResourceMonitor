import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between shadow-lg z-10">
      <h1 className="text-xl">My App</h1>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        {!token ? (
          <Link to="/login" className="mr-4">Login</Link>
        ) : (
          <button onClick={handleLogout} className="mr-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
