import TraficLights from "@/components/TraficLights/TraficLights";
import { BackButton } from "@/components/ui/BackButton";

export default function TraficLightsPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Trafic Light</h1>
        <TraficLights/>
      </div>
    );
}