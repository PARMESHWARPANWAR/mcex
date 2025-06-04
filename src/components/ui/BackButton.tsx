import Link from 'next/link';
import { ChevronLeft, Play, CheckCircle, Copy, Terminal, Download, Zap, Shield, Code, ArrowRight, Cpu, HardDrive, Layers } from 'lucide-react';

export const BackButton = ({path='/'}) => {
  return (
    <Link
      href={path?path:"/"}
 >
      <button className="back-button">
                <ChevronLeft className="w-4 h-4" />
                Back to Challenges
      </button>
    </Link>
  );
};