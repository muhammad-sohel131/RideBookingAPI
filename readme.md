# 🚖 Ride Sharing Backend API

A **TypeScript + Node.js (Express)** backend for a ride-sharing platform that manages **users, authentication, drivers, and rides**.  
The system supports **role-based access control** (Rider, Driver, Admin, Super Admin) and provides a clean modular structure.

---

## 📌 Project Overview

This project is the backend for a ride-sharing application. It allows:
- Riders to sign up, log in, and request rides.
- Drivers to apply, update availability, and accept rides.
- Admins to manage users, drivers, and rides.
- Authentication via **JWT** and **Google OAuth**.

---

## ✨ Features

- 🔐 **Authentication & Authorization** (JWT, Refresh Token, Google OAuth)
- 👤 **User Management** (Register, Login, Profile, Block user)
- 🚗 **Driver Management** (Apply, Approve, Suspend, Update availability)
- 🚕 **Ride Management** (Request, Accept, Update status)
- 🛡️ **Role-Based Access Control** (Rider, Driver, Admin, Super Admin)
- ✅ **Request Validation** using Zod
- 📂 **Modular Route Structure**

---

## 🛠 Tech Stack

- **Language:** TypeScript  
- **Framework:** Express.js (v5)  
- **Database:** MongoDB (via Mongoose v8)  
- **Authentication & Security:**  
  - JWT (`jsonwebtoken`)  
  - BcryptJS (password hashing)  
  - Passport (Google OAuth2 & Local Strategy)  
  - Express-session & Cookie-parser  
- **Validation:** Zod  
- **Utilities:**  
  - CORS (Cross-Origin Resource Sharing)  
  - Dotenv (Environment variables)  
  - HTTP Status Codes (Clean status management)

---

## 📌 API Endpoints

### 🔑 Auth
| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/auth/register`   | Register new rider       |
| POST   | `/api/auth/login`      | Login                    |
| POST   | `/api/auth/refresh-token` | Refresh access token   |
| POST   | `/api/auth/logout`     | Logout                   |
| POST   | `/api/auth/reset-password` | Reset password (auth) |
| GET    | `/api/auth/google`     | Google login             |
| GET    | `/api/auth/google/callback` | Google OAuth callback |

---

### 👤 Users
| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | `/api/user`               | Get all users (admin)   |
| POST   | `/api/user/register`      | Register user           |
| PATCH  | `/api/user/status/:userId` | Change user status     |

---

### 🚗 Drivers
| Method | Endpoint                     | Description                |
|--------|------------------------------|----------------------------|
| GET    | `/api/driver`                | Get all drivers (admin)    |
| GET    | `/api/driver/pending-driver` | Get pending driver requests |
| POST   | `/api/driver/register`       | Apply as driver (rider)    |
| PATCH  | `/api/driver/approve/:userId` | Approve driver    |
| PATCH  | `/api/driver/:userId`        | Update driver details      |

---

### 🚕 Rides
| Method | Endpoint                   | Description                |
|--------|----------------------------|----------------------------|
| GET    | `/api/ride`                | Get all rides              |
| GET    | `/api/ride/requested-rides`| Get rides requested (driver) |
| POST   | `/api/ride/create`         | Create new ride (rider)    |
| PATCH  | `/api/ride/update/:rideId` | Update ride status         |

---

## 🧪 Scripts

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