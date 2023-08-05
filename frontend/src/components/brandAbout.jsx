import google from '../assets/homepage/google.png'
import instagram from '../assets/homepage/Instagram.png'
import facebook from '../assets/homepage/Facebook.png'
import tiktok from '../assets/homepage/tiktok.png'

const BrandAbout = () => {
    return (
        <section className="mt-14 md:px-8 md:pl-[1.56%] pl-0 min-h-screen flex items-center md:justify-start justify-center relative  bg-[#10194D]">
            <div className="md:w-4/5 w-full gap-0 flex md:flex-row flex-col md:mt-0 mt-12">
                <p className="text-9xl italic self-start font-semibold md:-mb-0 -mb-16">"</p>
                <h3 className="md:text-5xl text-2xl self-center flex flex-col md:items-start items-center text-center md:text-start md:mt-14 md:px-0 px-10">
                    Do you know the secret sauce that <span className="md:hidden block">transforms</span>
                    <span className="flex md:flex-row flex-col items-start gap-4">
                        <span className="md:mt-4 text-center md:block hidden">that transforms</span>
                        <span className="flex flex-col md:text-7xl text-4xl md:gap-4 md:mt-0 mt-3">
                            Small Businesses
                            <span className="md:text-5xl text-2xl">
                                into remarkable
                            </span>
                            <span className="md:text-6xl text-[#F7E135]">
                                success stories?
                            </span>
                        </span>
                    </span>
                </h3>
                <p className="text-9xl italic self-end font-semibold md:pt-4 md:pr-0 pr-10 pt-6">"</p>
            </div>
            <div>
                <img src={google} alt="google-icon" className="absolute md:w-36 w-24 md:top-8 top-8 md:right-80 right-40" />
                <img src={instagram} alt="instagram" className="absolute md:w-24 w-16 md:right-3 right-2 md:top-40 top-12" />
                <img src={facebook} alt="facebook" className="absolute md:w-28 w-20 md:top-72 top-40 md:right-48 right-16" />
                <img src={tiktok} alt="tiktok" className="absolute md:w-32 w-16 md:bottom-60 bottom-[28rem] md:right-1 right-3" />
            </div>
        </section>
    );
}

export default BrandAbout;