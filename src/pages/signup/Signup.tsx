import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import './Signup.scss';
import axios from 'axios'
import { endpoints } from "../../config/api/endpoints";
import { useDispatch } from "react-redux";
import { updateUserLoggedInStatus } from '../../store/slices/userLoggedInSlice';
const schema = yup.object({
                            email:yup.string().required('Email is required').email("Invalid Email"),
                            username:yup.string().required("Username is required").matches(/[a-zA-z0-9]+/g,'Invalid username'),
                            password:yup.string().required('Password is required'),
                            confirmPassword:yup.string().required("Confirm password is required").oneOf([yup.ref('password')], 'Password mismatch')
    
                          })
  .required()

function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {register,handleSubmit,formState: { errors }} = useForm({
    resolver:yupResolver(schema),
    mode:'onTouched',
    
  });

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const submit = (data:any) => {  
    const body ={
      "username":data?.userName,
      "email":data?.email,
      "password":data?.password,
      "confirmPassword":data?.confirmPassword
    }
    setIsSubmitted(true)
    axios.post(endpoints.baseURL()+endpoints.user.register,body)
      .then((response:any)=>{
        console.log(response)
        setIsSubmitted(false)
        dispatch(updateUserLoggedInStatus({
          isUserLoggedIn: true,
        }))
        navigator("/home")
      })
      .catch((error:any)=>{
        console.log(error)
        setIsSubmitted(false)
      })
    
  };
  return (
    <div className="main">
      {/* <Header></Header> */}
      <div className="sign-wrapper-1">
        <div className="sign-form">
          <div className="title">
            <h2>Signup</h2>
          </div>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Email"  {...register('email')}  className={ errors.email ? 'error-input' :''} /> <br />
              <small className="error-msge">{errors.email?.message}</small>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Username" {...register('username')}   className={ errors.username ? 'error-input' :''} /> <br />
              <small className="error-msge">{errors.username?.message}</small>

            </div>
            <div className="form-group">
              <input type="text" placeholder="Password"  {...register('password')}  className={ errors.password ? 'error-input' :''} /> <br />
              <small className="error-msge">{errors.password?.message}</small>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Confirm Password" {...register('confirmPassword')}   className={ errors.confirmPassword ? 'error-input' :''} />
              <small className="error-msge">{errors.confirmPassword?.message}</small>

            </div>
            <div className="button-area">
              <button
                onClick={handleSubmit(submit)}
                disabled={isSubmitted}
                className={isSubmitted ? "disable-btn" : ""}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
