import React, {Component} from 'react';
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
            