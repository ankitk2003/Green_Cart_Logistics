import React, { useState } from "react";
import { login } from "../apiServices/authApi"; // your login API call
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../store/loadingAtom";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(formData); // should return token and user info
      setLoading(false);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", formData.email);
      navigate("/home"); 
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-400 text-white font-semibold py-2 rounded hover:bg-amber-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      <p className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-amber-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
