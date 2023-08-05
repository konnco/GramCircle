const PriceCard2 = (props) => {
    const isComingSoon = true; 
    return (
        <div className="bg-white md:w-1/5 flex flex-col items-center rounded-lg md:py-3 py-8 md:pb-0 pb-16 gap-2">
            <div className="w-full flex items-center flex-col md:gap-0">
                <h2 className="text-[1.7rem] font-bold">{props.title}</h2>
                <p className="text-[0.6rem]">Estimated Reach: XX users</p>
                <div className="flex font-sans font-inter font-bold md:mt-3 mt-5">
                    <p className="text-[1rem] self-start mt-3">SGD</p>
                    <h5 className="text-[2.3rem]">{props.price}</h5>
                    <p className="text-[1rem] mt-8">/month</p>
                </div>
                <button
                    disabled={isComingSoon} // Disable the button based on the isComingSoon flag
                    className='font-sans font-inter text-[0.9rem] font-medium bg-gray-400 hover:bg-gray-400 text-white px-8 py-2 rounded-full md:mt-2 mt-5'
                >
                    {isComingSoon ? "Coming Soon" : "Select Plan"}
      </button>
                <p className="text-[#747474] font-sans font-inter text-[0.6rem]">$1 per redemption</p>
            </div>
            <hr className="w-full h-0.5 bg-[#907B7B] md:my-0 my-5" />
            <div className="flex items-start flex-col font-sans font-inter text-[0.9rem] font-medium text-[#000] w-[70%] gap-1 pb-3">
                {
                    props.points.map(e => (
                        <div className="flex gap-1">
                            <p>✔️</p><p key={e}><span></span>{e}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PriceCard2;