import { beforeEach, describe, expect, it } from 'vitest'
import { getEntries } from './getEntries'
import { storeEntries } from './storeEntries'
import { removeEntry } from './removeEntry'
import { updateEntry } from './updateEntry'
import { sortEntriesNewestFirst } from './sortEntriesNewestFirst'

const sample = {
  id: '1',
  title: 'Hello',
  date: '2026-08-10',
  imageURL: 'https://example.com/a.jpg',
  content: 'Day one',
}

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('getEntries returns [] when missing', () => {
    expect(getEntries()).toEqual([])
  })

  it('storeEntries then getEntries round-trips', () => {
    storeEntries([sample])
    expect(getEntries()).toEqual([sample])
  })

  it('getEntries returns [] on invalid JSON', () => {
    localStorage.setItem('entries', '{not-json')
    expect(getEntries()).toEqual([])
  })

  it('removeEntry filters and persists', () => {
    const next = removeEntry([sample], sample)
    expect(next).toEqual([])
    expect(getEntries()).toEqual([])
  })

  it('updateEntry replaces matching id and persists', () => {
    const updated = { ...sample, title: 'Updated' }
    const next = updateEntry([sample], updated)
    expect(next[0].title).toBe('Updated')
    expect(getEntries()[0].title).toBe('Updated')
  })

  it('sortEntriesNewestFirst orders by date desc', () => {
    const a = { ...sample, id: 'a', date: '2026-08-01' }
    const b = { ...sample, id: 'b', date: '2026-08-11' }
    expect(sortEntriesNewestFirst([a, b]).map((e) => e.id)).toEqual(['b', 'a'])
  })
})
