import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./common/components/footer/Footer";
import Header from "./common/components/header/Header";
import { DataService } from "./common/services/DataService";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducers/Store";

function App() {
 
  
  const {isUserLoggedIn,userName, userRoles} = useSelector((state:RootState)=> state.userLoggedIn)

  return (
    <div className="main-container">
      <header>
        <Header />
      </header>
      <div className="main-content">
        { isUserLoggedIn ? <Outlet /> : <Navigate to='/login'  />}
      </div>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
