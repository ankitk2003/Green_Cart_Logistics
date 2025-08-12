import React, { useState } from 'react';
import { signup } from '../apiServices/authApi';
import { loadingAtom } from '../store/loadingAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const setLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signup(formData);
      setLoading(false);
      // Navigate to verify OTP page after successful signup
      navigate('/verify-otp');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">Email:</label>
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
          <label className="block mb-1 font-medium" htmlFor="password">Password:</label>
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
          disabled={false} // You can disable during global loading if you want
        >
          Sign Up
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      <p className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-amber-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
