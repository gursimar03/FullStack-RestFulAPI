import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
    render() {
        return (
            <div id="search-page">
                <RxCross1 className="nav-button" onClick={this.props.openSearchPage} />
                <div className="search-page-content">
                    <div className="search">
                        <input type="text" placeholder="Search" onChange={this.props.handleSearch} />   
                    </div>
                    <div className="search-results">
                    <div className="products">
                            {this.props.productsData.map(product =>
                                <div className="products-shoe" key={product._id}>
                                    <div className="product-image">
                                        <Link to={`/products/${product._id}`}>
                                            <img src={product.productImage} alt={product.name} />
                                        </Link>
                                    </div>
                                    <div className="product-info">
                                        <p>{product.name}</p>
                                        <p>{product.age}</p>
                                        <br></br>
                                        <p>{`€${product.price}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage;