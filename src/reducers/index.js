//将多个reducer合成一个大的reducer
import {combineReducers} from "redux";
import authReducer from './authReducer'

export default combineReducers({
    auth:authReducer,
})
