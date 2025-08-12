import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-amber-400 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center space-x-2"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <span>GreenCart Logistics</span>
          </Link>

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 mt-auto border-t">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} GreenCart Logistics. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
