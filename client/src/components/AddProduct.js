import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_HOST } from '../config/global_constants';

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: '',
            name: '',
            description: '',
            age: '',
            type: '',
            color: '',
            productImage: '',
            images: [],
            sizes: [],
            price: 0,
            inventory: {
                stock: []
            }
        };
    }

    onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'inventory') {
            this.setState(prevState => ({
                ...prevState,
                inventory: { ...prevState.inventory, stock: value.split(',') }
            }));
        } else {
            this.setState({ [name]: value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const product = {
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
        };

        axios.post(`${SERVER_HOST}/products/add`, product);

        this.setState({
            brand: '',
            name: '',
            description: '',
            age: '',
            type: '',
            color: '',
            productImage: '',
            images: [],
            sizes: [],
            price: 0,
            inventory: {
                stock: []
            }
        });
    }

    render() {
        return (
            <div>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Brand: </label>
                        <input type="text"
                            className="form-control"
                            name="brand"
                            value={this.state.brand}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <select className="form-control"
                            name="age"
                            value={this.state.age}
                            onChange={this.onChange}
                            required
                        >
                            <option value="">Select Age</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Boys">Boys</option>
                            <option value="Girls">Girls</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select className="form-control"
                            name="type"
                            value={this.state.type}
                            onChange={this.onChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Running">Running</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Football">Football</option>
                            <option value="Training">Training</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Color: </label>
                        <input type="text"
                            className="form-control"
                            name="color"
                            value={this.state.color}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Image URL: </label>
                        <input type="text"
                            className="form-control"
                            name="productImage"
                            value={this.state.productImage}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Additional Images URLs (separated by commas): </label>
                        <input type="text"
                            className="form-control"
                            name="images"
                            value={this.state.images}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sizes (separated by commas): </label>
                        <input type="text"
                            className="form-control"
                            name="sizes"
                            value={this.state.sizes}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number"
                            className="form-control"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Inventory Stock (separated by commas): </label>
                        <input type="text"
                            className="form-control"
                            name="inventory"
                            value={this.state.inventory.stock}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;





