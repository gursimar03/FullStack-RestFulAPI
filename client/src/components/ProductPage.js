import React, { Component } from "react"
import axios from "axios"
import { SERVER_HOST } from "../config/global_constants"


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
        }, 
        () => console.log(this.state.product.images[activeIndex]));
    }


    render() {
        if (!this.state.product) {
            return <div>Loading...</div>
        }
        const { activeIndex } = this.state;
        return (
            <div>
                <h1>{this.state.product.name}</h1>
                <div className="carousel">
                    <button className="carousel-button" onClick={this.handlePrevClick}>
                        Prev
                    </button>
                    <div className="carousel-images-container">
                        <div className="carousel-image">
                            <img src={this.state.product.images[activeIndex]} alt={this.state.product.name} />
                        </div>
                    </div>
                    <button className="carousel-button" onClick={this.handleNextClick}>
                        Next
                    </button>
                </div>
            </div>
        )
    }
}