import React from 'react';
import PeliculasSection from '../../components/Peliculas/PeliculasN';
import './Peliculas.css';
import Header from '../../components/Header/Header.js';

function Peliculas() {

    return (
        <>
        <Header />
        <section className="app-page">
            <section className="seccion-home">
                    <h1 className="seccion-titulo">Todas las películas</h1>
                    <PeliculasSection />
            </section>
        </section>
        </>
    );
}

export default Peliculas;
