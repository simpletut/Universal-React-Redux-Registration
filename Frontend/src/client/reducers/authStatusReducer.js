import {AUTH_STATUS, AUTH_ERROR} from './../actions/types';

let initial_state = {
    status: null,
    errors: null
}

export default function(state = initial_state, action){
    switch(action.type){
        case AUTH_STATUS: 
            return {...state, status: action.payload};
        case AUTH_ERROR:
            return {...state, errors: action.payload};
        default:
            return state;
    }
}