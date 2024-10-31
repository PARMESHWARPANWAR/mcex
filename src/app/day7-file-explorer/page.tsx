import { FileExplorer } from "@/components/Day7/FileExplorer";
import { BackButton } from "@/components/ui/BackButton";


interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
}
const initialData = [
  {
    id: 'root1',
    name: 'Documents',
    type: 'folder',
    children: [
      {
        id: 'doc1',
        name: 'Work Projects',
        type: 'folder',
        children: [
          {
            id: 'wp1',
            name: 'Project A',
            type: 'folder',
            children: [
              {
                id: 'pa1',
                name: 'requirements.txt',
                type: 'file'
              },
              {
                id: 'pa2',
                name: 'design.fig',
                type: 'file'
              }
            ]
          },
          {
            id: 'wp2',
            name: 'meeting-notes.md',
            type: 'file'
          }
        ]
      },
      {
        id: 'doc2',
        name: 'Personal',
        type: 'folder',
        children: [
          {
            id: 'p1',
            name: 'vacation-photos',
            type: 'folder',
            children: []
          },
          {
            id: 'p2',
            name: 'resume.pdf',
            type: 'file'
          }
        ]
      }
    ]
  },
  {
    id: 'root2',
    name: 'Downloads',
    type: 'folder',
    children: [
      {
        id: 'd1',
        name: 'setup.exe',
        type: 'file'
      },
      {
        id: 'd2',
        name: 'photo.jpg',
        type: 'file'
      }
    ]
  },
  {
    id: 'root3',
    name: 'Desktop',
    type: 'folder',
    children: [
      {
        id: 'desk1',
        name: 'Screenshots',
        type: 'folder',
        children: []
      },
      {
        id: 'desk2',
        name: 'shortcut.lnk',
        type: 'file'
      }
    ]
  }
];

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