import { Link } from "react-router-dom";
import linesImage from "../../assets/brand/line-image.png"
import yellowCirlce1 from "../../assets/brand/yellow1.png"
import yellowCirlce2 from "../../assets/brand/yellow2.png"

const ResetPasswordPage = () => {
    return (
        <div className="w-full min-h-screen md:flex bg-[#10194D] md:px-8 px-0 md:py-10 relative">
            <div className="w-3/5 md:flex items-center relative hidden">
                <h2 className="text-[#F7E135] text-8xl mb-20">Reset Password</h2>
                <img src={linesImage} alt="lines image" className="absolute -right-16 top-96" />
            </div>
            <div className="md:w-2/5 w-full md:flex justify-center md:py-4 md:px-5 px-0">
                <div className="bg-black/20 backdrop-blur-xl md:w-4/5 w-full text-white md:px-8 px-5 md:pt-0 pt-20 md:border border-0 md:rounded-xl z-30 relative">
                    <h4 className="text-3xl md:mt-20">Forgot Password ?</h4>
                    <form className="flex flex-col gap-4 mt-5">
                        <label
                            htmlFor="email"
                            className="text-sm"
                        >
                            Please enter you’re email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full bg-inherit border px-3 py-2 rounded-lg"
                        />
                        <button className="bg-[#c51c1c] text-xl py-2 rounded-xl">Reset Password</button>
                    </form>
                    <div className="flex text-sm justify-evenly md:mt-2 mt-4 md:pb-0 pb-32">
                        <Link>Terms & Conditions</Link>
                        <Link>Support</Link>
                        <Link>Customer Care</Link>
                    </div>
                </div>
            </div>
            <div>
                <img src={yellowCirlce1} alt="circle1" className="absolute md:right-[32%] right-64 md:w-40 w-44 md:top-3 -top-2 z-0" />
                <img src={yellowCirlce2} alt="circle2" className="absolute z-0 md:w-32 md:right-10 md:bottom-3 right-0 bottom-0" />
            </div>
        </div>
    );
}

export default ResetPasswordPage;