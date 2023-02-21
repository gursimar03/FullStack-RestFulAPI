import React, {Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            isLoggedIn: localStorage.isLoggedIn
        }
    }
    

    handleLogoutLocalStorage = () =>{

        localStorage.accessLevel = 0
        localStorage.name = "GUEST"
        localStorage.token = null
        localStorage.isLoggedIn = false
        localStorage.profilePhoto = null

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
                }
            }
            else
            {
                console.log("Logout failed")
            }
        }).then(
            this.props.refresh()
        )
    }


    render()
    {
        return (
                <Link value="Log out" className="red-button" onClick={this.handleSubmit}>LOG OUT</Link> 
        )
    }
}