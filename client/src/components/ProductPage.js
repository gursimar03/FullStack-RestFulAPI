import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { Navigate as Redirect } from "react-router-dom";


export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            activeIndex: 0,
            maxQuantity: 0,

            selected: {
                size: 0,
                quantity: 0,
            }
        }
    }


    componentDidMount() {
        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)

        axios.get(`${SERVER_HOST}/products/${id}`)
            .then(response => {
                if(response.data.name === "CastError") {
                   this.setState({product: response.data.name})
                } else {
                    this.setState({ product: response.data })
                }
                
            }
            ).catch((error) => {
                console.log(error)
        })

    }
 

    handlePrevClick = () => {
        const { activeIndex } = this.state;
        const lastIndex = this.state.product.images.length - 1;
        const shouldResetIndex = activeIndex === 0;
        const index = shouldResetIndex ? lastIndex : activeIndex - 1;

        this.setState({
            activeIndex: index,
        });
    }

    handleNextClick = () => {
        const { activeIndex } = this.state;
        const lastIndex = this.state.product.images.length - 1;
        const shouldResetIndex = activeIndex === lastIndex;
        const index = shouldResetIndex ? 0 : activeIndex + 1;

        this.setState({
            activeIndex: index,
        });
    }


    handleAddToCartClick = () =>{
       
    
        if(localStorage.acessLevel !== 0){

            axios.post(`${SERVER_HOST}/cart/${this.state.product["_id"]}/${this.state.selected.size}/${this.state.selected.quantity}/${localStorage.email}`)
            .then(res =>{
       
               console.log(res)
       
           })
        }else{
            window.alert("No User Logged in. Please Log in to add to cart");
        }

}


    updateSize = (e) => {
        const { value } = e.target;
        this.setState({
            selected: {
                size: value,
                quantity: this.state.selected.quantity
            }
        }, () => {
            // eslint-disable-next-line
            this.state.product.inventory.stock.map(stock => {
                if (stock.size === parseFloat(this.state.selected.size)) {
                    this.setState({
                        maxQuantity: stock.quantity
                    }, () => {
                        if (this.state.selected.quantity > this.state.maxQuantity) {
                            this.setState({
                                selected: {
                                    size: this.state.selected.size,
                                    quantity: this.state.maxQuantity
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    setQuantity = (e) => {
        let { value } = e.target

        if (value > this.state.maxQuantity) {
            value = this.state.maxQuantity
            this.setState({
                selected: {
                    size: this.state.selected.size,
                    quantity: value
                }
            })
        } else if (value < 0) {
            value = 1
            this.setState({
                selected: {
                    size: this.state.selected.size,
                    quantity: value
                }
            })
        }

        this.setState({
            selected: {
                size: this.state.selected.size,
                quantity: value
            }
        })
    }


    render() {
        if (this.state.product === null) {
            return <div>Loading...</div>
        }  else if (this.state.product === "CastError") {
            return <Redirect to="/404" />
        }
        const { activeIndex } = this.state;
        return (   
            <div>
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
                            <p>{this.state.product.name}</p>
                            <p>€{this.state.product.price}</p>
                            <p>{this.state.product.description}</p>
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
                        <div className="shoe-page-container-right-bottom">
                            <button onClick={this.handleAddToCartClick}>Add To Basket</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}