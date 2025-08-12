import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + '/drivers'; 

export const getDrivers = async (token) => {
  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addDriver = async (driverData, token) => {
  const response = await axios.post(BASE_URL, driverData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateDriver = async (driverId, updatedData, token) => {
  const response = await axios.put(`${BASE_URL}/${driverId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteDriver = async (driverId, token) => {
  const response = await axios.delete(`${BASE_URL}/${driverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
