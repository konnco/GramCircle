import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabase-creator";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import yellowCirlce1 from "../../assets/brand/yellow1.png";
import yellowCirlce2 from "../../assets/brand/yellow2.png";
import gramCircleLogo from "../../assets/homepage/gramcircleLogo.png";

const UpdatePasswordCreator = () => {
  const navigateTo = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false); // Track password update status
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Control the success popup

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      await supabase.auth.updateUser({
        password: password,
      });
      setErrorMessage(""); // Clear error message if there was any
      setPasswordUpdated(true); // Set password update status to true
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Error updating password. Please try again.");
    }
  };

  useEffect(() => {
    if (passwordUpdated) {
      // If password is updated, show success popup and redirect after a delay
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        // Redirect user to the homepage after password reset and log them out
        navigateTo("/brand"); // Replace with your homepage route
      }, 3000); // Redirect after 3 seconds (adjust as needed)
    }
  }, [passwordUpdated]);

  return (
    <div className="w-full min-h-screen bg-[#10194D] flex justify-center items-center">
    
      <div className="bg-black/20 backdrop-blur-xl p-6 rounded-lg text-white text-center md:w-2/3 w-full">
      <img src={gramCircleLogo} alt="Gram Circle (logo)" className="md:w-[6rem] w-[4rem]" />
        <h2 className="text-3xl md:text-6xl font-normal mb-4">Update Password</h2>
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 mt-5">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/40 p-2 rounded-md text-white"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-black/40 p-2 rounded-md text-white"
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button type="submit" className="bg-[#c51c1c] text-xl py-2 rounded-xl">
          Update Password
        </button>
      </form>
      </div>
      <img src={yellowCirlce1} alt="yellow-circle" className="absolute md:w-52 w-36 top-6 md:right-32 right-1" />
      <img src={yellowCirlce2} alt="yellow-circle" className="z-0 absolute md:w-40 w-28 md:right-96 right-32 md:bottom-1 bottom-32" />
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-green-500 font-semibold">Password updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePasswordCreator;