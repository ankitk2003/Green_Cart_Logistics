# GreenCart Logistics

## Project Overview
GreenCart Logistics is a web application designed to optimize delivery management by simulating driver assignments, routes, and order deliveries. The platform helps logistics managers monitor efficiency, track profits, and analyze delivery performance through interactive dashboards and CRUD operations for drivers, routes, and orders.

---

## Tech Stack

- **Frontend:**
  - React.js
  - React Router
  - Axios
  - Chart.js (for visualization)
  - Tailwind CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication

- **Tools & Platforms:**
  - VS Code
  - Postman (API testing)
  - Git & GitHub (version control)

---

## Setup Instructions

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/greencart-logistics.git
   cd greencart-logistics/backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend directory with necessary environment variables (see Environment Variables section).

Start the backend server:

bash
Copy code
npm run dev
The backend will run at http://localhost:3000.

Frontend
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the frontend directory with necessary environment variables (see Environment Variables section).

Start the frontend development server:

bash
Copy code
npm run dev
The frontend will run at http://localhost:5173 (or the default Vite port).

Environment Variables
Backend (.env)
Variable	Description
PORT	Port number for backend server
MONGODB_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT authentication

Frontend (.env)
Variable	Description
VITE_BASE_URL	Base URL for backend API requests

Deployment Instructions
The application is deployed using [your chosen platform, e.g., Heroku, Vercel, AWS, DigitalOcean]:

Backend:

Hosted on [Platform Name].

Connected to a managed MongoDB instance (e.g., MongoDB Atlas).

Environment variables configured via platform dashboard.

Deployment via Git push or CI/CD pipeline.

Frontend:

Hosted on [Platform Name] (e.g., Vercel).

Environment variables configured through platform UI.

Connected to the deployed backend API.

Steps Taken:

Built and tested both backend and frontend locally.

Configured environment variables on deployment platform.

Pushed code to remote repository.

Set up deployment hooks or pipelines.

Verified deployed application is working correctly.

API Documentation
Authentication
POST /api/auth/signup

Registers a new user.

Request body:

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "message": "Signup successful",
  "userId": "abc123"
}
POST /api/auth/login

Logs in a user and returns JWT token.

Request body:

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "token": "jwt.token.here"
}
Drivers
GET /api/drivers

Returns all drivers.

Headers: Authorization: Bearer <token>

Response:

json
Copy code
[
  {
    "_id": "driverId1",
    "name": "Driver Name",
    "shift_hours": 8,
    "past_week_hours": [7, 8, 6, 7, 7, 8, 8]
  },
  ...
]
POST /api/drivers

Creates a new driver.

Headers: Authorization: Bearer <token>

Request body:

json
Copy code
{
  "name": "New Driver",
  "shift_hours": 10,
  "past_week_hours": [7,7,7,7,7,7,7]
}
Response: Created driver object

PUT /api/drivers/:id

Updates driver details.

Headers: Authorization: Bearer <token>

Request body: Fields to update

Response: Updated driver object

DELETE /api/drivers/:id

Deletes driver by ID.

Headers: Authorization: Bearer <token>

Response: Success message

Routes
GET /api/routes

POST /api/routes

PUT /api/routes/:id

DELETE /api/routes/:id

(Similar to drivers, adjust request/response accordingly.)

Orders
GET /api/orders

POST /api/orders

PUT /api/orders/:id

DELETE /api/orders/:id

Simulations
GET /api/simulations

Get all simulation results (requires auth).

Response:

json
Copy code
[
  {
    "_id": "simulationId",
    "totalProfit": 74416.2,
    "efficiency": 52,
    "totalOrders": 50,
    "onTimeDeliveries": 26,
    "lateDeliveries": 24,
    "assignments": [ ... ],
    "createdAt": "2025-08-12T14:00:00.000Z"
  }
]
POST /api/simulations

Run a new simulation with parameters.

Request body:

json
Copy code
{
  "numberOfAvailableDrivers": 5,
  "routeStartTime": "10:24",
  "maxHoursPerDriverPerDay": 5
}
Response: Simulation result object

