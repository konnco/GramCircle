import { Link } from "react-router-dom";
import yellowCirlce1 from "../../assets/brand/yellow1.png"
import yellowCirlce2 from "../../assets/brand/yellow2.png"
import { supabase } from "../../../supabase-creator"; // Import the supabase client
import gramCircleLogo from "../../assets/homepage/gramcircleLogo.png";
import { useState } from "react";

const ResetPasswordPage2 = () => {
    const [email, setEmail] = useState(""); // State to store the entered email
    const [isResetRequested, setIsResetRequested] = useState(false); // State to track if the password reset request is successful
  
  
    const handleResetPassword = async (e) => {
      e.preventDefault()

      try {
        const link = "http://localhost:5173/creator/update-password/"
        // Call the resetPasswordForEmail function from supabase auth API
        await supabase.auth.resetPasswordForEmail(email, {

            redirectTo: link,
          });
        // Set the isResetRequested state to true to show a success message
        setIsResetRequested(true);
      } catch (error) {
        console.error("Error sending password reset email:", error);
      }
    };
  
    return (
        <div>
        <div className="hidden md:flex items-center justify-between md:pt-[1.69%] pt-[2.55rem] md:px-8 pr-[1.9%] md:pb-[1.69%] pb-[1.69%] pl-[1.56%]" style={{backgroundColor:'#10194D', color:'white'}}> 
          <img src={gramCircleLogo} alt="Gram Circle (logo)" className="md:w-[6rem] w-[4rem]" />
            <div className="flex items-center justify-center md:gap-[2.35rem] gap-2" >
            <button className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]">Participate</button>
            <button className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]">Redeem</button>
            <Link className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]" to="/creator/login">Sign In</Link>
        </div>
        </div>
       
        <div className="w-full min-h-screen md:flex bg-[#10194D] md:px-8 px-0 md:py-10 relative">
        <div className="w-3/5 md:flex items-center relative hidden">
          <h2 className="text-[#F7E135] text-8xl mb-20">Reset Password</h2>
        </div>
        <div className="md:w-2/5 w-full md:flex justify-center md:py-4 md:px-5 px-0">
          <div className="bg-black/20 backdrop-blur-xl md:w-4/5 w-full text-white md:px-8 px-5 md:pt-0 pt-20 md:border border-0 md:rounded-xl z-30 relative">
            {isResetRequested ? (
              <div className="text-center">
                <h4 className="text-3xl md:mt-20">Password Reset Email Sent</h4>
                <p className="text-sm mt-5">Please check your email to reset your password.</p>
              </div>
            ) : (
              <>
                <h4 className="text-3xl md:mt-20">Forgot Password ?</h4>
                <form className="flex flex-col gap-4 mt-5" onSubmit={handleResetPassword}>
                  <label htmlFor="email" className="text-sm">
                    Please enter your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email} // Bind the input value to the email state
                    onChange={(e) => setEmail(e.target.value)} // Update the email state when the input changes
                    className="w-full bg-inherit border px-3 py-2 rounded-lg"
                  />
                  <button type="submit" className="bg-[#c51c1c] text-xl py-2 rounded-xl">
                    Reset Password
                  </button>
                </form>
              </>
            )}
            <div className="flex text-sm justify-evenly md:mt-2 mt-4 md:pb-0 pb-32">
              <Link to="/">Terms & Conditions</Link>
              <Link to="/">Support</Link>
              <Link to="/">Customer Care</Link>
            </div>
          </div>
        </div>
        <div>
          <img
            src={yellowCirlce1}
            alt="circle1"
            className="absolute md:right-[32%] right-64 md:w-40 w-44 md:top-3 -top-2 z-0"
          />
          <img src={yellowCirlce2} alt="circle2" className="absolute z-0 md:w-32 md:right-10 md:bottom-3 right-0 bottom-0" />
        </div>
      </div>
    </div>
    );
}

export default ResetPasswordPage2;