
import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter";
import { BackButton } from "@/components/ui/BackButton";

export default function CurrencyConverterPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Currency Converter</h1>
        <CurrencyConverter/>
      </div>
    );
}