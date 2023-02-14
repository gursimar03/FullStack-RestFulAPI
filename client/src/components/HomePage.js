import React, {Component} from "react"
import {Link} from "react-router-dom"
import Register from "./Register"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import Login from "./Login"
import Logout from "./Logout"

export default class HomePage extends Component 
{
    constructor(props) 
    {
      super(props)
    }
    

    componentDidMount() 
    {
        
    }

  
    render() 
    {   
        return (
            <div>
              {localStorage.accessLevel > 0 ? <Logout />  : <div> <Register/> <Login /> </div>}
              
            </div>

        )
    }
}