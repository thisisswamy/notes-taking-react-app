import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Layout() {
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