import Quiz from './components/Quiz'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌍 Cuestionario Geográfico</h1>
        <p>Pon a prueba tus conocimientos sobre los países y sus capitales</p>
      </header>
      
      <main className="app-main">
        <Quiz />
      </main>

      <footer className="app-footer">
        <p>Desarrollado con React & RestCountries API</p>
      </footer>
    </div>
  )
}

export default App
