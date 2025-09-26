# Task Management Backend API

A Node.js/Express.js REST API for the Task & Goal Management application.

## 🚀 Features

- **User Authentication**: JWT-based auth with bcrypt password hashing
- **Task Management**: CRUD operations for tasks with priorities and deadlines
- **Goal Tracking**: Set and track goals with progress monitoring
- **Note Taking**: Rich text notes with HTML content
- **MongoDB Integration**: Mongoose ODM for database operations
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## 🛠 Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create `config.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment on Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas cluster

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

3. **Configure Environment Variables**
   
   In Vercel dashboard, add:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=production
   ```

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:5000/api`
- **Production**: `https://your-project.vercel.app/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management app",
  "priority": "high",
  "deadline": "2024-12-31T23:59:59.000Z"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "in-progress"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

### Goal Endpoints

#### Get All Goals
```http
GET /api/goals
Authorization: Bearer <token>
```

#### Create Goal
```http
POST /api/goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Learn React",
  "targetDate": "2024-12-31T23:59:59.000Z"
}
```

#### Update Goal Progress
```http
PUT /api/goals/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": 75
}
```

### Note Endpoints

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <token>
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "<p>This is a <strong>rich text</strong> note.</p>"
}
```

### Health Check
```http
GET /api/health
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run vercel-build` - Vercel build script

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Request body validation
- **CORS Protection**: Configurable cross-origin policies
- **Error Handling**: Secure error responses
- **Environment Variables**: Sensitive data protection

## 📄 License

This project is licensed under the ISC License.