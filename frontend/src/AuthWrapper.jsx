// AuthWrapper.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseBrand, getRememberMeSession, setRememberMeSession } from "../supabase";

const AuthWrapper = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigateTo = useNavigate();
  
  useEffect(() => {
    // Check if there's a stored session and restore it if the user wants to be remembered
    const storedSession = getRememberMeSession();
    if (storedSession) {
      try {
        supabaseBrand.auth.setSession(storedSession);
        setIsSignedIn(true);
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }
  }, []);

  return isSignedIn ? <>{children}</> : null;
};

export default AuthWrapper;