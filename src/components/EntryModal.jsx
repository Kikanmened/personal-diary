import { useEffect, useState } from 'react'
import { useEntries } from '../context/EntriesContext'

export default function EntryModal() {
  const {
    showEntryModal,
    setShowEntryModal,
    entry,
    setEntry,
    saveEntry,
    deleteEntry,
    error,
    clearError,
  } = useEntries()

  const [draft, setDraft] = useState(entry)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setDraft(entry)
    setConfirmDelete(false)
  }, [entry, showEntryModal])

  if (!showEntryModal || !draft) return null

  function handleClose() {
    clearError()
    setShowEntryModal(false)
  }

  function handleChange(field) {
    return (e) => setDraft((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSave(e) {
    e.preventDefault()
    const ok = saveEntry(draft)
    if (ok) setEntry(draft)
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h2 className="font-display text-xl font-bold mb-4">Entry</h2>
        {error ? <div className="alert alert-error mb-3">{error}</div> : null}
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <img
            src={draft.imageURL}
            alt={draft.title}
            className="w-full max-h-64 object-cover rounded-lg bg-base-200"
          />
          <label className="form-control">
            <span className="label-text">Title</span>
            <input
              className="input input-bordered"
              value={draft.title ?? ''}
              onChange={handleChange('title')}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Date</span>
            <input
              type="date"
              className="input input-bordered"
              value={draft.date ?? ''}
              onChange={handleChange('date')}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Image URL</span>
            <input
              className="input input-bordered"
              value={draft.imageURL ?? ''}
              onChange={handleChange('imageURL')}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Content</span>
            <textarea
              className="textarea textarea-bordered"
              rows={6}
              value={draft.content ?? ''}
              onChange={handleChange('content')}
            />
          </label>
          <div className="modal-action flex-wrap gap-2">
            {!confirmDelete ? (
              <button
                type="button"
                className="btn btn-error btn-outline"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-error"
                onClick={() => deleteEntry(draft)}
              >
                Confirm delete
              </button>
            )}
            <button type="button" className="btn" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
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
