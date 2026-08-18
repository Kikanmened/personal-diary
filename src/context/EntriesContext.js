import { createContext, useContext } from 'react'

export const EntriesContext = createContext(null)

export function useEntries() {
  const ctx = useContext(EntriesContext)
  if (!ctx) {
    throw new Error('useEntries must be used within EntriesState')
  }
  return ctx
}
