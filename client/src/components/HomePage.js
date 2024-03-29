
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { SERVER_HOST } from "../config/global_constants";
import ScrollToTop from "../ScrollToTop";

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }


  // scrollFunction = () => {
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     document.querySelector(".find-your-style-boxes div").style.right = "auto";
  //   }
  // }

  componentDidMount() {
    axios.get(`${SERVER_HOST}/products`)
      .then(response => {
        this.setState({ products: response.data });
      });
    
    // window.onscroll = this.scrollFunction;
  }

  render() {
    if (!this.state.products) {
      return <div>Loading...</div>;
    }

    return (
      <div className="homepage-container">
        <ScrollToTop />
        <div className="homepage-body">
          <div className="homepage-hero">
            <div className="homepage-hero-images">
              <img className="hero-image1" alt="homepage" src={require('../images/Hero-Image.jpg')} />
              <img className="hero-image2" alt="homepage" src={require('../images/Hero-Image7.jpg')} />
            </div>
            <div className="homepage-hero-info">
              <div className="shop-now-button">
                <Link className="shop-now-button-text" to={'/products'}>Shop Now</Link>
              </div>
            </div>
          </div>
          <main className="main-body">

            <div className="find-your-style-container">
              <h2>For you</h2>
              <div className="find-your-style-boxes">
                <div className="shop-men">
                  <img alt="man" src={require('../images/Shop-Men.jpg')} />
                  <div className="style-box-text">
                    <Link to={'/products/men'}>Shop Men</Link>
                  </div>
                </div>
                <div className="shop-women">
                  <img alt="man" src={require('../images/Shop-Woman.jpg')} />
                  <div className="style-box-text">
                    <Link to={'/products/women'}>Shop Women</Link>
                  </div>
                </div>
                <div className="shop-kids">
                  <img alt="man" src={require('../images/Shop-Kids.jpg')} />
                  <div className="style-box-text">
                    <Link to={'/products/kids'}>Shop Kids</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="community-container">
              <h2>The Fastest Growing Community</h2>
              <div className="community-image">
                  <img alt="community" src={require('../images/community.jpg')} />
              </div>
              <div className="join-community-container">
                <h2>Don't Miss Out On The Fun</h2>
                <p>
                  Create a free account with Not Nike to join the community.
                  Members recieve free delivery, daily rewards and a 100% money back
                  guarantee.
                </p>
                <Link to={'/account-register'}>Join The Community Today</Link>
              </div>
            </div>

            <div className="product-advertisment-container">
              <h2>Our Favourites</h2>
              <div className="favourite-product-container">
                {this.state.products.slice(0, 8).map(product => (
                  <div className="product" key={product._id}>
                    <Link to={`/products/${product._id}`}>
                      <img alt="product" src={product.productImage} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="style-genre-container">
              <h2>Find Your Style</h2>
              <div className="contrast-genres">
                <div>
                  <img alt="contrast" src={require('../images/formal.jpg')} />
                </div>
                <div>
                  <img alt="contrast" src={require('../images/casual.jpg')} />
                </div>
                <div>
                  <img alt="contrast" src={require('../images/football.jpg')} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default HomePage;
