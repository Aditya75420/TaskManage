import { FiTrash2, FiCalendar } from 'react-icons/fi'

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="prose max-w-none prose-sm" dangerouslySetInnerHTML={{ __html: note.content }} />
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FiCalendar className="w-3 h-3" />
          {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Invalid Date'}
        </div>
        
        <button 
          onClick={() => onDelete(note)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
          title="Delete Note"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
