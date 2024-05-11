
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store/reducers/Store';
import { updateUserLoggedInStatus } from '../../../store/slices/userLoggedInSlice';
import { useEffect, useMemo } from 'react';
import { endpoints } from '../../../config/api/endpoints';
import { axiosInterceptorInstance } from '../../../config/axios/axioIntance';
import { DataService } from '../../services/DataService';
import { userProfileInfo } from '../../../store/slices/userProfileSlice';


function Header() {


  const {isUserLoggedIn} = useSelector((state:RootState)=> {
    return state.userLoggedIn
  });
  const navigate =useNavigate()
  const dispatch =useDispatch()
  const dataService = useMemo(()=>new DataService(),[]);

  useEffect(()=>{
    getUserProfile()
  },[])

  const getUserProfile = async ()=>{
    let url = endpoints.user.profile
    axiosInterceptorInstance.get(url).then((res:any)=>{
      dispatch(updateUserLoggedInStatus({
        isUserLoggedIn: true,
        userEmail:res.data.userName
      }))
      dispatch(userProfileInfo({
        userName: res.data.userName,
        userRoles: res.data.roles,
        userEmail: res.data.email,
        userId: res.data.reference,
        lastLoggedIn: new Date().getTime().toString()
      }))
    })
    .catch((err:any)=>{
      console.log(err)
    })
  }
  const logout =()=>{
    dispatch(updateUserLoggedInStatus({
      isUserLoggedIn: false,
    }))
    localStorage.clear()
    navigate('/')
  }



  return (
    <div className="header-wrapper">
      <div className="header-title-menu">
        <div className="title">
          <h2>Notes</h2>
          <small className='sub-heading'>Start Writing</small>
        </div>
        <div className="header-menu">
           {
            isUserLoggedIn ? 
              <ul>
                <li ><NavLink to='/home'  
                  className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} >Notes</NavLink></li>
                <li >
                <NavLink to='/write' 
                  className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} >Write</NavLink>
                </li>
              </ul>
            : ''
           }
            <div className="header-login">
              
              {
                isUserLoggedIn ? 
                <button onClick={logout} >Logout</button> 
                :
                <>
                  <button onClick={()=>navigate('/login')}>Login</button>
                  <button onClick={()=>navigate('/signup')}>Signup</button>
                </> 
                

              }
            </div>
        </div>
        

      </div>
    </div>
  )
}

export default Header;