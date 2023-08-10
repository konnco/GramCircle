import { useState } from "react";

const AccountsCreator = ({ onSocialMediaChange, onSocialMediaNameChange }) => {
  const [socialMediaPlatform, setSocialMediaPlatform] = useState("");
  const [socialMediaAccount, setSocialMediaAccount] = useState("");

  const handleSocialMediaChange = (event) => {
    const value = event.target.value;
    setSocialMediaPlatform(value);
    onSocialMediaChange(value); // Use the passed function directly
  };

  const handleSocialMediaNameChange = (event) => {
    const value = event.target.value;
    setSocialMediaAccount(value);
    onSocialMediaNameChange(value); // Use the passed function directly
  };

  return (
    <div className="flex flex-col md:gap-2 gap-4 text-lg md:text-2xl w-full">
      <div className="flex flex-col gap-1">
        <label htmlFor="socialMediaPlatform">
          Choose Social Media Platform <span className="text-red-500">*</span>
        </label>
        <select
          name="socialMediaPlatform"
          className="w-full bg-[#10194D] border border-[#E54C4C] px-2 py-1 rounded-lg text-white text-lg"
          placeholder="Select a social media platform"
          value={socialMediaPlatform}
          onChange={handleSocialMediaChange}
        >
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="Instagram">Instagram</option>
          <option value="TikTok">Instagram</option>
    </select>
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

export default AccountsCreator;

