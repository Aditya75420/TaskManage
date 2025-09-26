import axios from 'axios'

// Mock API for demo purposes when backend is not available
const isBackendAvailable = process.env.REACT_APP_BACKEND_URL || false

const API = axios.create({
  baseURL: isBackendAvailable 
    ? (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api')
    : null, // Will use mock functions
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

// Mock API functions for demo
const mockAPI = {
  post: async (url, data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (url === '/auth/login') {
      if (data.email === 'demo@example.com' && data.password === 'password') {
        return {
          data: {
            token: 'mock-jwt-token',
            username: 'Demo User',
            email: data.email
          }
        }
      } else {
        throw new Error('Invalid credentials')
      }
    }
    
    if (url === '/auth/register') {
      return {
        data: {
          token: 'mock-jwt-token',
          username: data.username,
          email: data.email
        }
      }
    }
    
    // Mock other endpoints
    return { data: { message: 'Mock response' } }
  }
}

// Use mock API if no backend URL is configured
if (!isBackendAvailable) {
  API.post = mockAPI.post
}

export default API
