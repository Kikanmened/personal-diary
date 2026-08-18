# Personal Diary — Design Spec (Restart)

**Date:** 2026-08-18  
**Location:** `/Users/samuel/personal-diary`  
**Supersedes:** `2026-08-12-personal-diary-design.md` (App-owned hooks approach)  
**Stack:** React + Vite (JavaScript), TailwindCSS + daisyUI via npm, localStorage, Render static deploy  
**Activity plan:** `Trillo Board.md`  
**Remote GitHub:** User performs all remote actions; assistant guides with commands when asked  

## Goals

Build a solo Personal Diary app that satisfies FR001–FR015 and follows the Trillo Board activity plan, including Context-based state, Storage helpers, and edit/delete beyond the minimum FRs.

## Non-goals

- Authentication or multi-user sync
- Backend or database
- Seed / demo entries on first load
- TypeScript
- Assistant pushing, creating remotes, or merging PRs unless the user explicitly asks for a specific command

## Architecture

**Approach:** Pure Trillo layout — `EntriesContext` / `EntriesState` + `storage/` helpers + daisyUI.

```
main.jsx
└── EntriesState (Provider)
    └── App
        ├── Header / EntryBtn          → showAddEntryForm
        ├── HomepageList
        │   └── EntryCard (map)        → set entry + showEntryModal
        ├── AddEntryForm (modal)       → validate, one-per-day, add
        └── EntryModal (detail)        → view + edit + delete

context/
  EntriesContext.js
  EntriesState.jsx

storage/
  storeEntries.js      → localStorage key "entries"
  getEntries.js
  removeEntry.js
  updateEntry.js
```

### Context value

| State / action | Purpose |
|----------------|---------|
| `entries` | Array of diary entries |
| `entry` | Selected entry / form draft for modal |
| `showAddEntryForm` | Add Entry modal visibility |
| `showEntryModal` | Detail modal visibility |
| `loading` | True while reading localStorage on mount |
| `error` | Validation / one-per-day / edit-date clash messages |
| setters / actions | Update the above from child components |

### Entry data shape

localStorage key: `entries`

```js
{
  id: string,           // crypto.randomUUID() for stable edit/delete
  title: string,
  date: string,         // YYYY-MM-DD
  imageURL: string,     // Trillo naming
  content: string
}
```

## Visual design

**Direction:** Calm journal; daisyUI for buttons, modals, cards, alerts — custom theme (not default purple).

| Token | Value | Use |
|-------|-------|-----|
| Page | `#E8EEE9` | Sage-mist background + light paper texture/gradient |
| Surface | `#F7F5F0` | Cards / modals |
| Ink | `#2C2A26` | Primary text |
| Accent | `#3F5E4A` | Primary button / focus |
| Muted | `#6B6560` | Secondary text |
| Error | Soft rose | Alerts |

**Typography:** Fraunces (titles) + Source Sans 3 (UI/body).

**Layout:** Sticky header (“Personal Diary” + Add Entry); responsive daisyUI card grid (image, date, title); add + detail modals; empty-state CTA; loading skeleton/spinner; error alerts.

**Motion:** Modal fade/scale; card hover lift; save button busy state.

## Interactions

### Add Entry (FR006–FR010, FR008)

1. EntryBtn sets `showAddEntryForm = true`.
2. Form fields: title, date, imageURL, content (controlled).
3. Empty/whitespace fields → set `error`; do not save.
4. Date already in `entries` → `error` prompting user to come back tomorrow; do not save.
5. Else: create entry with `id`, append, `storeEntries`, clear form/`error`, close modal.
6. Homepage list sorted newest date first (FR011).

### View / Edit / Delete (FR014 + Trillo extras)

1. Card click sets `entry` and `showEntryModal = true`.
2. Modal shows title, date, image, content.
3. Edit via inputs → Save → `updateEntry` + refresh state.
4. Delete with confirm → `removeEntry` + close modal.
5. On edit, if changing date to one used by another entry → `error`; do not save.

### Startup (FR012)

- On mount, `getEntries()` loads array; missing/invalid → `[]`.
- `loading` true during initial read.
- Persist after every successful add / update / delete.

## Delivery

### Local

- Scaffold Vite + React (JS), Tailwind + daisyUI (FR003, FR004).
- Create `components/`, `context/`, `storage/` per Trillo.
- Clean default Vite CSS/assets as Trillo checklist requires.
- Feature work on local branches with commits.

### Remote (user-owned; FR001, FR002)

1. Create public empty GitHub repo — **do not add instructors as collaborators** (FR001 overrides Trillo “Add collaborators”).
2. Connect local remote; push `main`.
3. Create and push `dev` from `main`.
4. Optional: protect `main`/`dev` with approval rules (Trillo); solo merges still allowed by you.
5. Merge every change into `main` via Pull Requests.

### Suggested PR slices

1. Scaffold Vite/React/Tailwind/daisyUI + first commit  
2. Context + Storage (`entries` key)  
3. EntryBtn + AddEntryForm (validate + one-per-day)  
4. HomepageList + EntryCard (sorted)  
5. EntryModal view + edit + delete  
6. Render static deploy (`npm run build` → `dist`) + README notes (FR015)

### Render (FR015)

Static Site: build command `npm run build`, publish directory `dist`.

## FR coverage map

| ID | Requirement | Where addressed |
|----|-------------|-----------------|
| FR001 | Public GitHub repo | Delivery — user creates public repo, no instructor collabs |
| FR002 | Incremental PRs | Delivery — PR slices into `main` |
| FR003 | React + Vite | Local scaffold |
| FR004 | Tailwind via npm | Local scaffold (+ daisyUI) |
| FR005 | State & effects | EntriesState / Context |
| FR006 | Add Entry button/modal | EntryBtn + showAddEntryForm |
| FR007 | Form fields | AddEntryForm |
| FR008 | localStorage array | storage/ + key `entries` |
| FR009 | One-entry-per-day | Add (and edit date) validation |
| FR010 | All fields required | Form submit validation |
| FR011 | Sorted newest-first | HomepageList |
| FR012 | Load on startup | getEntries on mount |
| FR013 | Card layout | EntryCard |
| FR014 | Detail modal + state | EntryModal + showEntryModal / entry |
| FR015 | Render static | Delivery — Render |

**Trillo extras (beyond FRs):** edit entry, delete entry, `updateEntry` / `removeEntry`, `loading` / `error` context fields, daisyUI, `dev` branch + protection guidance.

## Success criteria

- All FR001–FR015 demoable
- Trillo checklist items for Context, Storage, form, list, modal edit/delete completed
- Empty → add → persist → reload → view → edit → delete works end-to-end
- Duplicate date and empty-field validation behave as specified
- User can follow guided steps for every remote GitHub action
