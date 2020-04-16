import axios from 'axios'
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from "./types";

export const getCurrentProfile = () => dispatch => {
    //加载动画
    dispatch(setProfileLoading())
    //请求数据
    axios('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}
//删除账户
export const deleteAccount = () => dispatch => {
    axios.delete('/api/profile')
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
//添加个人经历
export const addExperience = (expData, history) => dispatch => {
    axios.post('api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
//删除个人经历
export const deleteExperience = id => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(res =>{
            console.log(res);
            dispatch({
            type: GET_PROFILE,
            payload: res.data
        })}

        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
//添加教育经历
export const addEducation = (eduData, history) => dispatch => {
    axios.post('api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//创建个人信息post数据
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => {
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
