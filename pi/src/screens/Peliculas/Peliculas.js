import React, {Component} from 'react';

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrar: false
            }
    }

    verDescripcion = () => {
        this.setState({
            mostrar: !this.state.mostrar
        })
    }

    render() {
        return (
            <section className="app-page">
                <img className= "app-page-image" src={"https://image.tmdb.org/t/p/w500${pelicula.poster_path}"} />
                <h2>{pelicula.title}</h2>
                <p>{pelicula.overview}</p>

                <button onClick={this.verDescripcion}>
                    {this.state.mostrar ? "Mostrar menos" : "Mostrar más"}
                </button>

            </section>
        );
    }
}

export default Peliculas;