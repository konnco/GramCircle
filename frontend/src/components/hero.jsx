import logo from '../assets/homepage/logo.svg'
import hero from '../assets/homepage/hero1.svg'

const HeroSection = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-[#ffffff] text-[#000001] w-full">
            <img src={logo} alt="logo" className="w-[180px] md:mt-12 mt-[80px]" />
            <img src={hero} alt="hero" className="md:w-[750px] w-[96%] h-[400px] md:h-auto md:mt-0 mt-[50px]" />
        </div>
    );
}

export default HeroSection;