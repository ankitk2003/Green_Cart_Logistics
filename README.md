# GreenCart Logistics

## 📌 Project Overview
GreenCart Logistics is a web application designed to optimize delivery management by simulating driver assignments, routes, and order deliveries.  

The platform enables logistics managers to:
- Monitor operational efficiency
- Track profits and performance
- Analyze delivery metrics through interactive dashboards
- Perform CRUD operations for **Drivers**, **Routes**, and **Orders**

---

## 🛠 Tech Stack

### **Frontend**
- React.js
- React Router
- Axios
- Chart.js (data visualization)
- Tailwind CSS (styling)

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

### **Tools & Platforms**
- VS Code
- Postman (API testing)
- Git & GitHub (version control)

---

## ⚙️ Setup Instructions

### **Backend Setup**
```bash
# Clone the repository & navigate to backend
git clone https://github.com/yourusername/greencart-logistics.git
cd greencart-logistics/backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# and add the following environment variables:
# (replace with your actual credentials)
MONGO_URL=your_mongodb_url
EMAIL_USER=your_email
EMAIL_PASS=your_password
JWT_ADMIN_SECRET=your_secret

# Start the backend server
npm run dev


The backend will run at: http://localhost:3000


---

### **Frontend Setup**
```bash
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory
# and add the following environment variable:
VITE_BASE_URL=http://localhost:3000

# Start the frontend development server
npm run dev

Backend (server.env)

| Variable           | Description                       |
| ------------------ | --------------------------------- |
| MONGO\_URL         | MongoDB connection string         |
| EMAIL\_USER        | Email account for notifications   |
| EMAIL\_PASS        | Password for email account        |
| JWT\_ADMIN\_SECRET | Secret key for JWT authentication |

Frontend (.env)

| Variable        | Description                       |
| --------------- | --------------------------------- |
| VITE\_BASE\_URL | Base URL for backend API requests |



📡 API Documentation
Authentication
POST /api/auth/signup
Registers a new user.
Request Body:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
Copy
Edit
{
  "message": "Signup successful",
  "userId": "abc123"
}
POST /api/auth/login
Logs in a user and returns JWT token.
Request Body:

json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
Copy
Edit
{
  "token": "jwt.token.here"
}
Drivers
GET /api/drivers
Returns all drivers. Requires authentication.
Headers: Authorization: Bearer <token>
Response:

json
Copy
Edit
[
  {
    "_id": "driverId1",
    "name": "Driver Name",
    "shift_hours": 8,
    "past_week_hours": [7, 8, 6, 7, 7, 8, 8]
  }
]
POST /api/drivers
Creates a new driver. Requires authentication.
Request Body:

json
Copy
Edit
{
  "name": "New Driver",
  "shift_hours": 10,
  "past_week_hours": [7,7,7,7,7,7,7]
}
Routes
(Similar to Drivers CRUD)

Orders
(Similar to Drivers CRUD)

Simulations
POST /api/simulations
Runs a new simulation. Requires authentication.
Request Body:

json
Copy
Edit
{
  "numberOfAvailableDrivers": 5,
  "routeStartTime": "10:24",
  "maxHoursPerDriverPerDay": 5
}
Response Example:

json
Copy
Edit
{
  "_id": "simulationId",
  "totalProfit": 74416.2,
  "efficiency": 52,
  "totalOrders": 50,
  "onTimeDeliveries": 26,
  "lateDeliveries": 24,
  "assignments": [],
  "createdAt": "2025-08-12T14:00:00.000Z"
}