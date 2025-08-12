import React, { useState } from "react";
import { runSimulation } from "../../apiServices/authApi";

const SimulationPage = ({ token }) => {
  const [formData, setFormData] = useState({
    numberOfAvailableDrivers: "",
    routeStartTime: "",
    maxHoursPerDriverPerDay: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    // Validate inputs (optional)
    if (
      !formData.numberOfAvailableDrivers ||
      !formData.routeStartTime ||
      !formData.maxHoursPerDriverPerDay
    ) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const inputs = {
        numberOfAvailableDrivers: Number(formData.numberOfAvailableDrivers),
        routeStartTime: formData.routeStartTime,
        maxHoursPerDriverPerDay: Number(formData.maxHoursPerDriverPerDay),
      };

      const data = await runSimulation(inputs, token);
      setResults(data);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response?.data?.error || "Failed to run simulation.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "4px",
    marginBottom: "12px",
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Run Simulation</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Number of Available Drivers:</label>
          <br />
          <input
            type="number"
            name="numberOfAvailableDrivers"
            value={formData.numberOfAvailableDrivers}
            onChange={handleChange}
            min={1}
            required
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Route Start Time:</label>
          <br />
          <input
            type="time"
            name="routeStartTime"
            value={formData.routeStartTime}
            onChange={handleChange}
            required
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Max Hours Per Driver Per Day:</label>
          <br />
          <input
            type="number"
            name="maxHoursPerDriverPerDay"
            value={formData.maxHoursPerDriverPerDay}
            onChange={handleChange}
            min={1}
            required
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <button
          className="bg-amber-300 p-2 rounded-4xl text-blue-700"
          type="submit"
          disabled={loading}
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && (
        <div style={{ marginTop: 20 }}>
          <h3>Simulation Results</h3>
          <p>
            <strong>Total Profit:</strong> {results.totalProfit}
          </p>
          <p>
            <strong>Efficiency Score:</strong> {results.efficiency}
          </p>
          <p>
            <strong>On-time Deliveries:</strong> {results.onTimeDeliveries}
          </p>
          <p>
            <strong>Late Deliveries:</strong> {results.lateDeliveries}
          </p>
          <p>
            <strong>Fuel Cost Breakdown:</strong> {results.fuelCostBreakdown}
          </p>
          <p><strong>go to the Dashborad tab to see the charts</strong></p>
          {/* You can add charts here for better visualization */}
        </div>
      )}
    </div>
  );
};

export default SimulationPage;
