import { click } from '@testing-library/user-event/dist/click';
import React from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';


export default function Navbar({ user, LogOut }) {

    /* async function search(e) {
        let value = e.target.value
        if (value != '') {
            Navigate('/search')
            let { data } = await axios.get(`https://api.themoviedb.org/3/search/collection?api_key=648620c0e7bc67ad57607a363d4863a5&language=en-US&query=${value}&page=1`)

        } else {Navigate('') }
    } */

    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent p-3 fs-5 ">
                <div className="container-fluid position-relative">
                    <Link className="navbar-brand fs-2" to='/' >Noxe</Link>
                    <button id='btn-list' className=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {user != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

                            <li className="nav-item mx-2">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='home' >Home</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='about' >About</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='movies' >Movies</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='people' >People</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='tv' >Tv Show</NavLink>
                            </li>
                            <div className=' position-absolute d-flex end-0'>
                                <form className="d-flex justify-content-end search" role="search">
                                    <input className="form-control me-2 bg-transparent text-white" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-primary" type="submit">Search</button>
                                </form>
                                <li className=" mx-3 nav-item">
                                    <span className="nav-link pointer" onClick={LogOut}>Logout</span>
                                </li>
                            </div>
                        </ul>

                            : <ul className="navbar-nav ms-auto mx-2 mb-lg-0">

                                <li className="nav-item d-flex align-items-center icons mx-4">
                                    <i className='fa-brands mx-2 fa-facebook'></i>
                                    <i className='fa-brands mx-2 fa-youtube'></i>
                                    <i className='fa-brands mx-2 fa-google'></i>
                                    <i className='fa-brands mx-2 fa-spotify'></i>
                                </li>
                                <li className="nav-item pointer">
                                    <NavLink className={({ isActive }) => isActive ? "pointer nav-link active" : "nav-link"} to='login' >Login</NavLink>
                                </li>
                                <li className="nav-item pointer">
                                    <NavLink className={ ({ isActive }) => isActive ? "pointer nav-link active" : " nav-link"} to='regsiter' >Regsiter</NavLink>
                                </li>

                            </ul>}





                    </div>
                </div>
            </nav>
        </>
    );
}

