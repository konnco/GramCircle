import creator from '../assets/homepage/creator.svg'
import brand from '../assets/homepage/brand.svg'
import plane from '../assets/homepage/plane.png'
import thumb from '../assets/homepage/thumbs.png'
import heart from '../assets/homepage/heart.png'
import hash from '../assets/homepage/hash.png'
import mask from '../assets/homepage/Mask.svg'

const FeatureSection = () => {
    const maskBackground = {
        backgroundImage: `url(${mask})`,
    }

    return (
        <div className="w-full flex md:mt-[5px] mt-[35px] justify-center items-center text-[#000001] relative md:flex-row flex-col">
            <div className="w-[90%] flex flex-col justify-center items-center">
                <div className="bg-center bg-no-repeat bg-cover flex items-center justify-center w-[70%] px-[10%] py-[10%] h-auto" style={maskBackground}>
                    <img src={creator} alt="creator" className="w-full" />
                </div>
                <div className="md:w-[70%] w-[85%] text-left">
                    <h3 className="md:text-[40px] text-[30px] font-[600] italic md:mt-[-50px] mt-[-30px]">Local Creators</h3>
                    <p className="md:text-[33px] text-[19px] font-[600] md:mt-[15px] mt-[10px] md:mb-[140px] mb-[75px] leading-[40px]">Share Reviews, Earn Rewards</p>
                </div>
            </div>
            <div className="icons-div">
                <img src={plane} alt="plane" className="absolute md:w-[65px] w-[50px] md:top-[13%] top-[1%] md:left-[51%] left-[82%]" />
                <img src={thumb} alt="thumb" className="absolute md:w-[65px] w-[50px] md:top-[28%] top-[23%] md:left-[45%] left-[85%]" />
                <img src={heart} alt="heart" className="absolute md:w-[65px] w-[50px] md:top-[43%] top-[46%] md:left-[51%] left-[72%]" />
                <img src={hash} alt="hash" className="absolute md:w-[65px] w-[50px] md:top-[60%] top-[72%] md:left-[47%] left-[80%]" />
            </div>
            <div className="w-[90%] flex flex-col justify-center items-center mt-[-15px]">
                <div className="bg-center bg-no-repeat bg-cover flex items-center justify-center w-[70%] px-[10%] py-[10%] h-auto" style={maskBackground}>
                    <img src={brand} alt="brand" className="w-full" />
                </div>
                <div className="md:w-[70%] w-[85%] text-left">
                    <h3 className="md:text-[40px] text-[30px] font-[600] italic md:mt-[-50px] mt-[-30px]">Local Brands</h3>
                    <p className="md:text-[33px] text-[19px] font-[600] md:mt-[15px] mt-[10px] md:mb-[140px] mb-[75px] leading-[40px]">Harness the Power of Influence</p>
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;