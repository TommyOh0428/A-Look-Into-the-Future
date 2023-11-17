// handling.js
import { jwtDecode as jwt_decode } from 'jwt-decode';

export function handleCallbackResponse(response, setUser) {
  console.log("Encoded JWT ID token: " + response.credential);
  var userObject = jwt_decode(response.credential);
  console.log(userObject);
  setUser(userObject);
  document.getElementById("signInDiv").hidden = true;
}

export function handleSignOut(event, setUser) {
  event.preventDefault();
  setUser({});
  document.getElementById("signInDiv").hidden = false;
}