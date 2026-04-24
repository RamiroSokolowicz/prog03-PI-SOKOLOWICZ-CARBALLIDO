import React from 'react';
import Login from '../../components/Login/Login';
import Header from '../../components/Header/Header.js';


function Log() {
    return (
        <>
        <Header />
        <section className="app-page">
            <Login />
        </section>
        </>
    );
}

export default Log;
