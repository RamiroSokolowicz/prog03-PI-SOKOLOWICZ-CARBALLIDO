import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PeliCard.css';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function PeliCard(props) {
    const [mostrarMas, setMostrarMas] = useState(false);
    const [esFav, setEsFav] = useState(false);

    function mostrameMas() {
        setMostrarMas(!mostrarMas);
    }
    function agregarFavoritos(id) {
        let storage = localStorage.getItem('peliculasFavoritas');
        if (storage == null) {
            let favoritos = [id];
            localStorage.setItem('peliculasFavoritas', JSON.stringify(favoritos));
        }
        else {
            let storageParseado = JSON.parse(storage);
            storageParseado.push(id);
            localStorage.setItem('peliculasFavoritas', JSON.stringify(storageParseado));
        }
        setEsFav(!esFav);
    }
    function sacarFavoritos(id) {
        let storage = localStorage.getItem('peliculasFavoritas');
        if (storage != null) {
            let storageParseado = JSON.parse(storage);
            let favoritosFiltrados = storageParseado.filter(elem => elem !== id);
            localStorage.setItem('peliculasFavoritas', JSON.stringify(favoritosFiltrados));
        }
        setEsFav(!esFav);
    }
    useEffect(() => {
        let storage = localStorage.getItem('peliculasFavoritas');
        if (storage != null) {
            let storageParseado = JSON.parse(storage);
            if (storageParseado.includes(props.data.id)) {
                setEsFav(true);
            }
        }
    }, []);

    const usuarioLogueado = cookies.get('user-auth-cookie');
    return (
        <article className='single-card-movie'>
            <img className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
                alt={props.data.title}
            />
            <h2 className=''>{props.data.title}</h2>
            <button onClick={mostrameMas}>
                {mostrarMas ? "Ocultar descripción" : "Ver descripción"}
            </button>
            <section className={mostrarMas ? 'show' : 'hide'}>
                <p>{props.data.overview}</p>
            </section>
            <Link to={`detalle/movie/${props.data.id}`}>
                <button>Ir a detalle</button>
            </Link>

            {usuarioLogueado ? (

                <button className="btn alert-primary" onClick={() => esFav ? sacarFavoritos(props.data.id) : agregarFavoritos(props.data.id)}>
                    {esFav ? "🩶" : "❤️"}</button>
            ) : null}

        </article>
    );
}


export default PeliCard;