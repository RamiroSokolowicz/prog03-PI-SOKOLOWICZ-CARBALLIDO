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
            this.props.history.push(`/resultados/${this.state.busqueda}`);
        }

    }
    controlarImput(evento){
        this.setState({busqueda: evento.target.value},
            () => console.log('el valor del input es:', this.state.busqueda)
        )
    }

    render() {
        return (
            <form onSubmit={(evento) => this.controlarForm(evento)}>
                <input type="text" placeholder="Buscar..." onChange={(evento) => this.controlarImput(evento)}/>
                <button type="submit">Buscar</button>
            </form>
        )}
    }

export default withRouter(MiFormulario);