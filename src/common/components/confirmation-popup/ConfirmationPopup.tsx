
import './confirmation-popup.scss'
export default function ConfirmationPopup( {deleteEvent,isDeletedFlag}:any) {

    const deleteNote = ()=>{
        console.log("deleted")
        deleteEvent({
            isDelete:true
        })
    }
    const cancel =()=>{
        deleteEvent({
            isDelete:false
        })
    }
  return (
    <div className="confirm-dialog">
        <div className="dialog-header">
            <h3>Confirm delete</h3>
        </div>
        <div className="dialog-body">
            {
                isDeletedFlag && <small className='error-note'>Failed to delete ! Please try again</small>
            }
            <p>Are you sure you want to delete this ?</p>
        </div>

        <div className="dialog-actions">
            <button className='delete-btn' onClick={deleteNote}>Delete</button>
            <button className= 'cancel-btn' onClick={cancel}>Cancel</button>
        </div>
    </div>
  )
}
