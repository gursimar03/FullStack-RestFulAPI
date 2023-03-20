import React, { Component } from "react"
import { Link } from "react-router-dom"
import { SERVER_HOST } from "../config/global_constants"

import axios from "axios"
import ScrollToTop from "../ScrollToTop"

class AllProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            clientView: false,
            email: localStorage.email,
            level: 0
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
                      
                    }
                    else // user successfully logged in
                    {

                    }
                }
                else {
                    
                }
            })
    }

    handleClientView = () => {

        this.setState({ clientView: !this.state.clientView })

    }


    handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios
                .delete(`${SERVER_HOST}/product/${productId}`, {
                    headers: { authorization: localStorage.token },
                })
                .then((res) => {
                    this.setState({ redirect: true });
                  

                    window.location.reload();
                })
                .catch((err) => {
                   
                });
        }
    };




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
                    <ScrollToTop />
                    <Link to={"/addProduct"}>Add New Product</Link>
                    <div className="products-container">
                        <div className="filter-bar">
                            <input type="checkbox" name="client" onClick={this.handleClientView} />
                            <label htmlFor="client">Client View</label>

                        </div>
                        <div className="products">
                            
                            {this.state.products.map(product =>
                                <div className="products-shoe" key={product._id}>
                                    <div className="product-image">
                                        <Link to={`/products/${product._id}`}>
                                            <img src={product.productImage} alt={product.name} />
                                        </Link>
                                    </div>
                                    {!this.state.clientView ? <div className="admin-btns">
                                        <Link to={`/editproduct/${product._id}`}>
                                            <button className="edit-btn">Edit</button>
                                        </Link>
                                        {/* <Link className="del-btn" to={"/DeleteProduct/" + product._id}>Delete</Link> */}
                                        {/* <button className="del-btn" value={product._id} onClick={this.handleDelete}>Delete</button> */}
                                        <button className="del-btn" onClick={() => this.handleDelete(product._id)}>Delete</button>
                                    </div> : " "}
                                    <div className="product-info">
                                        <p>{product.name}</p>
                                        <p>{`€${product.price}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )
        }
    }
}

export default AllProducts;