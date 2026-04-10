import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Favoritas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            series: []
        };
    }

    componentDidMount() {
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
                        this.setState({ peliculas: peliculasFavoritas });
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
                            this.setState({ series: seriesFavoritas });
                        })
                        .catch((error) => console.error('Ocurrió un error:', error));
                });
            }
        }
    }

    render() {
        return (
            <>
                <div>
                    <h1>Películas Favoritas</h1>
                    <div className='peliculas-favoritas'>
                        {this.state.peliculas.length > 0 ? (
                            this.state.peliculas.map((pelicula) => (
                                <div key={pelicula.id}>
                                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                                    <h3>{pelicula.title}</h3>
                                    <p>Fecha de estreno: {pelicula.release_date}</p>
                                    <Link to={`detalle/movie/${pelicula.id}`}>
                                        <button className="btn btn-primary">Ir a detalle</button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No hay películas favoritas.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h1>Series Favoritas</h1>
                    <div className='series-favoritas'>
                        {this.state.series.length > 0 ? (
                            this.state.series.map((serie) => (
                                <div key={serie.id}>
                                    <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
                                    <h3>{serie.name}</h3>
                                    <Link to={`detalle/tv/${serie.id}`}>
                                        <button className="btn btn-primary">Ir a detalle</button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No hay series favoritas.</p>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
