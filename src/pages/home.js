import React from 'react';
import WeatherAppWrapper from '../component/weatherComponent/weather';
import Calendar from '../component/calendarComponent/calendar';
import InputField from '../component/calendarComponent/input_field';

function Home() {
 

  return (
    
    <div className='main-page'>
      <Calendar/>
      <InputField/>
      <WeatherAppWrapper />
    </div>
  );
}

export default Home;