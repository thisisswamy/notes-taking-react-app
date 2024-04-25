import React, { useState } from 'react'
import { DataService } from '../../common/services/DataService'
import { useNavigate } from 'react-router-dom'
import './Login.scss'
import Header from '../../common/components/header/Header'
import { useDispatch } from 'react-redux'
import { updateUserLoggedInStatus } from '../../store/slices/userLoggedInSlice'
function Login() {

  const dataService = new DataService()
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const [isSubmitted,setIsSubmitted] = useState(false);

  const submit =()=>{
    dataService.set('isLoggedIn',true)
    setIsSubmitted((prev:any)=>true)
    dispatch(updateUserLoggedInStatus({
        isUserLoggedIn:true,
        userName:"swamy",
        userRoles:['ADMIN'], 
    }))
    navigate('/home')
    console.log(isSubmitted)
  }
  const forgotPass =()=> navigate('/forgot-password')
  return (
    <div className="main">
      {/* <Header></Header> */}
      <div className="wrapper-1">
      <div className="login-form">
        <div className="title">
          <h2>Login</h2>
        </div>
        <div className="form-group">
          <input type="text" placeholder='Username' />
        </div>
        <div className="form-group">
          <input type="text" placeholder='Password' />
        </div>
        <small onClick={forgotPass}>Forgot password</small>
        <div className="button-area">
          <button onClick={submit} disabled={isSubmitted} className={isSubmitted?'disable-btn':''}>Login</button>
        </div>
      </div>
       
    </div>
    </div>
  )
}

export default Login