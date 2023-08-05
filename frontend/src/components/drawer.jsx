import { Link } from "react-router-dom";
import cross from "../assets/brand/cross.png"

const Drawer = (props) => {

    const handleCloseClick = () => {
        props.onChangeState(false)
    }
    
    return (
        <div className={props.isOpen ? "md:w-[35%] w-3/5 bg-black absolute top-0 left-0 flex justify-center min-h-[100vh]" : "hidden"}>
            <div className="flex flex-col items-center gap-8 text-[#F7E135] md:text-[2rem] text-[1.5rem] mt-36 relative">
                <img src={cross} alt="cross" className="absolute md:w-10 w-9 md:-right-24 md:-top-24 -right-11 -top-28 cursor-pointer" onClick={handleCloseClick} />
                <Link className="hover:border-b-2 border-white">Insights</Link>
                <Link className="hover:border-b-2 border-white">Analytics</Link>
                <Link className="hover:border-b-2 border-white">Monitor</Link>
            </div>
        </div>
    );
}

export default Drawer;