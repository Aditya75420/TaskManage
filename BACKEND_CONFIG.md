# Backend Configuration Guide

## How to Connect Frontend to Your Backend

### 1. Set Environment Variables

Create a `.env` file in the `frontend` directory with your backend URL:

```bash
# In frontend/.env
REACT_APP_BACKEND_URL=https://your-backend-url.com
REACT_APP_USE_BACKEND=true
```

### 2. For Vercel Deployment

In your Vercel project settings, add these environment variables:

- `REACT_APP_BACKEND_URL` = `https://your-backend-url.com`
- `REACT_APP_USE_BACKEND` = `true`

### 3. Backend URL Examples

- **Local development**: `http://localhost:5000`
- **Heroku**: `https://your-app-name.herokuapp.com`
- **Railway**: `https://your-app-name.railway.app`
- **Render**: `https://your-app-name.onrender.com`
- **DigitalOcean**: `https://your-app-name.ondigitalocean.app`

### 4. API Endpoints Expected

Your backend should have these endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

#### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

#### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `DELETE /api/notes/:id` - Delete note

### 5. Response Format Expected

#### Login/Register Response
```json
{
  "token": "jwt-token-here",
  "username": "user-name",
  "email": "user@example.com"
}
```

#### Data Response Format
```json
{
  "tasks": [...],
  "goals": [...],
  "notes": [...]
}
```

### 6. Testing the Connection

1. Set `REACT_APP_USE_BACKEND=true` in your environment
2. Set `REACT_APP_BACKEND_URL` to your backend URL
3. Check browser console for API logs
4. Test login with your backend credentials

### 7. Fallback to Mock API

If you want to use mock API for demo:
- Set `REACT_APP_USE_BACKEND=false` or remove the variable
- The app will automatically use mock data

## Current Configuration

The API service will:
- Use your backend when `REACT_APP_USE_BACKEND=true`
- Use mock API when `REACT_APP_USE_BACKEND=false` or not set
- Log all API requests and responses for debugging
- Handle authentication tokens automatically
- Redirect to login on 401 errors
