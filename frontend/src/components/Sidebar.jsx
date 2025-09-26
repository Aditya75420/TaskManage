import { FiZap, FiCheckCircle, FiTarget, FiBookmark } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-white/50 backdrop-blur-sm border-r border-gray-200/50 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FiZap className="w-4 h-4 text-yellow-500" />
            Quick Tips
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Use statuses to track task progress</span>
            </li>
            <li className="flex items-start gap-2">
              <FiTarget className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Keep goals focused and time-bound</span>
            </li>
            <li className="flex items-start gap-2">
              <FiBookmark className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Organize notes with categories</span>
            </li>
          </ul>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Productivity</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Today's focus</span>
              <span className="font-medium text-blue-600">High</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
