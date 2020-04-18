import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import PrivateRoute from "./common/PrivateRoute";
import NoPage from "./components/layout/NoPage";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode'

import './App.css';

//Provider在根组件外面包了一层，这样一来，App的所有子组件就默认可用啊到state
import {Provider} from 'react-redux'

import store from "./store";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import {getCurrentProfile, isNavFoot} from "./actions/profileActions";
import CreateProfile from "./components/create-profile/CreateProfile";

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    //解析token
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))

    //检测token是否过期
    //获取当前时间
    const currentTime = Date.now() / 1000

    //判断当前时间是否大于token过期时间
    if (decoded.exp < currentTime) {
        //过期
        store.dispatch(logoutUser())
        //TODO:清除用户信息

        //页面跳转
        window.location.href = '/login'
    }

}


class App extends Component {
    state={};

    static getDerivedStateFromProps(nextProps,nextState){

        let path = nextProps.location.pathname;
        if (/register|login|profiles|profile|dashboard|create-profile|edit-profile|add-experience|add-education|feed|post/.test(path)){
            store.dispatch(isNavFoot())
            store.dispatch(getCurrentProfile())
        }
        return null;

    }
    render() {
        const {isNavFoot} = store.getState().profile;
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        {isNavFoot&&<Navbar/>}
                        <Route exact path='/' component={Landing}/>
                        <div className="container">
                            <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/profiles' component={Profiles}/>
                            <Route exact path='/profile/:handle' component={Profile}/>
                            {/*<Route exact path='/profile/:userId' component={Profile}/>*/}

                                <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                                <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
                                <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
                                <PrivateRoute exact path='/add-experience' component={AddExperience}/>
                                <PrivateRoute exact path='/add-education' component={AddEducation}/>
                                <PrivateRoute exact path='/feed' component={Posts}/>
                                <PrivateRoute exact path='/post/:id' component={Post}/>
                                <Route component={NoPage} />
                            </Switch>
                        </div>
                        {isNavFoot && <Footer/>}
                    </div>
                </Router>
            </Provider>
        );
    }
}
// const mapStateToProps = state => ({
//     bNav:state.bNav
// })

export default App;
