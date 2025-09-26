import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import NoteCard from '../components/NoteCard'
import API from '../services/api'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState('')

  const load = async () => {
    try {
      const { data } = await API.get('/notes')
      setNotes(data.notes || data)
    } catch (e) { toast.error('Failed to load notes') }
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    try { await API.post('/notes', { content }); setContent(''); toast.success('Note created'); load() } catch (e) { toast.error(e.response?.data?.message || 'Failed to create') }
  }

  const remove = async (note) => {
    try { await API.delete(`/notes/${note._id}`); load() } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Sidebar />
        <main className="flex-1 space-y-6 lg:space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notes</h1>
            <p className="text-gray-600">Capture and organize your thoughts</p>
          </div>
          
          <div className="card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Note</h3>
            <form onSubmit={create} className="space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent}
                  placeholder="Write your note here..."
                  style={{ minHeight: '200px' }}
                />
              </div>
              <button type="submit" className="btn-primary">
                Save Note
              </button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {notes.map((n, index) => (
              <div key={n._id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <NoteCard note={n} onDelete={remove} />
              </div>
            ))}
          </div>
          
          {notes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-600">Create your first note to capture your ideas!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
