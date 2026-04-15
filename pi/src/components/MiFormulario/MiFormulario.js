import React, {Component} from "react";
import { withRouter } from "react-router-dom";

class MiFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",

        }
    }
    controlarForm(evento){
        evento.preventDefault();
        if(this.state.busqueda !== ""){
            this.props.history.push(`/resultados/${this.state.busqueda}/${this.state.tipo}`);
        }

    }
    controlarImput(evento){
        this.setState({busqueda: evento.target.value},
            () => console.log('el valor del input es:', this.state.busqueda)
        )
    }

    controlarTipo(evento){
        this.setState({tipo: evento.target.value},
            () => console.log('el valor del input es:', this.state.tipo)
        )
    }


    render() {
        return (
            <div>
            <form onSubmit={(evento) => this.controlarForm(evento)}>
                <input type="text" placeholder="Buscar..." onChange={(evento) => this.controlarImput(evento)}/>
                <button type="submit">Buscar</button>
            </form>
                <label>Peliculas</label>
                <input type="radio" name="tipo" value="movie" onChange={(evento) => this.controlarTipo(evento)}/>
                <label>Series</label>
                <input type="radio" name="tipo" value="tv" onChange={(evento) => this.controlarTipo(evento)}/>

            </div>
        )}
    }

export default withRouter(MiFormulario);