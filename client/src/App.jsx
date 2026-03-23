// Top-level app shell that renders the collaborative editor.
import Editor from './Editor';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 p-4 sm:p-6">
      <section className="mx-auto flex h-[calc(100vh-2rem)] w-full max-w-6xl flex-col rounded-xl border border-slate-800 bg-slate-900/70 shadow-2xl sm:h-[calc(100vh-3rem)]">
        <header className="border-b border-slate-800 px-4 py-3 text-sm text-slate-300 sm:px-5">
          parcel collaborative editor
        </header>
        <div className="flex-1 p-4 sm:p-5">
          <Editor />
        </div>
      </section>
    </main>
  );
}

export default App;