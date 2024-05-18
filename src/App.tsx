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

  useEffect(()=> {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

  },[])
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
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
