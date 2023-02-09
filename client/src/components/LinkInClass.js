//Author: Derek O Reilly
//
// Helper Component class that allows us to have a button that render the same way as a <Link> component
// Use this class to link to functions within the same class
// Use <Link> to link to Components that are in other routes
import React, {Component} from "react"


export default class LinkInClass extends Component
{
    render()
    {
        return (
            <span tabIndex="0" className={this.props.className} onClick={(event) => {this.props.onClick(event)}}>     
                {this.props.value}
            </span>
        )
    }
}