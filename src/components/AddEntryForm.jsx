import { useState, useEffect } from 'react'
import { useEntries } from '../context/EntriesContext'

export default function AddEntryForm() {
  const {
    showAddEntryForm,
    setShowAddEntryForm,
    addEntry,
    error,
    clearError,
  } = useEntries()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!showAddEntryForm) {
      setTitle('')
      setDate('')
      setImageURL('')
      setContent('')
    }
  }, [showAddEntryForm])

  if (!showAddEntryForm) return null

  function handleClose() {
    clearError()
    setShowAddEntryForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    addEntry({ title, date, imageURL, content })
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-display text-xl font-bold mb-4">Add Entry</h2>
        {error ? <div className="alert alert-error mb-3">{error}</div> : null}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="form-control">
            <span className="label-text">Title</span>
            <input
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Date</span>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Image URL</span>
            <input
              className="input input-bordered"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Content</span>
            <textarea
              className="textarea textarea-bordered"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  )
}
