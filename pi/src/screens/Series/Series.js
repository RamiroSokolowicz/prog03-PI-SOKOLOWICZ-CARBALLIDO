import React from 'react';
import SeriesSection from '../../components/Series/SeriesN';
import Header from '../../components/Header/Header.js';


function Series() {
    return (
        <>
        <Header />
        <section className="app-page">
        <section className="seccion-home">
                <h1 className="seccion-titulo">Todas las Series</h1>
                <SeriesSection />
        </section>
    </section>
    </>
    );}

export default Series;
