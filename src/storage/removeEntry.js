import { storeEntries } from './storeEntries'

function sameEntry(a, b) {
  if (a.id && b.id) return a.id === b.id
  return a.date === b.date && a.title === b.title
}

export function removeEntry(entries, entryToRemove) {
  const next = entries.filter((entry) => !sameEntry(entry, entryToRemove))
  storeEntries(next)
  return next
}
