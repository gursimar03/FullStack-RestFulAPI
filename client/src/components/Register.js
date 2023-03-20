import React from "react"
import { Navigate as Redirect, Link } from "react-router-dom"
import axios from "axios"
import LinkInClass from "./LinkInClass"

import { SERVER_HOST } from "../config/global_constants"

//icons
import { FaArrowRight } from "react-icons/fa"

import ScrollToTop from "../ScrollToTop"
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            surname: "",
            email: "",
            gender: "",
            password: "",
            clientMessage: '',
            nameErrorMessage: "",
            surnameErrorMessage: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
        }

    }


    // handleChange = (e) => {
    //     this.setState({ [e.target.name]: e.target.value })
    // }

    handleChange = (e) => {
        if (e.target.name === "email") {
            const email = e.target.value.toLowerCase();
            const emailErrorMessage = this.validateEmail(email);
            this.setState({ email: email, emailErrorMessage: emailErrorMessage });
        }
        else if (e.target.name === "name") {
            const name = e.target.value
            const nameErrorMessage = this.validateName(name);
            this.setState({ name: name, nameErrorMessage: nameErrorMessage });
        }
        else if (e.target.name === "surname") {
            const surname = e.target.value
            const surnameErrorMessage = this.validateName(surname);
            this.setState({ surname: surname, surnameErrorMessage: surnameErrorMessage });
        }
        else if (e.target.name === "password") {
            const password = e.target.value
            const passwordErrorMessage = this.validatePassword(password);
            this.setState({ password: password, passwordErrorMessage: passwordErrorMessage });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    //function to validate name and return error message
    validateName = (name) => {
        let nameErrorMessage = "";
        if (!name) {
            nameErrorMessage = "Please enter your name";
        } else if (!/^[a-zA-Z]+$/.test(name)) {
            nameErrorMessage = "Please enter a valid name";
        }
        return nameErrorMessage;
    };

    //funmction to validate surname and return error message
    validateSurname = (surname) => {
        let surnameErrorMessage = "";
        if (!surname) {
            surnameErrorMessage = "Please enter your surname";
        } else if (!/^[a-zA-Z]+$/.test(surname)) {
            surnameErrorMessage = "Please enter a valid surname";
        }
        return surnameErrorMessage;
    };

    //function to validate email and return error message
    validateEmail = (email) => {
        let emailErrorMessage = "";
        if (!email) {
            emailErrorMessage = "Please enter your email";
        } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            emailErrorMessage = "Please enter a valid email";
        }
        return emailErrorMessage;
    };     

    //function to validate password and return error message that password should be at least 8 characters long
    //and contain at least one number and one uppercase letter and one lowercase letterand one special character
    validatePassword = (password) => {
        let passwordErrorMessage = "";
        if (!password) {
            passwordErrorMessage = "Please enter your password";
        }// output separate error messages for each condition's failure starting with the most important
         else if (!/\d/.test(password)) {
            passwordErrorMessage = "Password must contain at least one number";
        } else if (!/[a-z]/.test(password)) {
            passwordErrorMessage = "Password must contain at least one lowercase letter";
        } else if (!/[A-Z]/.test(password)) {
            passwordErrorMessage = "Password must contain at least one uppercase letter";
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            passwordErrorMessage = "Password must contain at least one special character";
        }
        else if (password.length < 8) {
            passwordErrorMessage = "Password must be at least 8 characters long";
        }
        return passwordErrorMessage;
    };

    handleSubmit = (e) => {
        if (!this.state.name || !this.state.surname || !this.state.email || !this.state.gender || !this.state.password) {
            this.setState({ clientMessage: "Please enter all fields" })
            return;
        }
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.surname}/${this.state.email}/${this.state.password}/${this.state.gender}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                        this.setState({ clientMessage: res.data.clientMessage }, () => {
                            console.log(this.state)
                        })
                    }
                    else // user successfully registered
                    {
                        console.log("User registered and logged in")

                        localStorage.name = res.data.name
                        localStorage.email = res.data.email
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token
                        localStorage.isLoggedIn = res.data.isLoggedIn
                        localStorage.email = res.data.email
                        localStorage.profilePhoto = res.data.profilePhotoFilename

                        // we can change this to redirect to profile page
                        window.location.replace(`http://localhost:4000/`)
                    }
                }
                else {
                    console.log("Registration failed")
                }
            })

    }

    googleResponse = (response) => {
        const details = jwtDecode(response.credential);
        const email = details.email;
        const name = details.given_name;
        const surname = details.family_name;
        const gender = "other";
        const profilePhoto = details.picture;
        const password = details.sub;

        axios.post(`${SERVER_HOST}/users/register/${name}/${surname}/${email}/${password}/${gender}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.isLoggedIn = res.data.isLoggedIn
                        localStorage.email = res.data.email
                        localStorage.profilePhoto = profilePhoto;

                        window.location.replace(`http://localhost:4000/`)
                    }
                } else {
                    console.log("Registration failed")
                }
            })

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
                                    <p style={{ margin: 0, color: 'red' }}>{this.state.nameErrorMessage ? this.state.nameErrorMessage : null}</p>
                                    <input
                                        name="surname"
                                        type="text"
                                        placeholder="Last Name *"
                                        autoComplete="lastname"
                                        value={this.state.surname}
                                        onChange={this.handleChange}
                                        ref={(input) => { this.inputToFocus = input }}
                                    />
                                    <p style={{ margin: 0, color: 'red' }}>{this.state.surnameErrorMessage ? this.state.surnameErrorMessage : null}</p>
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
                                        <input type="radio" id="other" name="gender" value="other" onChange={this.handleChange} checked={this.state.gender === "other"} />
                                        <label htmlFor="female">Other</label>
                                    </div>


                                </div>
                            </div>
                            <div className="registration-form">
                                <h2>EMAIL</h2>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email *"
                                    autoComplete="off"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <p style={{ margin: 0, color: 'red' }}>{this.state.emailErrorMessage ? this.state.emailErrorMessage : null}</p>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <p style={{ margin: 0, color: 'red' }}>{this.state.passwordErrorMessage ? this.state.passwordErrorMessage : null}</p>
                                <p style={{ margin: 0, color: 'red' }}>{this.state.clientMessage ? this.state.clientMessage : null}</p>
                            </div>
                            <div className="register-btn-container">
                                <LinkInClass value="Register" className="register-btn" onClick={this.handleSubmit} />
                                <GoogleLogin onSuccess={this.googleResponse} onError={this.googleError} />
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
