import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Spinner from "../../common/Spinner";
import ProfileActives from "./ProfileActives";
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
    componentDidMount() {
        //调用action
        this.props.getCurrentProfile()
    }

    onDeleteClick(e){
        //调用action
        this.props.deleteAccount()
    }

    render() {
        const {user} = this.props.auth

        const {profile,loading} = this.props.profile
        let dashboardContent;

        //判断profile是否为空或者loading是否为真
        if (profile===null || loading){
            dashboardContent =<Spinner/>
        }else {
            //检查对象中是否有数据‘
            if (Object.keys(profile).length>0){
                //有数据
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActives/>

                        {/* 教育经历 & 个人履历 */}
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>

                        {/* 删除账户按钮 */}
                        <div style={{ marginBottom: '60px' }} />
                        <button
                            onClick={this.onDeleteClick.bind(this)}
                            className="btn btn-danger"
                        >
                            删除当前账户
                        </button>
                    </div>
                )
            }else{
                //用户登录，但是没有数据
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">欢迎 {user.name}</p>
                        <p>没有任何相关的个人信息，请添加一些您的个人信息</p>
                        <Link className="btn btn-lg btn-info" to='/create-profile'>创建个人信息</Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

//将状态映射为属性
const mapStateToProps = (state)=>({
    auth:state.auth,
    profile:state.profile
})
export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dashboard) ;