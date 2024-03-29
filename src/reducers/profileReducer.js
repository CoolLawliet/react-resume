import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, IS_NAVFOOT} from "../actions/types";

const initialState = {
    profile:null,
    profiles:null,
    loading:false,
    isNavFoot:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_NAVFOOT:
            return {
                isNavFoot:true
        }
        case GET_PROFILES:
            return {
                ...state,
                profiles:action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile:action.payload,
                loading: false
            }
        default:
            return state;
    }
}