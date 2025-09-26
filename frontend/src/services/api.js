import axios from 'axios'

// Backend configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
const isBackendAvailable = process.env.REACT_APP_USE_BACKEND === 'true' || process.env.REACT_APP_BACKEND_URL

console.log('API Configuration:', { 
  isBackendAvailable, 
  BACKEND_URL, 
  NODE_ENV: process.env.NODE_ENV,
  USE_BACKEND: process.env.REACT_APP_USE_BACKEND 
})

// Mock data storage
let mockData = {
  tasks: [
    { _id: '1', title: 'Complete project proposal', description: 'Write and submit the project proposal', priority: 'high', status: 'pending', dueDate: '2024-01-15' },
    { _id: '2', title: 'Review code', description: 'Review team code submissions', priority: 'medium', status: 'in-progress', dueDate: '2024-01-12' },
    { _id: '3', title: 'Team meeting', description: 'Weekly team standup meeting', priority: 'low', status: 'done', dueDate: '2024-01-10' }
  ],
  goals: [
    { _id: '1', title: 'Learn React', targetDate: '2024-02-01', progress: 75 },
    { _id: '2', title: 'Complete certification', targetDate: '2024-03-15', progress: 30 },
    { _id: '3', title: 'Build portfolio', targetDate: '2024-04-01', progress: 60 }
  ],
  notes: [
    { _id: '1', content: 'Remember to update the documentation', createdAt: '2024-01-08' },
    { _id: '2', content: 'Meeting notes: Discuss new features for Q1', createdAt: '2024-01-07' },
    { _id: '3', content: 'Ideas for improving user experience', createdAt: '2024-01-06' }
  ]
}

// Mock API functions for demo
const mockAPI = {
  get: async (url) => {
    console.log('Mock API GET:', url)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      if (url === '/tasks') {
        return { data: { tasks: mockData.tasks } }
      }
      if (url === '/goals') {
        return { data: { goals: mockData.goals } }
      }
      if (url === '/notes') {
        return { data: { notes: mockData.notes } }
      }
      
      console.log('Mock API GET - unknown endpoint:', url)
      return { data: [] }
    } catch (error) {
      console.error('Mock API GET error:', error)
      throw error
    }
  },
  
  post: async (url, data) => {
    console.log('Mock API POST:', { url, data })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
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
      
      if (url === '/tasks') {
        const newTask = { _id: Date.now().toString(), ...data, status: 'pending' }
        mockData.tasks.push(newTask)
        return { data: newTask }
      }
      
      if (url === '/goals') {
        const newGoal = { _id: Date.now().toString(), ...data, progress: 0 }
        mockData.goals.push(newGoal)
        return { data: newGoal }
      }
      
      if (url === '/notes') {
        const newNote = { _id: Date.now().toString(), ...data, createdAt: new Date().toISOString().split('T')[0] }
        mockData.notes.push(newNote)
        return { data: newNote }
      }
      
      console.log('Mock API POST - unknown endpoint:', url)
      return { data: { message: 'Mock response' } }
    } catch (error) {
      console.error('Mock API POST error:', error)
      throw error
    }
  },
  
  put: async (url, data) => {
    console.log('Mock API PUT:', { url, data })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const id = url.split('/').pop()
    
    if (url.startsWith('/tasks/')) {
      const index = mockData.tasks.findIndex(task => task._id === id)
      if (index !== -1) {
        mockData.tasks[index] = { ...mockData.tasks[index], ...data }
        return { data: mockData.tasks[index] }
      }
    }
    
    if (url.startsWith('/goals/')) {
      const index = mockData.goals.findIndex(goal => goal._id === id)
      if (index !== -1) {
        mockData.goals[index] = { ...mockData.goals[index], ...data }
        return { data: mockData.goals[index] }
      }
    }
    
    return { data: { message: 'Updated' } }
  },
  
  delete: async (url) => {
    console.log('Mock API DELETE:', url)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const id = url.split('/').pop()
    
    if (url.startsWith('/tasks/')) {
      mockData.tasks = mockData.tasks.filter(task => task._id !== id)
    }
    
    if (url.startsWith('/goals/')) {
      mockData.goals = mockData.goals.filter(goal => goal._id !== id)
    }
    
    if (url.startsWith('/notes/')) {
      mockData.notes = mockData.notes.filter(note => note._id !== id)
    }
    
    return { data: { message: 'Deleted' } }
  }
}

// Create API instance
let API

if (isBackendAvailable) {
  // Use real axios for backend
  const baseURL = `${BACKEND_URL}/api`
  console.log('Using backend API:', baseURL)
  
  API = axios.create({
    baseURL: baseURL,
    timeout: 10000, // 10 second timeout
    headers: {
      'Content-Type': 'application/json',
    }
  })
  
  // Request interceptor to add auth token
  API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data)
      return config
    },
    (error) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    }
  )
  
  // Response interceptor for error handling
  API.interceptors.response.use(
    (response) => {
      console.log('API Response:', response.status, response.config.url, response.data)
      return response
    },
    (error) => {
      console.error('API Error:', error.response?.status, error.config?.url, error.response?.data)
      
      // Handle common errors
      if (error.response?.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        window.location.href = '/login'
      }
      
      return Promise.reject(error)
    }
  )
} else {
  // Use mock API for demo
  console.log('Using mock API for demo')
  API = mockAPI
}

export default API
