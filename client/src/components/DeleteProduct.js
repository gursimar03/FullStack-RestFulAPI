import React, {Component} from "react"
import { Navigate as Redirect } from "react-router-dom";
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteProduct extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirect:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/product/${this.props.match.params.id}/${localStorage.email}`, {headers:{"authorization":localStorage.getItem("token")}})
        .then(res => 
        {            
            this.setState({redirect:true})   
            console.log(res.data)         
        })
        .catch(err =>
        {
            console.log(err)
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirect ? <Redirect to="/admin"/> : null}                      
            </div>
        )
    }
}