import React, { useState, useEffect } from 'react';

// Import API services - update paths as per your project structure
import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from '../../apiServices/driverApi';

import {
  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
} from '../../apiServices/routeApi';

import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from '../../apiServices/orderApi';

function CrudManagement({ token }) {
  const [activeTab, setActiveTab] = useState('drivers'); // drivers | routes | orders
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Fetch list based on active tab
  useEffect(() => {
    fetchItems();
    resetForm();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      let data = [];
      if (activeTab === 'drivers') data = await getDrivers(token);
      else if (activeTab === 'routes') data = await getRoutes(token);
      else if (activeTab === 'orders') data = await getOrders(token);

      setItems(data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
  };

  const numericFields = ['shift_hours', 'distance_km', 'order_id', 'route_id', 'value_rs'];

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: numericFields.includes(name) ? Number(value) : value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (activeTab === 'drivers') {
        if (editingId) {
          await updateDriver(editingId, formData, token);
        } else {
          await addDriver(formData, token);
        }
      } else if (activeTab === 'routes') {
        if (editingId) {
          await updateRoute(editingId, formData, token);
        } else {
          await addRoute(formData, token);
        }
      } else if (activeTab === 'orders') {
        if (editingId) {
          await updateOrder(editingId, formData, token);
        } else {
          await addOrder(formData, token);
        }
      }

      await fetchItems();
      resetForm();
    } catch (err) {
      setError('Operation failed');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id || item.id);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setError('');
    try {
      if (activeTab === 'drivers') await deleteDriver(id, token);
      else if (activeTab === 'routes') await deleteRoute(id, token);
      else if (activeTab === 'orders') await deleteOrder(id, token);

      await fetchItems();
    } catch {
      setError('Delete failed');
    }
  };

  // Determine form fields based on activeTab
  const renderFormFields = () => {
    if (activeTab === 'drivers') {
      return (
        <>
          <label>Name: <input name="name" value={formData.name || ''} onChange={handleChange} required /></label>
          <label>Shift Hours: <input type="number" name="shift_hours" value={formData.shift_hours || ''} onChange={handleChange} required min={0} /></label>
          {/* Add other driver fields as needed */}
        </>
      );
    } else if (activeTab === 'routes') {
      return (
        <>
          <label>Route ID: <input type="number" name="route_id" value={formData.route_id || ''} onChange={handleChange} required /></label>
          <label>Distance (km): <input type="number" name="distance_km" value={formData.distance_km || ''} onChange={handleChange} required min={0} /></label>
          <label>Traffic Level:
            <select name="traffic_level" value={formData.traffic_level || ''} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          {/* Add other route fields as needed */}
        </>
      );
    } else if (activeTab === 'orders') {
      return (
        <>
          <label>Order ID: <input type="number" name="order_id" value={formData.order_id || ''} onChange={handleChange} required /></label>
          <label>Route ID: <input type="number" name="route_id" value={formData.route_id || ''} onChange={handleChange} required /></label>
          <label>Delivery Time: <input type="time" name="delivery_time" value={formData.delivery_time || ''} onChange={handleChange} required /></label>
          <label>Value (Rs): <input type="number" name="value_rs" value={formData.value_rs || ''} onChange={handleChange} required min={0} /></label>
          {/* Add other order fields as needed */}
        </>
      );
    }
  };

  // Render list table based on activeTab
  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!items.length) return <p>No items found.</p>;

    if (activeTab === 'drivers') {
      return (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Shift Hours</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((driver) => (
              <tr key={driver._id || driver.id}>
                <td className="border p-2">{driver.name}</td>
                <td className="border p-2">{driver.shift_hours}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(driver)} className="mr-2 bg-blue-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(driver._id || driver.id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === 'routes') {
      return (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Route ID</th>
              <th className="border p-2">Distance (km)</th>
              <th className="border p-2">Traffic Level</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((route) => (
              <tr key={route._id || route.id}>
                <td className="border p-2">{route.route_id}</td>
                <td className="border p-2">{route.distance_km}</td>
                <td className="border p-2">{route.traffic_level}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(route)} className="mr-2 bg-blue-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(route._id || route.id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === 'orders') {
      return (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Route ID</th>
              <th className="border p-2">Delivery Time</th>
              <th className="border p-2">Value (Rs)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((order) => (
              <tr key={order._id || order.id}>
                <td className="border p-2">{order.order_id}</td>
                <td className="border p-2">{order.route_id}</td>
                <td className="border p-2">{order.delivery_time}</td>
                <td className="border p-2">{order.value_rs}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(order)} className="mr-2 bg-blue-500 text-white px-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(order._id || order.id)} className="bg-red-600 text-white px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CRUD Management</h1>

      <div className="mb-4">
        <button
          onClick={() => setActiveTab('drivers')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'drivers' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Drivers
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'routes' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Routes
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Orders
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded shadow">
        {renderFormFields()}

        <div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            {editingId ? 'Update' : 'Add'} {activeTab.slice(0, -1)}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {renderTable()}
    </div>
  );
}

export default CrudManagement;
