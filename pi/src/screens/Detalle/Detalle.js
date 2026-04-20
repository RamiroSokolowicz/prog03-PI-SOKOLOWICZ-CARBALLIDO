import React, { Component } from 'react';
import './Detalle.css';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
            serie: null,
            favorit: false
        };
    }

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const tipo = this.props.match.params.tipo;

        let storage = null;

        if (tipo === "movie") {
            storage = localStorage.getItem('peliculasFavoritas');
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=baa0951159508b20d0796a6a16699e51`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        pelicula: data
                    });
                })
                .catch((error) => console.error('Ocurrió un error:', error));
        }
        else {
            storage = localStorage.getItem('seriesFavoritas');
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=baa0951159508b20d0796a6a16699e51`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        serie: data
                    });
                })
                .catch((error) => console.error('Ocurrió un error:', error));
        }

        if (storage != null) {
            let storageParseado = JSON.parse(storage);
            if (storageParseado.includes(id)) {
                this.setState({ favorit: true });
            }
        }
    }

    agregarFav(id, tipo) {
        let storage = null;
        if (tipo === "movie") {
            storage = localStorage.getItem('peliculasFavoritas');
        }
        else {
            storage = localStorage.getItem('seriesFavoritas');
        }
        if (storage == null) {
            let favoritos = [id];
            if (tipo === "movie") {
                localStorage.setItem('peliculasFavoritas', JSON.stringify(favoritos));
            }
            else {
                localStorage.setItem('seriesFavoritas', JSON.stringify(favoritos));
            }
        }
        else {
            let storageParseado = JSON.parse(storage);

            storageParseado.push(id);
            if (tipo === "movie") {
                localStorage.setItem('peliculasFavoritas', JSON.stringify(storageParseado));
            }
            else {
                localStorage.setItem('seriesFavoritas', JSON.stringify(storageParseado));
            }
        }
        this.setState({ favorit: true });
    }
    sacarFav(id, tipo) {
        let storage = null;
        if (tipo === "movie") {
            storage = localStorage.getItem('peliculasFavoritas');
        }
        else {
            storage = localStorage.getItem('seriesFavoritas');
        }
        if (storage != null) {
            let storageParseado = JSON.parse(storage);
            let favoritosFiltrados = storageParseado.filter(elem => elem !== id);
            if (tipo === "movie") {
                localStorage.setItem('peliculasFavoritas', JSON.stringify(favoritosFiltrados));
            }
            else {
                localStorage.setItem('seriesFavoritas', JSON.stringify(favoritosFiltrados));
            }
        }
        this.setState({ favorit: false });
    }
    render() {
        const pelicula = this.state.pelicula;
        const serie = this.state.serie;
        const favorit = this.state.favorit;
        
        const tipo = this.props.match.params.tipo;
        if (tipo === "movie" && !pelicula) {
            return <div>Cargando...</div>;
        }
        if (tipo === "tv" && !serie) {
            return <div>Cargando...</div>;
        }
        if (tipo === "movie") {
            return (
                <section className='app-page'>

                <div className='detalle-container'>
                    <img className='detalle-img' src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />

                    <div className='detalle-info'>
                        <h2>Título: {pelicula.title}</h2>
                        <p>Fecha de estreno: {pelicula.release_date}</p>
                        <p>Duración: {pelicula.runtime} minutos</p>
                        <p>Puntaje: {pelicula.vote_average}</p>
                        <p className='detalle-descripcion'>Descripción: {pelicula.overview}</p>
                        <button className='detalle-boton' onClick={() => favorit ? this.sacarFav(pelicula.id, "movie") : this.agregarFav(pelicula.id, "movie")}>
                            {!favorit ? "agregar a favoritos" : "sacar de favoritos"}</button>
                    </div>
                </div>
                </section>
            );
        }
        else {
            return (
                <section className='app-page'>

                <div className='detalle-container'>
                    <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />

                    <div className='detalle-info'>
                        <h3>Título: {serie.name}</h3>
                        <p>Fecha de estreno: {serie.first_air_date}</p>
                        <p>Duración: {serie.episode_run_time[0]} minutos</p>
                        <p>Puntaje: {serie.vote_average}</p>
                        <p className='detalle-descripcion'>Descripción: {serie.overview}</p>
                        <button className='detalle-boton' onClick={() => favorit ? this.sacarFav(serie.id, "tv") : this.agregarFav(serie.id, "tv")}>
                            {!favorit ? "agregar a favoritos" : "sacar de favoritos"}</button>                        
                    </div>
                </div>
                </section>
            );

        }
    }
}