import { useState } from "react";

const Accounts = ({ onSocialMediaChange, onSocialMediaNameChange }) => {
  const [socialMediaPlatform, setSocialMediaPlatform] = useState("");
  const [socialMediaAccount, setSocialMediaAccount] = useState("");

  const handleSocialMediaChange = (event) => {
    const value = event.target.value;
    setSocialMediaPlatform(value);
    onSocialMediaChange(value); // Pass the value to the parent component
  };

  const handleSocialMediaNameChange = (event) => {
    const value = event.target.value;
    setSocialMediaAccount(value);
    onSocialMediaNameChange(value); // Pass the value to the parent component
  };

  return (
    <div className="flex flex-col md:gap-2 gap-4 text-lg md:text-2xl w-full">
      <div className="flex flex-col gap-1">
        <label htmlFor="socialMediaPlatform">
          Choose Social Media Platform <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="socialMediaPlatform"
          className="w-full bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
          placeholder="Social media name"
          value={socialMediaPlatform}
          onChange={handleSocialMediaChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="socialMediaAccount">
          Social Media Account Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="socialMediaAccount"
          className="w-full bg-inherit border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
          placeholder="Account User Name"
          value={socialMediaAccount}
          onChange={handleSocialMediaNameChange}
        />
      </div>
    </div>
  );
};

export default Accounts;

