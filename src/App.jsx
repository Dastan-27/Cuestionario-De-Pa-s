import { useState, useEffect } from 'react'
import { getAllCountries, getCountryByName, getCountryByCode } from './services/countryService'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar todos los países al montar el componente
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllCountries()
        setCountries(data)
      } catch (err) {
        setError(err.message)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Buscar país por nombre
  const handleSearchByName = async (countryName) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCountryByName(countryName)
      setCountries(data)
    } catch (err) {
      setError(`País no encontrado: ${err.message}`)
      setCountries([])
    } finally {
      setLoading(false)
    }
  }

  // Buscar país por código
  const handleSearchByCode = async (countryCode) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCountryByCode(countryCode)
      setCountries([data])
    } catch (err) {
      setError(`Código no encontrado: ${err.message}`)
      setCountries([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>🌍 Cuestionario de Países</h1>
      
      <div className="search-section">
        <button onClick={() => handleSearchByCode('CO')}>Buscar Colombia</button>
        <button onClick={() => handleSearchByCode('PE')}>Buscar Perú</button>
        <button onClick={() => handleSearchByName('spain')}>Buscar España</button>
        <button onClick={() => getAllCountries().then(data => setCountries(data))}>Ver Todos</button>
      </div>

      {error && <p className="error">Error: {error}</p>}
      {loading && <p className="loading">Cargando...</p>}

      <div className="countries-grid">
        {countries.map((country) => (
          <div key={country.name?.common} className="country-card">
            <h3>{country.name?.common}</h3>
            {country.flags?.png && <img src={country.flags.png} alt={country.name?.common} />}
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Región:</strong> {country.region || 'N/A'}</p>
            <p><strong>Población:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
            <p><strong>Monedas:</strong> {Object.keys(country.currencies || {}).join(', ') || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
