import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env
function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      navigate("/login");
    } else {
      alert(data.detail);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="block p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block p-2 mt-2 border rounded"
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
