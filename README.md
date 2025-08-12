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


| Variable           | Description                       |
| ------------------ | --------------------------------- |
| MONGO\_URL         | MongoDB connection string         |
| EMAIL\_USER        | Email account for notifications   |
| EMAIL\_PASS        | Password for email account        |
| JWT\_ADMIN\_SECRET | Secret key for JWT authentication |
