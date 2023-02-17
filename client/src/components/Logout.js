import React, {Component} from "react"
import {Navigate as Redirect} from "react-router-dom"
import axios from "axios"
import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            isLoggedIn:true
        }
    }
    

    handleLogoutLocalStorage = () =>{

        localStorage.accessLevel = 0
        localStorage.name = "GUEST"
        localStorage.token = null

    }
    
    handleSubmit = (e) => 
    {
        e.preventDefault()
        axios.post(`${SERVER_HOST}/users/logout`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    console.log("User logged out")
                    this.handleLogoutLocalStorage()
                    
                    this.setState({isLoggedIn:false}) 
                }
            }
            else
            {
                console.log("Logout failed")
            }
        }) 
    }


    render()
    {
        return (
            <div>   
        
                {!this.state.isLoggedIn ? <Redirect to="/"/> : null} 
                  
                <LinkInClass value="Log out" className="red-button" onClick={this.handleSubmit}/> 
            </div>
        )
    }
}