# 🚖 Ride Booking Platform (Backend)

A full-featured ride booking backend built with **Node.js**, **Express**, and **MongoDB**.  
This project provides secure authentication, rider & driver management, ride booking, and admin controls.  

---

## ✨ Features

### 🔐 Authentication
- JWT-based authentication (access & refresh tokens).
- Role-based access (`admin`, `rider`, `driver`).
- Secure password hashing with bcrypt.

### 👤 User Management
- Signup & login for riders.
- Role upgrade (Rider → Driver) with vehicle & license details.
- Block/unblock users (admin only).

### 🚗 Driver Management
- Driver application flow with license & vehicle details.
- Driver approval/suspension by admin.
- Driver availability toggle (online/offline).
- Track driver’s live location.

### 🚕 Ride Management
- Riders can request rides.
- Drivers can accept/decline rides.
- Ride status lifecycle: `REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED / CANCELLED`.

### 🛡️ Admin Panel (API)
- Manage users, drivers, and rides.
- Approve/reject driver applications.
- Monitor platform activity.

---

## 🛠️ Tech Stack

- **Backend Framework:** TypeScript, Express.js  
- **Database:** MongoDB, Mongoose ODM  
- **Authentication:** JWT (Access & Refresh tokens)  
- **Validation:** Zod / Express Validator   
- **Environment Config:** dotenv  
---


---

## Getting Started

### Clone & Install
```bash
git clone https://github.com/muhammad-sohel131/RideBookingAPI
cd ride-booking-backend
npm install
```

Create a .env file in root:

DB_URL=mongodb+srv://####@cluster0.jd7el.mongodb.net/###?retryWrites=true&w=majority&appName=Cluster0

PORT=5000

NODE_ENV=development
#jwt
JWT_ACCESS_SECRET=...
JWT_ACCESS_EXPIRES=1d

JWT_REFRESH_SECRET=...
JWT_REFRESH_EXPIRES=30d

#hashPassword
BCRYPT_SALT_ROUND=...

#super admin
SUPER_ADMIN_EMAIL=super@gmail.com
SUPER_ADMIN_PASSWORD=12345678

#google
GOOGLE_CLIENT_ID=1
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

#express session
EXPIRES_SESSION_SECRET=

#Frontend URL
FRONTEND_URL=http://localhost:5173

```bash
npm run dev   
npm run start 
```

---

## 📌 API Endpoints

### 🔑 Auth
- `POST /api/auth/signup` → Register as rider  
- `POST /api/auth/login` → Login  
- `POST /api/auth/refresh` → Refresh access token  

### 👤 Users
- `GET /api/users/me` → Get profile  
- `PATCH /api/users/:id/block` → Block user (admin only)  

### 🚗 Drivers
- `POST /api/drivers/apply` → Apply as driver  
- `PATCH /api/drivers/:id/status` → Approve / Suspend (admin only)  
- `PATCH /api/drivers/:id/availability` → Toggle availability  

### 🚖 Rides
- `POST /api/rides/request` → Request a ride  
- `PATCH /api/rides/:id/accept` → Accept ride (driver only)  
- `PATCH /api/rides/:id/status` → Update ride status (driver only)  
- `GET /api/rides/me` → Get my rides  

---
