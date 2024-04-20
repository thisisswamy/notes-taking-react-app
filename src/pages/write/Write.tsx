

import { useState } from 'react';
import './Write.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {convert } from 'html-to-text';

function Write() {

  const [editorState,setEditorState] = useState<any>();

  const planetext = convert(editorState);

  return (
    <div className="write-notes">
        <div className="note">
           <div className="note-heading">
              <input type="text" placeholder="Title name" />
           </div>
           <div className="note-area">
              <ReactQuill theme="snow" value={editorState} onChange={setEditorState} 
              className='editor-class'
              />
           </div>
        </div>

    </div>

  )
}

export default Write