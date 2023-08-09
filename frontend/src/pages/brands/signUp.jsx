import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Accounts from "../../components/accounts";
import yellowCirlce1 from "../../assets/brand/yellow1.png";
import yellowCirlce2 from "../../assets/brand/yellow2.png";
import { supabase } from '../../../supabase.js'



const SignUpPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigateTo = useNavigate();
  const { emailCheck } = useParams();


  const [accountForm, setAccountForm] = useState(false);
  const [accountsNumber, setAccountsNumber] = useState([1]);

  // State variables for SignUpPage form fields
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [billingAddressLine1, setBillingAddressLine1] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const[socialMediaPlatform, setSocialMediaPlatform] = useState("")
  const[socialMediaName, setSocialMediaName] = useState("")

  const [showPopup, setShowPopup] = useState(false);

  const handleSocialMediaChange = (value) => {
    // Handle changes in the social media platform here
    console.log("Social Media Platform changed:", value);
    setSocialMediaPlatform(value);
  };

  const handleSocialMediaNameChange = (value) => {
    // Handle changes in the social media account name here
    console.log("Social Media Name changed:", value);
    setSocialMediaName(value);
  };

  const handleAccountButtonClick = () => {
    setAccountForm(true);
  };

  const handleBusinessButtonClick = () => {
    setAccountForm(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigateTo("/brand")
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }


    try {
      // Example: Sign up using email/password
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: confirmPassword,
        options: {
          data: {
            businessName: businessName,
            billingAddressLine1: billingAddressLine1,
            billingAddressLine2: billingAddressLine2,
            socialMediaPlatform: socialMediaPlatform,
            socialMediaName: socialMediaName,
          },
        },
      });

      window.alert(data.user.identities.length)

      if (data.user && data.user.identities && data.user.identities.length === 0){
        window.alert("User has already signed up!")
      }
  
      if (data) {
        // User has been successfully registered
        console.log("User registered:", email);
        console.log(data);
  
        // Show the popup
        setShowPopup(true);
      }
    } catch (error) {
      if (error) {
        // Handle error1 using alert
        window.alert("Error signing up: " + error.message);
      } else {
        // Handle other errors
        console.error("Error signing up:", error.message);
      }
    }
  };
  const { token } = useParams();


  useEffect(() => {

    const fetchEmailFromToken = async () => {
      try {
        const response = await fetch(`https://gramcircle.onrender.com/signUp?token=${token}`);
        const data = await response.json();
        if (!data) {
          navigateTo("/brand")
        }
        if (data.success) {
          setEmail(data.email);
        } else {
          // Handle invalid token or error case
          console.error("Error fetching email from token:", data.message);
        }
      } catch (error) {
        console.error("Error fetching email from token:", error);
      }
    };


    fetchEmailFromToken();
  }, [token]);

    return (
        <div className="bg-[#10194D] w-full relative md:px-14 px-3 md:py-8 py-4 min-h-screen">
            <h3 className="text-[#F7E135] md:text-6xl text-3xl font-normal">Create Profile</h3>
            <div className="bg-black/10 backdrop-blur-xl md:px-5 px-3 md:py-5 py-3 pb-10 md:mt-8 mt-5 rounded-lg border relative z-40">
                <div className="flex gap-2 text-white md:text-4xl text-2xl font-normal">
                    <button
                        className={!accountForm ? "text-[#35EAA9]" : "text-[#35EAA9]/50"}
                        onClick={handleBusinessButtonClick}
                    >
                        Business
                    </button>
                    <p>|</p>
                    <button
                        className={accountForm ? "text-[#35EAA9]" : "text-[#35EAA9]/50"}
                        onClick={handleAccountButtonClick}
                    >
                        Account
                    </button>
                </div>
                <form className="md:text-2xl text-lg text-white font-normal flex flex-col gap-4 mt-4">
                    <div className={!accountForm ? "flex md:gap-2 gap-4 flex-col" : "hidden"}>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="businessName"
                            >
                                Bussiness Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
                                placeholder="Business Name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="email"
                            >
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Allow user to edit email if needed
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                            >
                                Set Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="confirmPassword"
                            >
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="billingAddress"
                            >
                                Billing Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="billingAddressLine1"
                                className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
                                placeholder="Line 1"
                                value={billingAddressLine1}
                                onChange={(e) => setBillingAddressLine1(e.target.value)}
                            />
                            <input
                                type="text"
                                name="businessAddressLine2"
                                className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg mt-2"
                                placeholder="Line 2"
                                value={billingAddressLine2}
                                onChange={(e) => setBillingAddressLine2(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={accountForm ? "flex flex-col md:w-4/5 gap-4" : "hidden"}>
                        {accountsNumber.map((_, index) => (
                            <Accounts key={index} 
                            onSocialMediaChange={handleSocialMediaChange}
                            onSocialMediaNameChange={handleSocialMediaNameChange}
                            />
                            
                        ))}

                        <span
                            className="bg-[#4FBAB4] text-base px-2 py-2 rounded-lg self-end cursor-pointer"
                            onClick={() => setAccountsNumber((prev) => [...prev, 1])}
                        >
                            Add More +
                        </span>
                    </div>
                </form>
            </div>
            <div className={accountForm ? "block mt-14 mr-2" : "hidden"}>
                <p className="text-white font-normal text-xs">Terms & Conditions</p>
                <button
                    type="submit"
                    className="bg-[#E51220] text-white text-base px-3 py-2 rounded-"
                    onClick={handleSignUp}
                >
                    Submit
                </button>
            </div>

            {showPopup && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                <div className="bg-white p-5 rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                   Please check your mailbox to verify your account!
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
            <>
                <img src={yellowCirlce1} alt="yellow-circle" className="absolute md:w-52 w-36 top-6 md:right-32 right-1" />
                <img src={yellowCirlce2} alt="yellow-circle" className="z-0 absolute md:w-40 w-28 md:right-96 right-32 md:bottom-1 bottom-32" />
            </>
        </div>
    );
}

export default SignUpPage;