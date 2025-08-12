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

# Create a .env file in the backend directory and add:
MONGO_URL=your_mongodb_url
EMAIL_USER=your_email
EMAIL_PASS=your_password
JWT_ADMIN_SECRET=your_secret

# Start the backend server
npm run dev
```
The backend will run at: **http://localhost:3000**

---

### **Frontend Setup**
```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory and add:
VITE_BASE_URL=http://localhost:3000

# Start the frontend development server
npm run dev
```
The frontend will run at: **http://localhost:5173** (or your default Vite port)

---

## 🌱 Environment Variables

### Backend (`.env`)
| Variable          | Description |
|-------------------|-------------|
| `MONGO_URL`       | MongoDB connection string |
| `EMAIL_USER`      | Email for notifications (if applicable) |
| `EMAIL_PASS`      | Email password or app-specific password |
| `JWT_ADMIN_SECRET`| Secret key for JWT authentication |

### Frontend (`.env`)
| Variable        | Description |
|-----------------|-------------|
| `VITE_BASE_URL` | Base URL for backend API requests |

---

## 🚀 Deployment Instructions

### Backend
- Hosted on **[Platform Name]**
- Connected to **MongoDB Atlas**
- Environment variables set in platform dashboard
- Deployed via **Git push** or **CI/CD pipeline**

### Frontend
- Hosted on **[Platform Name]** (e.g., Vercel)
- Environment variables set in platform dashboard
- Configured to point to deployed backend API

---

## 📡 API Documentation

### **Authentication**
#### POST `/api/auth/signup`
Registers a new user.
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Signup successful",
  "userId": "abc123"
}
```

#### POST `/api/auth/login`
Logs in a user and returns a JWT token.
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "jwt.token.here"
}
```

---

### **Drivers**
#### GET `/api/drivers`
Returns all drivers. Requires **Authorization** header: `Bearer <token>`

**Response:**
```json
[
  {
    "_id": "driverId1",
    "name": "Driver Name",
    "shift_hours": 8,
    "past_week_hours": [7, 8, 6, 7, 7, 8, 8]
  }
]
```

#### POST `/api/drivers`
Creates a new driver.
**Request Body:**
```json
{
  "name": "New Driver",
  "shift_hours": 10,
  "past_week_hours": [7,7,7,7,7,7,7]
}
```

#### PUT `/api/drivers/:id`
Updates driver details.

#### DELETE `/api/drivers/:id`
Deletes a driver by ID.

---

### **Routes**
Endpoints:
- `GET /api/routes`
- `POST /api/routes`
- `PUT /api/routes/:id`
- `DELETE /api/routes/:id`

---

### **Orders**
Endpoints:
- `GET /api/orders`
- `POST /api/orders`
- `PUT /api/orders/:id`
- `DELETE /api/orders/:id`

---

### **Simulations**
#### GET `/api/simulations`
Fetches all simulation results.
**Response:**
```json
[
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
]
```

#### POST `/api/simulations`
Runs a new simulation.
**Request Body:**
```json
{
  "numberOfAvailableDrivers": 5,
  "routeStartTime": "10:24",
  "maxHoursPerDriverPerDay": 5
}
```

---

## 📜 License
This project is licensed under the MIT License.
