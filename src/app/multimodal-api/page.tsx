
import { BackButton } from "@/components/ui/BackButton";
import MultimodalSearchApiFlow from "@/sections/multimodel/multimodal-api-flow/components/MultimodalSearchApiFlow";
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Multi Modal Search',
  description:
    'Multi Modal Search Project Flow',
};

export default function MultiModalPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Multi Modal Search Project Flow</h1>
        <MultimodalSearchApiFlow/>
      </div>
    );
}