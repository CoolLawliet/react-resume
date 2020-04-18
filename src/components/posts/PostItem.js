import React, {Component} from 'react'
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {deletePost, addLike, removeLike} from '../../actions/postActions';

class PostItem extends Component {
    render() {
        const {post, auth, showActions} = this.props
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-nonse d-md-block"
                                 src={post.avatar}
                                 alt=""/>
                        </a>
                        <br/>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {
                            showActions ? (
                                <span>
                  <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames("fas fa-thumbs-up", {
                        'text-info': this.findUserLike(post.likes)
                    })}/>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button"
                          className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"/>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    鼓励留言
                  </Link>
                                    {
                                        post.user === auth.user.id ? (
                                            <button
                                                onClick={this.onDeleteClick.bind(this, post._id)}
                                                type="button"
                                                className="btn btn-danger mr-1">
                                                删除
                                            </button>
                                        ) : null
                                    }
                </span>
                            ) : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);