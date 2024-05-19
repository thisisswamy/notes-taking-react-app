import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './reset.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object({
    password:yup.string().required("Password is required"),
    confirmPassword:yup.string().required("Confirm password is required").oneOf([yup.ref('password')], 'Password mismatch')
})

function ResetPassword() {


    const navigate =useNavigate()
  const [isSubmitted,setIsSubmitted] = useState(false);
  
  const {register,handleSubmit,formState: { errors },} = useForm({
    resolver:yupResolver(schema),
    mode:'onTouched'
  });

  const submit =()=>{
    setIsSubmitted((prev:any)=>true)
    navigate('/login')
  }

  return (
    <div className="main">
      {/* <Header></Header> */}
      <div className="wrapper-1">
      <div className="login-form">
        <div className="title">
          <h2>Reset Password</h2>
        </div>
        <div className="form-group">
          <input type="text" placeholder='Password'  {...register('password')} className={ errors.password ? 'error-input' :''} />
          <small className="error-msge">{errors.password?.message}</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder='Confirm Password'  {...register('confirmPassword')} className={ errors.confirmPassword ? 'error-input' :''} />
          <small className="error-msge">{errors.confirmPassword?.message}</small>
        </div>
        <div className="button-area">
          <button onClick={handleSubmit(submit)} disabled={isSubmitted} className={isSubmitted?'disable-btn':''}>Submit</button>
        </div>
      </div>
       
    </div>
    </div>
  )
}

export default ResetPassword;