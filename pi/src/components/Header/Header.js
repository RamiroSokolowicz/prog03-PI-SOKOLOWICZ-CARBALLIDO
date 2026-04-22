import React from 'react';
import NavBar from '../NavBar/NavBar';
import Cookies from 'universal-cookie';
import './Header.css';

const cookies = new Cookies();

function Header() {
    const usuarioLogueado = cookies.get('user-auth-cookie');
    let opciones = [];

    if (usuarioLogueado) {
        opciones = [
        { name: 'Home', path: '/' },
        { name: 'Peliculas', path: '/peliculas' },
        { name: 'Series', path: '/series' },
        { name: 'Favoritas', path: '/favoritas' },  
        { name: 'Logout', path: '/logout' }
    ];
    } else {
        opciones = [
            { name: 'Home', path: '/' },
            { name: 'Peliculas', path: '/peliculas' },
            { name: 'Series', path: '/series' },
            { name: 'Login', path: '/login' },
            { name: 'Registro', path: '/registro' }
    ];
    }

    return (
        <header className="header-app">
            <h1 className="app-title">UdeSA Movies</h1>
            <NavBar opcionesMenu={opciones} />
        </header>
    );
}

export default Header;
