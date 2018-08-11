import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch} from "react-router-dom"
import Login from "./containers/login/login"
import Main from "./containers/main/main"
import Register from "./containers/register/register"
ReactDOM.render(
    (<HashRouter>
        <Switch>
            <Route path ='/login' component = {Login}/>
            <Route path ='/register' component = {Register}/>
            <Route component =  {Main}/>
        </Switch>
    </HashRouter>)
    , document.getElementById('root'));

