import './App.css';
import WeatherAppWrapper from './component/weatherComponent/weather';
import Calendar from './component/calendarComponent/calendar';
import InputField from './component/calendarComponent/input_field';
import { GoogleAuth } from './component/googleAuth';

function App() {
  return (
    <div className="App">
      <GoogleAuth/>
      
      <Calendar/>

      <InputField/>
      
      <WeatherAppWrapper />
    </div>
  );
}
 
export default App;