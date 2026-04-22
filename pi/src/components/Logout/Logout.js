import { Component } from "react";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";

const cookies = new Cookies();

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        cookies.remove('user-auth-cookie');
        alert("Logout exitoso");
        this.props.history.push("/");
    }


    render() {
        return;
    }
}

export default withRouter(Logout);