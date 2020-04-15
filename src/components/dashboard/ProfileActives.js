import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActives = () => {
    return (
        <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> 编辑个人信息
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1" />
                添加个人经历
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-info mr-1" />
                添加教育经历
            </Link>
        </div>
    );
};

export default ProfileActives;