'use client'

import React, { useState } from 'react';
import { Folder, File, Plus, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';

interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
}

interface FileExplorerProps {
  initialData: FileSystemNode[];
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ initialData }) => {
  const [data, setData] = useState<FileSystemNode[]>(initialData);
  const [draggedItem, setDraggedItem] = useState<FileSystemNode | null>(null);

  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const findNodeById = (
    nodes: FileSystemNode[],
    id: string
  ): FileSystemNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const deleteNode = (nodes: FileSystemNode[], id: string): FileSystemNode[] => {
    return nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = deleteNode(node.children, id);
      }
      return true;
    });
  };

  const handleDelete = (id: string) => {
    setData(prevData => deleteNode([...prevData], id));
  };

  const handleCreateNew = (
    parentId: string | null,
    type: 'file' | 'folder'
  ) => {
    const newNode: FileSystemNode = {
      id: generateId(),
      name: type === 'file' ? 'New File' : 'New Folder',
      type,
      children: type === 'folder' ? [] : undefined,
    };

    if (!parentId) {
      setData(prevData => [...prevData, newNode]);
      return;
    }

    const updateNodes = (nodes: FileSystemNode[]): FileSystemNode[] => {
      return nodes.map(node => {
        if (node.id === parentId && node.type === 'folder') {
          return {
            ...node,
            children: [...(node.children || []), newNode],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateNodes(node.children),
          };
        }
        return node;
      });
    };

    setData(prevData => updateNodes(prevData));
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: FileSystemNode
  ) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (!draggedItem) return;

    const sourceId = draggedItem.id;
    if (sourceId === targetId) return;

    const moveNode = (
      nodes: FileSystemNode[],
      sourceId: string,
      targetId: string
    ): FileSystemNode[] => {
      const result: FileSystemNode[] = [];
      let movedNode: FileSystemNode | null = null;

      // Remove the source node and store it
      for (const node of nodes) {
        if (node.id === sourceId) {
          movedNode = { ...node };
          continue;
        }
        const newNode = { ...node };
        if (node.children) {
          newNode.children = moveNode(node.children, sourceId, targetId);
        }
        result.push(newNode);
      }

      // Add the moved node to the target
      if (movedNode) {
        for (const node of result) {
          if (node.id === targetId && node.type === 'folder') {
            node.children = node.children || [];
            node.children.push(movedNode);
          }
        }
      }

      return result;
    };

    setData(prevData => moveNode([...prevData], sourceId, targetId));
    setDraggedItem(null);
  };

  const FileSystemItem: React.FC<{
    item: FileSystemNode;
    level: number;
  }> = ({ item, level }) => (
    <div className="w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer`}
            style={{ paddingLeft: `${level * 16}px` }}
            draggable
            onDragStart={e => handleDragStart(e, item)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, item.id)}
          >
            {item.type === 'folder' ? (
              <Folder className="w-4 h-4 mr-2 text-blue-500" />
            ) : (
              <File className="w-4 h-4 mr-2 text-gray-500" />
            )}
            <span className="text-sm">{item.name}</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {item.type === 'folder' && (
            <>
              <ContextMenuItem
                onClick={() => handleCreateNew(item.id, 'file')}
              >
                <Plus className="w-4 h-4 mr-2" />
                New File
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => handleCreateNew(item.id, 'folder')}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Folder
              </ContextMenuItem>
            </>
          )}
          <ContextMenuItem onClick={() => handleDelete(item.id)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {item.type === 'folder' && item.children && (
        <div>
          {item.children.map(child => (
            <FileSystemItem
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md border rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">File Explorer</h2>
          <div className="flex gap-2">
            <button 
              data-testid='addfile'
              onClick={() => handleCreateNew(null, 'file')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              data-testid='addfolder'
              onClick={() => handleCreateNew(null, 'folder')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Folder className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-1">
          {data.map(item => (
            <FileSystemItem key={item.id} item={item} level={0} />
          ))}
        </div>
      </div>
    </div>
  );
};