import { CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_ERROR, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_ERROR, RESET_PW_SUCCESS, RESET_PW_ERROR } from './../actions/types';

const initial_state = {
    newEmail: false,
    newEmailErrors: false,
    newPassword: false,
    newPasswordErrors: false,
    resetPassword: false,
    resetPasswordErrors: false
}

export default function (state = initial_state, action) {
    switch (action.type) {
        case CHANGE_EMAIL_SUCCESS:
            return { ...state, newEmail: action.payload };
        case CHANGE_EMAIL_ERROR:
            return { ...state, newEmailErrors: action.payload }
        case NEW_PASSWORD_SUCCESS:
            return { ...state, newPassword: action.payload };
        case NEW_PASSWORD_ERROR:
            return { ...state, newPasswordErrors: action.payload };
        case RESET_PW_SUCCESS:
            return { ...state, resetPassword: action.payload }
        case RESET_PW_ERROR:
            return { ...state, resetPasswordErrors: action.payload }
        default:
            return state;
    }
}