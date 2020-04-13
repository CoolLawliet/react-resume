import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";
import {GET_ERRORS} from './types'

export const registerUser=(userData,history)=>dispatch=>{
    // 请求
    axios.post('/api/users/register',userData)
        .then(res=> history.push('/login'))
        .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

//登录
export const loginUser = userData=>dispatch=>{
    axios.post("/api/users/login",userData)
        .then(res=> {
            const {token} = res.data
            //存储token
            localStorage.setItem('jwtToken',token)
            //设置axios的headers token
            setAuthToken(token)
        })
        .catch(err=>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }))
}