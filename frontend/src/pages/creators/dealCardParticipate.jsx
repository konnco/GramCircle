import React, { useState,useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect } from 'react';

const DealCardParticipate = ({ deal, onClick, length }) => {
  const [images, setImages] = useState([]);
  const [usedImages, setUsedImages] = useState([]);
  const [image, setImage] = useState(null);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=marketing%20stock%20images&count=10`, {
          headers: {
            Authorization: 'Client-ID yOeR25KczZ2NPnxSRSFRUOsU6TO5apPS33imT_Ch8fI', // Replace with your Unsplash access key
          },
        });
  
        const data = await response.json();
  
        // Filter images to find the one closest to 200 by 200 pixels
        const closestImage = data.reduce((closest, imgData) => {
          const imgWidth = imgData.width;
          const imgHeight = imgData.height;
          const imgDiff = Math.abs(imgWidth - 200) + Math.abs(imgHeight - 200);
  
          if (!closest || imgDiff < closest.diff) {
            return { url: imgData.urls.regular, diff: imgDiff };
          }
  
          return closest;
        }, null);
  
        if (closestImage) {
          setImage(closestImage.url);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, []);

  const handleDealClick = () => {
    onClick(deal); // Pass the deal data to the parent component's onClick handler
  };
  
 
  console.log(image)

  return (
    <Card sx={{ maxWidth: 200, maxHeight: 300 }} className="relative z-10">
      <CardActionArea disableRipple={true} onClick={handleDealClick}>
        <CardMedia
          sx={{
    maxWidth: 200,
    maxHeight: 200,
    width: 200, // Set the width to 200 pixels
    height: 200, // Set the height to 200 pixels
    objectFit: 'cover', // Maintain aspect ratio and cover the container
    opacity: '70%',
  }}
          component="img"
          image= {image}
          alt=""
        />

        <CardContent sx={{ maxWidth: 200, maxHeight: 100 }}>
          <Typography variant="body2" sx={{ fontWeight: '500', textAlign: 'center', fontFamily: "'Poppins', sans-serif", color: 'black' }}>
            {deal.campaignName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DealCardParticipate;