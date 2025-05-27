
import { BackButton } from "@/components/ui/BackButton";
import FaissPineconeComparison from "@/sections/multimodel/faiss-vs-pinecone/FaissPineconeComparison";
import MultimodalSearchApiFlow from "@/sections/multimodel/multimodal-api-flow/components/MultimodalSearchApiFlow";

export default function MultiSelectPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Multi Select</h1>
        <MultimodalSearchApiFlow/>
        <FaissPineconeComparison/>
      </div>
    );
}