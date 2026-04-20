import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Header.css';

function Header() {
    const opciones = [
        { name: 'Home', path: '/' },
        { name: 'Peliculas', path: '/peliculas' },
        { name: 'Series', path: '/series' },
        { name: 'Favoritas', path: '/favoritas' },
        { name: 'Registro', path: '/register' },
        { name: 'Login', path: '/login' }
    ];
    return (
        <header className="header-app">
            <h1 className="app-title">UdeSA Movies</h1>
            <NavBar opcionesMenu={opciones} />
        </header>
    );
}

export default Header;
