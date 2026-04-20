import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
    return (
        <nav className="app-nav-wrapper">
            <ul className="app-nav-lista">
                {
                props.opcionesMenu.map((opcion, index) => (
                    <li key={index}>
                        <Link className="app-nav-link" to={opcion.path}>{opcion.name}</Link>
                    </li>
                ))
                }
            </ul>
        </nav>
    );
}

export default NavBar;
