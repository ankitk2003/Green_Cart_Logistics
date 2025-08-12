import axios from 'axios';

const BASE_URL = 'https://your-backend.com/api/orders';

export const getOrders = async (token) => {
  const response = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addOrder = async (orderData, token) => {
  const response = await axios.post(BASE_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateOrder = async (orderId, updatedData, token) => {
  const response = await axios.put(`${BASE_URL}/${orderId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteOrder = async (orderId, token) => {
  const response = await axios.delete(`${BASE_URL}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
