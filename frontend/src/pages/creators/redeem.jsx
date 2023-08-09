import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import yellowCirlce1 from "../../assets/brand/yellow1.png";
import yellowCirlce2 from "../../assets/brand/yellow2.png";
import { supabase, getRememberMeSession } from '../../../supabase-creator.js'
import { supabaseBrand } from "../../../supabase";
import { useNavigate } from "react-router";
import DealCardRedeem from "./dealCardRedeem";

const RedeemPage = () => {
  const [dealsData, setDealsData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const[currentUser, setCurrentUser] = useState(null);
  const [campaignsData, setCampaignsData] = useState([])
  const [showSubmitLinkPopup, setShowSubmitLinkPopup] = useState(false);
  const [showLinkSubmittedPopup, setShowLinkSubmittedPopup] = useState(false);
  const [submittedLink, setSubmittedLink] = useState('');
  const [linkError, setLinkError] = useState('');
  const [isRedemptionAllowed, setIsRedemptionAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [redemptionLink, setRedemptionLink] = useState('');
  const navigateTo = useNavigate();
  
  const NoActiveCampaignsText = () => (
    <div className="flex items-center justify-center h-[300px]">
      <Typography
        variant="h5"
        className="font-semibold text-white font-poppins text-[1.5625rem] py-4 px-6"
      >
        Oops, looks like there are no active redemptions!
      </Typography>
    </div>
  );

  useEffect(() => {
    // Fetch deals data from Supabase
    const fetchDealsData = async (currentUser) => {
      try {
        const { data, error } = await supabase
          .from('activeCampaigns')
          .select('*')
          .eq('user_id', currentUser.id.toString());
        console.log(data)
        if (data) {
          setDealsData(data); // Set the fetched data to the dealsData state
        } else {
          console.error('Error fetching deals data:', error);
        }
      } catch (error) {
        console.error('Error fetching deals data:', error);
      }
    };

    const checkUserAuthentication = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (data.session != null) {
          setIsSignedIn(true);
          setCurrentUser(data.session.user);
          fetchDealsData(data.session.user); // Fetch deals data for the authenticated user
        } else {
          setIsSignedIn(false);
          navigateTo('/creator/login', { replace: true });
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        setIsSignedIn(false);
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

    
  },[]);

  useEffect(() => {
    setIsLoading(true);
    if (selectedCampaign) {
      checkRedemptionStatus(selectedCampaign);
    }
  }, [selectedCampaign]);



  const fetchRedemptionStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('activeCampaigns')
        .select('redemption_link')
        .eq('id', selectedCampaign.active_campaigns_id);

      if (data && data.length > 0) {
        const campaignData = data[0];
        setRedemptionLink(campaignData.redemption_link);
      } else {
        console.error('No data found for the specified campaign ID');
        setRedemptionLink('');
      }
    } catch (error) {
      console.error('Error checking redemption status:', error);
      setRedemptionLink('');
    } finally {
      // Set isLoading to false after the status is resolved (success or error)
      setIsLoading(false);
    }
  };

  const handleRedeemButton = async () => {
    try {
      // Update the row in the supabase "activeCampaigns" table with "redeemed" set to true
      const { error } = await supabase
        .from('activeCampaigns')
        .update({ redeemed: true })
        .eq('id', selectedCampaign.active_campaigns_id);
  
      if (error) {
        console.error('Error updating the "redeemed" column:', error);
        return;
      }
  
      // Fetch the updated redemption link and show the popup
      fetchRedemptionStatus();
      setShowPopup(true);
    } catch (error) {
      console.error('Error updating the "redeemed" column:', error);
    }
  };



  const handleDealCardClick = (deal) => {
    const data = deal.campaign_data
    data["active_campaigns_id"] = deal.id
    setSelectedCampaign(data);
    fetchRedemptionStatus(); // Set the campaign_data when the deal card is clicked
  };

  const handleClosePopup = () => {
    setSelectedCampaign(null);
    setShowSubmitLinkPopup(false);
    setShowLinkSubmittedPopup(false);
  };

  const handleOpenSubmitLinkPopup = () => {
    setShowSubmitLinkPopup(true);
  };

  const handleOpenLinkSubmittedPopup = () => {
    setShowLinkSubmittedPopup(true);
  };

  const handleSubmitLink = async () => {
    // Check if the submitted link is a valid URL
    const urlRegex = /^www\..+/;
    if (!submittedLink || !urlRegex.test(submittedLink)) {
      setLinkError('Please enter a valid URL.');
      return;
    }

    console.log(submittedLink)
    console.log(selectedCampaign.active_campaigns_id)

    // Update the row in the supabase "activeCampaigns" table with the submitted link and completed status
    try {
      const { error } = await supabase
        .from('activeCampaigns')
        .update({ submitLink: submittedLink })
        .eq('id', selectedCampaign.active_campaigns_id);

      if (error) {
        console.error('Error updating the row:', error);
      }
        // Link submitted successfully
      setShowSubmitLinkPopup(false);
      setShowLinkSubmittedPopup(true);
    } catch (error) {
      console.error('Error updating the row:', error);
    }
  };

  const checkRedemptionStatus = async (campaign) => {
    try {
      const { data, error } = await supabase
        .from('activeCampaigns')
        .select('*')
        .eq('id', campaign.active_campaigns_id);

      if (data && data.length > 0) {
        const campaignData = data[0];
        setIsRedemptionAllowed(campaignData["redeemed"] === false && campaignData["approved"] === true);
      } else {
        console.error('No data found for the specified campaign ID');
        setIsRedemptionAllowed(false);
      }
    } catch (error) {
      console.error('Error checking redemption status:', error);
      setIsRedemptionAllowed(false);
    } finally {
      // Set isLoading to false after the status is resolved (success or error)
      setIsLoading(false);
    }
  };

  const renderRedeemButton = () => {
    if (isLoading) {
      return <div>Loading...</div>; // or any loading indicator you prefer
    }

    if (isRedemptionAllowed) {
      return (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleRedeemButton}
        >
          Redeem
        </button>
      );
    } else {
      return (
        <button
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
          disabled
        >
          Not Available
        </button>
      );
    }
  };

  return (
    <div className="bg-[#10194D] w-full relative md:px-14 px-3 md:py-8 py-4 min-h-screen">
      <h3 className="text-[#F7E135] md:text-6xl text-3xl font-normal">Redemptions</h3>
      <div className="flex flex-wrap justify-center gap-4 md:px-5 px-3 md:py-5 py-3 pb-10 md:mt-8 mt-5 rounded-lg border relative z-40">
      {dealsData.length > 0 ? (
          dealsData.map((deal) => (
            <DealCardRedeem
              key={deal.id}
              deal={deal}
              onClick={() => handleDealCardClick(deal)} // Pass the deal to the handler
              user={currentUser}
              participated={true}
              length = {dealsData.length} // In the RedeemPage, the deals are already participated, so always set this to true
            />
          ))
        ) : (
          <NoActiveCampaignsText />
        )}
      </div>
      {selectedCampaign && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{selectedCampaign.campaignName}</h3>
            <p className="text-gray-600 mb-4">Objective: {selectedCampaign.objective}</p>
            <p className="text-gray-600">Platform: {selectedCampaign.chanel}</p>
            <p className="text-gray-600">Campaign Type: {selectedCampaign.chanel_asset}</p>
            <p className="text-gray-600">Reward Type: {selectedCampaign.exchange}</p>
            <p className="text-gray-600">Reward:  {selectedCampaign.details}</p>
            <p className="text-gray-600">Depends: {selectedCampaign.depends}</p>
             {/* Conditionally render the Redeem button */}
             <div className="flex items-center justify-between mt-4">
              <div className="mr-2"> {/* Added margin here */}
                <button
                  className={`${
                    isRedemptionAllowed
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-500 cursor-not-allowed'
                  } text-white py-2 px-4 rounded`}
                  onClick={isRedemptionAllowed ? handleRedeemButton : undefined}
                  disabled={!isRedemptionAllowed}
                >
                  {isLoading ? 'Loading...' : isRedemptionAllowed ? 'Redeem' : 'Not Available'}
                </button>
              </div>
              
              <div className="flex-shrink-0 mx-2"> {/* Added margins here */}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleOpenSubmitLinkPopup}
                >
                  Submit Link
                </button>
              </div>

              <div className="flex-shrink-0 ml-2"> {/* Added margin here */}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg" style={{ zIndex: 100 }}>
            <h3 className="text-xl font-bold mb-2">Congrats! Here is your redemption link!</h3>
            <p className="text-gray-600 mb-4">{redemptionLink}</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => {
          setShowPopup(false);
          navigateTo('/creator/redeem', { replace: true });
        }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSubmitLinkPopup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg" style={{ zIndex: 100 }}> {/* Set a higher z-index */}
            <h3 className="text-xl font-bold mb-2">Submit Link</h3>
            <input
              type="text"
              value={submittedLink}
              onChange={(e) => setSubmittedLink(e.target.value)}
              placeholder="Enter URL"
              className="border p-2 w-full rounded"
            />
            {linkError && <p className="text-red-500">{linkError}</p>}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSubmitLink}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {showLinkSubmittedPopup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg" style={{ zIndex: 100 }}> {/* Set a higher z-index */}
            <h3 className="text-xl font-bold mb-2">Link Submitted Successfully</h3>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => {
                setShowLinkSubmittedPopup(false);
                setSelectedCampaign(null);
                setSubmittedLink('');
                setLinkError('');
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <>
        <img
          src={yellowCirlce1}
          alt="yellow-circle"
          className="w-[9rem] md:w-[14rem] absolute top-6 md:right-32 right-1"
        />
        <img
          src={yellowCirlce2}
          alt="yellow-circle"
          className="z-0 w-[7rem] md:w-[10rem] absolute right-32 md:right-[24rem] md:bottom-[1rem] bottom-32"
        />
      </>
    </div>
  );
};

export default RedeemPage;