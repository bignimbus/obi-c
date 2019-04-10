import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Person,
  signUserOut,
  loadUserData,
  isUserSignedIn,
  isSignInPending,
  redirectToSignIn,
  handlePendingSignIn,
} from 'blockstack';

const BlockstackContext = createContext();

export const PENDING = 'pending';
export const LOADING = 'loading';
export const AUTHENTICATED = 'authenticated';

export const BlockstackContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(PENDING);

  const signIn = () => {
    redirectToSignIn();
  };

  const signOut = () => {
    signUserOut(window.location.origin);
  }

  const verifyAuthStatus = async () => {
    if (isUserSignedIn()) {
      const { profile } = loadUserData();
      setUser(new Person(profile));
      setAuthState(AUTHENTICATED);
    } else if (isSignInPending()) {
      try {
        setAuthState(LOADING);
        const { profile } = await handlePendingSignIn();
        setUser(new Person(profile));
        setAuthState(AUTHENTICATED);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  useEffect(() => {
    if (user) return;
    verifyAuthStatus();
  });

  return (
    <BlockstackContext.Provider
      value={{
        user,
        signIn,
        signOut,
        authState,
      }}
    >
      { children }
    </BlockstackContext.Provider>
  );
};

BlockstackContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlockstackContext;
