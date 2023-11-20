import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient( 
  "https://nzttrjkhhjujyqixdiuz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHRyamtoaGp1anlxaXhkaXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNjY3MzUsImV4cCI6MjAxNTg0MjczNX0.Hmy7GvbRXZOjW4gjnF20lm0yGrDM0A_-SHsoKClBE_U"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SessionContextProvider supabaseClient={supabase}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </SessionContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
