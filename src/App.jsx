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
