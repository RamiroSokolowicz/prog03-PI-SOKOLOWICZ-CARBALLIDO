import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SeriesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarMas: false,
            esFav: false
        };
    }

    mostrameMas = () => {
        this.setState({
            mostrarMas: !this.state.mostrarMas
        });
    };

    agregarFavoritos(id) {
        let storage = localStorage.getItem('seriesFavoritas');
        if (storage == null) {
            let favoritos = [id];
            localStorage.setItem('seriesFavoritas', JSON.stringify(favoritos));
        }
        else {
            let storageParseado = JSON.parse(storage);
            storageParseado.push(id);
            localStorage.setItem('seriesFavoritas', JSON.stringify(storageParseado));
        }  
        this.setState({ esFav : !this.state.esFav });
    };
    sacarFavoritos(id) {
        let storage = localStorage.getItem('seriesFavoritas');
        if (storage != null) {
            let storageParseado = JSON.parse(storage);
            let favoritosFiltrados = storageParseado.filter(elem => elem !== id);
            localStorage.setItem('seriesFavoritas', JSON.stringify(favoritosFiltrados));
        }
        this.setState({ esFav : !this.state.esFav });
    };

    componentDidMount() {
        let storage = localStorage.getItem('seriesFavoritas');
        if (storage != null) {
            let storageParseado = JSON.parse(storage);
            if (storageParseado.includes(this.props.data.id)) {
                this.setState({ esFav: true });
            }
        }
    }

    render() {
        return (
            <article className='single-card-movie'>
                <img className ="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`}
                    alt={this.props.data.title}
                />
                <h2>{this.props.data.title}</h2>
                <button className="btn btn-primary" onClick={this.mostrameMas}>
                    {this.state.mostrarMas ? "Ocultar descripción" : "Ver descripción"}
                </button>
                <section className={this.state.mostrarMas ? 'show' : 'hide'}>
                    <p>{this.props.data.overview}</p>
                </section>
                <Link to={`detalle/tv/${this.props.data.id}`}>
                    <button className = "btn btn-primary">Ir a detalle</button>
                </Link>
                <button className = "btn alert-primary" onClick={() => this.state.esFav ? this.sacarFavoritos(this.props.data.id): this.agregarFavoritos(this.props.data.id)}>
                    {!this.state.esFav ? "🩶" : "❤️" }</button>
            </article>
        );
    }
}

export default SeriesCard;
