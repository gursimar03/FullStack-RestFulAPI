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
            inventory: {
                stock: [],
            },
        }
    }

    componentDidMount() {
        const url = window.location.href
        const productId = url.substring(url.lastIndexOf('/') + 1)
        axios
            .get(`${SERVER_HOST}/editproduct/${productId}`)
            .then((res) => {
                this.setState({
                    brand : res.data.brand,
                    name : res.data.name,
                    description : res.data.description,
                    age : res.data.age,
                    type : res.data.type,
                    color : res.data.color,
                    productImage : res.data.productImage,
                    images : res.data.images,
                    sizes : res.data.sizes,
                    price : res.data.price,
                    inventory : res.data.inventory
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSubmit = (e) => {
        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)
        e.preventDefault();
        axios
            .put(`${SERVER_HOST}/editproduct/${id}`, {
                brand: this.state.brand,
                name: this.state.name,
                description: this.state.description,
                age: this.state.age,
                type: this.state.type,
                color: this.state.color,
                productImage: this.state.productImage,
                images: this.state.images,
                sizes: this.state.sizes,
                price: this.state.price,
                inventory: this.state.inventory
            })
            .then((res) => {
                console.log(res.data);
                this.productAddedToCartIdentifier();
                this.props.history.push("/products");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    productAddedToCartIdentifier = () => {
        const productAddedToCartIdentifier = document.querySelector(".edit-identifier");
        console.log(productAddedToCartIdentifier);
        productAddedToCartIdentifier.style.right = "0px";
        setTimeout(() => {
            productAddedToCartIdentifier.style.right = "-5000px";
        }, 2000)
        setTimeout(() => {
            window.location.replace("http://localhost:4000/admin");
        }, 4000)
        
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleStockChange = (e) => {
        const { name, value } = e.target;


        for (let i = 0; i < this.state.inventory.stock.length; i++) {
            if (this.state.inventory.stock[i].size == name) {
                
                this.state.inventory.stock.splice(i, 1, { size: name, quantity: parseInt(value) });
                this.setState(prevState => ({
                    ...prevState,
                    inventory: { ...prevState.inventory, stock: this.state.inventory.stock }
                }));

                return;
            }
        }
  
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
                <div className="edit-identifier">
                    <p>Product Updated!</p>
                </div>
                <ScrollToTop />
                <h3>Edit Product</h3>
                <form onSubmit={this.handleSubmit} className="edit-product-form">
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
                        <label htmlFor="inventory">Inventory:</label>
                        {inventory.stock.map(stock => (
                            <div key={stock.size}>
                                <label htmlFor={stock.size}>{stock.size}:</label>
                                <input type="number" name={stock.size} id={stock.size} defaultValue={stock.quantity} onChange={this.handleStockChange} />
                            </div>
                        ))}
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