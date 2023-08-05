import { advanced, selfServe, starter } from "../utils/pricing";
import PriceCard from "./pricecard";
import PriceCard2 from "./pricecard2";

const MonthlyPrices = () => {
    return (
        <div className="flex justify-center mt-8 md:gap-28 gap-20 flex-col md:flex-row md:px-0 px-7">
            <PriceCard title="Self-Serve" price="250+" points={selfServe} />
            <PriceCard2 title="Starter" price="784+" points={starter} />
            <PriceCard2 title="Advanced" price="2518+" points={advanced} />
        </div>
    );
}

export default MonthlyPrices;