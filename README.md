# Personal Diary

A personal diary web app built with **React**, **Vite**, **Tailwind CSS**, and **daisyUI**. Entries are stored in the browser with `localStorage`, shown as cards on the homepage, and opened in a modal for viewing, editing, or deleting.

## Features

- Add diary entries (title, date, image URL, content)
- One entry per calendar day
- Form validation (all fields required)
- Homepage list sorted newest-first
- Entry detail modal with edit and delete
- Data persisted under the localStorage key `entries`

## Requirements

- Node.js (LTS recommended)
- npm

## Setup

```bash
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server (usually http://localhost:5173) |
| `npm run build` | Production build → output in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run Vitest unit tests |

## Local development

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (default: `http://localhost:5173`).

## Data storage

Diary entries are saved in **localStorage** under the key:

```text
entries
```

Each entry includes: `id`, `title`, `date` (`YYYY-MM-DD`), `imageURL`, and `content`.

Clearing site data for this origin will remove your diary entries.

## Git / Pull Request workflow

This project uses incremental development with Pull Requests into `main`:

1. Create a feature branch from `main`
2. Commit your changes
3. Push the branch and open a Pull Request into `main`
4. Merge the PR on GitHub

**Do not add instructors as collaborators** on the GitHub repository (FR001).

## Deploy to Render (static site)

1. Push the latest `main` branch to GitHub.
2. In [Render](https://render.com), create a **New Static Site** and connect this repository.
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy and open the live URL Render provides.

Optional: after the first successful deploy, confirm add → reload → view → edit → delete still work on the live site (data stays in each visitor’s browser localStorage).

## Project structure (high level)

```text
src/
  components/   UI (Header, forms, cards, modals)
  context/      EntriesContext + EntriesState
  storage/      localStorage helpers
  App.jsx
  main.jsx
```

## License

Private/course project unless otherwise stated by the author.
