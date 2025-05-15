"use client"
import React, { useState, useRef, createRef, useEffect, forwardRef } from 'react'

interface NoteType {
  id: number;
  title: string;
  content: string;
  position?: {
    x: number;
    y: number;
  };
}

const DragableNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>([{
    id: 1,
    title: "Note Title",
    content: "Note Content",
  }, {
    id: 2,
    title: "New Note Title",
    content: "New Note Title",
  }])

  const noteRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    const savedNotesString = localStorage.getItem("notes");
    const savedNotes: NoteType[] = savedNotesString ? JSON.parse(savedNotesString) : [];

    const updateNotes = notes.map(note => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote && savedNote.position) {
        return { ...note, position: savedNote.position }
      } else {
        const position = determinePosition()
        return { ...note, position }
      }
    })
    localStorage.setItem('notes', JSON.stringify(updateNotes));
    setNotes(updateNotes)
  }, [])

  const determinePosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    return { x, y }
  }

  const handleDragStart = (note: NoteType, e: React.MouseEvent) => {
    const { id } = note;
    
    // Make sure ref exists
    if (!noteRefs.current[id] || !noteRefs.current[id].current) return;
    
    const currentNoteRef = noteRefs.current[id].current!;
    const currentRect = currentNoteRef.getBoundingClientRect();
    const offsetX = e.clientX - currentRect.left;
    const offsetY = e.clientY - currentRect.top;

    const startPosition = note.position || { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      currentNoteRef.style.left = `${newX}px`;
      currentNoteRef.style.top = `${newY}px`;
    }
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp)

      const finalRect = currentNoteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top }
      if (checkOverLap(id)) {
        currentNoteRef.style.left = `${startPosition.x}px`;
        currentNoteRef.style.top = `${startPosition.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp)
  }

  const checkOverLap = (id: number) => {
    // Make sure ref exists
    if (!noteRefs.current[id] || !noteRefs.current[id].current) return false;
    
    const noteRef = noteRefs.current[id].current!;
    const currentNoteRect = noteRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;
      
      // Make sure other ref exists
      if (!noteRefs.current[note.id] || !noteRefs.current[note.id].current) return false;

      const otherNoteRef = noteRefs.current[note.id].current!;
      const otherNoteRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(
        currentNoteRect.right < otherNoteRect.left ||
        currentNoteRect.left > otherNoteRect.right ||
        currentNoteRect.bottom < otherNoteRect.top ||
        currentNoteRect.top > otherNoteRect.bottom
      )

      return overlap;
    })
  }

  const updateNotePosition = (id: number, newPosition: { x: number, y: number }) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="relative min-h-screen">
      <h1 className="text-xl mb-4">Dragable Notes</h1>
      {notes.map(note => {
        // Initialize ref if it doesn't exist
        if (!noteRefs.current[note.id]) {
          noteRefs.current[note.id] = createRef<HTMLDivElement>();
        }
        
        return (
          <Note 
            onMouseDown={(e) => handleDragStart(note, e)} 
            ref={noteRefs.current[note.id]} 
            key={note.id} 
            {...note} 
          />
        );
      })}
    </div>
  )
}

interface NoteProps extends NoteType {
  onMouseDown: (e: React.MouseEvent) => void;
}

const Note = forwardRef<HTMLDivElement, NoteProps>(function DragNote({ id, title, content, position, ...props }, ref) {
  return (
    <div
      key={id}
      ref={ref}
      {...props}
      className="border-2 w-fit rounded-sm p-4 bg-yellow-50 shadow-md"
      style={{
        position: 'absolute',
        left: `${position?.x || 0}px`,
        top: `${position?.y || 0}px`,
        cursor: 'move',
        userSelect: 'none',
        zIndex: 10
      }}
    >
      <h2 className="font-medium">📌 {title}</h2>
      <p>{content}</p>
    </div>
  );
});

Note.displayName = 'Note';

export default DragableNotes;