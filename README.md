# TeamBoard – MERN Role-Based Collaboration App

## Overview
A MERN stack application enabling role-based access control for team collaboration, allowing users with different roles to manage tasks, projects, and communications securely.

## Architecture
- JWT authentication (access & refresh tokens)
- Role-based authorization: Admin, Manager, Member
- Password hashing & email verification
- REST API (CRUD for teams, boards, tasks)
- Centralized error handling & validation
- Realtime updates (Socket.IO)
- Responsive React frontend (Tailwind CSS)
- MongoDB models & GridFS for attachments
- Notifications & analytics dashboard

## Getting Started
- Install dependencies in `backend` and `frontend` folders
- Configure environment variables
- Start backend and frontend servers

## Folder Structure
- `backend/` – Node.js, Express, MongoDB
- `frontend/` – React, Vite, Tailwind CSS
