import EntryCard from './EntryCard'
import { useEntries } from '../context/EntriesContext'

export default function HomepageList() {
  const {
    entries,
    loading,
    setEntry,
    setShowEntryModal,
    clearError,
  } = useEntries()

  if (loading) {
    return <span className="loading loading-spinner loading-lg" />
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-display text-2xl mb-2">No entries yet</p>
        <p className="text-secondary">Add your first diary entry to begin.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
      {entries.map((item) => (
        <li key={item.id ?? `${item.date}-${item.title}`}>
          <EntryCard
            title={item.title}
            date={item.date}
            imageURL={item.imageURL}
            content={item.content}
            onOpen={() => {
              clearError()
              setEntry(item)
              setShowEntryModal(true)
            }}
          />
        </li>
      ))}
    </ul>
  )
}
