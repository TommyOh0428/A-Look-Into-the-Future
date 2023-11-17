import './App.css';
import React from 'react';
import Calendar from './component/calendar';
import EventForm from './component/input_field';
import { useEffect, useState } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

//import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    event.preventDefault();
    setUser({});
    document.getElementById("signInDiv").hidden = false;

  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    }) ;
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline",size: "large"}
    );
    
  }, []);
 
  //if no user, show sign in button. else show logout button

  return (
    <div className="App" >
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <div className="sign-out-button">
          <div className="user-info">
            <h1>Signed in as: {user.name}</h1>
          </div>
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        </div>
      }
      <div className="calendar-container" >
        <Calendar />
      </div>
      <div className="event-form-background">
        <div className="event-form-container">
          <EventForm />
        </div>
      </div> 
    </div>
  );
    }



export default App;
