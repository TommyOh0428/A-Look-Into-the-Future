import './App.css';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Home from './pages/home';
import Calendar from './component/calendarComponent/calendar';  
import Navbar from './pages/navbar';
import { Route, Routes, Link } from 'react-router-dom';


function App() {
  const session = useSession();
  const supabase = useSupabaseClient();


  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    
    <div className="App">
      <header className='banner'>
        <h1>A Look Into The Future</h1>
      </header>
      <div>
      {session ?
      <>
      <div className='navigation'>
          
        <h2 className='User-info'>Hey there {session.user.email}</h2>

        <button className='sign-out-button'  onClick={() => signOut()}>Sign Out</button>
        
        <Link to="/">
          <button className='back-button'>Back</button>
          </Link>
        
      </div>
          
            <Routes>
              <Route path="/" element ={<Navbar/>}/>
              <Route path="/TommyOh0428/Cmpt276-project.git" element ={<Navbar/>}/>
              <Route path="/home" element ={
              
              <Home/>
            
              }/>
    
              <Route path="/calendar" element ={
                <div className= 'main-page-no-weather'>
                    <Calendar/>
                </div>
             
              }/>  
            </Routes>
          
           
      
        </>
        :(
        <div className='PageContainer'>
          <div>
            <h2>Please sign in to continue using this application</h2>
            <Link to="/home" className='Sign-in-link'>
              <button className='SignInButton' onClick={() => googleSignIn()}>Sign In With Google</button>
            </Link>
          </div>
        </div>
        )
      }
    </div>
      
      
    </div>
    
  );
}
 
export default App;