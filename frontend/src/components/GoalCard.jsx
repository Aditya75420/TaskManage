import { FiTarget, FiCalendar, FiTrendingUp } from 'react-icons/fi'

export default function GoalCard({ goal, onUpdate }) {
  const pct = goal.progress || 0
  const isCompleted = pct === 100
  
  return (
    <div className={`card p-6 hover:shadow-lg transition-all duration-300 ${isCompleted ? 'ring-2 ring-green-200 bg-green-50/30' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-100' : 'bg-blue-100'}`}>
            <FiTarget className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{goal.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FiCalendar className="w-3 h-3" />
          {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'Invalid Date'}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-gray-900">{pct}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[25, 50, 75, 100].map(v => (
              <button 
                key={v} 
                onClick={() => onUpdate(goal, { progress: v })} 
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  pct >= v 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
          
          {isCompleted && (
            <div className="flex items-center gap-1 text-green-600">
              <FiTrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Completed!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
