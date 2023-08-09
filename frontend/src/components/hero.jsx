import logo from '../assets/homepage/logo.png'
import hero from '../assets/homepage/hero1.svg'

const HeroSection = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-[#ffffff] text-[#000001] w-full">
            <img src={logo} alt="logo" className="w-[180px] md:mt-12 mt-20" />
            <img src={hero} alt="hero" className="md:w-[750px] w-[96%] h-[400px] md:h-auto md:mt-0" />
        </div>
    );
}

export default HeroSection;