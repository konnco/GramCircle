import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import deal1img from '../../assets/creator/deals-3.png'

  

const DealCard3 = () => {



    return (
        <Card sx={{maxWidth: 200, maxHeight: 300}}>
            

        <CardActionArea disableRipple="true">
          <CardMedia
          sx={{ maxWidth: 200, maxHeight: 200, opacity: '70%'}}
            component="img"
            image={deal1img}
            alt=""
          />
<Box sx={{ position: 'relative' }}>
<Box
      sx={{
        position: 'absolute',
        bottom: 70,
        width: '100%',
        color: 'black',
        padding: '10px',
        textAlign: 'center'
      }}
    >
      <Typography variant="h5" sx={{fontFamily: "'Poppins', sans-serif", fontWeight:'600'}}>Company C</Typography>
    </Box>
    </Box>


          <CardContent sx={{ maxWidth: 200, maxHeight: 100}}>
            <Typography variant="body2" sx={{fontWeight: '500', textAlign: 'center', fontFamily: "'Poppins', sans-serif", color: 'black'}}>
              Leave a review and get 10% off
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
    
    );
}

export default DealCard3;