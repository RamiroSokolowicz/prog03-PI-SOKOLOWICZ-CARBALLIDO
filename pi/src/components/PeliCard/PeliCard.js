import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PeliCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarMas: false
        };
    }

    mostrameMas = () => {
        this.setState({
            mostrarMas: !this.state.mostrarMas
        });
    };

    render() {

        return (
            <article className='character-card'>
                <img
                    src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}
                    alt={this.props.data.title}
                />
                <h2>{this.props.data.title}</h2>
                <button className="more" onClick={this.mostrameMas}>
                    {this.state.mostrarMas ? "Ocultar descripción" : "Ver descripción"}
                </button>
                <section className={this.state.mostrarMas ? 'show' : 'hide'}>
                    <p>{this.props.data.overview}</p>
                </section>
                <Link to={`/peliculas/${this.props.data.id}`}>
                    <button>Ir a detalle</button>
                </Link>
                <button>Agregar / quitar de favoritos</button>
            </article>
        );
    }
}

export default PeliCard;
