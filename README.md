# TaskFlow - Task & Goal Management App

A modern productivity application built with the MERN stack, featuring task management, goal tracking, and note-taking capabilities.

## 🚀 Features

- **Task Management**: Create, edit, and track tasks with priorities and deadlines
- **Goal Tracking**: Set goals with progress tracking and visual progress bars
- **Note Taking**: Rich text notes with ReactQuill editor
- **User Authentication**: Secure JWT-based authentication
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Deployment**: Vercel

## 📁 Project Structure

```
├── frontend/          # React frontend application
├── server/           # Node.js backend API
├── package.json       # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables**
   
   Create `server/config.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:5173) and backend (http://localhost:5000)

## 🌐 Deployment on Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas account

### Deployment Steps

1. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Replace `<password>` with your database password

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure Environment Variables in Vercel**
   
   In your Vercel dashboard, add these environment variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=production
   ```

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development
- `npm run build` - Build frontend for production
- `npm run start` - Start production server
- `npm run install:all` - Install all dependencies

## 📱 Mobile Responsive

The app is fully responsive and optimized for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Goals
- `GET /api/goals` - Get all user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 📄 License

This project is licensed under the ISC License.
