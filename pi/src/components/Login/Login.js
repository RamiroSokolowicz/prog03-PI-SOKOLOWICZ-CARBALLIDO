import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import './Login.css';

const cookies = new Cookies();


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }
    
    controlarImputs = (evento, campo) => {
        this.setState({[campo]: evento.target.value},
        )
    }
    controlarSubmit = (evento) => {
        evento.preventDefault();
        let usersStorage = localStorage.getItem("usuarios");
        if (usersStorage != null) {
            let usersParseados = JSON.parse(usersStorage);
            let userFiltrado = usersParseados.filter((user) => user.email === this.state.email);
            if (userFiltrado.length > 0) {
                if (userFiltrado[0].password === this.state.password) {
                    cookies.set('user-auth-cookie', userFiltrado[0].email);
                    alert("Usuario logueado con éxito");
                    this.props.history.push("/");
                }
                else{
                    alert("Credenciales invalidas");
                }
            }
            else{
                alert("No hay usuarios registrados con ese email");
            }
        }
        else{
            alert("No hay usuarios registrados");
        }
    }

    //finalizamos creando la cookie con el email del usuario logueado, para mantener la sesión iniciada, y redirigir a la pagina de inicio
    //redirigir a la pagina de inicio, si no coinciden mostrar mensaje de error (credenciales invalidas)
    //las cookies se recuperan con cookies.get('nombreCookie') y se crean con cookies.set('nombreCookie', valor, { expires: 7 }) el tercer parametro es un objeto de opciones, en este caso le decimos que expire en 7 dias
    //me sirve para esconder el metodo de agregar a fav si no esta logueado
    


    render() {
        return (
            <div className='login-container'>
                <form className='login-form' onSubmit={this.controlarSubmit}>
                    <h2>INICIO DE SESION</h2>
                    <div className='login-campo'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={this.state.email} onChange={(evento) => this.controlarImputs(evento, "email")} required />
                    </div>

                    <div className='login-campo'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={this.state.password} onChange={(evento) => this.controlarImputs(evento, "password")} required />
                    </div>
                    <button className='login-boton' type="submit">Login</button>
                </form>
            </div>
        );
    }
}
export default withRouter(Login);