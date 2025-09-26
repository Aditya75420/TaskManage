import axios from 'axios'

// Mock API for demo purposes when backend is not available
const isBackendAvailable = process.env.REACT_APP_BACKEND_URL || false

console.log('API Configuration:', { isBackendAvailable, NODE_ENV: process.env.NODE_ENV })

// Mock API functions for demo
const mockAPI = {
  post: async (url, data) => {
    console.log('Mock API called:', { url, data })
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (url === '/auth/login') {
      console.log('Login attempt:', { email: data.email, password: data.password })
      if (data.email === 'demo@example.com' && data.password === 'password') {
        console.log('Login successful')
        return {
          data: {
            token: 'mock-jwt-token',
            username: 'Demo User',
            email: data.email
          }
        }
      } else {
        console.log('Login failed - invalid credentials')
        const error = new Error('Invalid credentials')
        error.response = { data: { message: 'Invalid email or password' } }
        throw error
      }
    }
    
    if (url === '/auth/register') {
      console.log('Register attempt:', { username: data.username, email: data.email })
      return {
        data: {
          token: 'mock-jwt-token',
          username: data.username,
          email: data.email
        }
      }
    }
    
    // Mock other endpoints
    console.log('Mock API - other endpoint:', url)
    return { data: { message: 'Mock response' } }
  }
}

// Create API instance
let API

if (isBackendAvailable) {
  // Use real axios for backend
  API = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  })
  
  API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) req.headers.Authorization = `Bearer ${token}`
    return req
  })
} else {
  // Use mock API for demo
  API = mockAPI
}

export default API
