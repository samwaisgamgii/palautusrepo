import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Country = ({ country, weather }) => {

  return (
    <div>
      <div>
        <h2>{country.name}</h2>
        <img src={country.flag} width="20%" height="20%" alt="Logo" />

        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </div>

      <div>
        <h2>Languages</h2>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </div>
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.temperature} Celsius</p>
        <p>Wind: {weather.wind_speed} km/h in direction {weather.wind_dir}</p>
        <p>Feelslike: {weather.feelslike} Celsius </p>
        <img src={weather.weather_icons} />
      </div>

    </div>

  )
}

const Countries = ({ countries, length, handleShow, weather }) => {
  if (length === 1 && weather.length !== 0) {
    return (
      <Country weather={weather.current} country={countries[0]}></Country>
    )
  }
  if (length > 10) {
    return (
      <p>Too many matches, please specify more</p>
    )

  } else {
    return (
      <div>
        {countries.map(country => <p key={country.name}>{country.name} <button value={country.name} onClick={handleShow}>show</button></p>)}
      </div>
    )
  }
}

const Filter = ({ newFil, handleFil }) =>
  (
    <div>
      Filter showed with: <input value={newFil} onChange={handleFil} />
    </div>
  )



const App = () => {
  const [countries, setCountries] = useState([])
  const [newFil, setFil] = useState('')
  const [weather, setWeather] = useState([])


  const handleFil = (event) => setFil(event.target.value)
  const handleShow = (event) => {
    setFil(event.target.value)
  }


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const countryFilter = countries.filter(country => country.name.toLocaleLowerCase().includes(newFil.toLocaleLowerCase()))
  let length = countryFilter.length

  useEffect(() => {

    if (length === 1) {
      const params = {
        access_key: 'c9bc432307446f40ad1e7f1f3fa2d7c5',
        query: countryFilter[0].capital
      }

      const promise = axios.get('https://api.weatherstack.com/current', { params })
      promise.then(response => {
        setWeather(response.data)
      })
    }


  }, [length])

  return (
    <div>
      <h1>Countries</h1>
      <Filter newFil={newFil} handleFil={handleFil} />
      <div>
        <Countries weather={weather} length={length} countries={countryFilter}
          handleShow={handleShow} />
      </div>

    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))