import React from 'react'
import "./NotesCard.scss"
import { convert } from 'html-to-text'
import { useNavigate } from 'react-router-dom'
function NotesCard({note,triggerDelete}:any) {


   const navigate =useNavigate()

   const deleteNote = (note:any)=>{
      triggerDelete(note)
   }
  return (
    <div className="notes-card-wrapper">
        <div className="note-card">
             <div className="note-header" onClick={()=> navigate('/edit/'+note.id)}>
                <p>{note?.title}</p>
                <small className="tags">{ note.label ? note.label :'Default'}</small>
                 
             </div>
             <div className="note-body">
                <small>{convert(note?.notesText) }</small>
             </div>
             <div className="button-date">
                <button className='delete-btn' onClick={()=>deleteNote(note)}>Delete</button>
                <small className='note-date'>
                {
                              `${new Date(note.writtendate).getDate()}/${new Date(note.writtendate).getMonth()}/${new Date(note.writtendate).getFullYear()}`
               }
                </small>
             </div>
        </div>
    </div>
  )
}

export default NotesCard