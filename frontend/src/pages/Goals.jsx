import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import GoalCard from '../components/GoalCard'
import API from '../services/api'
import { toast } from 'react-toastify'

export default function Goals() {
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState('')
  const [targetDate, setTargetDate] = useState('')

  const load = async () => {
    try {
      const { data } = await API.get('/goals')
      setGoals(data.goals || data)
    } catch (e) { toast.error('Failed to load goals') }
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    try { await API.post('/goals', { title, targetDate }); setTitle(''); setTargetDate(''); toast.success('Goal created'); load() } catch (e) { toast.error(e.response?.data?.message || 'Failed to create') }
  }

  const update = async (goal, updates) => {
    try { await API.put(`/goals/${goal._id}`, updates); load() } catch { toast.error('Failed to update') }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />
        <main className="flex-1 space-y-6 lg:space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Goals</h1>
            <p className="text-gray-600">Set and track your objectives</p>
          </div>
          
          <div className="card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Goal</h3>
            <form onSubmit={create} className="space-y-4">
              <input 
                className="input-field" 
                placeholder="Goal title" 
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  className="input-field" 
                  type="date" 
                  value={targetDate} 
                  onChange={e=>setTargetDate(e.target.value)} 
                  required
                />
                <button type="submit" className="btn-primary">
                  Add Goal
                </button>
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {goals.map((g, index) => (
              <div key={g._id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <GoalCard goal={g} onUpdate={update} />
              </div>
            ))}
          </div>
          
          {goals.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
              <p className="text-gray-600">Set your first goal to start tracking progress!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
