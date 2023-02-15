
import React from "react";
import { Link } from "react-router-dom";

import { RxCross1 } from 'react-icons/rx';

class HomePage extends React.Component {
  render() {
    return (
      <div className="homepage-container">

        <div className="homepage-body">
          <div className="homepage-hero">
            <div className="homepage-hero-images">
              <img className="hero-image1" alt="homepage" src={require('../images/Hero-Image.jpg')} />
              <img className="hero-image2" alt="homepage" src={require('../images/Hero-Image7.jpg')} />
            </div>
            <div className="homepage-hero-info">
              <div className="shop-now-button">
                <Link className="shop-now-button-text" to={'/'}>Shop Now</Link>
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
                    <Link to={'/'}>Shop Men</Link>
                  </div>
                </div>
                <div className="shop-women">
                  <img alt="man" src={require('../images/Shop-Woman.jpg')} />
                  <div className="style-box-text">
                    <Link to={'/'}>Shop Women</Link>
                  </div>
                </div>
                <div className="shop-kids">
                  <img alt="man" src={require('../images/Shop-Kids.jpg')} />
                  <div className="style-box-text">
                    <Link to={'/'}>Shop Kids</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="community-container">
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
                <Link to={'/'}>Join The Community Today</Link>
              </div>
            </div>

            <div className="product-advertisment-container">
              <h2>Our Favourites</h2>
              <div className="favourite-product-container">
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
                <div className="product">Product Placeholder</div>
              </div>
            </div>

            <div className="style-genre-container">
              <h2>Find Your Style</h2>
              <div className="contrast-genres">
                <img alt="contrast" src={require('../images/formal.jpg')} />
                <img  alt="contrast" src={require('../images/casual.jpg')} />
                <img  alt="contrast" src={require('../images/football.jpg')} />
              </div>
            </div>

            <div className="contact-us-container">

            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default HomePage;
