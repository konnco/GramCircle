import bgImage from '../../assets/brand/yellowcirclesgram.svg'
import hamBurger from '../../assets/brand/menu.png'
import { campaigns } from '../../utils/campaigns'     //dummy campaigns array
import React, { useState, useEffect } from 'react'    
import Drawer from '../../components/drawer'
import LoginPopUp from '../../components/loginPopUp'
import { useNavigate } from 'react-router'
import { supabase, getRememberMeSession } from '../../../supabase.js'
import CampaignDetailsPopup from '../../components/campaignmanagerPopup'

const CampaignManagerPage = () => {
    const navigateTo = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false);
    const isLoggedIn = true           //This is the dummy loggedIn state which dinotes is the user logged in
    const [logIn, setLogIn] = useState(false)
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const handleCampaignClick = (campaign) => {
      setSelectedCampaign(campaign);
    };
  
    const handleClosePopup = () => {
      setSelectedCampaign(null);
    };


    useEffect(() => {
        const checkUserAuthentication = async () => {
          try {
            const { data, error } = await supabase.auth.getSession();
            console.log(data)
    
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
            supabase.auth.setSession(storedSession);
            setIsSignedIn(true);
          } catch (error) {
            console.error('Error restoring session:', error);
          }
        }

        const fetchCampaigns = async () => {
            try {
            const { data: { user } } = await supabase.auth.getUser()
            const compare = user
              const { data, error } = await supabase.from('campaigns').select('*').eq('brand_user_id', compare.id);
              if (data) {
                setCampaigns(data);
              } else {
                console.error('Error fetching campaigns:', error);
              }
            } catch (error) {
              console.error('Error fetching campaigns:', error);
            }
          };
      
          // Call the function to fetch campaigns
          fetchCampaigns();

      }, []);

    const bg = {
        backgroundImage: `url(${bgImage})`
    }

    const handleMenuState = (n) => {
        setIsOpen(n)
    }

    const handleLogInState = (n) => {
        setLogIn(n)
    }

    return (
        <div className="w-full h-full relative">
            {/* drawer-component */}
            <Drawer isOpen={isOpen} onChangeState={handleMenuState} />
            {/* login-pop-up component */}
            <LoginPopUp isLogin={logIn} onChangeState={handleLogInState} />

            <div className={isOpen || !logIn ? "bg-black/70 h-[100vh]" : ""}>
                <div className="bg-center bg-cover bg-no-repeat flex flex-col gap-2 md:py-5 py-4 md:px-6 px-3 pb-6" style={bg}>
                    <img src={hamBurger} alt="hamburger" className="md:w-5 md:h-5 w-4 h-4 cursor-pointer" onClick={() => setIsOpen(true)} />
                    <h3 className="text-white md:text-[3.1rem] text-[1.6rem] font-bold ml-5">Campaign Manager</h3>
                </div>
                <div className="w-full md:px-16 px-5">
                    <div className="flex justify-between py-10">
                        <h4 className="md:text-[2.5rem] text-[1.3rem] font-bold self-start">My Campaigns</h4>
                        <button className="bg-[#10163F] text-[#fff] md:text-[1rem] text-[0.9rem] md:px-4 px-2 md:py-4 py-3 rounded-lg self-end md:mt-6 mt-10" onClick={() => {isLoggedIn ? navigateTo('/brand/create-campaign') : setLogIn(false)}}>Create Campaign</button>
                    </div>
                    <div className= "px-4">
                    <table className="mt-2 w-full">
                            <thead>
                              <tr className="border-b-2 border-[#B5B5B5]">
                                <th className="w-1/4 py-2 text-lg">Name</th>
                                <th className="w-1/4 py-2 text-lg">Objective</th>
                                <th className="w-1/4 py-2 text-lg">Category</th>
                                <th className="w-1/4 py-2 text-lg">Live Date</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                            {campaigns.map((campaign) => (
                              <tr
                                key={campaign.id}
                                className="border-b-2 border-[#B5B5B5]"
                              >
                                <td className="w-1/4 py-2 text-lg">{campaign.chanel}</td>
                                <td className="w-1/4 py-2 text-lg">{campaign.chanel_asset}</td>
                                <td className="w-1/4 py-2 text-lg">{campaign.details}</td>
                                <td className="w-1/4 py-2 text-lg">{campaign.depends}</td>
                                <td className="w-1/4 py-3">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                                    onClick={() => handleCampaignClick(campaign)}
                                  >
                                    View Details
                    </button>
                  </td>
                </tr>
              ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedCampaign && (
        <CampaignDetailsPopup campaign={selectedCampaign} onClose={handleClosePopup} />
      )}
        </div>
    );
}

export default CampaignManagerPage;