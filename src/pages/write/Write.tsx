

import { useEffect, useState } from 'react';
import './Write.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {convert } from 'html-to-text';
import { DataService } from '../../common/services/DataService';

function Write() {

  const [editorState,setEditorState] = useState<any>();
  const [notesTitle,setNotesTitle] = useState<any>('');
  const planetext = convert(editorState);
  let dataService = new DataService();
  
  useEffect(()=>{
   const data = dataService.get('note')
   console.log("first load :: ",data)
   setEditorState(data?.notes)
   setNotesTitle(data?.title)
   

  },[])

  const titleText =(e:any)=>{
      setNotesTitle((prev:any)=> e.target.value)
  }

  const save =()=> {
   dataService.set('note',{
      title:notesTitle,
      notes : editorState
   })
  }

  return (
    <div className="write-notes">
        <div className="note">
           <div className="note-heading">
              <input type="text" placeholder="Title name"  onChange={titleText}  value={notesTitle}/>
           </div>
           <div className="note-area">
              <ReactQuill theme="snow" value={editorState} onChange={setEditorState} 
              className='editor-class'
            />
           </div>
        </div>
        <div className="button-area">
         <button onClick={save}>save</button>
        </div>

    </div>

  )
}

export default Write