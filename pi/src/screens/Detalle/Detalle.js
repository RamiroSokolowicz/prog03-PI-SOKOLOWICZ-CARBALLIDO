import React, { Component } from 'react';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=baa0951159508b20d0796a6a16699e51`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    pelicula: data
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    }

    render() {
        const { pelicula } = this.state;
        if (!pelicula) {
            return <div>Cargando...</div>;
        }
        return (
            <div>
                <h1>Detalle de la película con id {pelicula.id}</h1>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                    <h3>Título: {pelicula.title}</h3>
                    <p>Fecha de estreno: {pelicula.release_date}</p>
                    <p>Duración: {pelicula.runtime} minutos</p>
                    <p>Puntaje: {pelicula.vote_average}</p>
                    <p>Descripción: {pelicula.overview}</p>
                    <button>Agregar a favoritos</button>
                </div>
            </div>
        );
    }
}
