'use client';

import React, { useState, useEffect, DragEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, X } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  created: string;
}

interface KanbanColumns {
  [key: string]: Task[];
}

interface DraggedItem {
  task: Task;
  sourceColumn: string;
}

const defaultColumns: KanbanColumns = {
  'To Do': [],
  'In Progress': [],
  'Done': []
};

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumns>(defaultColumns);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [activeColumn, setActiveColumn] = useState<string>('To Do');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage once the component mounts
  useEffect(() => {
    const savedColumns = typeof window !== 'undefined' ? 
      localStorage.getItem('kanbanColumns') : null;
    
    if (savedColumns) {
      try {
        const parsedColumns = JSON.parse(savedColumns);
        setColumns(parsedColumns);
      } catch (e) {
        console.error('Error parsing saved columns:', e);
        setColumns(defaultColumns);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever columns change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('kanbanColumns', JSON.stringify(columns));
    }
  }, [columns, isLoaded]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, task: Task, sourceColumn: string): void => {
    setDraggedItem({ task, sourceColumn });
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedItem(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetColumn: string): void => {
    e.preventDefault();
    
    if (draggedItem && draggedItem.sourceColumn !== targetColumn) {
      const updatedColumns = { ...columns };
      
      // Remove from source column
      updatedColumns[draggedItem.sourceColumn] = columns[draggedItem.sourceColumn]
        .filter(task => task.id !== draggedItem.task.id);
      
      // Add to target column
      updatedColumns[targetColumn] = [...columns[targetColumn], draggedItem.task];
      
      setColumns(updatedColumns);
    }
  };

  const addNewTask = (): void => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        created: new Date().toISOString()
      };

      setColumns(prev => ({
        ...prev,
        [activeColumn]: [...prev[activeColumn], newTask]
      }));
      
      setNewTaskText('');
    }
  };

  const deleteTask = (columnName: string, taskId: number): void => {
    setColumns(prev => ({
      ...prev,
      [columnName]: prev[columnName].filter(task => task.id !== taskId)
    }));
  };

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 w-full">
      <div className="mb-6 flex items-center gap-4">
        <Input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add new task"
          className="max-w-xs"
          onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
        />
        <select
          value={activeColumn}
          onChange={(e) => setActiveColumn(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(columns).map(column => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
        <Button onClick={addNewTask}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([columnName, tasks]) => (
          <div
            key={columnName}
            className="min-h-96"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnName)}
          >
            <Card className='h-full'>
              <CardHeader>
                <CardTitle className="text-center">{columnName}</CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, columnName)}
                    onDragEnd={handleDragEnd}
                    className="p-3 mb-2 bg-slate-100 rounded-lg cursor-move relative group"
                  >
                    <div className="pr-8">
                      {task.text}
                    </div>
                    <button
                      onClick={() => deleteTask(columnName, task.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;