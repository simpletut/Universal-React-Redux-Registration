import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authStatus from './authStatusReducer';
import currentUser from './currentUserReducer';
import signUp from './signUpReducer';
import account from './accountReducer';

export default combineReducers({
    form: formReducer,
    authStatus,
    currentUser,
    signUp,
    account
});