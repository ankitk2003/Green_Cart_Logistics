import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signup = async (signupData) => {
    console.log(BASE_URL)
  const response = await axios.post(`${BASE_URL}/user/signup`, signupData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data; // could return success message or user info
};

export const login = async (loginData) => {
  const response = await axios.post(`${BASE_URL}/login`, loginData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data; // usually returns token, user info etc.
};

export const verifyOtp = async (otpData, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await axios.post(`${BASE_URL}/verify-otp`, otpData, {
    headers,
  });
  return response.data; // success or failure message
};
