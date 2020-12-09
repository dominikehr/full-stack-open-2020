import react from 'react'
import Country from './Country'

const Countries = ( {countries} ) => {
    const len = countries.length
    if(len > 10){
      return (
        <>Too many countries, specify another filter</>
      )
    } else if(len > 1 && len <= 10){
      return (
        <div>
          {countries.map(country => <Country key={country.alpha3Code} country={country} singleCountry={false}/>)}
        </div>
      )
    } else if(len === 1) {
      const country = countries[0];
      return <Country key={country.alpha3Code} country={country} singleCountry={true}/>
    } else {
      return <>nothing</> // no result found
    }
  }

export default Countries