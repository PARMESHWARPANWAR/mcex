import { BackButton } from "@/components/ui/BackButton";

import type { Metadata } from 'next';
import Tutorial2ApiEndpoint from "@/sections/tutorials/first-api-endpoint";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: 'Multi Modal Search',
    description:
        'Image Bind Setup',
};

export default function MultiModalPage() {
    return (
        <div className="container mx-auto p-4">
            <Tutorial2ApiEndpoint />
        </div>
    );
}   