import React, {Component} from 'react';
import Peliculas from "../../screens/Peliculas/Peliculas;" 
const api = "https://api.themoviedb.org/3/movie/popular?api_key=baa0951159508b20d0796a6a16699e51";


class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            mostrar: null
 };
    }

    
    componentDidMount() {
        fetch(api)
            .then(response => response.json())
            .then(data => this.setState(
                {peliculas: data.results,
                mostrar: data.info.next
                }
            ))
            .catch(error => console.error(error));
            }

    verDescripcion = () => {
        fetch(this.state.mostrar)
        .then(response => response.json())
        .then(data => {
            this.setState({
                peliculas: this.state.peliculas.concat(data.results),
                mostrar: data.info.next
        }   )      })
    }

    irADetalle = (pelicula) => {
        this.props.history.push(`/peliculas/${pelicula.id}`);
    }



    render() {
        return (
            <div>
            <section className="app-page">
                {this.state.peliculas.map((pelicula) => (
                    <Personajes key={pelicula.id} pelicula={pelicula} />
                ))}
            </section>

                        <img className= "app-page-image" src={"https://image.tmdb.org/t/p/w500${pelicula.poster_path}"} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>

                        <button onClick={this.verDescripcion}>Ver descripcion</button>
                        <button onClick={() => this.irADetalle(pelicula)}>Ir a detalle</button>
             </div>
        );

    }

}



export default Peliculas;