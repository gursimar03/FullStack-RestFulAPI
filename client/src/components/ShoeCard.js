import React from "react";
import { Link } from "react-router-dom";

class Card extends React.Component {

    render() {
        return (
        <div className="products-shoe" key={this.props.product._id}>
            <div className="product-image">
                <Link to={`/products/${this.props.product._id}`}>
                    <img src={this.props.product.productImage} alt={this.props.product.name} />
                </Link>
            </div>
            <div className="product-info">
                <p>{this.props.product.name}</p>
                <p>{this.props.product.type}</p>
                <br></br>
                <p>{`€${this.props.product.price}`}</p>
            </div>
        </div>
        )
    }
}

export default Card;