import { FiPlay, FiCheck, FiTrash2, FiClock, FiEdit3 } from 'react-icons/fi'
import { useState } from 'react'

export default function TaskCard({ task, onUpdate, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: task.title || '',
    description: task.description || '',
    priority: task.priority || 'medium',
    deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
  })
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-50'
      case 'in-progress': return 'text-blue-600 bg-blue-50'
      case 'todo': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const handleSave = () => {
    const updates = {
      title: editForm.title,
      description: editForm.description,
      priority: editForm.priority,
      deadline: editForm.deadline ? new Date(editForm.deadline).toISOString() : null
    }
    onUpdate(task, updates)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'medium',
      deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="card p-5 bg-blue-50/30 border-blue-200">
        <div className="space-y-4">
          <input
            className="input-field"
            value={editForm.title}
            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
            placeholder="Task title"
          />
          <textarea
            className="input-field min-h-[80px] resize-none"
            value={editForm.description}
            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
            placeholder="Description"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="input-field"
              value={editForm.priority}
              onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              className="input-field"
              value={editForm.deadline}
              onChange={(e) => setEditForm({...editForm, deadline: e.target.value})}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary flex-1">
              Save
            </button>
            <button onClick={handleCancel} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-5 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">{task.title}</h3>
        <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        
        <div className="flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            title="Edit Task"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          
          {task.status === 'todo' && (
            <button 
              onClick={() => onUpdate(task, { status: 'in-progress' })}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Start Task"
            >
              <FiPlay className="w-4 h-4" />
            </button>
          )}
          
          {task.status !== 'done' && (
            <button 
              onClick={() => onUpdate(task, { status: 'done' })}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
              title="Mark Complete"
            >
              <FiCheck className="w-4 h-4" />
            </button>
          )}
          
          <button 
            onClick={() => onDelete(task)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete Task"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {task.deadline && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiClock className="w-3 h-3" />
            Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Invalid Date'}
          </div>
        </div>
      )}
    </div>
  )
}
