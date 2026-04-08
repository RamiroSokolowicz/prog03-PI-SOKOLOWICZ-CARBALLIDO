import React, {Component} from 'react';
import Peliculas from "../../screens/Peliculas/Peliculas;" 
const api = "https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51";


class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: []
 };
    }

    
    componentDidMount() {
        fetch(api)
            .then(response => response.json())
            .then(data => this.setState(
                { peliculas: data.results }
            ))
            .catch(error => console.error(error));
            }

    render() {
        return (
            <section className="app-page">
                {this.state.peliculas.map((pelicula, llave) => (
                    <article key={llave}>
                        <img className= "app-page-image" src={"https://image.tmdb.org/t/p/w500${pelicula.poster_path}"} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                        <button>Ver descripción</button>
                        <button>Ir a detalle</button>
                    </article>
                ))
                }

            </section>
        );
    }
}

export default Peliculas;