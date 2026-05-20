import { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";


function Registro(props) {
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
        let usuarioACrear = {
            email: email,
            password: password,
            createdAt: Date.now(),
        }

        if (email.includes("@") === false) {
            alert("El email debe contener un @");
            return;
        }
        if (password.length < 5 || password.length > 12) {
            alert("La contraseña debe tener entre 5 y 12 caracteres");
            return;
        }


        let usersStorage = localStorage.getItem("usuarios");
        if (usersStorage != null) {
            let usersParseados = JSON.parse(usersStorage);
            let userFiltrado = usersParseados.filter((user) => user.email === email);
            if (userFiltrado.length > 0) {
                alert("Ya existe un usuario con el email registrado");
                return;
            }
            else {
                usersParseados.push(usuarioACrear);
                let usersEnJson = JSON.stringify(usersParseados);
                localStorage.setItem("usuarios", usersEnJson);
                alert("Usuario registrado con éxito");
                props.history.push("/login");
            }
        }
        else {
            let usersInicial = [usuarioACrear];
            let usersEnJson = JSON.stringify(usersInicial);
            localStorage.setItem("usuarios", usersEnJson);
            alert("Usuario registrado con éxito");
            props.history.push("/login");
        }
        return (
            <div className='login-container'>
                <form className='login-form' onSubmit={(evento) => controlarSubmit(evento)}>
                    <h2>REGISTRO</h2>
                    <div className='login-campo'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" placeholder="email" onChange={(evento) => controlarImputs(evento, "email")} />
                    </div>

                    <div className='login-campo'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="password" onChange={(evento) => controlarImputs(evento, "password")} />
                    </div>
                    <button type="submit" className='login-boton' >Register</button>
                </form>
            </div>
        )
    }}

export default withRouter(Registro);