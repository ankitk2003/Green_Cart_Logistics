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
  const response = await axios.post(`${BASE_URL}/user/signin`, loginData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data; // usually returns token, user info etc.
};

export const verifyOtp = async (otpData) => {
  const headers = { "Content-Type": "application/json" };

  const response = await axios.post(`${BASE_URL}/user/verify-otp`, otpData, {
    headers,
  });

  return response.data; // contains message, token, username, role
};

export const runSimulation = async (inputs, token) => {
    console.log(token)
    console.log(inputs)
  const response = await axios.post(`${BASE_URL}/user/get-simulation`, inputs, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;  // Expected: KPIs and results
};