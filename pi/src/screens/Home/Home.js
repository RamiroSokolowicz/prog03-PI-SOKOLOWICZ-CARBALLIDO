import React, { Component } from 'react';
import MiFormulario from '../../components/MiFormulario/MiFormulario';
import PeliCard from '../../components/PeliCard/PeliCard';
import SeriesCard from  '../../components/SeriesCard/SeriesCard';
import { Link } from 'react-router-dom';
import './Home.css';

const apiMovie = 'https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51';
const apiSerie = 'https://api.themoviedb.org/3/tv/popular?api_key=baa0951159508b20d0796a6a16699e51';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            series: []

        };
    }

    componentDidMount() {
        fetch(apiMovie)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    peliculas: data.results.slice(0, 5)
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));

        fetch(apiSerie)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    series: data.results.slice(0, 5)
                });
            })
            .catch((error) => console.error('Ocurrió un error:', error));
    }

    render() {
        return (
            <section className="app-page">
                <MiFormulario />

                <section className="seccion-home">

                     <div className="seccion-header">
                         <h2>PELÍCULAS</h2>
                         <Link to="/peliculas" className="ver-mas">VER TODAS</Link>
                     </div>

                <section className="cardContainer">
                    {this.state.peliculas.map((pelicula) => (
                        <PeliCard
                            key={pelicula.id}
                            data={pelicula}
                        />
                    ))}
                 </section>

                </section>


                <section className="seccion-home">
                    <div className="seccion-header">
                        <h2>SERIES</h2>
                        <Link to="/series" className="ver-mas">VER TODAS</Link>
                     </div>

                <section className="cardContainer">
                    {this.state.series.map((serie) => (
                        <SeriesCard
                            key={serie.id}
                            data={serie}
                        />
                    ))}
                 </section>
                 </section>
    </section>
 );
    }
}

export default Home;
