import { Link } from 'react-router-dom';
import girl from '../assets/homepage/girl.svg'
import increase from '../assets/homepage/increase.svg'
import gramCircleLogo from '../assets/homepage/gramcircleLogo.png'

const AboutSection = () => {
    return (
        <div className="bg-[#10194d] text-[#fff]">
            <div className="flex items-center justify-between md:pt-[1.69%] pt-[2.55rem] md:pr-[2.25%] pr-[1.9%] md:pb-[1.69%] pb-[1.69%] mb:pl-[1.56%] pl-[1.56%]">
                  <img src={gramCircleLogo} alt="Gram Circle (logo)" className="md:w-[6rem] w-[4rem]" />
                <div className="flex items-center justify-center md:gap-[2.35rem] gap-2">
                    <Link className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none border-white text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]" to="/brand">Brands</Link>
                    <Link className="font-[600] md:text-[1.5625rem] text-[1rem] m-0 bg-inherit border-none text-[#fff] cursor-pointer hover:border-solid border-b-[#62f6ff] border-b-[3px]" to="/creator">Creators</Link>
                </div>
            </div>
            <div className="flex md:flex-row flex-col w-[100%] mt-[4.5%]">
                <div className="flex flex-col justify-start md:w-[60%] w-full pl-[1.56%] relative">
                    <div className="md:text-[2.5rem] text-[1rem] pr-[6%] md:mt-0 mt-2">
                        <p>Loyalty Driven <span className="md:text-[3.8rem] text-[1.8rem]">AI POWERED</span> <br /> Marketing Automation Tool for Connecting Local Brands with Local Influencers</p>
                    </div>
                    <div className="w-[100%] md:mt-[2%] flex items-center gap-0">
                        <div>
                            <p className="md:text-[2.5rem] text-[1.7rem] font-[400] mt-8">We Make Brands</p>
                            <h2 className="md:text-[3.7rem] text-[2.3rem] font-[600] text-[#F7E135] mt-2">Go Viral</h2>
                        </div>
                        <img src={increase} alt="increase" className="md:w-[12.5rem] w-[9rem] md:mt-4 mt-8 p-0 -ml-9" />
                    </div>
                    <div className="flex gap-[6%] mt-[7%]">
                        <Link className="p-[1.5%] md:text-[1.375rem] text-[1.2rem] bg-[#1e1e1e] hover:bg-[#ffffff] border-[2px] border-solid border-[#fff] hover:border-[#1e1e1e] text-[#fff] hover:text-[#1e1e1e] rounded-xl cursor-pointer" to="/brand">I am a Brand</Link>
                        <Link className="p-[1.5%] md:text-[1.375rem] text-[1.2rem] bg-[#1e1e1e] hover:bg-[#ffffff] border-[2px] border-solid border-[#fff] hover:border-[#1e1e1e] text-[#fff] hover:text-[#1e1e1e] rounded-xl cursor-pointer" to="/creator">I am a Creator</Link>
                    </div>
                </div>
                <div className="md:w-[40%] w-full flex md:block justify-center pr-[1.69%] md:mb-[5%] md:my-0 my-[15%]">
                    <img src={girl} alt="girl" className="md:w-full w-[85%]" />
                </div>
            </div>
        </div>
    );
}

export default AboutSection;