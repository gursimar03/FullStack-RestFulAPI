import React from "react";
import ScrollToTop from "../ScrollToTop";

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="error-page">
                <ScrollToTop />
                <h1>
                    Sorry this page does not exist
                </h1>
            </div>
        )
    }
}


export default ErrorPage;