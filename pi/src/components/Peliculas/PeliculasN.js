import {useState, useEffect} from 'react';
import PeliCard from '../PeliCard/PeliCard';

const api = 'https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51';

function PeliculasSection() {
    const [peliculas, setPeliculas] = useState([]);
    const [proxPag, setProxPag] = useState(null);
    const [texto, setTexto] = useState('');
    const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);

    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                setPeliculas(data.results);
                setProxPag(`https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`);
                setPeliculasFiltradas(data.results);
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    }, []);

    function masPeliculas() {
            fetch(proxPag)
                .then((response) => response.json())
                .then((data) =>{
                    setPeliculas(peliculas.concat(data.results)),
                    setPeliculasFiltradas(peliculas.concat(data.results)),
                    setProxPag(`https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`);
                })
                .catch((error) => console.error('Ocurrió un error:', error));
    } [];

    function controlarForm(evento){
        evento.preventDefault();
    };

    function controlarImput(evento){
        setTexto(evento.target.value);
        filtrarPeliculas(evento.target.value);
    }

    function filtrarPeliculas(texto){
        let Filtradas = peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(texto.toLowerCase()));
        setPeliculasFiltradas(Filtradas);
    }

    return (
        <div>
            <h2>Películas Populares</h2>
            <form onSubmit={controlarForm}>
                <input type="text" value={texto} onChange={controlarImput} placeholder="Buscar película..." />
            </form>
            <div className="peliculas-container">
                {peliculasFiltradas.map((pelicula) => (
                    <PeliCard key={pelicula.id} pelicula={pelicula} />
                ))}
            </div>
            <button onClick={masPeliculas}>Cargar más</button>
        </div>
    );
}

export default PeliculasSection;
