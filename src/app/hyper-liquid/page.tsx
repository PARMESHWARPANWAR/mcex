import HyperLiquidApp from "@/components/HyperLiquidOrderBook";
import HyperliquidOrderBookAndTradesApp from "@/components/HyperLiquidOrderBook&Trader";
import HyperLiquidAppV1 from "@/components/HyperLiquidOrderBookV1";
import { BackButton } from "@/components/ui/BackButton";

export default function FetchWebApiPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Fetch Web Api Tutorial</h1>
        <HyperliquidOrderBookAndTradesApp/>
        {/* <HyperLiquidApp/> */}
        {/* <HyperLiquidAppV1/> */}
      </div>
    );
}