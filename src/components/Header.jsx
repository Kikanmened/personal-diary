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
