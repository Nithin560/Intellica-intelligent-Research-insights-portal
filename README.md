# Intellica Project - Faculty Research Management System

## 🚀 Quick Start

Run the entire application with just **ONE command**:

```bash
npm start
```

That's it! The system will automatically:
- Start the backend server (finds available port starting from 5000)
- Start the frontend server (finds available port starting from 5173)
- Configure the frontend to connect to the correct backend port

## 📋 Manual Commands (if needed)

If you prefer to run servers separately:

### Backend Only
```bash
cd backend
node server.js
```

### Frontend Only
```bash
cd frontend
npm run dev
```

## 🔧 What Changed

- **Automatic Port Detection**: Backend automatically finds available ports (5000, 5001, 5002, etc.)
- **Dynamic API Configuration**: Frontend automatically connects to the correct backend port
- **Unified Startup**: Single `npm start` command launches both servers

## 🌐 Access URLs

After running `npm start`, check the console output for the actual URLs:
- Frontend: Usually `http://localhost:5173` (or next available port)
- Backend API: Usually `http://localhost:5000` (or next available port)

## 📁 Project Structure

```
Intellica_Project_M/
├── backend/          # Node.js/Express API server
├── frontend/         # React/Vite frontend
├── start.js          # Unified startup script
└── package.json      # Root package.json for easy startup
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Express, MongoDB, JWT, OTP Authentication
- **Frontend**: React, Vite, Styled Components
- **Email**: Gmail SMTP for OTP delivery

## 📧 Admin Login

- **Email**: micadmin2026@gmail.com
- **Password**: Not required (OTP-based authentication)

## 🔐 Authentication

The system uses OTP (One-Time Password) authentication instead of traditional passwords. Users receive OTP codes via email.