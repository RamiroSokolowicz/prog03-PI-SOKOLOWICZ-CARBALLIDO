import {useState, useEffect} from 'react';
import Header from '../../components/Header/Header.js';


function Resultados(props) {
    const [resultados, setResultados] = useState([]);
    const [tipo, setTipo] = useState(null);

    useEffect(() => {
        const busqueda = props.match.params.busqueda;
        const tipo = props.match.params.tipo;

        if (tipo === "movie") {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}&api_key=baa0951159508b20d0796a6a16699e51`)
                .then(response => response.json())
                .then(data => {
                    setResultados(data.results);
                })
                .catch((error) => console.error('Ocurrió un error:', error));
        }
        else {
            fetch(`https://api.themoviedb.org/3/search/tv?query=${busqueda}&api_key=baa0951159508b20d0796a6a16699e51`)
                .then(response => response.json())
                .then(data => {
                    setResultados(data.results);
                })
                .catch((error) => console.error('Ocurrió un error:', error));
        }                
        }, []);

    return (
        <>
        <Header />

        <div>
            <h1>Resultados de busqueda para: {props.match.params.busqueda}</h1>
            <section className='cardContainer'>
                {resultados.map((resultado) => (
                    <div key={resultado.id}>
                    <h2>Nombre : {resultado.title || resultado.name}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500${resultado.poster_path}`} alt={resultado.title || resultado.name} />
                    <p>Descripción : {resultado.overview}</p>
                    </div>
                ))}
            </section>

        </div>
        </>
    )
}

export default Resultados;