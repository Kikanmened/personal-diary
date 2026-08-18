const KEY = 'entries'

export function storeEntries(entries) {
  localStorage.setItem(KEY, JSON.stringify(entries))
}
