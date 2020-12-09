import react from 'react'

const CountryInfo = ( {name, capital, population} ) => {
    return (
      <div>
        <h1>{name}</h1>
        capital: {capital} <br></br>
        population: {population} <br></br>
      </div>
    )
  }

export default CountryInfo