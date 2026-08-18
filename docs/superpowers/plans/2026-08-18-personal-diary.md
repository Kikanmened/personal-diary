# Personal Diary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React + Vite Personal Diary app with Tailwind/daisyUI, Context + Storage helpers, add/view/edit/delete, localStorage persistence, and Render-ready static build — meeting FR001–FR015 and the Trillo Board.

**Architecture:** `EntriesState` Context Provider owns `entries`, modal flags, `entry`, `loading`, and `error`. Pure helpers in `src/storage/` read/write localStorage key `"entries"`. Presentational components under `src/components/` consume context via `useEntries()`.

**Tech Stack:** React 19 (Vite JS template), Tailwind CSS v4 via `@tailwindcss/vite`, daisyUI, Vitest for storage unit tests, Render Static Site.

**Spec:** `docs/superpowers/specs/2026-08-18-personal-diary-design.md`  
**Trillo:** `docs/superpowers/specs/Trillo Board.md`

## Global Constraints

- Language: JavaScript only (no TypeScript)
- localStorage key: exactly `"entries"`
- Entry fields: `id`, `title`, `date` (`YYYY-MM-DD`), `imageURL`, `content`
- One entry per calendar date (add and edit)
- Block submit unless all fields are non-empty after trim
- Homepage list sorted newest date first
- Card preview shows image, date, title only (FR013); full content in modal
- daisyUI for buttons/modals/cards/alerts; calm journal theme (sage/linen/forest — not default purple)
- **Remote GitHub:** USER executes all remote steps; agent only provides commands and does local work unless user explicitly asks to run a remote command
- FR001: public repo; do **not** add instructors as collaborators
- Every feature merges to `main` via PR (FR002); suggested one PR per task group below
- No seed/demo entries on first load

## File structure

| Path | Responsibility |
|------|----------------|
| `src/storage/getEntries.js` | Read/parse `"entries"` → array or `[]` |
| `src/storage/storeEntries.js` | `JSON.stringify` + set `"entries"` |
| `src/storage/removeEntry.js` | Filter out entry, store result |
| `src/storage/updateEntry.js` | Map-replace matching entry, store result |
| `src/storage/sortEntriesNewestFirst.js` | Pure sort by `date` desc |
| `src/context/EntriesContext.js` | `createContext` + `useEntries` |
| `src/context/EntriesState.jsx` | Provider: state, load on mount, actions |
| `src/components/EntryBtn.jsx` | Opens add form |
| `src/components/AddEntryForm.jsx` | Add modal + validation |
| `src/components/EntryCard.jsx` | Card preview; opens detail modal |
| `src/components/HomepageList.jsx` | Sorted list of cards |
| `src/components/EntryModal.jsx` | View / edit / delete |
| `src/components/Header.jsx` | Brand + EntryBtn |
| `src/App.jsx` | Page layout composing components |
| `src/main.jsx` | Wrap `<App>` in `<EntriesState>` |
| `src/index.css` | Tailwind + daisyUI theme + fonts |
| `README.md` | Setup, PR flow (user remotes), Render notes |

---

### Task 1: Scaffold Vite + Tailwind + daisyUI

**Files:**
- Create: Vite React JS app in `/Users/samuel/personal-diary` (preserve existing `docs/`)
- Create/modify: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `README.md`
- Delete/clear: `src/App.css`, default `src/assets/*` contents; keep or clear `public/` per Trillo (remove unused Vite SVG from assets; keep `public/vite.svg` removal optional — prefer delete unused assets)

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev` app with Tailwind + daisyUI classes working

- [ ] **Step 1: Scaffold Vite into the existing folder without wiping docs**

```bash
cd /Users/samuel/personal-diary
npm create vite@latest . -- --template react
```

If the tool refuses a non-empty directory, scaffold in a temp folder and move app files in while keeping `docs/` and `.git/`.

Expected: `package.json`, `src/`, `index.html` present; `docs/` still present.

- [ ] **Step 2: Install dependencies and Tailwind + daisyUI**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install daisyui@latest
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Configure Vite plugins**

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create test setup and index.css theme**

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

Replace `src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Source+Sans+3:wght@400;600;700&display=swap');
@import "tailwindcss";
@plugin "daisyui" {
  themes: personaldiary --default;
}

