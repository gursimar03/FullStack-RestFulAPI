import React, {Component} from "react"
import { Navigate as Redirect, Link } from "react-router-dom"

class SuccessMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ redirect: true })
        }, 5000)
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="success-message-container">
                <div className="success-message">
                    <h1>Thank you for your purchase!</h1>
                    <h2>Please check your email for the order confirmation!</h2>
                    <p>You will be redirected to the home page in 5 seconds.</p>
                    <Link to="/">Click here to go to the home page now.</Link>
                </div>
            </div>
        )
    }
}

export default SuccessMessage;