import React, { useContext, useEffect } from 'react'
import styles from './NavBar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { UserDataContext } from '../../Context/LoginDataContext'

export default function NavBar() {
    let {userData ,LogOutFunc}= useContext(UserDataContext);

  return (
    <>

            <nav className="navbar navbar-expand-lg navbar-transparent bg-light">
            <div className="container ">
                <Link className=' text-decoration-none txtNice fs-3'>  Notes </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">

                {
                    userData==null ?
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
                    <li className="nav-item mx-lg-2 mx-md-2">
                    <NavLink to={'/register'} className={({isActive})=>isActive?'nav-link bgNice text-decoration-none rounded-pill text-white fw-bold':'nav-link text-decoration-none rounded-pill'}> Sign Up </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={'/login'} className={({isActive})=>isActive?'nav-link bgNice text-decoration-none rounded-pill text-white fw-bold':'nav-link text-decoration-none rounded-pill'} > Sign In </NavLink>
                    </li>
                </ul>
                    :
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li>
                        <NavLink onClick={LogOutFunc} className={({isActive})=>isActive?'nav-link bgNice text-decoration-none rounded-pill text-white fw-bold':'nav-link text-decoration-none rounded-pill'}  > Sing Out</NavLink>
                    </li>
                </ul>

                }

                </div>
            </div>
            </nav>

      
    </>
  )
}
