import { useEffect, useMemo, useState } from 'react'
import { EntriesContext } from './EntriesContext'
import { getEntries } from '../storage/getEntries'
import { storeEntries } from '../storage/storeEntries'
import { removeEntry } from '../storage/removeEntry'
import { updateEntry } from '../storage/updateEntry'
import { sortEntriesNewestFirst } from '../storage/sortEntriesNewestFirst'

const emptyForm = {
  title: '',
  date: '',
  imageURL: '',
  content: '',
}

export default function EntriesState({ children }) {
  const [entries, setEntries] = useState([])
  const [entry, setEntry] = useState(emptyForm)
  const [showAddEntryForm, setShowAddEntryForm] = useState(false)
  const [showEntryModal, setShowEntryModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setEntries(getEntries())
    setLoading(false)
  }, [])

  function clearError() {
    setError('')
  }

  function dateTaken(date, exceptId) {
    return entries.some((e) => e.date === date && e.id !== exceptId)
  }

  function addEntry(formValues) {
    const title = formValues.title.trim()
    const date = formValues.date.trim()
    const imageURL = formValues.imageURL.trim()
    const content = formValues.content.trim()

    if (!title || !date || !imageURL || !content) {
      setError('All fields are required.')
      return false
    }
    if (dateTaken(date)) {
      setError('You already wrote for this day — come back tomorrow.')
      return false
    }

    const nextEntry = {
      id: crypto.randomUUID(),
      title,
      date,
      imageURL,
      content,
    }
    const next = [...entries, nextEntry]
    storeEntries(next)
    setEntries(next)
    setEntry(emptyForm)
    setError('')
    setShowAddEntryForm(false)
    return true
  }

  function saveEntry(formValues) {
    const title = formValues.title.trim()
    const date = formValues.date.trim()
    const imageURL = formValues.imageURL.trim()
    const content = formValues.content.trim()

    if (!title || !date || !imageURL || !content) {
      setError('All fields are required.')
      return false
    }
    if (dateTaken(date, formValues.id)) {
      setError('You already wrote for this day — come back tomorrow.')
      return false
    }

    const updated = { ...formValues, title, date, imageURL, content }
    const next = updateEntry(entries, updated)
    setEntries(next)
    setEntry(updated)
    setError('')
    return true
  }

  function deleteEntry(target) {
    const next = removeEntry(entries, target)
    setEntries(next)
    setShowEntryModal(false)
    setEntry(emptyForm)
    setError('')
  }

  const value = useMemo(
    () => ({
      entries: sortEntriesNewestFirst(entries),
      setEntries,
      entry,
      setEntry,
      showAddEntryForm,
      setShowAddEntryForm,
      showEntryModal,
      setShowEntryModal,
      loading,
      error,
      setError,
      addEntry,
      saveEntry,
      deleteEntry,
      clearError,
    }),
    [entries, entry, showAddEntryForm, showEntryModal, loading, error],
  )

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  )
}
