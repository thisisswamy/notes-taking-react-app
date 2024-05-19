import { Navigate, Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./common/components/footer/Footer";
import Header from "./common/components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducers/Store";
import { useEffect, useState } from "react";

function App() {
 
  
  const {isUserLoggedIn} = useSelector((state:RootState)=> state.userLoggedIn)
  const [theme, setTheme] = useState('light');
  const tokens = localStorage.getItem("tokens")

  return (
    <div className="main-container">
      <header>
        <Header />
      </header>
      <div className="main-content">
        { (isUserLoggedIn || tokens) ? <Outlet /> : <Navigate to='/login'  />}
      </div>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
