import React, {Component} from "react";

export default class Resultados extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultados: []
        }

    }
    componentDidMount(){
        const busqueda = this.props.match.params.busqueda;

    }
    render(){
        return (
            <h1>Resultados de busqueda para: {this.props.match.params.busqueda}</h1>

    )}}