import React, {Component, use} from 'react'
import { withRouter } from "react-router-dom";

class Registro extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }


    controlarImputs = (evento, campo) => {
        this.setState({[campo]: evento.target.value},
        )
    }
    controlarSubmit = (evento) => {
        evento.preventDefault();
        this.usuarioACrear = {
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now(),
        }
        

        if(this.state.email.includes("@") === false){
            alert("El email debe contener un @");
            return;
        }
        if(this.state.password.length < 5 && this.state.password.length > 12){
            alert("La contraseña debe tener entre 5 y 12 caracteres");
            return;
        }

        
        let usersStorage = localStorage.getItem("usuarios");
        if (usersStorage != null) {
            let usersParseados = JSON.parse(usersStorage);
            let userFiltrado = usersParseados.filter((user) => user.email === this.state.email);
            if (userFiltrado.length > 0) {
                alert("Ya existe un usuario con el email registrado");
                return;
            }
            else{
                usersParseados.push(this.usuarioACrear);
                let usersEnJson = JSON.stringify(usersParseados);
                localStorage.setItem("usuarios", usersEnJson);
                alert("Usuario registrado con éxito");
                this.props.history.push("/login");
            }
        }
        else{
            let usersInicial = [this.usuarioACrear];
            let usersEnJson = JSON.stringify(usersInicial);
            localStorage.setItem("usuarios", usersEnJson);
            alert("Usuario registrado con éxito");
            this.props.history.push("/login");
        }

        //validar si los datos son validos
        //crear constante que represente al usuarui
        //recuperamos en storage
        //verificar si storage es distinto a null
        //si es null, creamos un array vacio y pusheamos el usuario
        //si no es null, verificamos si el email no esta en uso, y si no, guardamos al usuario en storage
        };
    
    render(){
        return(
            <div className='login-container'>
                <form className='login-form' onSubmit={(evento) => this.controlarSubmit(evento)}>
                    <h2>REGISTRO</h2>
                    <div className='login-campo'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" placeholder="email" onChange={(evento) => this.controlarImputs(evento, "email")} />
                    </div>

                    <div className='login-campo'>
                        <label htmlFor="password">Password:</label>
                        <input type="password"  placeholder="password" onChange={(evento) => this.controlarImputs(evento, "password")} />
                    </div>
                    <button type="submit" className='login-boton' >Register</button>
                </form>
            </div>



        )
    }

}

export default withRouter(Registro);