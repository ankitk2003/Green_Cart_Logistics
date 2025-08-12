import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + '/routes'; // adjust if needed

export const getRoutes = async (token) => {
  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addRoute = async (routeData, token) => {
  const response = await axios.post(BASE_URL, routeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateRoute = async (routeId, updatedData, token) => {
  const response = await axios.put(`${BASE_URL}/${routeId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteRoute = async (routeId, token) => {
  const response = await axios.delete(`${BASE_URL}/${routeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
