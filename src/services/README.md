# 📚 Documentación de Servicios API

## Estructura del Proyecto

```
src/
├── services/
│   ├── api.js              # Instancia centralizada de axios
│   ├── config.js           # Configuración y constantes
│   ├── countryService.js   # Métodos para consumir la API de países
│   └── index.js            # Exportador centralizado de servicios
├── App.jsx                 # Componente principal con ejemplos
└── ...
```

## Configuración

### `config.js`
Define constantes globales:
- `API_BASE_URL` - URL base de la API de países
- `DEFAULT_FIELDS` - Campos por defecto a solicitar
- `API_TIMEOUT` - Tiempo máximo de espera para las peticiones

### `api.js`
Instancia centralizada de axios con:
- Configuración base automática
- Interceptores para manejo de errores
- Headers por defecto

## Servicios Disponibles

### `getAllCountries(fields)`
Obtiene todos los países con los campos especificados.

**Ejemplo:**
```javascript
import { getAllCountries } from './services/countryService'

const countries = await getAllCountries()
// o con campos específicos
const countries = await getAllCountries('name,capital,flags')
```

### `getCountryByName(countryName, fields)`
Obtiene un país específico por su nombre.

**Ejemplo:**
```javascript
import { getCountryByName } from './services/countryService'

const country = await getCountryByName('peru')
const country = await getCountryByName('colombia')
```

### `getCountryByCode(countryCode, fields)`
Obtiene un país por su código ISO.

**Ejemplo:**
```javascript
import { getCountryByCode } from './services/countryService'

const peru = await getCountryByCode('PE')
const colombia = await getCountryByCode('CO')
```

### `getCountriesByRegion(region, fields)`
Obtiene todos los países de una región específica.

**Ejemplo:**
```javascript
import { getCountriesByRegion } from './services/countryService'

const southAmerica = await getCountriesByRegion('South America')
const europe = await getCountriesByRegion('Europe')
```

## Campos Disponibles en la API

- `name` - Nombre del país (common y official)
- `capital` - Capital(es) del país
- `currencies` - Monedas utilizadas
- `flags` - URLs de banderas (svg y png)
- `region` - Región geográfica
- `population` - Población total
- `area` - Área en km²
- `languages` - Idiomas hablados
- `borders` - Países fronterizos
- Y muchos más...

## Manejo de Errores

Todos los servicios incluyen manejo de errores automático:

```javascript
try {
  const country = await getCountryByName('invalid-country')
} catch (error) {
  console.error('Error:', error.message)
  // Manejar el error
}
```

## Ejemplo Completo en React

```javascript
import { useState, useEffect } from 'react'
import { getAllCountries, getCountryByCode } from './services'

function CountriesList() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const data = await getAllCountries()
        setCountries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          <h3>{country.name.common}</h3>
          <p>Capital: {country.capital?.[0]}</p>
        </div>
      ))}
    </div>
  )
}

export default CountriesList
```

## Notas Importantes

- La API de restcountries es pública y gratuita
- No requiere autenticación
- Incluye caché automático en navegador
- Para mejor rendimiento, solicita solo los campos que necesitas
- Maneja siempre los errores en tus componentes
