import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import yellowCirlce1 from "../../assets/brand/yellow1.png";
import yellowCirlce2 from "../../assets/brand/yellow2.png";
import { supabase, getRememberMeSession } from '../../../supabase-creator.js'
import { useNavigate } from "react-router";

const ParticipatePage = () => {
  const [dealsData, setDealsData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const[showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState('');
  const navigateTo = useNavigate();

  const NoActiveCampaignsText = () => (
    <div className="flex items-center justify-center h-[300px]">
      <Typography
        variant="h5"
        className="font-semibold text-white font-poppins text-[1.5625rem] py-4 px-6"
    >
      Oops, looks like there are no active campaigns!
    </Typography>
    </div>
  );
  

  useEffect(() => {
    // Fetch deals data from Supabase
    const fetchDealsData = async () => {
      try {
        const { data, error } = await supabase.from("deals").select("*");
        if (data) {
          setDealsData(data);
        } else {
          console.error("Error fetching deals data:", error);
        }
      } catch (error) {
        console.error("Error fetching deals data:", error);
      }
    };

    fetchDealsData();

    const checkUserAuthentication = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log(data)

        if (data.session != null) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
          navigateTo("/creator/login");

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
  }, []);

  return (
    <div className="bg-[#10194D] w-full relative md:px-14 px-3 md:py-8 py-4 min-h-screen">
    <h3 className="text-[#F7E135] md:text-6xl text-3xl font-normal">Participate</h3>
    <div className="flex flex-wrap justify-center gap-4 md:px-5 px-3 md:py-5 py-3 pb-10 md:mt-8 mt-5 rounded-lg border relative z-40">
      {dealsData.length > 0 ? (
        dealsData.map((deal) => (
          <Card className="max-w-[200px] max-h-[300px]">
            <CardActionArea disableRipple="true">
              <CardMedia
                className="max-w-[200px] max-h-[200px] opacity-70%"
                component="img"
                image={deal.image}
                alt=""
              />
              <div className="relative">
                <div className="absolute bottom-4 w-full text-black p-2 text-center">
                  <Typography
                    variant="h5"
                    className="font-semibold"
                  >
                    {deal.companyName}
                  </Typography>
                </div>
              </div>
              <CardContent className="max-w-[200px] max-h-[100px]">
                <Typography
                  variant="body2"
                  className="font-medium text-center text-black"
                >
                  {deal.dealDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
          ))
        ) : (
          <NoActiveCampaignsText />
        )}
      </div>
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