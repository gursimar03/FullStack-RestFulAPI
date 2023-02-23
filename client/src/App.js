import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "./config/global_constants"

//Icon imports
import { FaSistrix } from 'react-icons/fa';
import { GrCart } from 'react-icons/gr';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { VscAccount } from 'react-icons/vsc';
import { FiHelpCircle } from 'react-icons/fi';

//components
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import AllProducts from "./components/AllProducts";
import ProductPage from "./components/ProductPage";
import Profile from "./components/Profile";
import LoggedInRoute from "./components/LoggedInRoute";
import DeleteAccount from "./components/DeleteAccount";
import { ACCESS_LEVEL_GUEST } from "./config/global_constants";
import AdminBoard from "./components/AdminDashboard";


if (typeof localStorage.accessLevel === "undefined") {
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.isLoggedIn = false
    localStorage.profilePhoto = null
}

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            mobileNavOpen: false,
            searchPageOpen: false,
            name: localStorage.name,
            accessLevel: localStorage.accessLevel,
            showDropdown: false,

            products: []
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then(res => {
            this.setState({ products: res.data })
        })
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
        this.setState({ showDropdown: !this.state.showDropdown },
            () => {
                this.state.showDropdown ? document.getElementById('dropdown-content').style.top = '40.5px' : document.getElementById('dropdown-content').style.top = '-250px'
            }
        );
    };

    reloadPageAfterLogOut = () => {
        window.location.reload();
    }




    render() {
        return (
            <div className="App">
                {localStorage.accessLevel === 0 ? this.reloadPageAfterLogOut() : null}
                <BrowserRouter>
                    <div className="content-top">
                        <nav className="top-nav">
                            <div className="nav-content-left">
                                <Link id="logo" to={'/'}>
                                    <img src={require('./images/Not-Nike.png')} />
                                </Link>
                            </div>
                            <div className="nav-content-right">
                                {this.state.name !== "" && this.state.name !== null && this.state.name !== "GUEST" ? <p id="welcome">Welcome, {localStorage.name}</p> : <Link id="linkToSignIn" to={'/account-login'}><p>Sign In</p></Link>}
                                {this.state.accessLevel > 0 ? <Link id="linkToAccount" onClick={this.toggleDropdown}> {
                                    localStorage.profilePhoto !== "null" ?
                                        <img id="profilePhoto" className="profileImg" src={`data:;base64,${localStorage.profilePhoto}`} alt="Loading photo" />
                                        :
                                        <VscAccount className="account-icon" />
                                }</Link> : null}
                                <div id="dropdown-content">
                                    <Link to={'/profile'}>Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/payment-method">Payment Method</Link>
                                    {localStorage.accessLevel == 2 ? <Link to="/admin"> Admin Dashboard </Link> : null}
                                    <Logout refresh={this.reloadPageAfterLogOut} />
                                </div>
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
                        <Route path="/account-login" element={<Login refresh={this.reloadPageAfterLogOut} />}></Route>
                        <Route path="/account-register" element={<Register />}></Route>
                        <Route path="/products" element={<AllProducts />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/delete-account" element={<DeleteAccount />}></Route>
                        <Route path="/products/:id" element={<ProductPage />}></Route>
                        <Route path="/admin" element={<AdminBoard />}></Route>
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