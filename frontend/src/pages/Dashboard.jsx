import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import API from '../services/api'

import { FiCheckSquare, FiTarget, FiFileText, FiTrendingUp, FiCalendar, FiAward } from 'react-icons/fi'

export default function Dashboard() {
  const [stats, setStats] = useState({ tasks: 0, goals: 0, notes: 0, completedTasks: 0 })

  useEffect(() => {
    async function load() {
      try {
        const [tasksRes, goalsRes, notesRes] = await Promise.all([
          API.get('/tasks'),
          API.get('/goals'),
          API.get('/notes'),
        ])
        const tasksArr = tasksRes.data.tasks || tasksRes.data
        const goalsArr = goalsRes.data.goals || goalsRes.data
        const notesArr = notesRes.data.notes || notesRes.data
        const completedTasks = tasksArr.filter(task => task.status === 'done').length
        setStats({ 
          tasks: tasksArr.length, 
          goals: goalsArr.length, 
          notes: notesArr.length,
          completedTasks 
        })
      } catch (e) {
        // no-op
      }
    }
    load()
  }, [])

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.tasks,
      icon: FiCheckSquare,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: FiAward,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Active Goals',
      value: stats.goals,
      icon: FiTarget,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Notes',
      value: stats.notes,
      icon: FiFileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />
        <main className="flex-1 space-y-6 lg:space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your productivity overview.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div 
                  key={card.title}
                  className={`card p-6 hover:shadow-xl transition-all duration-300 animate-bounce-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${card.bgColor}`}>
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="card p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiTrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                  <div className="font-medium text-gray-900">Create New Task</div>
                  <div className="text-sm text-gray-600">Add a task to your list</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                  <div className="font-medium text-gray-900">Set New Goal</div>
                  <div className="text-sm text-gray-600">Define a new objective</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                  <div className="font-medium text-gray-900">Write Note</div>
                  <div className="text-sm text-gray-600">Capture your thoughts</div>
                </button>
              </div>
            </div>

            <div className="card p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiCalendar className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Today's Focus</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Complete pending tasks</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Review goal progress</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Plan tomorrow's priorities</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
