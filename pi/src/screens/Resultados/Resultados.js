import React, {Component} from "react";

export default class Resultados extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultados: [],
            tipo : null
        }

    }
    componentDidMount(){
        const busqueda = this.props.match.params.busqueda;
        const tipo = this.props.match.params.tipo;

        if (tipo === "movie") {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}?api_key=baa0951159508b20d0796a6a16699e51`)
        .then(response => response.json())
        .then(data => {
            this.setState({ resultados: data.results });
        })
        .catch((error) => console.error('Ocurrió un error:', error));
    } else  { 
        fetch(`https://api.themoviedb.org/3/search/tv?query=${busqueda}?api_key=baa0951159508b20d0796a6a16699e51`)
        .then(response => response.json())
        .then(data => {
            this.setState({ resultados: data.results });
        })
        .catch((error) => console.error('Ocurrió un error:', error));

    }
    }
    render(){
        return (
            <div>
            <h1>Resultados de busqueda para: {this.props.match.params.busqueda}</h1>
            
            </div>
    )}
}