import loginImage from "../assets/brand/login-image.svg"
import greyCross from "../assets/brand/grey-cross.png"

const LoginPopUp = (props) => {
    const handleCloseClick = () => {
        props.onChangeState(true)
    }

    return (
        <div className={props.isLogin ? "hidden" : "bg-white absolute top-1/4 left-1/4 w-2/4 px-20 py-10"}>
            <div className="relative">
                <img src={greyCross} alt="grey-cross" className="absolute -right-10 -top-4 w-6 cursor-pointer" onClick={handleCloseClick} />
                <h3 className="text-[#f9470e] text-[4rem] font-semibold">SIGN UP</h3>
                <p className="text-[1.5rem] font-semibold mt-7">Drop Your Email</p>
                <p className="text-[1.5rem]">To Create a Campaign!</p>
                <img src={loginImage} alt="login" className="absolute w-48 left-64 top-0" />
                <div className="flex mt-5 mb-16">
                    <input type="email" placeholder="Email Address" className="border w-3/4 py-2 px-2 text-black" />
                    <button className="bg-[#f9470e] text-white text-xl font-semibold px-3">SUBMIT</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPopUp;