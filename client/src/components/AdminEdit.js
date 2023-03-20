import React, { Component } from 'react';
import axios from 'axios';

class AdminEdit extends Component {
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
        stock: [],
      },
      newStock: {},
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const productId = url.split("/")[4];
    
    axios.get(`/products/${productId}`)
    
      .then(response => {
        console.log(response);
        this.setState({
          brand: response.brand,
          name: response.name,
          description: response.description,
          age: response.age,
          type: response.type,
          color: response.color,
          productImage: response.productImage,
          images: response.images,
          sizes: response.sizes,
          price: response.price,
          inventory: response.inventory,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleStockChange = event => {
    const { name, value } = event.target;
    const { newStock } = this.state;
    this.setState({
      newStock: {
        ...newStock,
        [name]: parseInt(value),
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { brand, name, description, age, type, color, productImage, images, sizes, price, inventory, newStock } = this.state;
    const updatedProduct = {
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
      inventory: {
        stock: inventory.stock.map(stock => {
          const newQuantity = newStock[stock.size] !== undefined ? newStock[stock.size] : stock.quantity;
          return {
            size: stock.size,
            quantity: newQuantity,
          };
        }),
      },
    };
    axios.put(`/products/${this.props.match.params._id}`, updatedProduct)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {  name, description, age, type, color, productImage, images, sizes, price, inventory } = this.state.product;
    return (
      <div>
        <form onSubmit={this.handleSave}>
          <label htmlFor="brand">Brand:</label>
          <input type="text" name="brand" id="brand" value={"d"} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={name} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="description">Description:</label>
          <textarea name="description" id="description" value={description} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="age">Age:</label>
          <select name="age" id="age" value={age} onChange={this.handleChange}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
          <br />
  
          <label htmlFor="type">Type:</label>
          <select name="type" id="type" value={type} onChange={this.handleChange}>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
            <option value="Training">Training</option>
          </select>
          <br />
  
          <label htmlFor="color">Color:</label>
          <input type="text" name="color" id="color" value={color} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="productImage">Product Image:</label>
          <input type="text" name="productImage" id="productImage" value={productImage} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="images">Images:</label>
          <input type="text" name="images" id="images" value={images.join(',')} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="sizes">Sizes:</label>
          <input type="text" name="sizes" id="sizes" value={sizes.join(',')} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" id="price" value={price} onChange={this.handleChange} />
          <br />
  
          <label htmlFor="inventory">Inventory:</label>
          <input type="text" name="inventory" id="inventory" value={JSON.stringify(inventory)} onChange={this.handleChange} />
          <br />
  
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default AdminEdit;