@plugin "daisyui/theme" {
  name: "personaldiary";
  default: true;
  color-scheme: light;
  --color-base-100: #F7F5F0;
  --color-base-200: #E8EEE9;
  --color-base-300: #D5DDD6;
  --color-base-content: #2C2A26;
  --color-primary: #3F5E4A;
  --color-primary-content: #F7F5F0;
  --color-secondary: #6B6560;
  --color-secondary-content: #F7F5F0;
  --color-accent: #3F5E4A;
  --color-neutral: #2C2A26;
  --color-info: #5B7C8D;
  --color-success: #3F5E4A;
  --color-warning: #B08968;
  --color-error: #A65D5D;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: "Source Sans 3", system-ui, sans-serif;
  background:
    radial-gradient(ellipse at top, #f7f5f0 0%, #e8eee9 55%, #dfe8e1 100%);
  color: #2c2a26;
}

h1,
h2,
h3,
.font-display {
  font-family: Fraunces, Georgia, serif;
}
```

- [ ] **Step 5: Clean boilerplate and minimal App shell**

Delete `src/App.css`. Clear unused files under `src/assets/`.  
Set `src/App.jsx` to:

```jsx
export default function App() {
  return (
    <div className="min-h-screen">
      <header className="navbar bg-base-100/90 backdrop-blur sticky top-0 z-20 border-b border-base-300 px-4">
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold">Personal Diary</h1>
        </div>
        <div className="flex-none">
          <button type="button" className="btn btn-primary">
            Add Entry
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-secondary">Your entries will appear here.</p>
      </main>
    </div>
  )
}
```

Ensure `src/main.jsx` imports `./index.css` and renders `<App />`.  
Set document title in `index.html` to `Personal Diary`.

- [ ] **Step 6: Verify locally**

```bash
npm run dev
```

Expected: app loads; header shows “Personal Diary”; primary button uses forest green theme.

- [ ] **Step 7: Commit (local)**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: scaffold Vite React app with Tailwind and daisyUI

EOF
)"
```

- [ ] **Step 8: USER — open PR slice 1 (guidance only)**

When ready, user creates GitHub public repo (empty), then:

```bash
git remote add origin git@github.com:<USERNAME>/personal-diary.git
git branch -M main
git push -u origin main
```

Then create branch/PR for this scaffold if committing on a feature branch instead of committing directly on `main` for the very first push. Prefer: push `main` with scaffold, then all later work via PRs.

---

### Task 2: Storage helpers (TDD)

**Files:**
- Create: `src/storage/getEntries.js`, `storeEntries.js`, `removeEntry.js`, `updateEntry.js`, `sortEntriesNewestFirst.js`
- Test: `src/storage/storage.test.js`

**Interfaces:**
- Consumes: `localStorage`
- Produces:
  - `getEntries(): Entry[]`
  - `storeEntries(entries: Entry[]): void`
  - `removeEntry(entries: Entry[], entryToRemove: Entry): Entry[]` (also persists)
  - `updateEntry(entries: Entry[], entryToUpdate: Entry): Entry[]` (also persists)
  - `sortEntriesNewestFirst(entries: Entry[]): Entry[]` (pure, no persist)
  - Match entries by `id` when present; else by `date` + `title`

- [ ] **Step 1: Write failing tests**

Create `src/storage/storage.test.js`:

```js
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
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

Expected: FAIL (modules missing).

- [ ] **Step 3: Implement storage modules**

`src/storage/getEntries.js`:

```js
const KEY = 'entries'

export function getEntries() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
```

`src/storage/storeEntries.js`:

```js
const KEY = 'entries'

export function storeEntries(entries) {
  localStorage.setItem(KEY, JSON.stringify(entries))
}
```

`src/storage/removeEntry.js`:

```js
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
```

`src/storage/updateEntry.js`:

```js
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
```

`src/storage/sortEntriesNewestFirst.js`:

```js
export function sortEntriesNewestFirst(entries) {
  return [...entries].sort((a, b) => {
    if (a.date === b.date) return 0
    return a.date < b.date ? 1 : -1
  })
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: all storage tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/storage src/test vite.config.js package.json package-lock.json
git commit -m "$(cat <<'EOF'
feat: add localStorage helpers for diary entries

EOF
)"
```

---

### Task 3: EntriesContext + EntriesState

**Files:**
- Create: `src/context/EntriesContext.js`, `src/context/EntriesState.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `getEntries`, `storeEntries`, `removeEntry`, `updateEntry`, `sortEntriesNewestFirst`
- Produces: `useEntries()` → `{ entries, setEntries, entry, setEntry, showAddEntryForm, setShowAddEntryForm, showEntryModal, setShowEntryModal, loading, error, setError, addEntry, saveEntry, deleteEntry, clearError }`

- [ ] **Step 1: Create context**

`src/context/EntriesContext.js`:

```js
import { createContext, useContext } from 'react'

export const EntriesContext = createContext(null)

export function useEntries() {
  const ctx = useContext(EntriesContext)
  if (!ctx) {
    throw new Error('useEntries must be used within EntriesState')
  }
  return ctx
}
```

- [ ] **Step 2: Create EntriesState provider**

`src/context/EntriesState.jsx`:

```jsx
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
```

- [ ] **Step 3: Wrap app in main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EntriesState from './context/EntriesState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EntriesState>
      <App />
    </EntriesState>
  </StrictMode>,
)
```

- [ ] **Step 4: Smoke-check in browser**

```bash
npm run dev
```

Expected: app still renders; no context errors in console.

- [ ] **Step 5: Commit**

```bash
git add src/context src/main.jsx
git commit -m "$(cat <<'EOF'
feat: add EntriesContext provider with localStorage load

