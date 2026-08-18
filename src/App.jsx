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
