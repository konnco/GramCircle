import { Link } from "react-router-dom";
import insightIcon from "../assets/brand/insight.png"
import analyticsIcon from "../assets/brand/analytics.png"
import monitorIcon from "../assets/brand/monitor.png"
import gramCircleLogo from "../assets/homepage/GramCircle.png";

const SideBar = (props) => {
    return (
        <div className="md:w-12 w-10 bg-white absolute top-0 left-0 flex justify-center min-h-[100vh] border-r-2">
            <div className="flex flex-col items-center gap-8 mt-20">
            <Link to = "/brand"><img src={gramCircleLogo} alt="Gram Circle (logo)" className="md:w-[6rem] w-[4rem]" /></Link>
                <Link className="flex mt-16">
                    <img src={insightIcon} alt="insighticon" className="w-8" title="Insight" />
                </Link>
                <Link>
                    <img src={analyticsIcon} alt="insighticon" className="w-8" title="Analytics" />
                </Link>
                <Link>
                    <img src={monitorIcon} alt="insighticon" className="w-8" title="Monitor" />
                </Link>
            </div>
        </div>
    );
}

export default SideBar;
