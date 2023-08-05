import influencer from '../assets/homepage/influ.svg'
import google from '../assets/homepage/google.png'
import instagram from '../assets/homepage/Instagram.png'
import facebook from '../assets/homepage/Facebook.png'
import tiktok from '../assets/homepage/tiktok.png'
import mask from '../assets/homepage/Mask.svg'

const TestimonialsSection = () => {
    const maskBackground = {
        backgroundImage: `url(${mask})`,
    }

    return (
        <div className="flex md:flex-row justify-start pl-[2.5%] bg-[#10194d] pt-[5%] relative">
            <div className="w-[70%] flex flex-col justify-center">
                <p className="text-[#f7e135] md:text-[4.2rem] text-[1.9rem]">1000+ Influencers <br /><span className="text-[#ac9900] md:text-[3.5rem] text-[1.8rem]">Join The Circle Now</span></p>
                <div className="influencer-img-div md:ml-0 md:mt-0 mt-24 md:px-12 px-5 md:py-10 flex justify-center md:w-[60%] w-[90vw] mb-12 bg-center bg-no-repeat bg-cover" style={maskBackground}>
                    <img src={influencer} alt="influencer" className="md:w-[85%] w-full md:p-0 p-7" />
                </div>
            </div>
            <div>
                <img src={google} alt="google" className="absolute md:right-[15%] right-[17%] md:top-[18%] top-[11%] md:w-24 w-20" />
                <img src={instagram} alt="instagram" className="absolute md:right-[11%] right-[4%] md:top-[25%] top-[19%] md:w-28 w-24 z-30" />
                <img src={facebook} alt="facebook" className="absolute right-[14%] md:top-[35%] top-[31%] md:w-24 w-20 z-20" />
                <img src={tiktok} alt="tiktok" className="absolute md:right-[10%] right-[4%] md:top-[42%] top-[40%] md:w-24 w-20" />
            </div>
        </div>
    );
}

export default TestimonialsSection;