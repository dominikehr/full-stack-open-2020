import react from 'react'
import CountryInfo from './CountryInfo'
import Languages from './Languages'
import Flag from './Flag'
import Weather from './Weather'

const CountryDisplay = ({ country }) => {
    debugger
    console.log(country, 'shown');
    return (
      <>
        <CountryInfo name={country.name} capital={country.capital} population={country.population}/>
        <h2>languages</h2>
        <Languages languages={country.languages}/>
        <Flag flag={country.flag} />
        <Weather capital={country.capital}/>
      </>
    )
  }

export default CountryDisplay