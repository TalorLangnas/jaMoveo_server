# 🎶 JaMoveo

**JaMoveo** is a collaborative music rehearsal platform built for the Moveo band. Designed to run smoothly on mobile devices, it connects musicians in real time and allows them to participate in live sessions where lyrics and chords are shared instantly. Each band member logs in with their role and instrument, while an admin leads the session by selecting songs and controlling the flow. Whether you’re a guitarist, drummer, or singer—JaMoveo ensures everyone is on the same page, literally.

---

## ✨ Features

- 🔐 User registration and login with instrument selection  
- 👥 Role-based interface: Admin, Singer, and Instrumentalists  
- 🧭 Full session control for Admin:
  - Session starts automatically upon admin login
  - Search and select songs in English or Hebrew
  - End the song at any time to return all participants to the main page
  - Logging out disconnects all users and closes the session  
- 🎼 Adaptive live view based on user role:
  - Singers view lyrics only
  - Instrumentalists view both chords and lyrics  
- ⚡ Real-time session synchronization via WebSockets (Socket.IO)  
- ⏬ Hands-free viewing with toggleable auto-scroll  
- 📱 Mobile-first responsive design for smooth experience across devices

---

## 🌐 How to Use

Access the deployed app:  
🔗 **[https://my-express-app-9ynn.onrender.com](https://my-express-app-9ynn.onrender.com)**

### 👤 User Roles

- **Admin** – Controls the session  
- **Player** – Participates in the session (e.g., singer, guitarist, drummer)

### 📋 Application Flow

1. **Start a Session (Admin):**  
   Log in as the admin to automatically create and start a new rehearsal session.

2. **Join a Session (Player):**  
   After the admin has logged in, log in as a player to join the active session automatically.

3. **Search & Select Songs (Admin):**  
   Enter a query (English or Hebrew) to search songs. Select a result to broadcast it to all users.

4. **Live Page Behavior:**  
   All users are redirected to the Live Page with the selected song:
   - Singers see lyrics only  
   - Instrumentalists see lyrics and chords

5. **Ending or Leaving a Session:**  
   - When the admin clicks **"Quit"**, all users return to their main page.  
   - When the admin logs out, all players are logged out and the session is closed.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, CSS Modules  
- **Backend:** Node.js, Express, TypeScript, Socket.IO  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, bcrypt  
- **Deployment:** Render (frontend is bundled with the backend)

---

## 🚀 Getting Started (Backend)

Follow these steps to set up and run the JaMoveo backend locally.

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)  
- [npm](https://www.npmjs.com/)  
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)

---



### 📁 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/jaMoveo_server.git
cd jaMoveo_server
```
2. **Install dependencies:**

```bash
npm install
```
3. **Create a .env file in the project root:**

```bash
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
NODE_ENV=development
```

**🧪 Run in Development Mode**
```bash
npm run dev
```

**🛠️ Build and Run in Production**
```bash
npm run build
npm start
```
