import React, { useState, useEffect } from 'react'
import './weather.css'
import styled from 'styled-components'

// import images for weather icons
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png"
import sunrise_icon from "../Assets/sunrise.png"
import sunset_icon from "../Assets/sunset.PNG"
import high_temp_icon from "../Assets/temp-high.png"
import low_temp_icon from "../Assets/temp-low.png"


// Styled container component
const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

// Weather component function
const WeatherApp = () => {

  // useState to change the weather icon
  const [wicon, setWicon] = useState(cloud_icon); 

  // useState to store the sunrise and sunset time
  const [sunrise, setSunrise] = useState(sunrise_icon);
  const [sunset, setSunset] = useState(sunset_icon);
 
  // useState to store the high and low temperature
  const [highTemp, setHighTemp] = useState(high_temp_icon);
  const [lowTemp, setLowTemp] = useState(low_temp_icon);

  // useState to store the hourly forecast data
  const [hourlyForecast, setHourlyForecast] = useState();

  // Search function
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      element[0].value = "Vancouver";
    }
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${process.env.REACT_APP_WEATHER_API}`;
  
    // fetching data from the url 
    let response = await fetch(url);
  
    // Check for a successful response
    if (!response.ok) {
      // Handle errors, such as showing an error message
      return;
    }
  
    // get the data in json format
    let data = await response.json();

    if (data && data.sys && data.sys.sunrise && data.sys.sunset) {
      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      setSunrise(sunriseTime);
      setSunset(sunsetTime);
    }

    if (data && data.main && data.main.temp_max && data.main.temp_min) {
      setHighTemp(Math.round(data.main.temp_max) + '°C');
      setLowTemp(Math.round(data.main.temp_min) + '°C');
    }

    // get the hourly forecast data
    if(data & data.coord) {
      const hour_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=Metric&appid=${process.env.REACT_APP_WEATHER_API}`;
      const hour_response = await fetch(hour_url);
      if (!hour_response.ok) {
        // Handle errors
        return;
      }
      const hour_data = await hour_response.json();
      if (hour_data && hour_data.hourly)
      setHourlyForecast(hour_data.hourly)
    }

  
    // Check if the necessary properties exist before accessing them
    if (data && data.main && data.main.humidity && data.wind && data.wind.speed && data.main.temp && data.name && data.weather && data.weather[0] && data.weather[0].icon) {
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
  
      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = data.wind.speed + " km/h";
      temperature[0].innerHTML = Math.round(data.main.temp) + "°C";
      location[0].innerHTML = data.name;
    
      // change the weather icon
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      }
      else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      }
      else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain_icon);
      }
      else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain_icon);
      }
      else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow_icon);
      }
      else {
        setWicon(clear_icon);
      } 
    }
    
  }

  useEffect(() => {
    search();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className='container'>
    <div className="top-bar">
      <input type='text' className='cityInput' placeholder='search'/>
      <div className="search-icon" onClick={() => { search() }}>
        <img src={search_icon} alt="search icon" />
      </div>
    </div>
    <div className="weather-image">
      <img src={wicon} alt="weather icon" />
    </div>
    <div className="weather-temp">24°C</div>
    <div className="weather-location">Vancouver</div>
    <div className="data-container">
      <div className="element">
        <img src={humidity_icon} alt="" />
        <div className="data">
          <div className="humidity-percent">64%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={wind_icon} alt="" />
        <div className="data">
          <div className="wind-rate">18 km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>

    {/* Display Sunrise and Sunset times */}
    <div className="sunrise-sunset">
      <div className="weather-icons">
       <img src={sunrise_icon} alt="" />
      </div>
      <div className="sunrise">{sunrise}</div>
      <div className="weather-icons">
      <img src={sunset_icon} alt="" />
      </div>
      <div className="sunset">{sunset}</div>
      
    </div>

    {/* Display High and Low temperature */}
    <div className="high-low-temp">
      <div className="temp-icons">
        <img src={high_temp_icon} alt="" />
      </div>
      <div className="high-temp">High: {highTemp}</div>
      <div className="temp-icons">
        <img src={low_temp_icon} alt="" />
      <div className="low-temp">Low: {lowTemp}</div>
      </div>
    </div>

    {/* Hourly forecast */}
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      {hourlyForecast && hourlyForecast.map((hour, index) => (
        <div key={index} className="hourly-forecast-item">
          <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Hourly weather icon" />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </div>
  </div>
  )
}

const WeatherAppWrapper = () => {
  return (
    <Wrapper>
      <WeatherApp />
    </Wrapper>
  )
}

export default WeatherAppWrapper