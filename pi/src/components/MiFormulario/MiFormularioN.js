import { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import './MiFormulario.css';


function MiFormulario(props) {
    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState('');

    function controlarForm(evento) {
        evento.preventDefault();
        if (busqueda !== "") {
            props.history.push(`/resultados/${busqueda}/${tipo}`);
        }

    }
    function controlarImput(evento) {
        setBusqueda(evento.target.value);
    }

    function controlarTipo(evento) {
        setTipo(evento.target.value);
    }


    return (
        <div className="formulario">
            <form className="formulario-busqueda" onSubmit={(evento) => controlarForm(evento)}>
                <input type="text" placeholder="Buscar..." onChange={(evento) => controlarImput(evento)} />
                <button type="submit">Buscar</button>
            </form>

            <div className="formulario-tipo">
                <label>
                    <input type="radio" name="tipo" value="movie" onChange={(evento) => controlarTipo(evento)} />
                    Peli
                </label>

                <label>
                    <input type="radio" name="tipo" value="tv" onChange={(evento) => controlarTipo(evento)} />
                    Series
                </label>
            </div>
        </div>
    )
}
export default withRouter(MiFormulario);
