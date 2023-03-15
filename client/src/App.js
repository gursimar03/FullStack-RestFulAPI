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
import DeleteAccount from "./components/DeleteAccount";
import { ACCESS_LEVEL_GUEST } from "./config/global_constants";
import AdminBoard from "./components/AdminDashboard";
import MenProducts from "./components/MenProducts";
import WomenProducts from "./components/WomenProducts";
import KidsProducts from "./components/KidProducts";
import SearchPage from "./components/SearchPage";
import ErrorPage from "./components/ErrorPage";
import ScrollToTop from "./ScrollToTop";


if (typeof localStorage.accessLevel === "undefined") {
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.email = null
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

            products: [],
            productsData: [],
            itemsInCart: 0,
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then(res => {
            this.setState({ products: res.data })
        }).then(() => {
            this.setState({ productsData: this.state.products })
        })

        axios.get(`${SERVER_HOST}/cart/${localStorage.email}/countItems`)
        .then(res => {
            if(res.data.message) {
                this.setState({itemsInCart: 0})
            } else {
                this.setState({itemsInCart: res.data.itemCount})
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleCartSize = (e) => {
        axios.get(`${SERVER_HOST}/cart/${localStorage.email}/countItems`)
        .then(res => {
            if(res.data.message) {
                this.setState({itemsInCart: e})
            } else {
                const newVal = parseInt(e) + parseInt(res.data.itemCount)
                console.log(newVal)
                this.setState({itemsInCart: newVal})
            }
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
                this.state.showDropdown ? document.getElementById('dropdown-content').style.top = '60.5px' : document.getElementById('dropdown-content').style.top = '-250px'
            }
        );
    };

    reloadPageAfterLogOut = () => {
        window.location.reload();
    }


    handleSearch = (e) => {
        const { value } = e.target;
        if (value === "") {
            this.setState({ productsData: this.state.products })
        } else {
            this.setState({
                productsData: this.state.products.filter(shoe => shoe.name.toLowerCase().includes(value.toLowerCase().trim())
                    || shoe.brand.toLowerCase().includes(value.toLowerCase().trim())
                    || shoe.color.toLowerCase().includes(value.toLowerCase().trim())
                    || shoe.type.toLowerCase().includes(value.toLowerCase().trim())
                    || shoe.age.toLowerCase().includes(value.toLowerCase().trim())
                )
            })
        }
    }


    render() {
        return (
            <div className="App">
                <ScrollToTop />
                {localStorage.accessLevel === 0 ? this.reloadPageAfterLogOut() : null}
                <BrowserRouter>
                    <div className="content-top">
                        <nav className="top-nav">
                            <div className="nav-content-left">
                                <Link id="logo" to={'/'}>
                                    <img src={require('./images/Not-Nike.png')} alt='logo' />
                                </Link>
                            </div>
                            <div className="nav-content-right">
                                {this.state.name !== "" && this.state.name !== null && this.state.name !== "GUEST" ? <p id="welcome">Welcome, {localStorage.name}</p> : <Link id="linkToSignIn" to={'/account-login'}><p>Sign In</p></Link>}

                                {this.state.accessLevel > 0 ? <Link id="linkToAccount" onClick={this.toggleDropdown}> {
                                    
                                    localStorage.profilePhoto !== "undefined" && localStorage.profilePhoto !== "null"?
                                        localStorage.profilePhoto.includes('google') ? <img id="profilePhoto" className="profileImg" src={`${localStorage.profilePhoto}`} alt="Profile" /> :<img id="profilePhoto" className="profileImg" src={`data:;base64,${localStorage.profilePhoto}`} alt="Profile" />
                                        :
                                        <VscAccount className="account-icon" />
                                }</Link> : null}

                                <div id="dropdown-content">
                                    <Link to={'/profile'}>Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/payment-method">Payment Method</Link>
                                    {localStorage.accessLevel === '2' ? <Link to="/admin"> Admin Dashboard </Link> : null}

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
                                        <Link className="nav-link" to={'/products'} onClick={this.openMobileNav} ><p>Shop All</p></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" to={'/products/men'} onClick={this.openMobileNav}><p>Shop Men</p></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" to={'/products/women'} onClick={this.openMobileNav}><p>Shop Women</p></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" to={'/products/kids'} onClick={this.openMobileNav}><p>Shop Kids</p></Link>
                                    </li>
                                    <li className="FAQ-btn">
                                        <Link className="nav-link" to={'/profile'} onClick={this.openMobileNav}><p>Account</p></Link>
                                    </li>
                                </ul>
                            </div>

                            {/* desktop */}
                            <nav className="bottom-nav">
                                <div className="bottom-nav-content-left">
                                    <div className="nav-links">
                                        <Link to={'/products'}>Shop All</Link>
                                        <Link to={'/products/men'}>Shop Mens'</Link>
                                        <Link to={'/products/women'}>Shop Womens'</Link>
                                        <Link to={'/products/kids'}>Shop Kids</Link>
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
                                            <a id="linkToContact" href="#contacth1"><FiHelpCircle /></a>
                                        </div>
                                        <div className="search-btn">
                                            <FaSistrix onClick={this.openSearchPage} />
                                        </div>
                                        <div className="cart-container">
                                            <Link id="cart" to={'/'}><GrCart id="dCart" /><p>{this.state.itemsInCart}</p></Link>
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
                        <Route path="/products/:id" element={<ProductPage handleCartSize={this.handleCartSize} />}></Route>
                        <Route path="/admin" element={<AdminBoard />}></Route>
                        <Route path='/products/men' element={<MenProducts />}></Route>
                        <Route path="/products/women" element={<WomenProducts />}></Route>
                        <Route path="/products/kids" element={<KidsProducts />}></Route>
                        {/* Page doesn't exist css later */}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <SearchPage openSearchPage={this.openSearchPage} handleSearch={this.handleSearch} productsData={this.state.productsData} />
                </BrowserRouter>
                {/* keep these constant at bottom of page */}
                <footer className="constant-footer">
                    <div className="footer-content">
                        <div className="footer-content-left">
                            social links, etc
                        </div>
                        <div className="contact-us-container">
                            <div className="contact-us">
                                {/* create a contact us form */}
                                <h2 id="contacth1">Contact Us</h2>
                                <p>
                                    If you have any questions or concerns, please contact us using the form below.
                                </p>
                                <form id="contact">
                                    <div className="form-group">

                                        <input type="text" className="form-input" id="name" placeholder="Enter your name" required />
                                    </div>
                                    <div className="form-group">

                                        <input type="email" className="form-input" id="email" placeholder="Enter your email" required />
                                    </div>
                                    <div className="form-group">

                                        <textarea className="form-input" id="message" rows="3" placeholder="Enter your message" required={true} ></textarea>
                                    </div>
                                    <button type="submit" className="form-submit-btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        )
    }
}

export default App;