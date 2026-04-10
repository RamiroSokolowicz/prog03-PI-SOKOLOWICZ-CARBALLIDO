import React, { Component } from 'react';
import SeriesCard from '../SeriesCard/SeriesCard';

const api = 'https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51';

class SeriesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            proxPag: null
        };
    }

    componentDidMount() {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results,
                    proxPag: `https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    }

    masPeliculas = () => {
        fetch(this.state.proxPag)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results),
                    proxPag: `https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    };

    render() {
        return (
            <>
                <section className='cardContainer'>
                    {this.state.peliculas.map((pelicula) => (
                        <SeriesCard
                            key={pelicula.id}
                            data={pelicula}
                        />
                    ))}
                </section>
                <button className="cargarMas" onClick={this.masPeliculas}>
                    Cargar más
                </button>
            </>
        );
    }
}

export default SeriesSection;
