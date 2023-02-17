import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";

//Icon imports
import { FaSistrix } from 'react-icons/fa';
import { GrCart } from 'react-icons/gr';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { VscAccount } from 'react-icons/vsc';
import { FiHelpCircle } from 'react-icons/fi';

//components
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";

import { ACCESS_LEVEL_GUEST } from "./config/global_constants";


if (typeof localStorage.accessLevel === "undefined") {
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            mobileNavOpen: false,
            searchPageOpen: false,
            name: localStorage.name,
            showDropdown: false
        }
    }


    openMobileNav = () => {
        this.state.mobileNavOpen ? this.setState({ mobileNavOpen: false }, () => {
            document.getElementById('mobile-nav').style.height = '0vh';
        }) : this.setState({ mobileNavOpen: true }, () => {
            document.getElementById('mobile-nav').style.height = '100vh';
        })
    }

    openSearchPage = () => {
        this.state.searchPageOpen ? this.setState({ searchPageOpen: false }, () => {
            document.getElementById('search-page').style.height = '0vh';
        }) : this.setState({ searchPageOpen: true }, () => {
            document.getElementById('search-page').style.height = '100vh';
        })
    }

    toggleDropdown = () => {
        this.setState({ showDropdown: !this.state.showDropdown });
    };

    render() {
        const { showDropdown } = this.state;
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="content-top">
                        <nav className="top-nav">
                            <div className="nav-content-left">
                                <Link id="logo" to={'/'}>Logo</Link>
                            </div>
                            <div className="nav-content-right">
                                {this.state.name !== "" && this.state.name !== null && this.state.name !== "GUEST" ? <p id="welcome">Welcome, {this.state.name}</p> : <Link id="linkToSignIn" to={'/account-login'}><p>Sign In</p></Link>}
                                <Link id="linkToAccount" to={'/'} onClick={this.toggleDropdown}><VscAccount className="account-icon" /></Link>
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        <Link to="/profile">Profile</Link>
                                        <Link to="/orders">Orders</Link>
                                        <Link to="/payment-method">Payment Method</Link>
                                        <Link className="to-logout-link" to={'/account-logout'}>LOG OUT</Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                        <header className="header-container">

                            {/* mobile */}
                            <div className="mobile-header-content">
                                <div className="mobile-nav-open">
                                    {this.state.mobileNavOpen ? <RxCross1 className="nav-button" onClick={this.openMobileNav} /> : <RxHamburgerMenu className="nav-button" onClick={this.openMobileNav} />}

                                </div>
                                <div className="mobile-header-content-middle">
                                    <div className="text-logo">
                                        <p>Not Nike</p>
                                    </div>
                                </div>
                                <div className="mobile-header-content-right">
                                    <div className="search-btn-container">
                                        <FaSistrix onClick={this.openSearchPage} className="search-bar-icon-btn" />
                                    </div>
                                    <div className="cart-btn-container">
                                        <GrCart className="cart-btn" />
                                    </div>
                                </div>
                            </div>
                            <div id="mobile-nav">
                                <ul className="mobile-nav-links">
                                    <li>
                                        <Link className="nav-link" to={'/'}><p>Shop Men</p></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" to={'/'}><p>Shop Women</p></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" to={'/'}><p>Shop Kids</p></Link>
                                    </li>
                                    <li className="contact-btn">
                                        <Link className="nav-link" to={'/'}><p>Contact Us</p></Link>
                                    </li>
                                    <li className="FAQ-btn">
                                        <Link className="nav-link" to={'/'}><p>Account</p></Link>
                                    </li>
                                </ul>
                            </div>

                            {/* desktop */}
                            <nav className="bottom-nav">
                                <div className="bottom-nav-content-left">
                                    <div className="nav-links">
                                        <Link to={'/'}>Shop Men</Link>
                                        <Link to={'/'}>Shop Woman</Link>
                                        <Link to={'/'}>Shop Kids</Link>
                                    </div>
                                </div>
                                <div className="bottom-nav-content-middle">
                                    <div className="text-logo">
                                        <p>Not Nike</p>
                                    </div>
                                </div>
                                <div className="bottom-nav-content-right">
                                    <div className="website-informatics">
                                        <div className="help-btn">
                                            <a id="linkToContact" href="#contact"><FiHelpCircle /></a>
                                        </div>
                                        <div className="search-btn">
                                            <FaSistrix onClick={this.openSearchPage} />
                                        </div>
                                        <div className="cart-container">
                                            <Link id="cart" to={'/'}><GrCart id="dCart" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </header>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage openSearchPage={this.openSearchPage} />}></Route>
                        <Route path="/account-login" element={<Login />}></Route>
                    
                        <Route path="/account-register" element={<Register />}></Route>
                        {/* Page doesn't exist css later */}
                        <Route path="*" element={<h2>This page does not exist</h2>} />
                    </Routes>
                </BrowserRouter>
                {/* keep these constant at bottom of page */}
                <div id="search-page">
                    <RxCross1 className="nav-button" onClick={this.openSearchPage} />
                    <h1>I will sort out the search page later</h1>
                </div>
                <footer className="constant-footer">
                    <div className="footer-content">
                        Footer for Now
                    </div>
                </footer>
            </div>

        )
    }
}

export default App;