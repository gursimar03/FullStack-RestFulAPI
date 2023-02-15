import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component{
    
    constructor(props)
    {
        super(props)
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",    
            isRegistered:false
        } 

    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})

    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully registered
                { 
                    console.log("User registered and logged in")

                    localStorage.name = res.data.name
                    localStorage.accessLevel = res.data.accessLevel                    
                    localStorage.token = res.data.token

                    this.setState({isRegistered:true})
                }        
            }
            else
            {
                console.log("Registration failed")
            }
        })

    }


    render() 
    {     
        return (<form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

        {this.state.isRegistered ? <Redirect to="/HomePage"/> : null} 

        <h2>New User Registration</h2>

        <input  
            name = "name"              
            type = "text"
            placeholder = "Name"
            autoComplete="name"
            value = {this.state.name}
            onChange = {this.handleChange}
            ref = {(input) => { this.inputToFocus = input }} 
        /><br/>           

    <input  
            name = "email"              
            type = "email"
            placeholder = "Email"
            autoComplete="email"
            value = {this.state.email}
            onChange = {this.handleChange}
        /><br/>              

    <input  
            name = "password"           
            type = "password"
            placeholder = "Password"
            autoComplete="password"
            title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
            value = {this.state.password}
            onChange = {this.handleChange}
        /><br/>           

        <input          
            name = "confirmPassword"    
            type = "password"
            placeholder = "Confirm password"
            autoComplete="confirmPassword"
            value = {this.state.confirmPassword}
            onChange = {this.handleChange}
        /><br/><br/>

        <LinkInClass value="Register New User" className="green-button" onClick={this.handleSubmit} />
           <Link className="red-button" to={"/HomePage"}>Cancel</Link>   
    </form>)
    
}

}