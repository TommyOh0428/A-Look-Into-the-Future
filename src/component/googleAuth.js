// googleAuth.js

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export function GoogleAuth() {
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
    <div>
      {session ?
        <div className='sign-out-button'>
          <div className='user-info'>
            <h2>Hey there {session.user.email}</h2>
          </div>  
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
        :
        <div className='sign-out-button'>
          <button onClick={() => googleSignIn()}>Sign In With Google</button>
        </div>
      }
    </div>
  );
}