import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {


    const [isSubmitted,setIsSubmitted] = useState(false);
    const navigate = useNavigate()

    const submit =()=>{
        setIsSubmitted((prev:any)=>true)
        navigate('/home')
        console.log(isSubmitted)
      }
  return (
    <div className="main">
      {/* <Header></Header> */}
      <div className="wrapper-1">
      <div className="login-form">
        <div className="title">
          <h2>Signup</h2>
        </div>
        <div className="form-group">
          <input type="text" placeholder='Email' />
        </div>
        <div className="form-group">
          <input type="text" placeholder='Username' />
        </div>
        <div className="form-group">
          <input type="text" placeholder='Password' />
        </div>
        <div className="form-group">
          <input type="text" placeholder='Confirm Password' />
        </div>
        <div className="button-area">
          <button onClick={submit} disabled={isSubmitted} className={isSubmitted?'disable-btn':''}>Signup</button>
        </div>
      </div>
       
    </div>
    </div>
  )
}

export default Signup