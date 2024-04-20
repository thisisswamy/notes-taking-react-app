import { Outlet, useNavigate } from "react-router-dom"
import { DataService } from "../../common/services/DataService"
import './Home.scss'
import ConfirmationPopup from '../../common/components/confirmation-popup/ConfirmationPopup';
import { useState } from "react";
function Home() {
  const dataService = new DataService()
  const navigate = useNavigate()
  const [isDeleteClicked, setDeleteBtnClick] =useState<any>(false)

  const logout =()=>{
    dataService.set('isLoggedIn',false)
    navigate('/login')
  }

  const confimDeleteEventListner = (data:any)=>{
    setDeleteBtnClick(false)
    console.log("from home comp : ", data)
  }
  const onDelete = ()=>{
    setDeleteBtnClick(true)
  }
  const goToWrite = ()=>{
    navigate('/write')
  }
  return (
    <div className="home-wrapper">
       <div className="get-started">
        <p>Welcome  Buddy !</p>
         <button onClick={goToWrite}> Start taking Notes...</button>
       </div>

       <div className="recent-notes">
        <div className="section-title">
          <h2>Recent Notes</h2>
           <div className="cards-area">
            <div className="note-card">
              <div className="card-header">
                <p>Personal Details</p>
                <small>12 Apr 2024</small>
              </div>
              <div className="card-body">
                <small>1. this is first app.</small>
              </div>
              <div className="card-actions">
                <button>Edit</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </div>
           </div>

        </div>
       </div>
       {
         isDeleteClicked ? <div className="delete-popup">
                              <div className="popup">
                                  <ConfirmationPopup deleteEvent ={confimDeleteEventListner} />
                              </div>
                          </div>

                        : ''
       }
    </div>
  )
}

export default Home