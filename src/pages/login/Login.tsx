import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Login.scss'
import { useDispatch } from 'react-redux'
import { endpoints } from '../../config/api/endpoints'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { updateUserLoggedInStatus } from '../../store/slices/userLoggedInSlice';
import { axiosInterceptorInstance } from '../../config/axios/axioIntance';


const schema = yup.object({
  username:yup.string().required("Username required."),
  password:yup.string().required("Password required."),
})

function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [isSubmitted,setIsSubmitted] = useState(false);
  const [hasError,setHasError] = useState(false);

  const {register, handleSubmit,formState: { errors } } = useForm({
    resolver:yupResolver(schema),
    mode:'onTouched'

  })

  const submit =(data:any)=>{
    setHasError(false);
    setIsSubmitted(true)
    const body ={
      username:data.username,
      password:data.password
    }
    axiosInterceptorInstance.post(endpoints.auth.authenticate,body)
      .then((res:any)=>{ //API Success
        dispatch(updateUserLoggedInStatus({
          isUserLoggedIn: true,
          userEmail:data.username
        }))
        localStorage.setItem('tokens',JSON.stringify(res.data))
        navigate("/home")
      })
      .catch((error:any)=>{
        setHasError(true);
      })
      .finally(()=>{ //Finall always
        setIsSubmitted(false)
      })
    console.log(isSubmitted)
  }
  const forgotPass =()=> navigate('/forgot-password')
  return (
    <div className="main">
      {/* <Header></Header> */}
      <div className="login-wrapper">
      <div className="login-form">
        <div className="title">
          <h2>Login</h2>
        </div>
          <form>
              {
              hasError ? 
              <div className="error-msg">
                <small className='error-msg-note'>Invalid username/password</small>
              </div> 
              : ''
            }
            <div className="form-group">
              <input type="text" placeholder='Username' {...register('username')} />
              <small className="error-msge">{errors.username?.message}</small>
            </div>
            <div className="form-group">
              <input type="text" placeholder='Password' {...register('password')} />
              <small className="error-msge">{errors.password?.message}</small>
            </div>
            <small onClick={forgotPass}>Forgot password</small>
            <div className="button-area">
              <button onClick={handleSubmit(submit)} disabled={isSubmitted} className={isSubmitted?'disable-btn':''}>Login</button>
            </div>
          </form>
      </div>
       
    </div>
    </div>
  )
}

export default Login