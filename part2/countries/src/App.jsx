import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Filter = ({ handleFilterChange, filterString }) =>
  <form>
    find countries <input onChange={handleFilterChange} value={filterString} />
  </form>

const CountryList = ({ matchingCountries, handleCountrySelection }) => {
  if (matchingCountries.length > 10) {
    return "Too many matches, specify another filter"
  }
  else if (matchingCountries.length !== 1) {
    return (
      <div>
        {matchingCountries.map(c =>
          <div
            key={c}>{c} <button onClick={() => handleCountrySelection(c)}>show</button>
          </div>)}
      </div>
    )
  }
  return null

}

const CountryDetails = ({ selectedCountry }) => {
  if (selectedCountry === null)
    return null
  else
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <div>capital {selectedCountry.capital}</div>
        <div>area {selectedCountry.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(selectedCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={selectedCountry.flags.svg} alt={selectedCountry.flags.alt} width="192" height="120" />
      </div>
    )
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])
  const [selectedCountry, setCountry] = useState(null)
  const [filterString, setNewFilter] = useState('')


  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setAllCountries(countries.map(c => c.name.common))
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setNewFilter(newFilter)
    const newFilteredCountries = allCountries.filter(c => c.toLowerCase().includes(newFilter.toLowerCase()))
    setMatchingCountries(newFilteredCountries)
    if (newFilteredCountries.length === 1)
      getSpecificCountryDetails(newFilteredCountries[0])
    else
      setCountry(null)
  }

  const getSpecificCountryDetails = name => {
    countriesService
      .getSpecific(name)
      .then(countryDetails => {
        setCountry(countryDetails)
      })
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filterString={filterString} />
      <CountryList matchingCountries={matchingCountries} handleCountrySelection={getSpecificCountryDetails} />
      <CountryDetails selectedCountry={selectedCountry} />
    </div>
  )
}

export default App
