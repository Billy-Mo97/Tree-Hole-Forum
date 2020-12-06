import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Login from './login/login'
import {Register} from "./register/register";
import Main from "./mainContainer/main";

import 'antd/dist/antd.css';

export const AppRouter = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/main" exact component={Main}/>

            </Switch>
        </div>
    </Router>
);
