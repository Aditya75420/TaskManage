import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TaskCard from '../components/TaskCard'
import API from '../services/api'
import { toast } from 'react-toastify'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [deadline, setDeadline] = useState('')

  const load = async () => {
    try {
      const { data } = await API.get('/tasks')
      setTasks(data.tasks || data)
    } catch (e) {
      toast.error('Failed to load tasks')
    }
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    try {
      await API.post('/tasks', { 
        title, 
        description, 
        priority, 
        deadline: deadline ? new Date(deadline).toISOString() : null 
      })
      setTitle(''); setDescription(''); setPriority('medium'); setDeadline('')
      toast.success('Task created')
      load()
    } catch (e) { toast.error(e.response?.data?.message || 'Failed to create task') }
  }

  const update = async (task, updates) => {
    try { await API.put(`/tasks/${task._id}`, updates); load() } catch { toast.error('Failed to update') }
  }

  const remove = async (task) => {
    try { await API.delete(`/tasks/${task._id}`); load() } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />
        <main className="flex-1 space-y-6 lg:space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks</h1>
            <p className="text-gray-600">Manage your tasks and stay organized</p>
          </div>
          
          <div className="card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
            <form onSubmit={create} className="space-y-4">
              <input 
                className="input-field" 
                placeholder="Task title" 
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                required
              />
              <input 
                className="input-field" 
                placeholder="Description" 
                value={description} 
                onChange={e=>setDescription(e.target.value)} 
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select 
                  className="input-field" 
                  value={priority} 
                  onChange={e=>setPriority(e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input 
                  type="date" 
                  className="input-field"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder="Deadline (optional)"
                />
                <button type="submit" className="btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {tasks.map((t, index) => (
              <div key={t._id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <TaskCard task={t} onUpdate={update} onDelete={remove} onEdit={update} />
              </div>
            ))}
          </div>
          
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-600">Create your first task to get started!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
