import React, { Component } from "react"
import { Link } from "react-router-dom"
import { SERVER_HOST } from "../config/global_constants"

import axios from "axios"

class AllProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            clientView:false,
            email:localStorage.email,
            level:0
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then(res => {
            this.setState({ products: res.data })
        })
    }

    handleSubmit = (e) => {
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully logged in
                    {
                    
                    }
                }
                else {
                    console.log("Login failed")
                }
            })
    }

    handleClientView = () => {

        this.setState({ clientView : !this.state.clientView})

    }

    render() {
        if (this.state.products.length === 0) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="products-container">
                        <div className="filter-bar">
                        <input type="checkbox" name="client" onClick={this.handleClientView}/>
                        <label htmlFor="client">Client View</label>

                        </div>
                       {this.state.clientView ? 
                            <div className="products">
                                {this.state.products.map(product =>
                                    <div className="products-shoe" key={product._id}>
                                        <div className="product-image">
                                            <Link to={`/products/${product._id}`}>
                                                <img src={product.productImage} alt={product.name} />
                                            </Link>
                                        </div>
                                        <div className="product-info">
                                            <p>{product.name}</p>
                                            <p>{`€${product.price}`}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        : null}
                    </div> 
                </div>
            )
        }
    }
}

export default AllProducts;