EOF
)"
```

- [ ] **Step 6: USER — PR slice 2**

Create branch from latest `main`, push, open PR titled e.g. “Context + Storage”, merge on GitHub.

---

### Task 4: Header + EntryBtn + AddEntryForm

**Files:**
- Create: `src/components/Header.jsx`, `EntryBtn.jsx`, `AddEntryForm.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useEntries()` (`setShowAddEntryForm`, `showAddEntryForm`, `addEntry`, `error`, `clearError`)
- Produces: working Add Entry modal with validation

- [ ] **Step 1: Create EntryBtn**

```jsx
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
```

- [ ] **Step 2: Create Header**

```jsx
import EntryBtn from './EntryBtn'

export default function Header() {
  return (
    <header className="navbar bg-base-100/90 backdrop-blur sticky top-0 z-20 border-b border-base-300 px-4">
      <div className="flex-1">
        <h1 className="font-display text-2xl font-bold">Personal Diary</h1>
      </div>
      <div className="flex-none">
        <EntryBtn />
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create AddEntryForm modal**

```jsx
import { useState, useEffect } from 'react'
import { useEntries } from '../context/EntriesContext'

export default function AddEntryForm() {
  const {
    showAddEntryForm,
    setShowAddEntryForm,
    addEntry,
    error,
    clearError,
  } = useEntries()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!showAddEntryForm) {
      setTitle('')
      setDate('')
      setImageURL('')
      setContent('')
    }
  }, [showAddEntryForm])

  if (!showAddEntryForm) return null

  function handleClose() {
    clearError()
    setShowAddEntryForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    addEntry({ title, date, imageURL, content })
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-display text-xl font-bold mb-4">Add Entry</h2>
        {error ? <div className="alert alert-error mb-3">{error}</div> : null}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="form-control">
            <span className="label-text">Title</span>
            <input
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Date</span>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Image URL</span>
            <input
              className="input input-bordered"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Content</span>
            <textarea
              className="textarea textarea-bordered"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
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
```

- [ ] **Step 4: Wire App**

```jsx
import Header from './components/Header'
import AddEntryForm from './components/AddEntryForm'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-secondary">Your entries will appear here.</p>
      </main>
      <AddEntryForm />
    </div>
  )
}
```

- [ ] **Step 5: Manual test**

1. Open Add Entry, submit empty → error “All fields are required.”
2. Fill all fields, save → modal closes; `localStorage.entries` has one item.
3. Add another with same date → “come back tomorrow.”

- [ ] **Step 6: Commit**

```bash
git add src/components src/App.jsx
git commit -m "$(cat <<'EOF'
feat: add entry button and validated add form modal

EOF
)"
```

---

### Task 5: HomepageList + EntryCard

**Files:**
- Create: `src/components/EntryCard.jsx`, `src/components/HomepageList.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `entries`, `loading`, `setEntry`, `setShowEntryModal`, `clearError`
- Produces: sorted card grid; card click opens detail modal state

- [ ] **Step 1: EntryCard**

```jsx
export default function EntryCard({ title, date, imageURL, content, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="card bg-base-100 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition overflow-hidden text-left w-full"
    >
      <figure className="aspect-[4/3] overflow-hidden bg-base-200">
        <img
          src={imageURL}
          alt={title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </figure>
      <div className="card-body gap-1">
        <time className="text-sm text-secondary">{date}</time>
        <h2 className="card-title font-display text-lg">{title}</h2>
      </div>
    </button>
  )
}
```

Note: `content` is accepted for Trillo prop shape but not rendered on the card (FR013).

- [ ] **Step 2: HomepageList**

```jsx
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
```

- [ ] **Step 3: Update App**

```jsx
import Header from './components/Header'
import HomepageList from './components/HomepageList'
import AddEntryForm from './components/AddEntryForm'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <HomepageList />
      </main>
      <AddEntryForm />
    </div>
  )
}
```

- [ ] **Step 4: Manual test**

Add two entries on different dates → newer appears first; cards show image/date/title only.

- [ ] **Step 5: Commit**

```bash
git add src/components src/App.jsx
git commit -m "$(cat <<'EOF'
feat: render sorted diary entry cards on homepage

EOF
)"
```

---

### Task 6: EntryModal (view + edit + delete)

**Files:**
- Create: `src/components/EntryModal.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `showEntryModal`, `entry`, `setEntry`, `saveEntry`, `deleteEntry`, `error`, `clearError`, `setShowEntryModal`
- Produces: detail modal with editable fields and delete confirm

