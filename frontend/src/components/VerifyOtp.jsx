import React, { useState, useEffect } from "react";
import { verifyOtp } from "../apiServices/authApi";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../store/loadingAtom";
import { useNavigate, Link } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const setLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage on mount
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to signup or login
      navigate("/signup");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length < 4) {
      setError("Please enter a valid OTP (at least 4 digits).");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp({ email, otp });
      setLoading(false);
      localStorage.setItem("token", data.token);
      localStorage.removeItem("email"); // clear stored email after verification
      navigate("/home"); // redirect after success
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium" htmlFor="otp">
            Enter OTP:
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 4-6 digit OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            maxLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-400 text-white font-semibold py-2 rounded hover:bg-amber-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Verify OTP
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      <p className="mt-6 text-center text-sm">
        Didn't get the OTP?{" "}
        <Link to="/signup" className="text-amber-500 hover:underline">
          Signup again
        </Link>
      </p>
    </div>
  );
};

export default VerifyOtp;
