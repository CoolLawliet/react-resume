import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import {getProfileByHandle,getProfileByUserId} from "../../actions/profileActions";
import Spinner from "../../common/Spinner";

class Profile extends Component {
    componentDidMount() {
        // console.log(this.props.match.params);
        if (this.props.match.params.handle.length<24) {
            this.props.getProfileByHandle(this.props.match.params.handle)
        }else{
            this.props.getProfileByUserId(this.props.match.params.handle)
        }
    }

    render() {
        const {profile, loading} = this.props.profile
        let profileContent

        if (profile === null || loading) {
            profileContent = <Spinner/>
        } else {
            profileContent = (
                <div>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                    返回个人信息
                                </Link>
                            </div>
                            <div className="col-md-6"/>
                        </div>
                        <ProfileHeader profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <ProfileCreds education={profile.education} experience={profile.experience}/>
                        {
                            profile.githubusername
                                ? (<ProfileGithub username={profile.githubusername}/>)
                                : null
                        }
                    </div>
                </div>
            )
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    getProfileByUserId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

//将状态映射为属性
const mapStateToProps = (state) => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getProfileByHandle,getProfileByUserId})(Profile);