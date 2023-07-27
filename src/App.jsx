
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './components/Home/Home';
import Masterlayout from './components/Masterlayout/Masterlayout';
import About from './components/About/About';
import Movies from './components/Movies/Movies';
import Tv from './components/tv/Tv';
import Login from './components/Login/Login';
import Regsiter from './components/Regsiter/Regsiter';
import People from './components/People/People';
import Notfound from './components/NotFound/Notfound';
import MovieDetils from './components/MovieDetils/MovieDetils';
import Search from './components/Search/Search';
import ForgetPass from './components/ForgetPass/ForgetPass.jsx';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import UpdataPass from './components/UpdataPass.jsx/UpdataPass.jsx';
import axios from 'axios';

function App() {
let [user, setUser] = useState(null)


  useEffect(() => { /* check zyada */
    if (localStorage.getItem('token') != null) { // mlyan
      saveUserData()
    } 
  }, [])



  function saveUserData() {
    let token = localStorage.getItem('token')
    //token
    let data = jwt_decode(token)
    //decode- fok al token 
    setUser(data)
    //setuset- yt7t fy al user

  }

  function ProtectedRouter(props) {
    if (localStorage.getItem("token") == null) {
      //login
      return <Navigate to='/login' /> // 
    }
    else {
      //path
      return props.children
    }

  }

  async function LogOut() {
    if (user) {
      try {
        await axios.post('http://localhost:5000/auth//log-out', user)
      } catch (error) {
        console.log(error);
      }
  
    }
    
    localStorage.removeItem('token')
    setUser(null)
    return <Navigate to='/login' />

  }



  let Routers = createBrowserRouter([
    {
      path: '/', element: <Masterlayout user={user} LogOut={LogOut} />, children: [
        { path: '/', element: <ProtectedRouter><Home /></ProtectedRouter> }, // index : true
        { path: 'home', element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: 'about', element: <ProtectedRouter><About /></ProtectedRouter> },
        { path: 'movies', element: <ProtectedRouter><Movies /></ProtectedRouter> },
        { path: 'moviedetils/:id/:type', element: <ProtectedRouter><MovieDetils /></ProtectedRouter> },
        { path: 'people', element: <ProtectedRouter><People /></ProtectedRouter> },
        { path: 'tv', element: <ProtectedRouter><Tv /></ProtectedRouter> },
        { path: 'search', element: <ProtectedRouter><Search /></ProtectedRouter> },
        { path: 'login', element: <Login saveUser={saveUserData} /> },
        { path: 'ForgetPass', element: <ForgetPass /> },
        { path: 'ForgetPass/UpdataPass', element: <UpdataPass /> },
        { path: 'regsiter', element: <Regsiter /> },
        { path: '*', element: <Notfound /> }
      ]
    }


  ])


  return (
    <RouterProvider router={Routers} />
  );
}

export default App;