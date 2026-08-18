export function sortEntriesNewestFirst(entries) {
  return [...entries].sort((a, b) => {
    if (a.date === b.date) return 0
    return a.date < b.date ? 1 : -1
  })
}
