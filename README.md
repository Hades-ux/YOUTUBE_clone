# YouTube Clone

A full-stack **YouTube-like video streaming platform clone** built with **React, Node.js, Express, and MongoDB**.  
This project is designed for learning purposes, showcasing key features like video upload, streaming, commenting, and subscriptions.

---

## Project Overview

This project mimics the core functionality of YouTube, allowing users to:
- Upload and stream videos  
- Like, dislike, and comment on videos  
- Subscribe to channels  
- Search for videos by title  
- Manage user profiles  

It demonstrates a full-stack application with RESTful APIs, JWT-based authentication, and responsive UI design.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **File Upload:** Multer & Cloudinary  

---

## ⚙️ Key Features

- ✅ User Authentication (Register & Login)  
- ✅ Upload & Stream Videos  
- ✅ Like/Dislike Videos  
- ✅ Comment on Videos  
- ✅ Subscribe to Channels  
- ✅ Video Search Functionality  
- ✅ Responsive Design for Web and Mobile  

---

## 📁 Project Structure
/Backend
├── controllers/ # Business logic for auth, videos, users, comments
├── models/ # Mongoose Schemas
├── routes/ # API endpoints (auth, users, videos, comments)
├── middlewares/ # Authentication middleware
├── index.js # App entry point

/Frontend
├── components/ # Reusable UI Components (Navbar, VideoCard, etc.)
├── context/ # Global State Management
├── pages/ # Application Pages (Home, Watch, Login, Profile)
├── App.js # React Routing Setup

---