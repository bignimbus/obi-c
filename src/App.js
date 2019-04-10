import React, {
  useState,
  useEffect,
} from 'react';
import {
  signUserOut,
  loadUserData,
  isUserSignedIn,
  isSignInPending,
  redirectToSignIn,
  handlePendingSignIn,
} from 'blockstack';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const signIn = () => {
    redirectToSignIn();
  };

  const signOut = () => {
    signUserOut(window.location.origin);
  };

  const verifyAuthStatus = async () => {
    if (isUserSignedIn()) {
      const { profile } = loadUserData();
      setUser(profile);
    } else if (isSignInPending()) {
      try {
        const { profile } = await handlePendingSignIn();
        setUser(profile);
      } catch (e) {
        console.error(e);
        alert('obi-c has some problems');
      }
    }
  };

  useEffect(() => {
    verifyAuthStatus();
  });

  return (
    <div className="App">
      <header className="App-header">
        {
          user ?
            <div role='form'>
              <button
                id='sign-out'
                className='btn'
                onClick={signOut}
              >
                Sign out
              </button>
            </div> :
            <div role='form'>
              <button
                id='sign-in'
                className='btn'
                onClick={signIn}
              >
                Sign in
              </button>
            </div>
        }
      </header>
      <section>
        <pre>
          <code>
            {
              JSON.stringify(user || {}, null, 2)
            }
          </code>
        </pre>
      </section>
    </div>
  );
};

export default App;
