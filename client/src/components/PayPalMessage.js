import React, {Component} from "react"
import { Navigate as Redirect, Link } from "react-router-dom"

export default class PayPalMessage extends Component
{      
    static messageType = {SUCCESS:"success", 
                          ERROR:"error", 
                          CANCEL:"cancel"}
    
    constructor(props)
    {
        super(props)
        
        this.state = {redirectToDisplayAllCars:false,
                      buttonColour:"red-button"}
    }          
    
    
    componentDidMount() 
    {     
        if(this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS)
        {
            this.setState({heading:"PayPal Transaction Confirmation",
                           message:"Your PayPal transaction was successful.", 
                           buttonColour:"green-button"})
        }
        else if(this.props.match.params.messageType === PayPalMessage.messageType.CANCEL)
        {
            this.setState({heading:"PayPal Transaction Cancelled",
                           message:"You cancelled your PayPal transaction. Therefore, the transaction was not completed."})            
        }
        else if(this.props.match.params.messageType === PayPalMessage.messageType.ERROR)
        {
            this.setState({heading:"PayPal Transaction Error",
                           message:"An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again."})     
        }
        else
        {
            console.log("The 'messageType' prop that was passed into the PayPalMessage component is invalid. It must be one of the following: PayPalMessage.messageType.SUCCESS, PayPalMessage.messageType.CANCEL or PayPalMessage.messageType.ERROR") 
        }
    }
    
    
    render()
    {                 
        return (
            <div className="payPalMessage">
                
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null} 
                
                <h3>{this.state.heading}</h3>
                <p>{this.props.match.params.message}</p>
                <p>{this.state.message}</p>
                
                {this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS ? <p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p> : null}
                
                <p id="payPalPaymentIDButton"><Link className={this.state.buttonColour} to={"/DisplayAllCars"}>Continue</Link></p>                                     
            </div>
        )
    }
}