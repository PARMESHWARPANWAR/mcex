import { FileExplorer } from "@/components/Day7/FileExplorer";
import { BackButton } from "@/components/ui/BackButton";


interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
}

export default function FileExplorerPage() {
    const initialData:FileSystemNode[] = []
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 7: File Explorer</h1>
        <FileExplorer initialData={initialData}/>
      </div>
    );
}