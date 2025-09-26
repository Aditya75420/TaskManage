import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <FiLogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <div className="card p-8 shadow-xl">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="input-field pl-10" 
                  placeholder="Email address" 
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="input-field pl-10" 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <FiLogIn className="w-4 h-4" />
              Sign In
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
