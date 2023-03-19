import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { Navigate as Redirect } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";



class AdminEdit extends Component{

    constructor(props){
        super(props)
        this.state = {
            product: null,
            id: null,
        }

    }

    componentDidMount() {
        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)
        this.setState({ id: id })

        axios.get(`${SERVER_HOST}/products/${id}`)
            .then(response => {
                if (response.data.name === "CastError") {
                    this.setState({ product: response.data.name })
                } else {
                    this.setState({ product: response.data })
                }

            }
            ).catch((error) => {
                console.log(error)
            })

    }

    handleSave = (e) => {

        e.preventDefault()

        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)

        const product = {
            name: document.querySelector("p").innerHTML,
            price: document.querySelectorAll("p")[1].innerHTML,
            description: document.querySelectorAll("p")[2].innerHTML,
            inventory: {
                stock: this.state.product.inventory.stock
            },
            images: this.state.product.images
        }

        axios.put(`${SERVER_HOST}/products/${id}`, product)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }


    




    render() {
        if (this.state.product === null) {
            return <div>Loading...</div>
        } else if (this.state.product === "CastError") {
            return <Redirect to="/404" />
        }
        const { activeIndex } = this.state;
        return (
            <div>
                <ScrollToTop />
                <div className="shoe-page-container">
                    <div className="shoe-page-container-left">
                        <div className="carousel">
                            <button className="carousel-button" onClick={this.handlePrevClick}>
                                <AiOutlineArrowLeft className="carousel-icon" />
                            </button>
                            <div className="carousel-images-container">
                                <div className="carousel-image">
                                    <img src={this.state.product.images[activeIndex]} alt={this.state.product.name} />
                                </div>
                            </div>
                            <button className="carousel-button" onClick={this.handleNextClick}>
                                <AiOutlineArrowRight className="carousel-icon" />
                            </button>
                        </div>
                    </div>
                    <div className="shoe-page-container-right">
                        <div className="shoe-page-container-right-top">
                            <p  contentEditable="true" >{this.state.product.name}</p>
                            <p  contentEditable="true" >€{this.state.product.price}</p>
                            <p  contentEditable="true" >{this.state.product.description}</p>
                            <div className="shoe-sizes">
                                {this.state.product.inventory.stock.map((stock => {

                                    return (<div key={stock.size}>

                                        <input disabled={stock.quantity === 0} value={stock.size} type='radio' name="size" onClick={this.updateSize} />

                                        <label disabled={stock.quantity === 0}>UK {stock.size}</label>
                                    </div>)

                                }))}
                            </div>
                            <div id="quantity" className="shoe-page-container-right-bottom">
                                <input type="range" min={1} max={this.state.maxQuantity} defaultValue={1} onChange={this.setQuantity} />
                                <p>Quantity: {this.state.selected.quantity}</p>
                            </div>
                        </div>
                        <button className="save-btn" onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminEdit