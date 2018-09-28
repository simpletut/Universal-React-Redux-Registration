import {CURRENT_USER} from './../actions/types';

export default function(state = null, action){
    switch(action.type){
        case CURRENT_USER: 
            return action.payload;
        default:
            return state;
    }
}