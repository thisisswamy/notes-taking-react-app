
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store/reducers/Store';
import { updateUserLoggedInStatus } from '../../../store/slices/userLoggedInSlice';


function Header() {


  const {isUserLoggedIn} = useSelector((state:RootState)=> state.userLoggedIn);
  const navigate =useNavigate()
  const dispatch =useDispatch()

  const logout =()=>{
    dispatch(updateUserLoggedInStatus({
      isUserLoggedIn: false,
      userName: '',
      userRoles: []
    }))
    navigate('/')
  }


  return (
    <div className="header-wrapper">
      <div className="header-title-menu">
        <div className="title">
          <h2>Notes Taking App</h2>
          <small>Start Writing..</small>
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