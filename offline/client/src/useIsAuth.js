import { useState, useEffect } from 'react';
import axios from 'axios';

const useIsAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('authToken');
      console.log('Retrieved Token:', token);
      
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/check', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Response from /check:', response.data);
          setAuthState({
            isAuthenticated: true,
            isAdmin: response.data.isAdmin,
          });
        } catch (error) {
          console.error('Error during /check request:', error);
          setAuthState({
            isAuthenticated: false,
            isAdmin: false,
          });
        }
      } else {
        console.log('No token found in sessionStorage');
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
        });
      }
    };
    checkAuth();
  }, []);

  return authState;
};

export default useIsAuth;
