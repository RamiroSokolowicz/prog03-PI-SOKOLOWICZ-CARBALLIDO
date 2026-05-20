import { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import './Login.css';

const cookies = new Cookies();

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function controlarImputs(campo, evento) {
        if (campo === "email") {
            setEmail(evento.target.value);
        } else if (campo === "password") {
            setPassword(evento.target.value);
        }
    }

    function controlarSubmit(evento) {
        evento.preventDefault();
        let usersStorage = localStorage.getItem("usuarios");
        if (usersStorage != null) {
            let usersParseados = JSON.parse(usersStorage);
            let userFiltrado = usersParseados.filter((user) => user.email === email);
            if (userFiltrado.length > 0) {
                if (userFiltrado[0].password === password) {
                    cookies.set('user-auth-cookie', userFiltrado[0].email);
                    alert("Usuario logueado con éxito");
                    props.history.push("/");
                }
                else {
                    alert("Credenciales invalidas");
                }
            }
            else {
                alert("No hay usuarios registrados con ese email");
            }
        }
        else {
            alert("No hay usuarios registrados");
        }
    }
    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={controlarSubmit}>
                <h2>INICIO DE SESION</h2>
                <div className='login-campo'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(evento) => controlarImputs(evento, "email")} required />
                </div>

                <div className='login-campo'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(evento) => controlarImputs(evento, "password")} required />
                </div>
                <button className='login-boton' type="submit">Login</button>
            </form>
        </div>
    );
}


export default withRouter(Login);