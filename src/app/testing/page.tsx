
import TestComponent from "@/components/Custom/TestComponent";
import { BackButton } from "@/components/ui/BackButton";

export default function TestComponentPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">TestComponent</h1>
        <TestComponent/>
      </div>
    );
}