- [ ] **Step 1: Implement EntryModal**

```jsx
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
```

- [ ] **Step 2: Mount in App**

```jsx
import Header from './components/Header'
import HomepageList from './components/HomepageList'
import AddEntryForm from './components/AddEntryForm'
import EntryModal from './components/EntryModal'

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <HomepageList />
      </main>
      <AddEntryForm />
      <EntryModal />
    </div>
  )
}
```

- [ ] **Step 3: Manual test**

1. Click card → modal shows all fields.  
2. Edit title → Save → list updates; reload keeps change.  
3. Change date to an existing date → error; no save.  
4. Delete → confirm → entry removed from UI and localStorage.

- [ ] **Step 4: Commit**

```bash
git add src/components/EntryModal.jsx src/App.jsx
git commit -m "$(cat <<'EOF'
feat: add entry detail modal with edit and delete

EOF
)"
```

- [ ] **Step 5: USER — PRs for tasks 4–6**

Open/merge PRs as preferred slices (Add form / List / Modal) or one combined “UI features” PR.

---

### Task 7: README + Render deploy notes

**Files:**
- Create/modify: `README.md`

**Interfaces:**
- Produces: docs for local run, PR workflow (user remotes), Render static settings

- [ ] **Step 1: Write README**

Include:
- Project name + short description
- `npm install` / `npm run dev` / `npm run build` / `npm test`
- localStorage key `entries`
- PR workflow reminder (branch → PR → merge to `main`)
- Render Static Site: build `npm run build`, publish `dist`
- Note: do not add instructors as collaborators

- [ ] **Step 2: Verify production build**

```bash
npm run build
npm run preview
```

Expected: `dist/` built; preview works.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "$(cat <<'EOF'
docs: add README with setup and Render deploy notes

EOF
)"
```

- [ ] **Step 4: USER — Render (FR015)**

1. Push latest `main` to GitHub.  
2. Render → New Static Site → connect repo.  
3. Build command: `npm run build`  
4. Publish directory: `dist`  
5. Deploy and verify live URL.

- [ ] **Step 5: USER — optional Trillo git hygiene**

```bash
git checkout main
git pull
git checkout -b dev
git push -u origin dev
```

On GitHub: branch protection for `main`/`dev` if desired (solo: allow your own PR merges). **Do not** add instructors as collaborators.

---

## Self-review (plan vs spec)

| Spec / FR / Trillo item | Task |
|-------------------------|------|
| FR003/FR004 Vite + Tailwind + daisyUI | Task 1 |
| Storage key `entries` + get/store/update/remove | Task 2 |
| Context + EntriesState fields | Task 3 |
| EntryBtn + AddEntryForm + validation + one-per-day | Task 4 |
| HomepageList + EntryCard sorted | Task 5 |
| EntryModal view/edit/delete | Task 6 |
| FR001/FR002 remotes + FR015 Render | Tasks 1/3/6/7 USER steps |
| Calm journal theme | Task 1 CSS |
| No instructor collaborators | Global + README |

**Intentionally out of plan (same as approved spec):** Figma mock artifact; mandatory instructor presentation; adding collaborators.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-18-personal-diary.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — run tasks in this session with checkpoints  

Which approach? (Remotes stay yours either way unless you ask me to run a specific `git`/`gh` remote command.)
