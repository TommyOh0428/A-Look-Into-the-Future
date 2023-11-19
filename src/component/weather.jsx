import React, { useState, useEffect } from 'react';

const Wthr = () => {
  const [weatherData, setWeatherData] = useState(null);
  const city = 'Vancouver'; // City for weather data
  const API_KEY = 'YOUR_API_KEY'; // OpenWeatherMap API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'; // OpenWeatherMap base URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData(); // Fetch weather data on component mount
  }, [city, API_KEY, BASE_URL]);

  return (
    <div className="weather">
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default Wthr;
