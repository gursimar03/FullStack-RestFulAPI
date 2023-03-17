import React from "react";
import ScrollToTop from "../ScrollToTop";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="error-page">
                <ScrollToTop />
                <h1>The page you are looking for does not exist.</h1>
                <FaHome className="home-favicon"/>
                <Link to={'/'}>Back to home</Link>
            </div>
        )
    }
}


export default ErrorPage;