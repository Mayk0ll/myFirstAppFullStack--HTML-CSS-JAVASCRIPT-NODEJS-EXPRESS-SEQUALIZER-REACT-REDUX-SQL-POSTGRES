import React from 'react'
import { NavLink, Link } from "react-router-dom";
import './estilos.css/NavBar_module.css';

export const NavBar = (props) => {
    return (
        <nav className='navBar'>
            <div className="containerNav">
                <Link to={'/'}>
                    <div className="logo"></div>
                </Link>
                <div className="routes">
                    <NavLink exact to={'/'} className='itemNavBar'>Inicio</NavLink>
                    <NavLink to={'/razas'} className='itemNavBar'>Razas</NavLink>
                    <NavLink to={'/temperamentos'} className='itemNavBar'>Temperamentos</NavLink>
                    <NavLink to={'/crearRaza'} className='itemNavBar'>Nueva Raza</NavLink>
                </div>
            </div>
        </nav>
    )
}
