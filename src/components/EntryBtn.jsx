import { useEntries } from '../context/EntriesContext'

export default function EntryBtn() {
  const { setShowAddEntryForm, clearError, setEntry } = useEntries()

  function handleClick() {
    clearError()
    setEntry({ title: '', date: '', imageURL: '', content: '' })
    setShowAddEntryForm(true)
  }

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      Add Entry
    </button>
  )
}
