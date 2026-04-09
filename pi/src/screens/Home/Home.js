import React, { Component } from 'react';
import MiFormulario from '../../components/MiFormulario/MiFormulario';
import PeliCard from '../../components/PeliCard/PeliCard';

const api = 'https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: []
        };
    }

    componentDidMount() {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results.slice(0, 5)
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    }

    render() {
        return (
            <section className="app-page">
                <h2 className="app-page-title">Home</h2>
                    <MiFormulario />
                <p className="app-page-text">Esta pantalla muestra una selección inicial de 5 películas.</p>
                <section className='cardContainer'>
                    {this.state.peliculas.map((pelicula) => (
                        <PeliCard
                            key={pelicula.id}
                            data={pelicula}
                        />
                    ))}
                </section>
            </section>
        );
    }
}

export default Home;
