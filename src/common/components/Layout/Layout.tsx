import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useEffect } from 'react';

function Layout() {
  useEffect(()=> {
     document.documentElement.setAttribute('data-theme', 'dark')
    console.log("from app")
  },[])
  return (
    <div>
      <div className="main-container">
      <header>
        <Header />
      </header>
      <div className="main-content">
       <Outlet></Outlet>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
    </div>
  )
}

export default Layout