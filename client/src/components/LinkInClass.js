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