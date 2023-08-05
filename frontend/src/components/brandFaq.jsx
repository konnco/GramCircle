import bgImage from '../assets/brand/yellowcirclesgram.svg'

const BrandFaq = () => {
    const bg = {
        backgroundImage: `url(${bgImage})`
    }

    return (
        <section className="min-h-screen bg-white">
            <div className="bg-center bg-cover bg-no-repeat flex flex-col gap-2 md:py-8 py-4 md:px-7 px-0 pb-6" style={bg}>
                <h3 className="text-white md:text-5xl text-2xl font-bold ml-5 italic">Why Join Gram Circle?</h3>
            </div>
            <div className="bg-white md:px-11 px-3 min-h-full flex flex-col md:gap-24 gap-16 pt-10">
                <div className="flex md:gap-4 gap-5">
                    <p className="text-[#F7E135] text-5xl font-bold italic">1</p>
                    <h5 className="flex flex-col text-black text-lg font-normal md:px-16"><span className="text-[#E51220] text-xl font-medium">Singapore’s first platform built for SMEs </span>With over 280,000 SMEs in Singapore, there is not one-platform that integrates all
                        your needs to connect with your target audience. Take charge of your brand story
                        and reach relevant creators directly.
                    </h5>
                </div>
                <div className="flex md:gap-4 gap-5">
                    <p className="text-[#F7E135] text-5xl font-bold italic">2</p>
                    <h5 className="flex flex-col text-black text-lg font-normal md:px-16"><span className="text-[#E51220] text-xl font-medium">Collaborate with local creators </span>Our open to everyone campaigns are uniquely created to reach a wide set of audiences who discover new and upcoming brands on our platform. Driving
                        brand awareness and greater reach for brands. Additionally, collaborating with
                        local influencers can fast-track growth and improve social media presence via
                        targeted campaigns.
                    </h5>
                </div>
                <div className="flex md:gap-4 gap-5">
                    <p className="text-[#F7E135] text-5xl font-bold italic">3</p>
                    <h5 className="flex flex-col text-black text-lg font-normal md:px-16"><span className="text-[#E51220] text-xl font-medium">Generate great content </span>Content is king, content from creators is relatable, and more viral-worthy.
                        Repurpose this content to include them on your social media feeds.
                    </h5>
                </div>
                <div className="flex md:gap-4 mb-12 gap-5">
                    <p className="text-[#F7E135] text-5xl font-bold italic">4</p>
                    <h5 className="flex flex-col text-black text-lg font-normal md:px-16"><span className="text-[#E51220] text-xl font-medium">ROI driven campaigns</span>Businesses are making $5.20 for every $1 spent on influencer marketing, helping
                        brands build trust, generate interest and drive sales.
                    </h5>
                </div>
            </div>
        </section>
    );
}

export default BrandFaq;