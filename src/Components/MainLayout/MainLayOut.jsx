import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBr/NavBar'

export default function MainLayOut() {
  return (
    <>
    <div className='position-relative h-100 '>

    <NavBar/>
     <Outlet/>
    </div>

    </>
  )
}
