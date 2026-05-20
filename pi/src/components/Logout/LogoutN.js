import {useState, useEffect} from 'react';
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";

const cookies = new Cookies();

function Logout() {
    useEffect(() => {
        cookies.remove('user-auth-cookie');
        alert("Logout exitoso");
        props.history.push("/");
        }, []);
    return(
        console.log("Logout exitoso")
    )
}

export default withRouter(Logout);