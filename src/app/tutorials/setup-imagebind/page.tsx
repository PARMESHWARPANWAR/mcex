import { BackButton } from "@/components/ui/BackButton";
import ImageBindSetupTutorial from "@/sections/tutorials/image-bind-setup-tutorial";
import type { Metadata } from 'next';
import { ChevronLeft, Play, CheckCircle, Copy, Terminal, Download, Zap, Shield, Code, ArrowRight, Cpu, HardDrive, Layers } from 'lucide-react';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
    title: 'Multi Modal Search',
    description:
        'Image Bind Setup',
};

export default function MultiModalPage() {
    return (
        <div className="container mx-auto p-4">
            <ImageBindSetupTutorial />
        </div>
    );
}   