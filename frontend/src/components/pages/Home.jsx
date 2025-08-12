import React, { useState } from "react";
import SimulationPage from "./SimulationPage";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const token=localStorage.getItem("token")
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Home</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "dashboard"
              ? "border-b-4 border-amber-400 text-amber-600"
              : "text-gray-600 hover:text-amber-500"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("simulation")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "simulation"
              ? "border-b-4 border-amber-400 text-amber-600"
              : "text-gray-600 hover:text-amber-500"
          }`}
        >
          Simulation
        </button>

        <button
          onClick={() => setActiveTab("management")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "management"
              ? "border-b-4 border-amber-400 text-amber-600"
              : "text-gray-600 hover:text-amber-500"
          }`}
        >
          Management
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <p>Total Profit, Efficiency Score, Charts go here.</p>
            {/* TODO: Replace with actual Dashboard component */}
          </div>
        )}

        {activeTab === "simulation" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Simulation</h2>
            <p>Simulation input form and results display go here.</p>
          <SimulationPage token={token}/>
          </div>
        )}

        {activeTab === "management" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Management</h2>
            <p>CRUD interfaces for Drivers, Routes, Orders go here.</p>
            {/* TODO: Replace with actual Management component */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
