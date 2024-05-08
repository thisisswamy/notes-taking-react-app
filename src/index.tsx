import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import Login from './pages/login/Login';
import Write from './pages/write/Write';
import LandingPage from './pages/landing/LandingPage';
import Signup from './pages/signup/Signup';
import { Provider } from 'react-redux';
import { store } from './store/reducers/Store';
import Layout from './common/components/Layout/Layout';
import ForgotPassword from './pages/forgot/ForgotPassword';
import ResetPassword from './pages/reset/ResetPassword';


const router = createBrowserRouter([
  {
    path:'',
    element:<App/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/write',
        element:<Write/>
      },
      {
        path:'/edit/:id',
        element:<Write/>
      },
      {
        path:'/account',
        element:<Account/>
      },
      {
        path:'dev',
        element:<LandingPage />
      },
      // {
      //   path:'/login',
      //   element:<Login/>
      // },
      // {
      //   path:'/signup',
      //   element:<Signup/>
      // },
      
    ]
  },
  {
    path:'',
    element:<Layout></Layout>,
    children:[
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/forgot-password',
        element:<ForgotPassword/>
      },

      {
        path:'reset-password',
        element:<ResetPassword/>
      }
    ]
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
    
  </React.StrictMode>
);


reportWebVitals();
