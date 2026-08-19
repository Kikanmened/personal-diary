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
