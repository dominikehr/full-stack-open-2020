import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Countries from './components/Countries'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [ countries, setCountries ] = useState([])
  // TODO check solution to see how to retain original list of all countries without making repeated API calls
  // or helper variable like this
  const [ countryBuffer, setCountryBuffer ] = useState([])
  // fetch initial data from json server
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setCountryBuffer(response.data)
      })
  }, [])
  
  const handleQueryChange = (e) => {
    const filteredCountries = countryBuffer.filter(country => 
      country.name.toLowerCase().includes(e.target.value.toLowerCase()));
    console.log(filteredCountries);
    setNewFilter(e.target.value)
    setCountries(filteredCountries);
  }

  return (
   <form>
     <div>
       find countries <input value={newFilter} onChange={handleQueryChange}/>
     </div>
     <Countries countries={countries}/>
   </form>
  )
}

export default App;
 