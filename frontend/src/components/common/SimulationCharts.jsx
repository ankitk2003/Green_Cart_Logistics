// SimulationCharts.jsx
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const SimulationCharts = ({ results }) => {
  if (!results) return null;

  const {
    totalProfit,
    efficiency,
    onTimeDeliveries,
    lateDeliveries,
  } = results;

  // Pie chart data: On-time vs Late deliveries
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

  // Bar chart data: Total Profit and Efficiency Score
  const barData = {
    labels: ['Total Profit', 'Efficiency (%)'],
    datasets: [
      {
        label: 'Value',
        data: [totalProfit, efficiency],
        backgroundColor: ['#2196f3', '#ff9800'], // blue and orange
      },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h4>Delivery Performance</h4>
        <Pie data={pieData} />
      </div>

      <div>
        <h4>Profit and Efficiency</h4>
        <Bar data={barData} options={{ indexAxis: 'y' }} />
      </div>
    </div>
  );
};

export default SimulationCharts;
