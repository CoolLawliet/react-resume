import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import './App.css';

//Provider在根组件外面包了一层，这样一来，App的所有子组件就默认可用啊到state
import {Provider} from 'react-redux'

import store from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path='/' component={Landing}/>
                        <div className="container">
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }


}

export default App;
