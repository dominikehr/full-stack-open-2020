import react from 'react'
import {useState} from 'react'
import CountryDisplay from './CountryDisplay'

// component for individual country object 
const Country = ( {country, singleCountry} ) => {
    const [show, setShow] = useState(false);
  
    const showCountryDisplay = () => {
      setShow(!show)
    } 
    //TODO check why immediate re-rendering 
    return (
      <>
      {
        singleCountry ? 
          <CountryDisplay country={country}/>
        :  
          <>
          {country.name} <button onClick={showCountryDisplay}>show</button>
          {show && <CountryDisplay country={country}/>}
          <br></br>
          </>
      }
      </>  
    )
  }

export default Country