import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
       
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()
        
    }


    render()
    {
        return (0)
    }
}