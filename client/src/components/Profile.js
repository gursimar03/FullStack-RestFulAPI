import React, { Component } from "react"
import { Navigate as Redirect, Link } from "react-router-dom"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"
import jwt_decode from 'jwt-decode'; // to decode the token and get the user's email

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ``,
            surname: ``,
            email: ``,
            oldPassword: ``,
            password: ``,
            confirmPassword: ``,
            gender: ``,
            nameError: '',
            surnameError: '',
            emailError: '',
            oldPasswordError: '',
            passwordError: '',
            confirmPasswordError: '',
            genderError: '',
            errorMessage: '',
            isPasswordUpdated: false,
            redirectToHome: false,
            change: false,
            selectedFile: null,
            formChanged: false, // Add a new flag to track if the form has been changed
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token') // get the token from local storage
        const decodedToken = jwt_decode(token) // decode the token
        const email = decodedToken.email // get the user's email from the decoded token

        // get the user's profile from the database using the user's email address and set the state with the user's profile data
        axios.get(`${SERVER_HOST}/users/profile/${email}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log(res.data)
                        this.setState({
                            name: res.data.name,
                            surname: res.data.surname,
                            email: res.data.email,
                            // password: res.data.password,
                            // confirmPassword: res.data.password,
                            gender: res.data.gender,
                            profilePhoto: res.data.profilePhoto
                        })
                    }
                } else {
                    console.log(`Record not found`)
                }
            })
    }

    // validate the form fields and set the state with the error messages if any of the fields are invalid 
    validate = () => {
        let nameError = ''
        let surnameError = ''
        let emailError = ''
        let passwordError = ''
        let confirmPasswordError = ''
        let genderError = ''

        if (!this.state.name) {
            nameError = 'Name is required'
        }

        if (!this.state.surname) {
            surnameError = 'Surname is required'
        }

        if (!this.state.email) {
            emailError = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            emailError = 'Email is invalid'
        }

        if (!this.state.gender) {
            genderError = 'Gender is required'
        }

        if (nameError || surnameError || emailError || genderError) {
            this.setState({ nameError, surnameError, emailError, genderError })
            return false
        }

        return true
    }

    validatePassword = () => {
        let oldPasswordError = ''
        let passwordError = ''
        let confirmPasswordError = ''

        if (!this.state.oldPassword) {
            oldPasswordError = 'Old password is required'
        }


        if (this.state.password && this.state.password.length < 8) {
            passwordError = 'Password must be at least 8 characters'
        }

        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = 'Passwords do not match'
        }

        if (passwordError || confirmPasswordError || oldPasswordError) {
            this.setState({ passwordError, confirmPasswordError, oldPasswordError })
            return false
        }

        return true

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, formChanged: true })
    }

    handleFileChange = (e) => {
        this.setState({ selectedFile: e.target.files[0], formChanged: true })
    }

    handlePasswordChange = (e) => {
        this.setState({ change: !this.state.change });
    }

    //the function that handles the password update form submission 
    handlePasswordUpdate = (e) => {
        e.preventDefault();

        const isValidPassword = this.validatePassword();

        if (!isValidPassword) {
            return;
        }

        const data = {
            oldPassword: this.state.oldPassword,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        axios
            .put(`${SERVER_HOST}/users/password/${this.state.email}`, data)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage);
                    } else {
                        console.log(`Record updated`);
                        this.setState({
                            isPasswordUpdated: true
                        });
                        setTimeout(() => {
                            this.setState({ isPasswordUpdated: false });
                            window.location.reload();
                        }, 3000);
                    }
                } else {
                    console.log(`Record not updated`);
                }
            });
    }

    // the function that handles the profile update form submission
    handleProfilePictureUpdate = (e) => {
        this.setState({ selectedFile: e.target.files[0], formChanged: true })
    }

    handleSubmit = (e) => {
        e.preventDefault();

            // If the form hasn't been changed, return without submitting
        if (!this.state.formChanged) {
            return;
        }
      
        if (!this.validate()) {
          return;
        }
      
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("surname", this.state.surname);
        data.append("email", this.state.email);
        data.append("gender", this.state.gender);
        
        // Only append the selected file if it exists
        if (this.state.selectedFile) {
          data.append("profilePhoto", this.state.selectedFile);
        } else {
          data.append("profilePhoto", null);
        }

        if(this.state.selectedFile){
            axios
          .put(`${SERVER_HOST}/users/profile/${this.state.email}`, data)
          .then((res) => {
            if (res.data) {
              if (res.data.errorMessage) {
                console.log(res.data.errorMessage);
                this.setState({ errorMessage: res.data.errorMessage });
              } else {
                console.log(`Record updated`);
                localStorage.setItem("profilePhoto", res.data.profilePhoto);
                        this.setState({
                            redirectToHome: true,
                            profilePhoto: res.data.profilePhoto
                        });
                        setTimeout(() => {
                            this.setState({ redirectToHome: false });
                            window.location.reload();
                        }, 1000);
              }
            } else {
              console.log(`Record not updated`);
            }
          });
        }
        else{
            axios
          .put(`${SERVER_HOST}/users/profile/${this.state.email}`, data)
          .then((res) => {
            if (res.data) {
              if (res.data.errorMessage) {
                console.log(res.data.errorMessage);
                this.setState({ errorMessage: res.data.errorMessage });
              } else {
                console.log(`Record updated`);
                        this.setState({
                            redirectToHome: true,
                        });
                        setTimeout(() => {
                            this.setState({ redirectToHome: false });
                            window.location.reload();
                        }, 1000);
              }
            } else {
              console.log(`Record not updated`);
            }
          });
        }
      };
      
    render() {
        const { isPasswordUpdated } = this.state;
        return (
            <div className="profile-container">
                {this.state.redirectToHome ? <Redirect to={{ pathname: "/", }} /> : null}

                <div className="profile-form">
                    <h2>Profile</h2>
                    {this.state.isPasswordUpdated ? <div>Password updated</div> : null}
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="profile-picture">Profile Picture</label>
                                {
                                    localStorage.profilePhoto !== "null" ?
                                        <img id="profilePhoto" className="profileImg" src={`data:;base64,${localStorage.profilePhoto}`} alt="Loading photo" style={{ display: "block", maxWidth: "200px", marginTop: "10px" }}/>
                                        :
                                        null
                                }
                                <input type="file" id="profile-picture" name="profile-picture" onChange={this.handleProfilePictureUpdate} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className={`form-control ${this.state.nameError ? 'is-invalid' : ''}`}
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                placeholder="Enter name"
                                required
                            />
                            <div className="invalid-feedback">{this.state.nameError}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                className={`form-control ${this.state.surnameError ? 'is-invalid' : ''}`}
                                id="surname"
                                name="surname"
                                value={this.state.surname}
                                onChange={this.handleChange}
                                placeholder="Enter surname"
                                required
                            />
                            <div className="invalid-feedback">{this.state.surnameError}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className={`form-control ${this.state.emailError ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Enter email"
                                required
                            />
                            <div className="invalid-feedback">{this.state.emailError}</div>
                        </div>
                        <div className="form-group">
                            <label>Change Password</label>
                            <input type="checkbox" onChange={this.handlePasswordChange} />
                        </div>
                        {this.state.change ? (
                            <div className="form-group">
                                <label htmlFor="oldPassword"> Old Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${this.state.oldPasswordError ? 'is-invalid' : ''}`}
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={this.state.oldPassword}
                                    onChange={this.handleChange}
                                    placeholder="Enter old password"
                                    required
                                />
                                <div className="invalid-feedback">{this.state.oldPasswordError}</div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${this.state.passwordError ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Enter password"
                                    required
                                />
                                <div className="invalid-feedback">{this.state.passwordError}</div>
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input
                                    type="password"
                                    className={`form-control ${this.state.confirmPasswordError ? 'is-invalid' : ''}`}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    placeholder="Confirm password"
                                    required
                                />
                                <div className="invalid-feedback">{this.state.confirmPasswordError}</div>
                                {isPasswordUpdated ? (
                                    <p>
                                        Password updated.
                                    </p>
                                ) : (
                                    <button onClick={this.handlePasswordUpdate} disabled={!this.state.formChanged}>Update Password</button>
                                )}
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                value={this.state.gender}
                                onChange={this.handleChange}
                                required
                            >
                                <option value="">Choose...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className="green-button">Update</button>
                        <Link to="/" className="red-button">Cancel</Link>
                    </form>

                    <Link to="/delete-account" className="red-button">Delete Account</Link>
                </div>
            </div>
        )
    }
}