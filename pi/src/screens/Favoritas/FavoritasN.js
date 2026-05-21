import {useState, useEffect} from 'react';
import Header from '../../components/Header/Header.js';
import PeliCard from '../../components/PeliCard/PeliCardN.js';
import SeriesCard from '../../components/SeriesCard/SeriesCardN.js';
import './Favoritas.css';


function Favoritas(props) {
    const [peliculas, setPeliculas] = useState([]);
    const [series, setSeries] = useState([]);
    useEffect(() => {
        let storagePeliculas = localStorage.getItem('peliculasFavoritas');
        let storageSeries = localStorage.getItem('seriesFavoritas');
        if (storagePeliculas != null) {
            let storageParseadoPelis = JSON.parse(storagePeliculas);
            let peliculasFavoritas = [];
            let seriesFavoritas = [];
            storageParseadoPelis.forEach(id => {
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=baa0951159508b20d0796a6a16699e51`)
                    .then((response) => response.json())
                    .then((data) => {
                        peliculasFavoritas.push(data);
                        setPeliculas(peliculasFavoritas);
                    })
                    .catch((error) => console.error('Ocurrió un error:', error));
            });

            if (storageSeries != null) {
                let storageParseadoSeries = JSON.parse(storageSeries);
                storageParseadoSeries.forEach(id => {
                    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=baa0951159508b20d0796a6a16699e51`)
                        .then((response) => response.json())
                        .then((data) => {
                            seriesFavoritas.push(data);
                            setSeries(seriesFavoritas);
                        })
                        .catch((error) => console.error('Ocurrió un error:', error));
                });
            }
        }}, []);
        return (
            <>
            <Header />
            <section className="app-page">
                <section className="seccion-home">

                    <div className='seccion-header'>
                        <h1>Películas Favoritas</h1>
                    </div>

                        {peliculas.length > 0 ? (
                            <section className='cardContainer'>
                                {peliculas.map((pelicula) => (
                                   <PeliCard 
                                   key={pelicula.id}
                                   data={pelicula}
                                   />                
                            ))}
                            </section>
                        ) : (
                            <p className='sin-favs'>No hay películas favoritas.</p>
                        )}
                </section>

                <section className="seccion-home">

                    <div className='seccion-header'>
                        <h1>Series Favoritas</h1>
                    </div>

                        {series.length > 0 ? (
                            <section className='cardContainer'>
                            {series.map((serie) => (
                                <SeriesCard
                                    key={serie.id}
                                    data={serie}
                                />
                            ))}
                            </section>
                        ) : (
                            <p className='sin-favs'>No hay series favoritas.</p>
                        )}
                </section>
            </section>
            </>
        );
    }

export default Favoritas;