import { storeEntries } from './storeEntries'

function sameEntry(a, b) {
  if (a.id && b.id) return a.id === b.id
  return a.date === b.date && a.title === b.title
}

export function updateEntry(entries, entryToUpdate) {
  const next = entries.map((entry) =>
    sameEntry(entry, entryToUpdate) ? entryToUpdate : entry,
  )
  storeEntries(next)
  return next
}
