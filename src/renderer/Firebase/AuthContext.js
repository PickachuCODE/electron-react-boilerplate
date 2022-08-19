import { createContext, useContext, useEffect, useState } from 'react';
import {
  signWithGithHub,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { RazorAuth } from './firebaseConfig';
import { GetSavedValue, StoreData } from 'renderer/RazorFunctions/LocalStorage';

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  // Auth states
  const [user, setUser] = useState(false);
  const [newAccount, setNewAccount] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isFreshUser, setFreshUser] = useState(''); // Sign in for the first time

  useEffect(() => {
    setUser(AuthGetDataFormLocalStorage);

    getRedirectResult(RazorAuth)
      .then((result) => {
        setAuthLoading(true);

        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const token = credential.accessToken;
          // ...
        }
        InitUser(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  function InitUser(iUser) {
    let dataUpdate = GetSavedValue();

    if (dataUpdate.user === null) {
      dataUpdate.user = iUser;
      console.log(dataUpdate.user);
      setUser(dataUpdate.user);
      StoreData(dataUpdate);
    }
  }
  function AuthGetDataFormLocalStorage() {
    let savedUser = GetSavedValue();
    if (savedUser.newUser) {
      setFreshUser(savedUser.newUser);
    }
    return savedUser.user;
  }
  const signWithGitHub = () => {
    setAuthLoading(true);
    const provider = new GithubAuthProvider();
    signInWithRedirect(RazorAuth, provider)
      .then(() => {
        setFreshUser(true);
        setAuthLoading(true);

      })
      .catch((error) => {
        setAuthLoading(false);
        console.log('you are offline');
      });
  };

  const logOutUser = () => {
    console.log('user out');
    signOut(RazorAuth);
  };

  const authValue = {
    // registerUserWithId,
    signWithGitHub,
    logOutUser,
    user,
    authError,
    authLoading,
    isFreshUser,
    setFreshUser,
    // localUser
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

async function withGithHub() {}

export { AuthContextProvider, useAuthContext };
