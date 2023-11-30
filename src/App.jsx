import './App.css';
import WeatherAppWrapper from './component/weatherComponent/weather';
import Calendar from './component/calendarComponent/calendar';
import InputField from './component/calendarComponent/input_field';
import { GoogleAuth } from './component/googleAuth';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient( 
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
  );

function App() {

  return (
    <SessionContextProvider supabaseClient={supabase}>
    <div className="App">
      
      <GoogleAuth/>
      
      <Calendar/>

      <InputField/>
      
      <WeatherAppWrapper />
    </div>
    </SessionContextProvider>
  );
}
 
export default App;