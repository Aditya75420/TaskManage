import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import API from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      const email = localStorage.getItem('email')
      if (token && username && email) {
        setUser({ username, email })
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email)
      setUser({ username: data.username, email: data.email })
      toast.success('Logged in successfully')
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
      return false
    }
  }

  const register = async (username, email, password) => {
    try {
      const { data } = await API.post('/auth/register', { username, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email)
      setUser({ username: data.username, email: data.email })
      toast.success('Registered successfully')
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    loading,
  }), [user, loading])

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
