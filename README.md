# ✅ Full Stack Todo App

A simple **Full Stack Todo Application** built using **React + Node.js + Express + MongoDB**.  
It allows users to manage their todos with authentication and full CRUD operations.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- ✅ Add new Todos
- ✏️ Edit/Update Todos
- 🗑️ Delete Todos
- ☑️ Mark todo as Completed / Pending
- 👤 User-specific todos (each user only sees their own todos)

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- CSS / Tailwind CSS (depending on your project)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt (Password hashing)
- cookie-parser

---


## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

### `backend/.env`
```env
PORT=8000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/todo_app?appName=yourApp
JWT_SECRET=your_jwt_secret
