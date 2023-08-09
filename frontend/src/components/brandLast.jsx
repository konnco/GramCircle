import blueBg from "../assets/brand/bluebackground.svg"
import brandGirl from "../assets/brand/brandlastgirl.svg"
import lineImage from "../assets/brand/line-image.png"

const BrandLast = () => {
    const blueBackground = {
        backgroundImage: `url(${blueBg})`,
    }

    return (
        <section className="bg-[#10194D] min-h-screen flex justify-center">
            <div className="flex w-full md:flex-row flex-col gap-0 relative">
                <div className="md:w-2/5 w-full md:ml-8 md:px-0 px-10">
                    <h3 className="md:text-7xl text-4xl text-[#F7E135] md:mt-44 mt-10 md:ml-40 leading-normal">Sign Up As A Brand</h3>
                    <button
                        className="text-white hover:text-[#10194D] bg-inherit hover:bg-white border-4 border-[#F01818] md:mt-20 mt-10 md:ml-40 text-lg font-normal italic px-3 py-2"
                    >
                        <a href="#howDoesItWork">Sign Up Now</a>
                    </button>
                </div>
                <div className="md:w-1/2 w-full flex justify-center items-center md:mt-0 mt-16 pr-5">
                    <div className="bg-center bg-no-repeat bg-contain flex justify-center md:pl-20 pl-16 md:w-[82%] w-full mt-8 z-10" style={blueBackground}>
                        <img src={brandGirl} alt="brandgirl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandLast;