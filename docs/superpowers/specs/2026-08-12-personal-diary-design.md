# Personal Diary — Design Spec

**Date:** 2026-08-12  
**Location:** `/Users/samuel/personal-diary`  
**Stack:** React + Vite (JavaScript), TailwindCSS via npm, localStorage, Render static deploy  

## Goals

Build a solo Personal Diary web app that meets course FRs FR001–FR015: public GitHub repo, incremental PRs into `main`, React+Vite+Tailwind, hooks for state/effects, add/view modals, form validation, one-entry-per-day rule, sorted card list, localStorage persistence, and Render static hosting.

## Non-goals

- Authentication or multi-user sync
- Edit / delete entries
- Backend or database
- Seed / demo entries on first load
- TypeScript

## Architecture

Approach: course component tree with thin hooks for persistence and diary rules.

```
App
├── Header
│   └── AddEntryButton
├── EntryList
│   └── EntryCard (repeated)
├── AddEntryModal
│   └── EntryForm
└── ViewEntryModal
    └── EntryDetails

hooks/
  useLocalStorage.js
  useDiaryEntries.js
```

### State ownership (`App`)

| State | Purpose |
|-------|---------|
| `entries` / setters via hooks | Diary array |
| `isAddOpen` | Add Entry modal visibility |
| `isViewOpen` | View Entry modal visibility |
| `selectedEntry` | Entry shown in view modal |

### Entry data shape

localStorage key: `personal-diary-entries`

```js
{
  id: string,        // crypto.randomUUID()
  title: string,
  date: string,      // YYYY-MM-DD
  imageUrl: string,
  content: string
}
```

## Visual design

**Direction:** Calm journal — soft paper atmosphere, serif titles, photo-forward cards.

**Palette (CSS variables):**

| Token | Value | Use |
|-------|-------|-----|
| `--page` | `#E8EEE9` | Sage-mist page background + subtle grain/gradient |
| `--surface` | `#F7F5F0` | Cards and modals |
| `--ink` | `#2C2A26` | Primary text |
| `--accent` | `#3F5E4A` | Primary button / focus |
| `--muted` | `#6B6560` | Secondary text |

**Typography:** Fraunces (titles) + Source Sans 3 (UI/body).

**Layout:** Sticky header with brand “Personal Diary” and Add Entry; responsive card grid (1/2/3 columns); centered modals with Esc, backdrop click, and close button; empty state with short copy + CTA (no fake data).

**Motion:** Modal fade + slight scale-in; card hover lift / image zoom; brief submit busy state.

## Interactions

### Add Entry

1. Add Entry opens add modal (`isAddOpen`).
2. Form collects Title, Date, Image URL, Content.
3. Submit blocked if any field empty/whitespace → inline “All fields are required”.
4. If an entry already exists for that date → inline “You already wrote for this day — come back tomorrow.”; do not save; keep modal open.
5. Else append entry, persist, close modal, clear form, list updates newest-first.

### View Entry

1. Card click sets `selectedEntry` and opens view modal.
2. Modal shows title, formatted date, image, full content.
3. Close clears view flag (and selected entry).

### Startup & persistence

- On mount, read array from localStorage; invalid/missing → `[]`.
- On successful add, write full array back to localStorage.
- Homepage list sorted newest date first (tie-break by insertion order if needed).

## Delivery

### GitHub (FR001–FR002)

Public repo; no instructor collaborators. Every change merges to `main` via PR.

Suggested PR slices:

1. Vite + React + Tailwind scaffold + README  
2. Layout shell (Header, empty list, calm styles)  
3. localStorage hooks + load on mount  
4. Add Entry modal + validation + one-per-day  
5. Entry cards + View Entry modal  
6. Render static deploy + README deploy notes  

### Render (FR015)

Static Site: `npm run build`, publish directory `dist`.

## Success criteria

- All FR001–FR015 satisfied and demoable
- Presentation can walk the component tree and hook responsibilities
- Empty → add → persist → reload → view works end-to-end
- Duplicate date and empty-field validation behave as specified
