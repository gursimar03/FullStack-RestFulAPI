import React, { Component } from "react"
import { SERVER_HOST } from "../config/global_constants"
import axios from "axios"
import ScrollToTop from "../ScrollToTop"

class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            brand: "",
            name: "",
            description: "",
            age: "",
            type: "",
            color: "",
            productImage: "",
            images: [],
            sizes: [],
            price: "",
            inventory: {},
        }
    }

    componentDidMount() {
        const url = window.location.href
        const productId = url.substring(url.lastIndexOf('/') + 1)
        axios
            .get(`${SERVER_HOST}/editproduct/${productId}`)
            .then((res) => {
                this.setState({ product: res.data });
                const {
                    brand,
                    name,
                    description,
                    age,
                    type,
                    color,
                    productImage,
                    images,
                    sizes,
                    price,
                    inventory,
                } = res.data;
                this.setState({
                    brand,
                    name,
                    description,
                    age,
                    type,
                    color,
                    productImage,
                    images,
                    sizes,
                    price,
                    inventory,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            brand,
            name,
            description,
            age,
            type,
            color,
            productImage,
            images,
            sizes,
            price,
            inventory,
        } = this.state;
        axios
            .put(`${SERVER_HOST}/product/${this.props.match.params.id}`, {
                brand,
                name,
                description,
                age,
                type,
                color,
                productImage,
                images,
                sizes,
                price,
                inventory,
            })
            .then((res) => {
                console.log(res.data);
                alert("Product updated successfully");
                this.props.history.push("/products");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to update product");
            });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const {
            brand,
            name,
            description,
            age,
            type,
            color,
            productImage,
            images,
            sizes,
            price,
            inventory,
        } = this.state;
        return (
            //brand, name ,descriptin are of type string, age and type are made with enums so shoul dbe 
            //dropdowns, color is a string, productImage is a string, images is an array of strings,
            //sizes is an array of strings, price is a number, inventory is an object with a stock array
            //of objects with a size and quantity
            <div>
                <ScrollToTop />
                <h3>Edit Product</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Brand: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="brand"
                            value={brand}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="age"
                            value={age}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="type"
                            value={type}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Color: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="color"
                            value={color}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Image: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="productImage"
                            value={productImage}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Images: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="images"
                            value={images}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sizes: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="sizes"
                            value={sizes}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="price"
                            value={price}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Inventory: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="inventory"
                            value={inventory}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Edit Product"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditProduct;