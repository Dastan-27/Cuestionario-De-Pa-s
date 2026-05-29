import Quiz from './components/Quiz'
import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-left">
          <span className="dev-tag">&lt;/&gt; devChallenges.io</span>
        </div>
        <div className="header-center">
          <h1><span className="text-orange">Country</span> Quizz</h1>
        </div>
        <div className="header-right">
          <p className="role">Frontend developer</p>
          <p className="tech">HTML . CSS . JS .API</p>
        </div>
      </header>
      
      <main className="app-main">
        <Quiz />
      </main>
    </div>
  )
}

export default App
