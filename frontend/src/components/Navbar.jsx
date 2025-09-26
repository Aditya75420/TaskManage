import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { FiUser, FiLogOut, FiHome, FiCheckSquare, FiTarget, FiFileText, FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/tasks', label: 'Tasks', icon: FiCheckSquare },
    { to: '/goals', label: 'Goals', icon: FiTarget },
    { to: '/notes', label: 'Notes', icon: FiFileText },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-gradient flex items-center gap-2">
          <img src={logo} alt="TaskFlow" className="w-8 h-8" />
          <span className="hidden sm:block">TaskFlow</span>
        </Link>
        
        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
            <FiUser className="text-gray-600" />
            <span className="text-sm font-medium">{user?.username}</span>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 py-3">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <Link 
                key={item.to} 
                to={item.to} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white shadow-md text-blue-600 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = location.pathname === item.to
              return (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
            
            {/* Mobile User Info & Logout */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600">
                <FiUser className="w-5 h-5" />
                {user?.username}
              </div>
              <button 
                onClick={() => {
                  logout()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
