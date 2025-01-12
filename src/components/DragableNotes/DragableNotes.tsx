"use client"
import React,{useState,useRef,createRef,useEffect,forwardRef} from 'react'

const DragableNotes = () => {
  const [notes, setNotes] = useState([{
    id: 1,
    title: "Note Title",
    content: "Note Content",
  }, {
    id: 2,
    title: "New Note Title",
    content: "New Note Title",
  }])

  const noteRefs = useRef([]);

  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updateNotes = notes.map(note=>{
      const savedNote = savedNotes.find((n)=>n.id == note.id);
      if(savedNote){
        return {...note,position:savedNote.position}
      }else{
        const position  = determinePosition()
        return {...note, position}
      }
    })
    localStorage.setItem('notes', JSON.stringify(updateNotes));
    setNotes(updateNotes)
  },[])

  const determinePosition = ()=>{
    const maxX = window.innerWidth-250;
    const maxY = window.innerHeight-250;

    const x = Math.floor(Math.random()*maxX);
    const y = Math.floor(Math.random()*maxY);
    return {x, y}
  }

  const handleDragStart = (note,e) => {
    const {id} = note;
    const currentNoteRef= noteRefs.current[id].current;
    const currentRect = currentNoteRef.getBoundingClientRect();
    const offsetX = e.clientX -currentRect.left
    const offsetY = e.clientY -currentRect.top;

    const startPosition = note.position;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      currentNoteRef.style.left = `${newX}px`;
      currentNoteRef.style.top = `${newY}px`;
    }
    const handleMouseUp = () =>{
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp)

      const finalRect = currentNoteRef.getBoundingClientRect();
      const newPosition = {x:finalRect.left, y:finalRect.top}
      if(checkOverLap(id)){
        currentNoteRef.style.left = `${startPosition.x}px`;
        currentNoteRef.style.top = `${startPosition.y}px`;
      }else{
        updateNotePosition(id, newPosition);
      }
    }
    document.addEventListener('mousemove',handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp)
  }

  const checkOverLap = (id) => {
    const noteRef = noteRefs.current[id].current;
    const currentNoteRect = noteRef.getBoundingClientRect();
    
    return notes.some((note)=>{
      if(note.id === id) return false;

      const otherNoteRef = noteRefs.current[note.id].current;
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

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? {...note, position: newPosition} : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };


  return (
    <div>
      DragableNotes
      {notes.map(note => <Note onMouseDown={(e)=>handleDragStart(note,e)} ref={noteRefs.current[note.id]?noteRefs.current[note.id]:(noteRefs.current[note.id]= createRef()) } key={note.id} {...note} />)}
    </div>
  )
}

const Note = forwardRef(({id,title, content,position,...props},ref) => {
  return (
    <div ref={ref} {...props} className="border-2 w-fit rounded-sm   p-4 bg-yellow-50" style={{
      position:'absolute',
      left:`${position?.x}px`,
      top:`${position?.y}px`,
      cursor:'move',
      userSelect:'none'
    }}>
      <h2>📌{title}</h2>
      <p>{content}</p>
    </div>
  )
  
})

export default DragableNotes
