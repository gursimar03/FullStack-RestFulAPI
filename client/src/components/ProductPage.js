import React, {Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"


export default class ProductPage extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = {
            product: null
        }
    }
    
    
    componentDidMount() 
    {

        axios.get(`${SERVER_HOST}/products/:name`).then(res => {
            this.setState({products: res.data})
        })
    }

  
    render() 
    {   
        return (
            <div>
                {/* <img src={this.state.product.productImage} alt={this.state.product.name} />
                <p>{this.state.product.name}</p>
                <p>{this.state.product.age}</p>
                <h3>{this.state.product.price}</h3> */}
                <h1>Individual Product Page</h1>
            </div>
        )
    }
}