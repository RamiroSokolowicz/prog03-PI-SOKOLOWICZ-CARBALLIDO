import React, { Component } from 'react';
import SeriesCard from '../SeriesCard/SeriesCard';

const api = 'https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51';

class SeriesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            proxPag: null,
            peliculasFiltradas: [],
            texto: ''
        };
    }

    componentDidMount() {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results,
                    proxPag: `https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`,
                    peliculasFiltradas: data.results
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
                    peliculasFiltradas: this.state.peliculas.concat(data.results),
                    proxPag: `https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51&page=${data.page + 1}`
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    };

    controlarForm(evento){
        evento.preventDefault();
    };

    controlarImput(evento){
        this.setState({texto: evento.target.value},
            () => {this.filtrarPeliculas(evento.target.value)}
    )
    }

    filtrarPeliculas(texto){
        let Filtradas = this.state.peliculas.filter(pelicula => pelicula.name.toLowerCase().includes(texto.toLowerCase()));
        this.setState({peliculasFiltradas: Filtradas})
    }

    render() {
        return (
            <>
                <form className='formulario-busqueda' onSubmit={(evento) => this.controlarForm(evento)}>
                    <input type="text" placeholder="Buscar" onChange={(evento) => this.controlarImput(evento)}/>
                </form>


                <section className='cardContainer'>
                    {this.state.peliculasFiltradas.map((serie) => (
                        <SeriesCard
                            key={serie.id}
                            data={serie}
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
