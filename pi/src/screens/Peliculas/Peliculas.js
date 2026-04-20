import React from 'react';
import PeliculasSection from '../../components/Peliculas/Peliculas';
import './Peliculas.css';

function Peliculas() {
    return (
        <section className="app-page">
            <section className="seccion-home">
                    <h1 className="seccion-titulo">Todas las películas</h1>
                    <PeliculasSection />
            </section>
        </section>
    );
}

export default Peliculas;
