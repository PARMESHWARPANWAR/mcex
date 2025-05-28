
import { BackButton } from "@/components/ui/BackButton";
import FaissPineconeComparison from "@/sections/multimodel/faiss-vs-pinecone/FaissPineconeComparison";
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Pinecone Vs Faiss',
  description:
    'Pinecone Vs Faiss',
};


export default function PineconeVsFaissPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Pinecone Vs Faiss</h1>
        <FaissPineconeComparison/>
      </div>
    );
}