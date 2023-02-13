import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div class="homepage-container">
        <div className="content-top">
          <nav className="top-nav">
            <div className="nav-content-left">
              <Link id="logo" to={'/'}>Logo</Link>
            </div>
            <div className="nav-content-right">
              <Link id="linkToSignIn" to={'/'}>Sign In</Link>
              <Link id="linkToAccount" to={'/'}>Account</Link>
            </div>
          </nav>
          <header className="header-container">
            <nav className="bottom-nav">
              <div>
                
              </div>
            </nav>
          </header>
        </div>
      </div>
    )
  }
}

export default HomePage;