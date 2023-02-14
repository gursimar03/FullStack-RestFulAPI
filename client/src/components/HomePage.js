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
          <main>
            <h1>Doing this part next</h1>
          </main>
          <footer>

          </footer>
        </div>

        {/* keep this constant at bottom of page */}
        <div id="search-page">
          <RxCross1 className="nav-button" onClick={this.props.openSearchPage}/>
          <h1>I will sort out the search page later</h1>
        </div>
      </div>
    )
  }
}

export default HomePage;