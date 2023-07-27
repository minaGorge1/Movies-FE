import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Masterlayout({user , LogOut}) {
  return (
    <>
    <Navbar user={user} LogOut={LogOut}/>
    <div className='mt-4 container'>
    <Outlet/>
    </div>
    </>
  )
}
