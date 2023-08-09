import { useState, useEffect } from 'react';
import bgImage from '../../assets/brand/yellowcirclesgram.svg'
import { platformOptions, assetsOptions, itemOptions } from '../../utils/options.js'
import { useNavigate } from 'react-router'
import { supabaseBrand, getRememberMeSession } from '../../../supabase.js'

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with the actual URL of your backend API
  });

const CreateCampaignPage = () => {
    const navigateTo = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const handlePopupClose = () => {
        setShowPopup(false);
        navigateTo("/brand/campaign-manager") // Close the popup by updating the state
      };

    useEffect(() => {
        const checkUserAuthentication = async () => {
          try {
            const { data, error } = await supabaseBrand.auth.getSession();
    
    
            if (data.session != null) {
              setIsSignedIn(true);
            } else {
              setIsSignedIn(false);
              navigateTo("/brand/login");
            }
          } catch (error) {
            console.error('Error checking user authentication:', error);
            setIsSignedIn(false);
            navigateTo("/brand/login");
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
      const [formData, setFormData] = useState({
        chanel: "",
        chanelAsset: "",
        exchange: "",
        details: "", // Add the 'details' field to the formData state
        depends: "performance",
        objective: "", // Add the 'objective' field to the formData state
        description: "", // Add the 'description' field to the formData state
        campaignName: "", // Add the 'campaignName' field to the formData state
      });

    const [performance, setPerformance] = useState(true)

    const bg = {
        backgroundImage: `url(${bgImage})`
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    console.log(assetsOptions)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Assuming you have the form data available in 'formData' state
        try {
            const { data, error } = await supabaseBrand.auth.getUser();

            if (error) {
              console.error('Error getting user data:', error);
              // Handle the error, e.g., show an error message to the user
              return;
            }
      
            // Extract the user data (including the token) from the response
            const user = data;

            const session = await supabaseBrand.auth.getSession();
            console.log()
            if (!session.data.session.access_token) {
                console.error('User not authenticated');
                return;
            }

            console.log(user)

            

          // Set the authentication token or session information in the request headers
          api.defaults.headers.common['Authorization'] = `Bearer ${session.data.session.access_token}`
      
          // Send the form data to the backend API
          const postData = formData
          formData["user"] = user 
          const response = await api.post('/create-campaign', postData);
    
          if (response.data.success) {
            // Campaign creation successful, handle success as needed
            console.log('Campaign created successfully');
            setShowPopup(true);
            // Perform any additional actions after successful campaign creation if required
          } else {
            // Campaign creation failed, handle error as needed
            console.error('Failed to create the campaign');
            // Perform any error handling logic if required
          }
        } catch (error) {
          // Handle any unexpected errors from the backend API
          console.error('Error creating campaign:', error);
          // Perform any error handling logic if required
        }
      };
    
      return (
        <div>
          <div className="bg-center bg-cover bg-no-repeat flex flex-col gap-2 md:py-5 py-4 md:px-7 px-0 pb-6" style={bg}>
            <h3 className="text-white md:text-5xl text-2xl font-bold ml-5">Campaign Manager</h3>
          </div>
          <div className="w-full md:px-16 px-3 py-8">
            <h4 className="md:text-4xl text-2xl font-bold self-start">Create Campaign</h4>
            <div className="md:text-3xl text-sm font-normal flex md:gap-2 mt-3">
              <button className="text-[#10194D]">{"< Open for Everyone "}</button>/
              <button className="text-[#979FCD]">{" Collaborate with Creators >"}</button>
            </div>
            <form className="flex md:flex-row flex-col md:px-0 px-6">
            <div className="md:w-2/5 w-full flex flex-col">
              <label className="text-[#E51220] md:text-3xl text-xl font-normal md:mt-12 mt-7">Brand Ask:</label>
              <select
                name="chanel"
                className="text-[#313144] text-sm px-5 py-2 border border-[#E54C4C] md:w-4/5 w-full mt-8"
                onChange={handleChange}
              >
                {platformOptions.map(e => (
                  <option value={e} key={e}>{e}</option>
                ))}
              </select>
              <select
                name="chanelAsset"
                className="text-[#313144] text-sm px-5 py-2 border border-[#E54C4C] md:w-4/5 w-full mt-8"
                onChange={handleChange}
              >
                {assetsOptions.map(e => {
                  return <option value={e} key={e}>{e}</option>
                })}
              </select>
              <label className="text-[#E51220] md:text-3xl text-xl font-normal md:mt-12 mt-8">Objective:</label>
              <input
                type="text"
                name="objective"
                placeholder="Objective"
                className="text-[#313144] text-sm border border-[#E54C4C] md:w-4/5 w-full mt-4 py-1.5 px-2"
                onChange={handleChange}
              />
            </div>
              <div className="md:w-3/5 w-full flex flex-col md:px-10">
                <label className="text-[#E51220] md:text-3xl text-xl font-normal md:mt-12 mt-8">In Exchange For:</label>
                <div className="md:block flex items-center md:mt-8 mt-4">
                  <select
                    name="exchange"
                    className="text-[#313144] text-sm w-1/4 px-5 py-2 border border-[#E54C4C]"
                    onChange={handleChange}
                  >
                    {
                      itemOptions.map(e => (
                        <option value={e} key={e}>{e}</option>
                      ))
                    }
                  </select>
                  <input
                    type="text"
                    name="details" // Set the 'name' attribute to 'details' to match the property in formData
                    placeholder="Details"
                    className="md:w-2/5 w-full border border-[#E54C4C] py-1.5 px-2"
                    onChange={handleChange} // Add the 'onChange' event to capture the input value changes
                  />
                </div>
                
            <label className="text-[#E51220] md:text-3xl text-xl font-normal md:mt-12 mt-8">Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="text-[#313144] text-sm border border-[#E54C4C] md:w-4/5 w-full md:mt-4 mt-2 py-1.5 px-2"
              onChange={handleChange}
            />
            <label className="text-[#E51220] md:text-3xl text-xl font-normal md:mt-12 mt-8">Campaign Name:</label>
            <input
              type="text"
              name="campaignName"
              placeholder="Campaign Name"
              className="text-[#313144] text-sm border border-[#E54C4C] md:w-4/5 w-full md:mt-4 mt-2 py-1.5 px-2"
              onChange={handleChange}
            />
                <p className="md:text-3xl text-xl text-[#E51220] font-medium md:mt-36 mt-10">Default Duration: <span className="text-black">30 Days</span></p>
                <button className="bg-[#10163F] text-white md:text-xl text-lg font-normal px-5 py-3 rounded-lg mt-8 w-32 md:self-start self-center" onClick={handleSubmit}>Publish</button>
                <div className="flex border w-60 md:text-xl text-lg text-white mt-5 md:self-start self-end">
                  <span className={performance ? "bg-[#10163F] py-3 px-2 rounded-lg cursor-pointer" : "text-black px-3 py-2 cursor-pointer"} name="Performance" value="Performance" onClick={() => setPerformance(true)}>Performance</span>
                  <span className={!performance ? "bg-[#10163F] py-3 px-2 rounded-lg w-full cursor-pointer" : "text-black px-3 py-2 cursor-pointer"} name="Viral%" value="Viral%" onClick={() => setPerformance(false)}>Viral%</span>
                </div>
              </div>
            </form>
            {showPopup && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
                <div className="bg-white p-5 rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    Campaign created successfully!
                  </p>
                  <button
                    className="mt-3 bg-[#10163F] text-white px-4 py-2 rounded" // Modify the popup button to be blue
                    onClick={handlePopupClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

export default CreateCampaignPage;