import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <nav className="app-nav-wrapper">
            <ul className="nav nav-tabs my-4 app-nav-list">
                {
                props.opcionesMenu.map((opcion, index) => (
                    <li className="nav-item" key={index}>
                        <Link className="nav-link app-nav-link" to={opcion.path}>{opcion.name}</Link>
                    </li>
                ))
                }
            </ul>
        </nav>
    );
}

export default NavBar;
