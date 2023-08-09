import { useState, useEffect } from "react";
import MonthlyPrices from "../../components/monthlyPrices";
import YearlyPrices from "../../components/yearlyPrices";
import google from '../../assets/homepage/google.png';
import facebook from '../../assets/homepage/Facebook.png';
import tiktok from '../../assets/homepage/tiktok.png';
import instagram from '../../assets/homepage/Instagram.png';
import { supabaseBrand, getRememberMeSession } from '../../../supabase.js'
import { useNavigate } from 'react-router'
import { loadStripe } from "@stripe/stripe-js";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import { CardElement, Elements } from "@stripe/react-stripe-js";

const PricingPage = () => {
    const navigateTo = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(false);






    useEffect(() => {
        const checkUserAuthentication = async () => {
          try {
            const { data, error } = await supabaseBrand.auth.getSession();
            console.log(data)
    
            if (data.session != null) {
              setIsSignedIn(true);
            } else {
              setIsSignedIn(false);
              navigateTo("/brand/login", {replace: true});
            }
          } catch (error) {
            console.error('Error checking user authentication:', error);
            setIsSignedIn(false);
            navigateTo("/brand/login", {replace: true});
          }
        };
    
        // Call the function to check user authentication
        checkUserAuthentication();
    
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
    const [yearly, setYearly] = useState(true)

    return (
      <div className="w-full min-h-screen bg-[#10163F] p-2 relative flex flex-col items-center justify-center">
        {/* Existing code */}
        <div className="flex justify-center mt-5">
          <div className="bg-white text-base md:text-xl text-[#000] font-normal px-4 py-2 pr-5 flex gap-4 rounded-full mt-5">
            <button className={yearly ? "px-4 py-2 bg-[#10163F] text-white rounded-full" : "px-4 py-2 bg-white text-[#10163F] rounded-full"} onClick={() => setYearly(true)}>Yearly (Save 25%)</button>
            <button className={!yearly ? "px-4 py-2 bg-[#10163F] text-white rounded-full" : "px-4 py-2 bg-white text-[#10163F] rounded-full"} onClick={() => setYearly(false)}>Monthly</button>
          </div>
        </div>
        {yearly ? <YearlyPrices /> : <MonthlyPrices />}
        <div className="hidden md:block">
          <img src={google} alt="google" className="absolute -top-2 right-56" />
          <img src={instagram} alt="instagram" className="w-16 absolute top-9 right-12" />
          <img src={facebook} alt="facebook" className="absolute w-20 top-24 right-28" />
          <img src={tiktok} alt="tiktok" className="absolute top-48 right-5" />
        </div>
  

       
      </div>
    );
}

export default PricingPage;
