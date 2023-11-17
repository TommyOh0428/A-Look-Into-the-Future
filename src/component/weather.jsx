import React, { useState, useEffect } from 'react'; // Import hooks

const Weather = () => {
  const [wthrData, setData] = useState(null); // Weather data state
  const city = 'Vancouver'; // Setting Vancouver as the default city



  //WE NEED A SINGLE API KEY, NOT SURE IF CREATED YET, BUT IF DONE PLEASE REPLACE 
  const API_KEY = 'PUT_KEY_HERE'; // Replace with your API key
  const BASE_URL = 'URL_PUT_HERE';//Need to set as well

  useEffect(() => {
    const fetchWeatherData = async () => { // Fetch weather data function
      try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`); // Get weather data from OpenWeatherMap API
        if (response.ok) {
          const data = await response.json(); 
          setData(data);
        } else {
          // Handle error
          console.error('Could not retreive weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData(); // Fetch weather data for Vancouver directly on component mount
  }, []);

  return (
    <div className="weather">
      <h2>{wthrData?.name}</h2>
      {wthrData && (
        <div>
          <p>Temperature: {wthrData.main.temp}°C</p>
          <p>Weather: {wthrData.weather[0].main}</p>
          {/* You can display additional weather data here */}
        </div>
      )}
    </div>
  );
};

export default Wthr;
