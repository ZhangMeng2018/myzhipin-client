import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Routher,Route,Switch} from "react-router-dom"
import {Provider} from 'react-redux'

import Login from "./containers/login/login"
import Main from "./containers/main/main"
import Register from "./containers/register/register"
import store from "./redux/store";
import './assets/errorMsg/errorMsg.less'

ReactDOM.render(
    (
      <Provider store={store}>
        <Routher>
          <Switch>
            <Route path ='/login' component = {Login}/>
            <Route path ='/register' component = {Register}/>
            <Route component = {Main}/>
          </Switch>
        </Routher>
      </Provider>)
    , document.getElementById('root'));
