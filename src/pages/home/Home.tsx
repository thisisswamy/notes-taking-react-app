import { useNavigate } from "react-router-dom";
import './Home.scss'
import ConfirmationPopup from '../../common/components/confirmation-popup/ConfirmationPopup';
import { useEffect, useState } from "react";

import { endpoints } from '../../config/api/endpoints';
import { useSelector } from "react-redux";
import { RootState } from '../../store/reducers/Store';
import { axiosInterceptorInstance } from "../../config/axios/axioIntance";
import Loader from "../../common/components/loader/Loader";
import NotesCard from "../../common/components/notes-card/NotesCard";
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const navigate = useNavigate()

  const {userEmail,userId} = useSelector((state:RootState)=>state.userProfile)
  // const [userName, setUsername] = useState('')
  const [isDeleteClicked, setDeleteBtnClick] =useState<any>(false)
  const [notesList, updateNotesList] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<any>();


  useEffect(()=>{
    setIsDataLoading(true)
      if(userEmail){
        getAllNotes(userId)
      }

  },[userId])

  const getAllNotes = (userId?:any)=>{
    updateNotesList([])
    let url = endpoints.notes.notesList
    const endpoint = url.replace("{id}",userId)
    axiosInterceptorInstance.get(endpoint)
    .then((res:any)=>{
      updateNotesList(res.data)
    })
    .catch((error:any)=>console.log(error))
    .finally( ()=>setIsDataLoading(false))
  }


  const confimDeleteEventListner = (data:any)=>{
    if(data && data.isDelete){
      deleteNote()
    }else{
      setDeleteBtnClick(false)
    }
    
  }
  const deleteNote = ()=>{
    const url = endpoints.notes.delete.replace("{id}", selectedNote?.id)
    axiosInterceptorInstance.delete(url).then(()=>{
      setDeleteBtnClick(false)
      setIsDeleted(false);
      setIsDataLoading(true)
      getAllNotes(userId)

    }).catch(()=>{
      setIsDeleted(true);
    })
  }
  const onDelete = (note:any)=>{
    setSelectedNote(note)
    setDeleteBtnClick(true)
  }
  const goToWrite = ()=>{
    navigate('/write')
  }
  return (
    <div className="home-wrapper">
      
       <div className="get-started">
        <div className="greet-note">
          {/* <p>Welcome <strong> {userName}.</strong></p> */}
          <p>Welcome <strong>USER NAME.</strong></p>
        </div>
         <div className="write-button">
          <button onClick={goToWrite}> Start taking Notes</button>
         </div>
       </div>

       <div className="recent-notes">
        <div className="section-title">
          <h2>Recent Notes</h2>
            {
              isDataLoading && 
              <div className="loader-area" key={new Date().getTime()}>
                <Loader  key={new Date().getTime()+780}/> 
              </div>
            }

            <div className="cards-area">
                {
                   notesList.length>=1 ?
                    notesList.map((note:any)=> <NotesCard key={uuidv4()} note ={note}  triggerDelete ={onDelete}/>)

                    :
                    (!isDataLoading) ? 
                    <>
                      <div className="empty-list">
                        <p className="no-records">No notes created at ! start writing..</p>
                      </div>
                     </> : ''


                }
            </div>
          

        </div>
       </div>
       {
         isDeleteClicked ? <div className="delete-popup">
                              <div className="popup">
                                  <ConfirmationPopup deleteEvent ={confimDeleteEventListner}  isDeletedFlag ={isDeleted}/>
                              </div>
                          </div>

                        : ''
       }
    </div>
  )
}

export default Home