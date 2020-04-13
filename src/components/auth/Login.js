import React, {Component} from 'react';
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import {loginUser} from "../../actions/authActions";
import classnames from 'classnames'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const newUser={
            email:this.state.email,
            password:this.state.password
        };
        this.props.loginUser(newUser)
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }

        if (nextProps.errors){
            this.setState({
                errors:nextProps.errors
            })
        }
    }

    render() {
        const {errors} = this.state

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">登录</h1>
                            <p className="lead text-center">用正确的账号登录</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg',{
                                            'is-invalid':errors.email
                                        })}
                                        placeholder="邮箱地址"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>)
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg',{
                                            'is-invalid':errors.password
                                        })}
                                        placeholder="密码"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>)
                                    }
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes={
    loginUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps,{loginUser})(Login);