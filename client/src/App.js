import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import AllProducts from "./components/AllProducts"
import Cart from "./components/Cart"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import ProductPage from "./components/ProductPage"
import LoggedInRoute from "./components/LoggedInRoute"

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
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/HomePage" component={HomePage} />             
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/Login" component={Login} />
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <Route exact path="/AllProducts" component={AllProducts}/> 
                    <Route path="*" component={HomePage}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}