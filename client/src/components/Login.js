import React from "react"
import { Navigate as Redirect, Link } from "react-router-dom"
import axios from "axios";
import LinkInClass from "./LinkInClass";
import { SERVER_HOST } from "../config/global_constants"
import { FaArrowRight } from "react-icons/fa"
import ScrollToTop from "../ScrollToTop";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            clientMessage: '',
            googleUser: null,
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                        this.setState({clientMessage: res.data.clientMessage}, ()=>{
                            console.log(this.state)
                        })
                    }
                    else // user successfully logged in
                    {
                        console.log("alsjfbhikahsdbk")
                        console.log("User logged in")
                        console.log("email:" + res.data.email)
                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token
                        localStorage.email = res.data.email
                        localStorage.isLoggedIn = res.data.isLoggedIn
                        localStorage.profilePhoto = res.data.profilePhoto

                        window.location.replace(`http://localhost:3000/`)
                    }
                }
                else {
                    console.log("Login failed")
                }
            })
    }

    googleResponse = (response) => {
        const details  = jwtDecode(response.credential);

        const email = details.email;
        const password = details.sub;

        this.setState({email: email, password: password}, this.handleSubmit)

    }
    googleError = (error) => {
        console.log(error)
    }

    render() {
        if (localStorage.isLoggedIn === "true") {
            console.log("User is already logged in")
            return <Redirect to="/" />
        } else {
            return (
                <form className="login-form-container" noValidate={true} id="loginOrRegistrationForm">
                    <ScrollToTop />
                    <div className="login-page-container">
                        <div className="login-page-container-left">
                            <h1>LOGIN</h1>
                            <div className="login-form">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <p style={{margin: 0, color: 'red'}}>{this.state.clientMessage ? this.state.clientMessage : null}</p>
                            </div>
                            <div className="login-btn-container">
                                <LinkInClass value="Login" className="login-button" onClick={this.handleSubmit} />
                                <GoogleLogin onSuccess={this.googleResponse} onError={this.googleError} />
                            </div>
                            <div className="hidden-to-desktop">
                                <h2>DON'T HAVE AN ACCOUNT?</h2>
                                <Link className="mobile-login-btn to-login-link" to={'/account-register'}>REGISTER <FaArrowRight /></Link>
                            </div>
                        </div>
                        <div className="login-page-container-right">
                            <div className="logo-grid">
                                <div className="logo-grid-item logo-grid-item-1">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-2">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-3">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-4">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-5">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-6">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-7">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-8">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                                <div className="logo-grid-item logo-grid-item-9">
                                    <h1>
                                        NOT NIKE
                                    </h1>
                                </div>
                            </div>
                            <div className="overlay"></div>
                            <div className="login-overlay">
                                <h2>DON'T HAVE AN ACCOUNT?</h2>
                                <Link className="to-login-link" to={'/account-register'}>REGISTER <FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                </form>)
        }
    }
}

export default Login;