import { Link } from "react-router-dom";
import blueBg from "../../assets/creator/bluebackground.svg"
import creatorfilm from "../../assets/creator/creatorfilm.jpg"

const Creatorpg = () => {
    const blueBackground = {
        backgroundImage: `url(${blueBg})`,
    }

    return (
        <div className="bg-[#10194d] text-[#fff] min-h-[100vh] pb-5">
       <div className="moveset" style ={{paddingTop: 100}}>
        <div className="flex w-full md:px-8 px-3 md:flex-row flex-col">
            <div className="md:w-2/5 w-full">
                <p className="md:text-[4rem] text-[3rem] font-normal text-[#F7E135] md:w-[90%] md:mt-6 mt-2">Sign Up As A <br /> <span>Creator</span></p>
                
                <button style={{marginTop: 80, borderRadius: 20, paddingTop: 12, paddingBottom: 12}} type="submit" className="bg-[#F01818] md:text-[1.2rem] text-[0.9rem] px-2 py-1 hover:text-[#F01818] hover:bg-white"   onClick={() => {
    const signUpRedirect = document.getElementById("signUpRedirect");
    if (signUpRedirect) {
      signUpRedirect.scrollIntoView({ behavior: "smooth" });
    }
  }}>Sign Up Now</button>

            </div>
            <div className="md:w-3/5 w-full flex justify-center items-center md:pr-10 pr-5 md:mt-0 mt-3">
                <div className="bg-center bg-no-repeat bg-contain flex justify-center md:pl-20 pl-16 md:w-[82%] w-full mt-8" style={blueBackground}>
                    <img style={{borderRadius: '100%'}} src={creatorfilm} alt="brandgirl" />
                </div>
            </div>
        </div>
        </div>
    </div>
    );
}

export default Creatorpg;