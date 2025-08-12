import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { getAllSimulationResults } from '../../apiServices/authApi';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = ({ token }) => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllSimulationResults(token);
        console.log(data);
        if (data.length > 0) {
          const sorted = [...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setSelectedResult(sorted[0]);
        }
      } catch (err) {
        setError('Failed to load simulation results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [token]);

  if (loading) return <p>Loading simulation results...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!selectedResult) return <p>No simulation results available</p>;

  const { efficiency, onTimeDeliveries, lateDeliveries } = selectedResult;

  // Pie chart for On-time vs Late Deliveries
  const pieData = {
    labels: ['On-time Deliveries', 'Late Deliveries'],
    datasets: [
      {
        data: [onTimeDeliveries, lateDeliveries],
        backgroundColor: ['#4caf50', '#f44336'], // green and red
        hoverOffset: 20,
      },
    ],
  };

  // Bar chart for Efficiency Score
  const barData = {
    labels: ['Efficiency (%)'],
    datasets: [
      {
        label: 'Efficiency',
        data: [efficiency],
        backgroundColor: ['#2196f3'], // blue
      },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Dashboard - Latest Simulation Charts</h2>

      <div style={{ marginBottom: 40 }}>
        <h4>On-time vs Late Deliveries</h4>
        <Pie data={pieData} />
      </div>

      <div>
        <h4>Efficiency Score</h4>
        <Bar data={barData} options={{ indexAxis: 'y', scales: { x: { max: 100 } } }} />
      </div>
    </div>
  );
};

export default Dashboard;
