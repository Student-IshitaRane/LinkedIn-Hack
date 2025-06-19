import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  // Load login state from localStorage on initial load
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedInState(true);
    }
  }, []);

  // Update both state and localStorage
  const setIsLoggedIn = (value) => {
    setIsLoggedInState(value);
    localStorage.setItem('isLoggedIn', value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

