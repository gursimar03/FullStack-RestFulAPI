import React from "react";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

class MenProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/shoes/men`)
            .then((response) => {
                this.setState({ products: response.data })
            }
        )
    }

    render() {
        return (
            <div>
                Hello World
            </div>
        )
    }

}

export default MenProducts;