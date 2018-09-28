import {SIGNUP_SUCCESS, SIGNUP_ERROR} from './../actions/types';

const initial_state = {
    signUpStatus: false,
    signUpErrors: false
}

export default function(state = initial_state, action){
    switch(action.type){
        case SIGNUP_SUCCESS: 
            return {...state, signUpStatus: action.payload};
        case SIGNUP_ERROR:
            return {...state, signUpErrors: action.payload}
        default:
            return state;
    }
}