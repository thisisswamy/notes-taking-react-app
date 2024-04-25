import React, { useState } from 'react'
import './forgot.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


const schema = yup.object({
    email:yup.string().required("Email is required").email("Invalid Email")
})



function ForgotPassword() {



    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register,handleSubmit,watch,formState: { errors }} = useForm({
                                                                            resolver:yupResolver(schema),
                                                                            mode:'onTouched'
                                                                        });
    
    const submit =(data:any)=>{
        console.log(data)
    }

  return (
    <div className="main">
      {/* <Header></Header> */}
      <div className="forgot-form-wrapper">
        <div className="forgot-form">
          <div className="title">
            <h2>Forgot Password</h2>
          </div>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Email"  {...register('email')}  className={ errors.email ? 'error-input' :''} /> <br />
              <small className="error-msge">{errors.email?.message}</small>
            </div>
            
            <div className="button-area">
              <button
                onClick={handleSubmit(submit)}
                disabled={isSubmitted}
                className={isSubmitted ? "disable-btn" : ""}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword