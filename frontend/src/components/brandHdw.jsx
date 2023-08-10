import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabaseBrand } from "../../supabase";

const BrandHowDoesItWork = () => {
    const boxShadow = {
        boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.25)"
    }

    const navigateTo = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(false);
    const[showPopup, setShowPopup] = useState(false)
    const [email, setEmail] = useState('');



    

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
        <section className="bg-white md:px-11 px-4 min-h-screen font-semibold pt-10" id="howDoesItWork">
            <h2 className="md:text-7xl text-3xl text-[#F01818]">How Does It Work?</h2>
            <div className="flex md:flex-row flex-col md:gap-24 gap-16 mt-12">
                <div className="border border-solid border-black md:w-[45%] px-5 py-3 rounded-lg" style={boxShadow}>
                    <h4 className="text-[#F01818] md:text-3xl text-xl font-semibold">Talk of the Town</h4>
                    <p className="md:text-lg text-base text-black italic font-medium md:mt-1">Campaigns Open for Everyone:</p>
                    <div className="text-black font-normal flex flex-col gap-5 mt-9">
                        <p className="flex gap-2"><span>✅</span>Select Campaign Goals</p>
                        <p className="flex gap-2"><span>✅</span>Specify Your Asks</p>
                        <p className="flex gap-2"><span>✅</span>Share Your Deals</p>
                        <p className="flex gap-2"><span>✅</span>Publish & Go Viral</p>
                    </div>
                    <div className="mt-12">
                        <p className="text-[#F01818] text-xl font-normal">Get Started</p>
                        <div className="flex mt-5">
                            <input
                                type="email"
                                placeholder="Drop Your Email"
                                className="border font-normal px-2 md:w-2/5 w-2/3 text-black"
                                value={email} onChange={handleEmailChange}
                            />
                            <button className="bg-[#F01818] text-white px-2" onClick={handleSubmit} >SUBMIT</button>
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
                        <p className="text-sm text-black font-normal mt-2 pb-16">Already Registered? <Link to="/brand/login"> Login</Link></p>
                    </div>
                </div>
                <div className="border border-solid border-black md:w-[45%] px-5 py-3 rounded-lg">
                    <h4 className="text-[#F01818] md:text-3xl text-xl font-semibold">Collaborate with Creators</h4>
                    <p className="md:text-lg text-base text-black italic font-medium md:mt-1">Local creators for local brands:</p>
                    <div className="text-black font-normal flex flex-col gap-7 mt-9">
                        <p className="flex gap-2"><span>✅</span>Select Campaign Goals</p>
                        <p className="flex gap-2"><span>✅</span>Specify Your Asks</p>
                        <p className="flex gap-2"><span>✅</span>Share Your Deals</p>
                        <p className="flex gap-2"><span>✅</span>Selection Criteria</p>
                        <p className="flex gap-2"><span>✅</span>Publish Campaigns</p>
                        <p className="flex gap-2"><span>✅</span>Creator Match</p>
                        <p className="flex gap-2"><span>✅</span>Go Viral</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-24 md:pb-0 pb-10">
                <div className="w-[45%] hidden md:block"></div>
                <div className="md:w-[45%] w-full flex justify-center">
                    <h3 className="text-[#F01818] text-center font-bold text-2xl mt-4">COMING SOON!</h3>
                </div>
            </div>
        </section>
    );
}

export default BrandHowDoesItWork;