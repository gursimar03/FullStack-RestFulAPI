import React from "react"
import { Navigate as Redirect, Link } from "react-router-dom"
import axios from "axios"
import LinkInClass from "./LinkInClass"

import { SERVER_HOST } from "../config/global_constants"

//icons
import { FaArrowRight } from "react-icons/fa"
import ScrollToTop from "../ScrollToTop"


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            surname: "",
            email: "",
            gender: "",
            password: "",
        }

    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }


    handleSubmit = (e) => {
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.surname}/${this.state.email}/${this.state.password}/${this.state.gender}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully registered
                    {
                        console.log("User registered and logged in")

                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token
                        localStorage.isLoggedIn = res.data.isLoggedIn

                        // we can change this to redirect to profile page
                        window.location.replace(`http://localhost:3000/`)
                    }
                }
                else {
                    console.log("Registration failed")
                }
            })

    }


    render() {
        if (localStorage.isLoggedIn === "true") {
            console.log("User is already logged in")
            return <Redirect to="/" />
        } else {
            return (
                <form className="form-container" noValidate={true} id="loginOrRegistrationForm">
                    <ScrollToTop />
                    <div className="register-page-container">
                        <div className="register-page-container-left">
                            <h1>REGISTER</h1>
                            <div className="name-form">
                                <h2>YOUR NAME</h2>
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="First Name *"
                                        autoComplete="firstname"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        ref={(input) => { this.inputToFocus = input }}
                                    />

                                    <input
                                        name="surname"
                                        type="text"
                                        placeholder="Last Name *"
                                        autoComplete="lastname"
                                        value={this.state.surname}
                                        onChange={this.handleChange}
                                        ref={(input) => { this.inputToFocus = input }}
                                    />
                                </div>

                            </div>
                            <div className="gender-form">
                                <h2>GENDER</h2>
                                <div className="gender-form-radio-buttons">
                                    <div>
                                        <input type="radio" id="male" name="gender" value="male" onChange={this.handleChange} checked={this.state.gender === "male"} />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="female" name="gender" value="female" onChange={this.handleChange} checked={this.state.gender === "female"} />
                                        <label htmlFor="female">Female</label>

                                    </div>
                                    <div>
                                        <input type="radio" id="non-binary" name="gender" value="non-binary" onChange={this.handleChange} checked={this.state.gender === "non-binary"} />
                                        <label htmlFor="female">Non-Binary</label>
                                    </div>


                                </div>
                            </div>
                            <div className="registration-form">
                                <h2>EMAIL</h2>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email *"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />

                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="register-btn-container">
                                <LinkInClass value="Register" className="register-btn" onClick={this.handleSubmit} />
                            </div>
                            <div className="hidden-to-desktop">
                                <h2>ALREADY HAVE AN ACCOUNT?</h2>
                                <Link className="mobile-login-btn to-login-link" to={'/account-login'}>LOGIN <FaArrowRight /></Link>
                            </div>
                        </div>

                        <div className="register-page-container-right">
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
                                <h2>ALREADY HAVE AN ACCOUNT?</h2>
                                <Link className="to-login-link" to={'/account-login'}>LOGIN <FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                </form>
            )
        }
    }

}

export default Register;
