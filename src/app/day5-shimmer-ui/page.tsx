import { ShimmerUIExample } from "@/components/Day5/ShimmerUi";
import { BackButton } from "@/components/ui/BackButton";

export default function ShimmerUIPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 5: Shimmer UI</h1>
        <ShimmerUIExample/>
      </div>
    );
}