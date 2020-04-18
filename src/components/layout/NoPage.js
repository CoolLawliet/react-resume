import React, {Component} from 'react';
import './404.css'

class NoPage extends Component {
    render() {
        return (
            <div className="error-page">
                <div className="pic-404">
                    <img className="pic-404__parent" src={require('./404.png')} alt=""/>
                </div>
                <div className="notFound">
                    <span>啊哦~~~你访问的页面不存在哦</span>
                    <span>
                        你可以尝试
                    <a className="link" onClick={()=>window.history.go(-1)}>返回上一页</a>
                </span>
                </div>
            </div>
        );
    }
}

export default NoPage;


