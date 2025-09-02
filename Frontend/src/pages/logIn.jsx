import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login data:", formData.email);


    // TODO: Connect to your login API
    axios.post("/api/v1/auth/login", formData, {withCredentials: true})
    .then((res) => {
      console.log("Login successful:", res.data);

  // Example: save token if backend returns it
  if (res.data.token) {
    localStorage.setItem("authToken", res.data.token);
  }

  navigate("/", { replace: true });

   }).catch((err) => {
   const msg = err.response?.data?.error || err.message;
   alert(`Login failed: ${msg}`);

}).finally(() => {
  setLoading(false);
});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border-t-4 border-teal-500">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition duration-200  ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-teal-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
