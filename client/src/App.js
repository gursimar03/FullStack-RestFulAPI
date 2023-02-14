import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from 'react-icons/fa';

import HomePage from "./components/HomePage";


import { ACCESS_LEVEL_GUEST } from "./config/global_constants";


if (typeof localStorage.accessLevel === "undefined") {
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="content-top">
                        <nav className="top-nav">
                            <div className="nav-content-left">
                                <Link id="logo" to={'/'}>Logo</Link>
                            </div>
                            <div className="nav-content-right">
                                <Link id="linkToSignIn" to={'/'}><p>Sign In</p></Link>
                                <Link id="linkToAccount" to={'/'}><FaRegUserCircle className="account-icon" /></Link>
                            </div>
                        </nav>
                        <header className="header-container">
                            <nav className="bottom-nav">
                                
                            </nav>
                            <div>

                            </div>
                        </header>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;