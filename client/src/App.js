import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import HomePage from "./components/HomePage"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>           
                    <Route exact path="/" component={HomePage} />
                    <Route path="*" component={HomePage}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}