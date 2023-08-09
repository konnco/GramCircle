import { useState, useEffect } from "react";
import AccountsCreator from "../../components/accountsCreator";
import yellowCirlce1 from "../../assets/brand/yellow1.png"
import yellowCirlce2 from "../../assets/brand/yellow2.png"
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import gramCircleLogo from "../../assets/homepage/gramcircleLogo.png";
import { supabase } from '../../../supabase-creator.js'

const SignUpPage2 = () => {
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


    const handleSectionButtonClick = (section) => {
        setAccountForm(section);
    };
    const [selectedCategories, setSelectedCategories] = useState([
        "Fashion",
        "Beauty",
        "Fitness",
      ]);
    const [collaborateCheck, setCollaborateCheck] = useState(true);

    const handleCollaborateCheck = (e) => {
        setCollaborateCheck(e.target.checked);
      };

    const handleCategoryClick = (category) => {
        if (selectedCategories.includes(category)) {
          setSelectedCategories((prev) => prev.filter((item) => item !== category));
        } else if (selectedCategories.length < 3) {
          setSelectedCategories((prev) => [...prev, category]);
        }
      };
    
      const handleCrossClick = (category) => {
        setSelectedCategories((prev) => prev.filter((item) => item !== category));
      }

      const handlePopupClose = () => {
        setShowPopup(false);
        navigateTo("/creator")
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
                selectedCategories: selectedCategories  
                // Add other fields you want to include in the sign-up data
              },
            },
          });
      
          if (data.user && data.user.identities && data.user.identities.length === 0){
            window.alert("User has already signed up!");
          }
      
          if (data) {
            // User has been successfully registered
            console.log("User registered:", email);
            console.log(data);
      
            // Show the popup
            setShowPopup(true);
          }
        } catch (error) {
          // Handle all errors using window.alert
          window.alert("Error signing up: " + error.message);
        }
      };
      // New onChange handlers for form inputs
  const handleBusinessNameChange = (event) => {
    setBusinessName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleBillingAddressLine1Change = (event) => {
    setBillingAddressLine1(event.target.value);
  };

  const handleBillingAddressLine2Change = (event) => {
    setBillingAddressLine2(event.target.value);
  };


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

    
  const [selectedCategoriesString, setSelectedCategoriesString] = useState("");  
        
      const { token } = useParams();

      useEffect(() => {
        // Function to fetch email from token
        const fetchEmailFromToken = async () => {
          try {
            const response = await fetch(`https://gramcircle.onrender.com/signUp?token=${token}`);
            const data = await response.json();
            if (!data) {
              navigateTo("/brand");
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
      
        // Join the selectedCategories array into a string
        const joinedCategories = selectedCategories.join(", ");
        // Update the selectedCategoriesString state variable
        setSelectedCategoriesString(joinedCategories);
      
        // Add other logic or dependencies here if needed...
      
      }, [token, selectedCategories]);

    return (
        <div>
        <div className="hidden md:flex items-center justify-between md:pt-[1.69%] pt-[2.55rem] md:px-8 pr-[1.9%] md:pb-[1.69%] pb-[1.69%] pl-[1.56%]" style={{backgroundColor:'#10194D', color:'white'}}> 
        <img src={gramCircleLogo} alt="Gram Circle (logo)" className="md:w-[6rem] w-[4rem]" />
        </div>
    
        <div className="bg-[#10194D] w-full relative md:px-14 px-3 md:py-8 py-4 min-h-screen">

        <h3 className="text-[#F7E135] md:text-6xl text-3xl font-normal">Create Profile</h3>
        <div className="bg-black/10 backdrop-blur-xl md:px-5 px-3 md:py-5 py-3 pb-10 md:mt-8 mt-5 rounded-lg border relative z-40">
            <div className="flex gap-2 text-white md:text-4xl text-2xl font-normal">
                <button
                    className={accountForm === "personal" ? "text-[#35EAA9]" : "text-[#35EAA9]/50"}
                    onClick={() => handleSectionButtonClick("personal")}
                >
                    Personal
                </button>
                <p>|</p>
                <button
                    className={accountForm === "socials" ? "text-[#35EAA9]" : "text-[#35EAA9]/50"}
                    onClick={() => handleSectionButtonClick("socials")}
                >
                    Socials
                </button>
                <p>|</p>
                <button
                    className={accountForm === "collaborate" ? "text-[#35EAA9]" : "text-[#35EAA9]/50"}
                    onClick={() => handleSectionButtonClick("collaborate")}
                >
                    Collaborate
                </button>
            </div>
            {accountForm === "personal" && (
        <form className="md:text-2xl text-lg text-white font-normal flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="businessName">Business Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="businessName"
              value={businessName}
              onChange={handleBusinessNameChange}
              className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
              placeholder="Business Name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Set Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="billingAddress">Billing Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="billingAddressLine1"
              value={billingAddressLine1}
              onChange={handleBillingAddressLine1Change}
              className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
              placeholder="Line 1"
            />
            <input
              type="text"
              name="billingAddressLine2"
              value={billingAddressLine2}
              onChange={handleBillingAddressLine2Change}
              className="md:w-4/5 bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg mt-2"
              placeholder="Line 2"
            />
          </div>
        </form>
      )}
            {accountForm === "socials" && (
                <form className="md:text-2xl text-lg text-white font-normal flex flex-col gap-4 mt-4">
                                      <div className={accountForm ? "flex flex-col md:w-4/5 gap-4" : "hidden"}>
                        {accountsNumber.map((_, index) => (
                            <AccountsCreator key={index}
                            onSocialMediaChange={handleSocialMediaChange}
                            onSocialMediaNameChange={(value) => handleSocialMediaNameChange(value, index)} />
                        ))}

                        <span
                            className="bg-[#4FBAB4] text-base px-2 py-2 rounded-lg self-end cursor-pointer"
                            onClick={() => setAccountsNumber((prev) => [...prev, 1])}
                        >
                            Add More +
                        </span>
                    </div>
                </form>
            )}
            {accountForm === "collaborate" && (
                <form className="md:text-2xl text-lg text-white font-normal flex flex-col gap-4 mt-4">
                                   <div className="flex flex-col gap-1">
              <label>Select at most 3 <span className="text-red-500">*</span></label>
              
              <div className="relative" style ={{marginBottom: 20}}>
                <input
                  type="text"
                  value={selectedCategoriesString}
                  readOnly
                  className="md:w-4/5 bg-inherit border border-red-500 px-2 py-1 rounded-lg text-white text-lg"
                  placeholder="Select Categories"
                />
                
              </div>
              
              <div className="flex flex-wrap gap-4">
                {[
                  "Fashion",
                  "Beauty",
                  "Retail",
                  "Fitness",
                  "Travel",
                  "Sustainable",
                  "Men's",
                  "Women's",
                  "Mums",
                  "Babies",
                  "Pets",
                  "Old & Gold",
                  "Vegan",
                  "Health & Nutrition",
                  "Financial Wellness",
                ].map((category) => (
                    <div
                    key={category}
                    className={`relative py-2 px-4 rounded-lg cursor-pointer text-base ${
                      selectedCategories.includes(category)
                        ? "bg-[#4FBAB4] text-white "
                        : "bg-gray-500  "
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                    {selectedCategories.includes(category) && (
                      <svg
                        className="absolute top-0 right-0 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#FFFFFF"
                        width="16"
                        height="16"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCrossClick(category);
                          }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    </div>







                ))}
              </div>
            </div>
                </form>
            )}
        </div>
        {accountForm === "collaborate" && (
         
         <label style={{marginTop: 40}} className="flex items-center gap-2 text-white font-normal text-xs">
         <input
           type="checkbox"
           checked={collaborateCheck}
           onChange={handleCollaborateCheck}
           className="form-checkbox text-white font-normal text-xs"
          
         />
                       
         I would like to collaborate with brands for exclusive events, barter, and special promotions
       </label>
     )}
        {accountForm === "collaborate" && (
         
            <div className="block mt-3 mr-2">
                <p className="text-white font-normal text-xs">Terms & Conditions</p>
                
                <button
                    style={{marginTop: 12}}
                    className="bg-[#E51220] text-white text-base px-3 py-2 rounded-"
                    onClick={handleSignUp}
                >
                    Submit
                </button>
            </div>
            
        )}
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
        <img src={yellowCirlce1} alt="yellow-circle" className="absolute md:w-52 w-36 top-6 md:right-32 right-1" />
        <img src={yellowCirlce2} alt="yellow-circle" className="z-0 absolute md:w-40 w-28 md:right-96 right-32 md:bottom-1 bottom-32" />
    </div>
    </div>
    );
}

export default SignUpPage2;
