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

    onSizeChange = (e) => {

        if (e.keyCode === 32) {

            if (this.state.sizes.includes(e.target.value.trim())
            ) {
                alert('Size already exists');
                return;
            }


            if (e.target.value === '') {
                alert('Size cannot be empty');
                return;
            }

            if (e.target.value > 26 || e.target.value < 3) {
                alert('Size must be between 3 and 26');
                return;
            }

            if (isNaN(e.target.value)) {
                alert('Size must be a number');
                return;
            }

            this.setState(prevState => ({
                ...prevState,
                sizes: [...prevState.sizes, e.target.value.trim()]
            }), () => {
                e.target.value = '';
            });
        }
    }

    onSizeRemove = (e) => {
        this.setState(prevState => ({
            ...prevState,
            sizes: prevState.sizes.filter(size => size !== e.target.innerHTML)
        }));
    }

    productAddedToCartIdentifier = () => {
        const productAddedToCartIdentifier = document.querySelector(".edit-identifier");
        console.log(productAddedToCartIdentifier);
        productAddedToCartIdentifier.style.right = "0px";
        setTimeout(() => {
            productAddedToCartIdentifier.style.right = "-5000px";
        }, 2000)
        setTimeout(() => {
            window.location.replace("http://localhost:3000/admin");
        }, 4000)
    }


    createStock = (e) => {
        const { name, value } = e.target;
        if (isNaN(name) || isNaN(value)) {
            alert('Size and quantity must be numbers');
            return;
        }

        const inventory = {
            stock: [...this.state.inventory.stock]
        }

        if (this.state.inventory.stock.length === 0) {
            this.setState(prevState => ({
                ...prevState,
                inventory: { ...prevState.inventory, stock: [...prevState.inventory.stock, { size: parseFloat(name), quantity: parseInt(value) }] }
            }));
        } else {

            for (let i = 0; i < this.state.inventory.stock.length; i++) {
                if (this.state.inventory.stock[i].size === parseFloat(name)) {
                    
                    inventory.stock.splice(i, 1, { size: parseFloat(name), quantity: parseInt(value) });
                    this.setState(prevState => ({
                        ...prevState,
                        inventory: { ...prevState.inventory, stock: inventory.stock }
                    }));

                    return;
                }
            }

            this.setState(prevState => ({
                ...prevState,
                inventory: { ...prevState.inventory, stock: [...prevState.inventory.stock, { size: parseFloat(name), quantity: parseInt(value) }] }
            }));
        }

        for (let i = 0; i < this.state.inventory.stock.length; i++) {
            if (this.state.inventory.stock[i].size === parseFloat(name)) {
                console.log('size already exists');
                return;
            } else {
                console.log('size does not exist');
                return;
            }
        }

        console.log(inventory)
    }

    //order stock size
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

        axios.post(`${SERVER_HOST}/products/add`, product).then(res => {
            console.log(res.data);
            this.productAddedToCartIdentifier();
        }).catch(err => {
            console.log(err);
        });

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
            <div className='add-container'>
                <div className="edit-identifier">
                    <p>Product Added!</p>
                </div>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit} className='add-product-form'>
                    <div className='form-content'>
                        <div className='form-content-left'>
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
                                <label>Sizes: </label>
                                <div className='selected-sizes'>
                                    {this.state.sizes.map(size =>
                                        <p key={size} value={size} onClick={this.onSizeRemove}>{size}</p>
                                    )}
                                </div>
                                <input type="text"
                                    className="form-control"
                                    name="sizes"
                                    onKeyDown={this.onSizeChange}
                                    placeholder="Enter size and press spacebar"
                                />
                            </div>
                            <div className="form-group">
                                <label>Inventory Stock: </label>
                                {this.state.sizes.map(size =>
                                    <div key={size}>
                                        <label>{`Enter quantity for ${size}`}</label>
                                        <input type="number"
                                            className="form-control"
                                            name={size}
                                            onChange={this.createStock}
                                            min="0"
                                            step="1"
                                            placeholder={`Enter stock for size ${size}`}
                                        />
                                    </div>
                                )}
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
                        </div>
                        <div className='form-content-right'>
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
                                <input type="submit" value="Add Product" className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;





