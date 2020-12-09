import react from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'


const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState({});
    useEffect(() => {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}&unit=m`
        )
        .then((response) => {
          setWeatherData(response.data);
        });
    }, []);
  
    return (
      <>
        {Object.keys(weatherData).length === 0 || weatherData.error ? (
          <h2>There seems to be a technical problem. Could not fetch weather data</h2>
        ) : (
          <>
            <h2>Weather in {capital}</h2>
            <p><b>temperature:</b>{weatherData.current.temperature}° Celsius</p>
            <img src={weatherData.current.weather_icons} alt='weather-icon' width='100px' />
            <p>
              <b>Wind:</b> {weatherData.current.wind_speed}Km/hr, direction{' '}
              {weatherData.current.wind_dir}
            </p>
          </>
        )}
      </>
    );
}

export default Weather