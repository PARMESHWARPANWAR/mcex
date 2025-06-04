import type { Metadata } from 'next';
import Tutorial3VectorSearch from '@/sections/tutorials/vector-search-faiss';
import Tutorial3VectorSearchUpdated from '@/sections/tutorials/update-search-code';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: 'Multi Modal Search',
    description:
        'Image Bind Setup',
};

export default function MultiModalPage() {
    return (
        <div className="container mx-auto p-4">
            <Tutorial3VectorSearch />
            {/* <Tutorial3VectorSearchUpdated/> */}
        </div>
    );
}   