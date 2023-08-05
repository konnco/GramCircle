import { Link } from "react-router-dom";
import googleLogo from "../../assets/brand/google-logo.png"
import facebookLogo from "../../assets/brand/facebook-logo.png"
import yellowCirlce1 from "../../assets/brand/yellow1.png"
import yellowCirlce2 from "../../assets/brand/yellow2.png"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, getRememberMeSession, setRememberMeSession } from '../../../supabase.js'

const LogInPage = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
      const checkUserAuthentication = async () => {
        try {
          const { data, error } = await supabase.auth.getSession();
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
        if (storedSession && rememberMe) {
          try {
            supabase.auth.setSession(storedSession);
            setIsSignedIn(true);
            navigateTo("/brand");
          } catch (error) {
            console.error('Error restoring session:', error);
          }
        }
      }, [rememberMe]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
         })

         console.log(data)

      
          if (error) {
            console.error('Error signing in:', error);
            return;
          }

          navigateTo("/brand")
      
          // Store the session data in the browser's local storage if "Remember Me" is checked
          if (rememberMe) {
            setRememberMeSession(session);
          }
        } catch (error) {
          setError(error.message);
        }
      };

    return (
        <div className="w-full min-h-screen md:flex bg-[#10194D] md:px-8 px-0 md:py-10 relative">
            <div className="w-3/5 md:flex items-center relative hidden">
                <h2 className="text-[#F7E135] text-8xl mb-20">Welcome Back</h2>
            </div>
            <div className="md:w-2/5 w-full md:flex justify-center md:py-4 md:px-5 px-0">
                <div className="bg-black/20 backdrop-blur-xl md:w-4/5 w-full text-white md:px-8 px-5 md:pt-0 pt-20 md:border border-0 md:rounded-xl z-30 relative">
                    <h4 className="text-3xl md:mt-20">Login</h4>
                    <form className="flex flex-col gap-4 mt-5">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full bg-inherit border px-3 py-2 rounded-lg"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-inherit border px-3 py-2 rounded-lg"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label
                                htmlFor="rememberMe"
                                className="text-sm"
                            >
                                Remember Me
                            </label>
                        </div>
                        <button className="bg-[#c51c1c] text-xl py-2 rounded-xl" onClick={handleLogin}>Login</button>
                    </form>
                    <Link to ="/brand/reset-password" className="text-white text-sm text-center flex justify-center mt-2">Forgot password ?</Link>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <hr className="w-2/5 bg-[#4D4D4D]" />
                        <p className="text-[#4D4D4D]">Or</p>
                        <hr className="w-2/5 bg-[#4D4D4D]" />
                    </div>
                    <div className="flex justify-center gap-4">
                        <Link><img src={googleLogo} alt="google-logo" className="" /></Link>
                        <Link><img src={facebookLogo} alt="facebook-logo" /></Link>
                    </div>
                    <div className="flex text-sm justify-evenly md:mt-2 mt-4 md:pb-0 pb-16">
                        <Link>Terms & Conditions</Link>
                        <Link>Support</Link>
                        <Link>Customer Care</Link>
                    </div>
                </div>
            </div>
            <div>
                <img src={yellowCirlce1} alt="circle1" className="absolute md:right-[32%] right-64 md:w-40 w-44 md:top-3 -top-2 z-0" />
                <img src={yellowCirlce2} alt="circle2" className="absolute z-0 md:w-32 md:right-10 md:bottom-3 right-0 bottom-0" />
            </div>
        </div>
    );
}

export default LogInPage;
