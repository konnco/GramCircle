import blueBg from "../assets/brand/bluebackground.svg"
import brandGirl from "../assets/brand/brandgirl.svg"
import gramCircleLogo from "../assets/homepage/gramcircleLogo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabaseBrand, getRememberMeSession } from "../../supabase";
import Typewriter from "typewriter-effect";

const BrandHero = () => {
    const blueBackground = {
        backgroundImage: `url(${blueBg})`,
    }
    const navigateTo = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(false);
    const[showPopup, setShowPopup] = useState(false)
    const [email, setEmail] = useState('');

    useEffect(() => {
      const checkUserAuthentication = async () => {
        try {
          const { data, error } = await supabaseBrand.auth.getSession();
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
  




  const handleSignOut = async () => {
    try {
      const { error } = await supabaseBrand.auth.signOut();
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
        const response = await fetch('http://localhost:3000/api/send-signup-link', {
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
        <section className="bg-[#10194D]">
            <div className="hidden md:flex items-center justify-between md:pt-[1.69%] pt-[2.55rem] md:px-8 pr-[1.9%] md:pb-[1.69%] pb-[1.69%] pl-[1.56%]">
            <img src={gramCircleLogo} alt="Gram Circle (logo)" className="md:w-[6rem] w-[4rem]" />
                <div className="flex items-center justify-center md:gap-[2.35rem] gap-2">
                    <Link className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]" to="/brand/pricing">Pricing</Link>
                    <Link className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]" to="/brand/campaign-manager">Campaign Manager</Link>
                    {isSignedIn ? (
            <Link
              className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          ) : (
            <Link
              className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]"
              to="/brand/login"
            >
              Sign In
            </Link>
          )}
                </div>
            </div>
            <div className="flex w-full md:px-8 px-3 md:flex-row flex-col">
                <div className="md:w-2/5 w-full">
                    <p className="md:text-[4rem] text-[3rem] font-normal text-[#F7E135] md:w-[90%] md:mt-6 mt-2">Harness the power of <span className="italic">influence</span></p>
                    <p className="md:text-[2.9rem] text-[1.9rem] text-[#F01818] w-[70%] font-normal md:mt-6 mt-1">
                    <Typewriter

                        options={{
                            deleteSpeed: 50,
                            autoStart: true,
                            loop: true,
                            wrapperClassName: 'head_tags'
                        }}
 
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Plans Starting At")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("$188 only")
                        .pauseFor(1000)
                        .start();
                }}
            /></p>
                    <p className="font-normal md:text-[2.1rem] text-[1.3rem] text-[#F01818] md:mt-10 mt-6">Get Started</p>
                    <div className="md:mt-4 mt-2 flex justify-start items-center">
                        <input type="email" name="email" className="bg-inherit border md:text-[1.2rem] text-[0.9rem] text-white md:pl-2.5 pl-2 py-1 md:w-3/5 w-[70%]" placeholder="Drop your email"  value={email} onChange={handleEmailChange} />
                        <button type="submit" className="bg-[#F01818] md:text-[1.2rem] text-[0.9rem] px-2 py-1 hover:text-[#F01818] hover:bg-white" onClick={handleSubmit}>Submit</button>
                    </div>
                    <p className="text-[0.8rem] font-normal mt-2">Already Registered? <Link to="/brand/login">Login</Link></p>
                </div>
                <div className="md:w-3/5 w-full flex justify-center items-center md:pr-10 pr-5 md:mt-0 mt-3">
                    <div className="bg-center bg-no-repeat bg-contain flex justify-center md:pl-20 pl-16 md:w-[82%] w-full mt-8" style={blueBackground}>
                        <img src={brandGirl} alt="brandgirl" />
                    </div>
                </div>
                {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-5 rounded-lg text-center">
            <p className="text-sm text-gray-500">
              Your sign-up link has been sent to your email!<br />
              Note: Please check your "Spam" folder if it is not in your inbox.
            </p>
            <button
              className="mt-3 bg-[#F01818] text-white px-4 py-2 rounded"
              onClick={handlePopupClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
            </div>
        </section>
    );
}

export default BrandHero;