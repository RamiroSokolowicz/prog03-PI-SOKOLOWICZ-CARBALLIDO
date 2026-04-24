import React from 'react';
import Registro from '../../components/Registro/Registro';
import Header from '../../components/Header/Header.js';


function Register() {
    return (
        <>
        <Header />
        <section className="app-page">
            <Registro />
        </section>
        </>
    );
}

export default Register;
