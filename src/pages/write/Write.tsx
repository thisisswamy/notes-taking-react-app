import { useEffect, useMemo, useState } from 'react';
import './Write.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {convert } from 'html-to-text';
import { DataService } from '../../common/services/DataService';
import { endpoints } from '../../config/api/endpoints';
import { axiosInterceptorInstance } from '../../config/axios/axioIntance';
import { useParams } from 'react-router-dom';
import Loader from '../../common/components/loader/Loader';

type RequestState ={
   isSubmited?:boolean,
   isSuccess?:boolean,
   isFailure?:boolean
}

function Write() {
  const [editorState,setEditorState] = useState<any>();
  const [notesTitle,setNotesTitle] = useState<any>('');
  const [editorNoteAvailable,setEditorNoteAvailable] = useState<boolean>(false);
  const [requestState,setRequestState] = useState<RequestState>({
                                                   isFailure:false,
                                                   isSubmited:false,
                                                   isSuccess:false
                                                });
  const  dataService = useMemo(()=> new DataService(),[])
  const {id} = useParams()
  const [isDataLoading, setIsDataLoading] = useState(false);

  
  useEffect(()=>{
      if(id!==null && id!==''){
         setEditNote(id)
      }
  },[])

  const setEditNote = (id:any)=>{
   setEditorNoteAvailable(true)
   setIsDataLoading(true)
   const url = endpoints.notes.view.replace("{id}",id)
   axiosInterceptorInstance.get(url).then((res:any)=>{
      setEditorState(res.data.notesText)
      setNotesTitle(res.data.title)
   }).catch((err:any)=>{
      setEditorNoteAvailable(false)
      
   }).finally(()=>setIsDataLoading(false))
  }
  const titleText =(e:any)=>{
      setNotesTitle((prev:any)=> e.target.value)
  }
  const getBody =()=>{
      return {
         "title" :notesTitle,
         "notesText":editorState,
         "userId":dataService.get("userProfile")?.id
      }
  }

  const save =()=> {

   setRequestState({
      isFailure:false,
      isSuccess:false,
      isSubmited:true
   })
   if(id){
      updateNote(id);
      return;
   }
   const body = getBody()
   axiosInterceptorInstance.post(endpoints.notes.save,body)
         .then((res:any)=>{
            setRequestState({...requestState,isSuccess:true})
            window.scrollTo({
               top:0,
               behavior:"smooth"
            })
            
         }).catch((err:any)=>{
            setRequestState({ ...requestState,isFailure:true
            })
         })
         // .finally(()=>setRequestState({...requestState,isSubmited:false}))
  }
  const updateNote =(id:any)=>{
   const data = getBody();
   const body ={
      ...data, id:id
   }
   const url = endpoints.notes.update.replace("{id}",id)
   axiosInterceptorInstance.put(url,body).then((res:any)=>{
      setRequestState({...requestState,isSuccess:true})
            window.scrollTo({
               top:0,
               behavior:"smooth"
            })

   }).catch((err:any)=>{
      setRequestState({ ...requestState,isFailure:true
      })
   })
  }

  return (
    <div className="write-notes">
      <div className="error-success-note">
         
         {
            id && !editorNoteAvailable && <small className='error-note'>Failed to load note ! try again </small>
         }
         
         {  requestState?.isSuccess && <><small className='success-note'>Note saved successfully</small></> 
         }
         {
            requestState?.isFailure &&  <><small className='error-note'>Failed to save note </small></>
         }  
      </div>
       {
         isDataLoading ? <Loader/>
         :
         <>
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
                  <button onClick={save} disabled={requestState?.isSubmited} className={requestState?.isSubmited ?'disable-btn':''}>save</button>
            </div>
         </>

       }
        
    </div>

  )
}

export default Write