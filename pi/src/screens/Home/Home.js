import React from 'react';
import MiFormulario from '../../components/MiFormulario/MiFormulario';

function Home() {
    return (
        <section className="app-page">
            <h2 className="app-page-title">Home</h2>
            <p className="app-page-text">Esta pantalla queda lista para sumar las secciones principales de peliculas y series.</p>
            <MiFormulario />
        </section>
    );
}

export default Home;
