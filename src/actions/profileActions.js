import axios from 'axios'
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS} from "./types";

export const getCurrentProfile = ()=>dispatch => {
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
        .catch(err=>{
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}
export const setProfileLoading=()=>{
    return{
        type:PROFILE_LOADING
    }
}

//创建个人信息post数据
export const createProfile = (profileData,history)=>dispatch=>{
    axios.post('/api/profile',profileData)
        .then(res=>{history.push('/dashboard')})
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const clearCurrentProfile=()=>{
    return{
        type:CLEAR_CURRENT_PROFILE
    }
}
