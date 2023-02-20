import React from "react";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

class WomenProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/shoes/women`)
            .then((response) => {
                this.setState({ products: response.data })
            }
        )
    }

    render() {
        if(this.state.products.length < 1) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        }

        return (
            <div>
                Hello World
            </div>
        )
    }

}

export default WomenProducts;