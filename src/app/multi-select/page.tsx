
import { MultiSelect } from "@/components/MultiSelect/MultiSelect";
import { BackButton } from "@/components/ui/BackButton";

export default function MultiSelectPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Multi Select</h1>
        <MultiSelect/>
      </div>
    );
}