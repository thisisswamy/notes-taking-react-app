import { useNavigate } from "react-router-dom";
import './Home.scss'
import ConfirmationPopup from '../../common/components/confirmation-popup/ConfirmationPopup';
import { useEffect, useMemo, useState } from "react";

import { endpoints } from '../../config/api/endpoints';
import { useSelector } from "react-redux";
import { RootState } from '../../store/reducers/Store';
import { DataService } from "../../common/services/DataService";
import { axiosInterceptorInstance } from "../../config/axios/axioIntance";
import {convert } from 'html-to-text';
import Loader from "../../common/components/loader/Loader";


function Home() {
  const navigate = useNavigate()

  const {userEmail,userId,userName} = useSelector((state:RootState)=>state.userProfile)
  // const [userName, setUsername] = useState('')
  const dataService =useMemo(()=>new DataService(),[])
  const [isDeleteClicked, setDeleteBtnClick] =useState<any>(false)
  const [notesList, updateNotesList] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<any>();
  const tokens :any = JSON.parse(localStorage.getItem("tokens")!);


  useEffect(()=>{
    setIsDataLoading(true)
    // let url = endpoints.user.byEmail
    // const endpoint = url.replace("{email}",String(userEmail))
    // axiosInterceptorInstance.get(endpoint).then((res:any)=>{
    //   dataService.set("userProfile",res.data)
    //   setUsername(res.data.username)
      if(userEmail){
        getAllNotes(userId)
      }
      console.log("user id "+userId)
    // })
    // .catch((err:any)=>{
      
    // })

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

  const logout =()=>{
    navigate('/login')
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
    axiosInterceptorInstance.delete(url).then((res:any)=>{
      setDeleteBtnClick(false)
      setIsDeleted(false);
      setIsDataLoading(true)
      
      getAllNotes(dataService.get("userProfile").id)

    }).catch((err:any)=>{
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
        <p>Welcome <strong> {userName}</strong></p>
         <button onClick={goToWrite}> Start taking Notes...</button>
       </div>

       <div className="recent-notes">
        <div className="section-title">
          <h2>Recent Notes</h2>
          {
              isDataLoading && <div className="loader-area" key={new Date().getTime()}>
                <Loader  key={new Date().getTime()+780}/> 
              </div>
            }
           <div className="cards-area">
            
            {
              notesList.length>0 
              ?
              notesList.map((ele:any)=> 
                    <>
                      <div className="note-card" key={ele?.id} >
                        <div className="card-header" onClick={()=> navigate('/edit/'+ele.id)}>
                          <p>{ ele?.title}</p>
                          <small>
                            {
                              `${new Date(ele.writtendate).getDate()}/${new Date(ele.writtendate).getMonth()}/${new Date(ele.writtendate).getFullYear()}`
                            }
                            </small>
                        </div>
                        <div className="card-body" onClick={()=> navigate('/edit/'+ele.id)}>
                          <small>{
                              convert(ele?.notesText)
                            }</small>
                        </div>
                        <div className="card-actions">
                          <button onClick={()=> onDelete(ele)}>Delete</button>
                        </div>
                      </div>
                    
                    </>)

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