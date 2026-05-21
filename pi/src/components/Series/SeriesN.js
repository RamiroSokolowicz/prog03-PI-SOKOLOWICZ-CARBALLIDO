import {useEffect, useState} from 'react';
import SeriesCard from '../SeriesCard/SeriesCard';

const api = 'https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51';

function SeriesSection(props) {
    const [series, setSeries] = useState([]);
    const [proxPag, setProxPag] = useState(null);
    const [seriesFiltradas, setSeriesFiltradas] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                setSeries(data.results);
                setProxPag(`https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`);
                setSeriesFiltradas(data.results);
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    }, []);

    function masSeries() {
            fetch(proxPag)
                .then((response) => response.json())
                .then((data) =>{
                    setSeries(series.concat(data.results));
                    setSeriesFiltradas(series.concat(data.results));
                    setProxPag(`https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`);
                })
                .catch((error) => console.error('Ocurrió un error:', error));
    } ;

    function controlarForm(evento){
        evento.preventDefault();
    };

    function controlarImput(evento){
        setTexto(evento.target.value);
        filtrarSeries(evento.target.value);
    }

    function filtrarSeries(texto){
        let Filtradas = series.filter(serie => serie.name.toLowerCase().includes(texto.toLowerCase()));
        setSeriesFiltradas(Filtradas);
    }

    return (
        <div>
            <form className='formulario-busqueda' onSubmit={controlarForm}>
                <input type="text" value={texto} onChange={controlarImput} placeholder="Buscar serie..." />
            </form>
            <div className="cardContainer">
                {seriesFiltradas.map((serie) => (
                    <SeriesCard key={serie.id} data={serie} />
                ))}
            </div>
            <button className='cargarMas' onClick={masSeries}>Cargar más</button>
        </div>
    );  
}


export default SeriesSection;