import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import yellowCirlce1 from "../../assets/brand/yellow1.png";
import yellowCirlce2 from "../../assets/brand/yellow2.png";
import { supabase, getRememberMeSession } from "../../../supabase-creator.js";
import { supabaseBrand } from "../../../supabase";
import { useNavigate } from "react-router";
import DealCardParticipate from "./dealCardParticipate";
import axios from 'axios';

const ParticipatePage = () => {
  const [campaignsData, setCampaignsData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const navigateTo = useNavigate();
  const [participatedCampaigns, setParticipatedCampaigns] = useState([]);
  const [showRedeemPopup, setShowRedeemPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
 
  

  const NoActiveCampaignsText = () => (
    <div className="flex items-center justify-center h-[300px]">
      <Typography variant="h5" className="font-semibold text-white font-poppins text-[1.5625rem] py-4 px-6">
        Oops, looks like there are no active campaigns!
      </Typography>
    </div>
  );

  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const { data, error } = await supabaseBrand.from("campaigns").select("*");
        if (data) {
          setCampaignsData(data);
        } else {
          console.error("Error fetching campaigns data:", error);
        }
      } catch (error) {
        console.error("Error fetching campaigns data:", error);
      }
    };

    fetchCampaignsData();

    const checkUserAuthentication = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log(data);
        setCurrentUser(data.session.user);

        if (data?.session) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
          navigateTo("/creator/login", { replace: true });
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
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
        console.error("Error restoring session:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchParticipatedCampaigns();
    }
  }, [currentUser]);


const fetchParticipatedCampaigns = async () => {
    try {
      console.log(currentUser);
      const { data, error } = await supabase
        .from("activeCampaigns")
        .select("*")
        .eq("user_id", currentUser.id);

      if (data) {
        setParticipatedCampaigns(data);
      } else {
        console.error("Error fetching participated campaigns:", error);
      }
    } catch (error) {
      console.error("Error fetching participated campaigns:", error);
    }
  };

  const api = axios.create({
    baseURL: 'https://gramcircle.onrender.com/api', // Replace with the actual URL of your backend API
  });

  const handleDealCardClick = (campaign) => {
    setSelectedCampaign(campaign); // Show the campaign details when the deal card is clicked
  };

  const handleClosePopup = () => {
    setSelectedCampaign(null);
  };

  const handleParticipateClick = async (campaign) => {
    // Check if the user already participated in the campaign
    const alreadyParticipated = participatedCampaigns.some(
      (participated) => participated.campaign_id === campaign.id
    );

    if (alreadyParticipated) {
      // Campaign already participated, show a message or perform some action
      return;
    }

    // If the user hasn't participated, send a POST request to insert data into the ActiveCampaigns table
      try {


            const session = await supabase.auth.getSession();
            console.log(session)
            if (!session.data.session.access_token) {
                console.error('User not authenticated');
                return;
            }


            

          // Set the authentication token or session information in the request headers
          api.defaults.headers.common['Authorization'] = `Bearer ${session.data.session.access_token}`

          const formData = {}
      
          // Send the form data to the backend API
          formData["campaign_id"] = campaign.id
          formData["campaign_data"] = campaign
          formData["user"] = currentUser
          formData["userName"] = currentUser.user_metadata.socialMediaName
          console.log(formData)
          const response = await api.post('/create-active-campaign', formData);

          if (response.data.success) {
            // Campaign creation successful, handle success as needed
            console.log('Campaign created successfully');
            setShowRedeemPopup(true);
            setParticipatedCampaigns([...participatedCampaigns, currentUser.id]);
            console.log(participatedCampaigns)
            navigateTo("/creator")
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
    <div className="bg-[#10194D] w-full relative md:px-14 px-3 md:py-8 py-4 min-h-screen">
      <h3 className="text-[#F7E135] md:text-6xl text-3xl font-normal">Participate</h3>
      <div className="flex flex-wrap justify-center gap-4 md:px-5 px-3 md:py-5 py-3 pb-10 md:mt-8 mt-5 rounded-lg border relative z-40">
      {campaignsData.length > 0 ? (
          campaignsData.map((campaign) => (
            // Pass the onClick handler to DealCard and check if the campaign is already participated
            <DealCardParticipate
              key={campaign.id}
              deal={campaign}
              onClick={handleDealCardClick}
              length={campaignsData.length}
              participated={participatedCampaigns.some(
                (participated) => participated.campaign_id === campaign.id
              )}
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
            <p className="text-gray-600">Reward: {selectedCampaign.details}</p>
            <p className="text-gray-600">Depends: {selectedCampaign.depends}</p>
            <div className="flex justify-between mt-4">
              {participatedCampaigns.some(
                (participated) => participated.campaign_id === selectedCampaign.id
              ) ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "500",
                    textAlign: "center",
                    fontFamily: "'Poppins', sans-serif",
                    color: "grey",
                    backgroundColor: "lightgrey",
                    padding: "6px",
                    flex: "1",              // Add this line for flex layout
                  alignItems: "center",   // Add this line to center items vertically
                  display: "flex"
                  }}
                >
                  Participated
                </Typography>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => handleParticipateClick(selectedCampaign)}
                >
                  Participate
                </button>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-4"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showRedeemPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Participated Successfully</h3>
            <p className="text-gray-600 mb-4">You can now check the Redeem page to insert your link to show your completion!</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => setShowRedeemPopup(false)}
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

export default ParticipatePage;