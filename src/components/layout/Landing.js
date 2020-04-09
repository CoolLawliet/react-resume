import React, {Component} from 'react';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">开发者</h1>
                                <p className="lead">
                                    更多内容
                                </p>
                                <hr/>
                                <a href="register.html" className="btn btn-lg btn-info mr-2">注册</a>
                                <a href="login.html" className="btn btn-lg btn-light">登录</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;