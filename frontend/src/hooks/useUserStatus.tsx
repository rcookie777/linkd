import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';

const useUserStatus = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateUserStatus = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({
          bypassCache: false
        });
        setIsSignedIn(true);
        localStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
        localStorage.setItem('userName', user.username);
      } catch (error) {
        setIsSignedIn(false);
        localStorage.removeItem('userToken');
      }
    };

    Hub.listen('auth', updateUserStatus);
    updateUserStatus();

    return () => Hub.listen('auth', updateUserStatus);
  }, []);

  return isSignedIn;
};

export default useUserStatus;
