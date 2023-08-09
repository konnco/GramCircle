import blueBg from "../../assets/brand/bluebackground.svg";
import brandGirl from "../../assets/brand/brandgirl.svg";
import gramCircleLogo from "../../assets/homepage/gramcircleLogo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BrandAbout from "../../components/brandAbout";
import BrandFaq from "../../components/brandFaq";
import BrandHowDoesItWork from "../../components/brandHdw";
import BrandLast from "../../components/brandLast";
import BrandHero from "../../components/brandHero";
import AuthWrapper from "../../AuthWrapper";
import { supabase, getRememberMeSession } from '../../../supabase.js'



const BrandHomePage = () => {

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log(data)

        if (data.session != null) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        setIsSignedIn(false);
      }
    };

    // Call the function to check user authentication
    checkUserAuthentication();

    // Check if there's a stored session and restore it if the user wants to be remembered
    const storedSession = getRememberMeSession();
    if (storedSession) {
      try {
        supabase.auth.setSession(storedSession);
        setIsSignedIn(true);
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }
  }, []);

  const navigateTo = useNavigate()
  const blueBackground = {
    backgroundImage: `url(${blueBg})`,
  };

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const[showPopup, setShowPopup] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);

  

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error('Error signing out:', error);
      }

      // Successfully signed out, navigate to login page
      navigateTo("/brand/login");
    } catch (error) {
      console.error(error);
      // Handle error here if needed
    }
  };

 


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };



  const handleSubmit = async () => {
    if (email) {
      try {
        const response = await fetch('https://gramcircle.onrender.com/api/send-signup-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          // Handle non-OK response (e.g., 404 or 500 errors)
          console.error('Error:', response.statusText);
          throw new Error('Network response was not ok');
        }

        // Check if the response contains JSON data
        const data = await response.json();

        // Assuming the response contains the necessary information
        // for handling success or failure
        console.log(data);

        // Show the success popup
        setShowPopup(true);
      } catch (error) {
        // Handle errors and display a generic error message
        console.error('Error sending the sign-up link:', error.message);
      }
    }
  };



  return (
    <div className="text-[#fff] bg-[#10194D]">
        <BrandHero />
        <BrandAbout />
        <BrandFaq />
        <BrandHowDoesItWork />
        <BrandLast />
    </div>
);
};

export default BrandHomePage;
