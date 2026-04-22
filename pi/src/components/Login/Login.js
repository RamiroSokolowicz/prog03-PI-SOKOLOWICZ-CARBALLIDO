import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


//componente con estado
// metodo que gestiona los cambios en el input de email y password
//como debería funcionar el submit
//prevenir el comportamiento por defecto del formulario
//validar email y password (arroba y largo de la contra) si no cumple (credenciales invalidas)
//ver si existe localstorage de usuarios registrados, si no existe (no hay usuarios registrados) mostrar mensaje de error (no hay usuarios registrados)
//recuperar el storage de usuarios registrados, parsearlo y buscar (filter) si el email coinciden con alguno de los usuarios registrados
//si el largo de usuarios filtrados es mayor a 0, entonces comparar la contraseña ingresada con la contraseña del usuario registrado, 
//si coinciden, redirigir a la pagina de inicio, si no coinciden mostrar mensaje de error (credenciales invalidas)
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
            <div>
                <h1>Login</h1>
                <form onSubmit={this.controlarSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={this.state.email} onChange={(evento) => this.controlarImputs(evento, "email")} required />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={this.state.password} onChange={(evento) => this.controlarImputs(evento, "password")} required />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
export default withRouter(Login);