//rcc:react class components
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import {logoutUser} from "../../actions/authActions";

class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault()
    }
    render() {

        const {isAuthenticated, user} = this.props.auth

        const authLinks=(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img style={{width:'25px',marginRight:'5px'}} className="rounded-circle" src={user.avatar} alt={user.name}/>退出
                    </a>
                </li>
            </ul>
        )

        const guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/register'>
                        注册
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>
                        登录
                    </Link>
                </li>
            </ul>
        )

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to='/'>开发者</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/profile'> 开发者
                                    </Link>
                                </li>
                            </ul>

                            {isAuthenticated ? authLinks : guestLink}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, {logoutUser})(Navbar);