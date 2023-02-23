import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';


export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            activeIndex: 0
        }
    }


    componentDidMount() {
        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)

        axios.get(`${SERVER_HOST}/products/${id}`)
            .then(response => {
                this.setState({ product: response.data })
            }
            )

    }

    handlePrevClick = () => {
        const { activeIndex } = this.state;
        const lastIndex = this.state.product.images.length - 1;
        const shouldResetIndex = activeIndex === 0;
        const index = shouldResetIndex ? lastIndex : activeIndex - 1;

        this.setState({
            activeIndex: index,
        },
            () => console.log(this.state.product.images[activeIndex])
        );
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


    render() {
        if (this.state.product === null) {
            return <div>Loading...</div>
        }
        const { activeIndex } = this.state;
        return (
            <div>
                <div className="shoe-page-container">
                    <div className="shoe-page-container-left">
                        <div className="carousel">
                            <button className="carousel-button" onClick={this.handlePrevClick}>
                                <AiOutlineArrowLeft className="carousel-icon"/>
                            </button>
                            <div className="carousel-images-container">
                                <div className="carousel-image">
                                    <img src={this.state.product.images[activeIndex]} alt={this.state.product.name} />
                                </div>
                            </div>
                            <button className="carousel-button" onClick={this.handleNextClick}>
                                <AiOutlineArrowRight  className="carousel-icon"/>
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
                                        <input disabled={stock.quantity === 0} type='radio' name="size" />
                                        <label disabled={stock.quantity === 0}>UK {stock.size}</label>
                                    </div>)

                                }))}
                            </div>
                        </div>
                        <div className="shoe-page-container-right-bottom">
                            <button>Add To Basket</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}