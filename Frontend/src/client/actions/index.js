import { AUTH_STATUS, AUTH_ERROR, CURRENT_USER, SIGNUP_SUCCESS, SIGNUP_ERROR, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_ERROR, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_ERROR, RESET_PW_SUCCESS, RESET_PW_ERROR, GET_USERS } from './types';
import * as Cookies from 'es-cookie';

export const signupUser = (data) => async (dispatch, getState, api) => {
    
    await api.post('/users', data).then(response => {
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: true
        })
    }).catch((err) => {
        dispatch({
            type: SIGNUP_ERROR,
            payload: true
        });
    })

};

export const loginUser = (data) => async (dispatch, getState, api) => {

    await api.post('/auth', data).then(response => {
        const token = response.data;
        Cookies.set('token', token);
        dispatch({
            type: AUTH_STATUS,
            payload: true
        })
    }).catch((err) => {
        dispatch({
            type: AUTH_ERROR,
            payload: true
        })
    })

};

export const getAuthStatus = () => async (dispatch, getState, api) => {

    const status = await api.get('/auth/status');

    dispatch({
        type: AUTH_STATUS,
        payload: status.data
    })

};

export const checkAuthStatus = (token) => async (dispatch, getState, api) => {

    if (token) {
        api.defaults.headers['x-auth-token'] = token;
    }

    await api.get('/auth/status').then(() => {
    }).catch(() => {
        dispatch({
            type: AUTH_STATUS,
            payload: false
        })
    });

};

export function force_noAuthStatus() {
    return {
      type: AUTH_STATUS,
      payload: false
    }
  }

export const get_currentUser = (token) => async (dispatch, getState, api) => {

    if (token !== 'noToken') {
        api.defaults.headers['x-auth-token'] = token;
    }

    await api.get('/users/current-user').then(res => {
        dispatch({
            type: CURRENT_USER,
            payload: res.data
        })
    }).catch(() => {

    });
}

export const changeEmail = (token, data) => async (dispatch, getState, api) => {

    if (token) {
        api.defaults.headers['x-auth-token'] = token;
    }

    await api.put('/users/email', data).then(res => {
        dispatch({
            type: CHANGE_EMAIL_SUCCESS,
            payload: true
        })
    }).catch(err => {
        dispatch({
            type: CHANGE_EMAIL_ERROR,
            payload: true
        });
    });

}

export const changePassword = (token, data) => async (dispatch, getState, api) => {
    if (token) {
        api.defaults.headers['x-auth-token'] = token;
    }

    await api.put('/users/password', data).then(res => {
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: true
        })
    }).catch(() => {
        dispatch({
            type: NEW_PASSWORD_ERROR,
            payload: true
        });
    });
}


export const resetPassword = (data) => async (dispatch, getState, api) => {

    await api.put('/users/reset', data).then(res => {
        dispatch({
            type: RESET_PW_SUCCESS,
            payload: true
        })
    }).catch(err => {
        dispatch({
            type: RESET_PW_ERROR,
            payload: true
        });
    });

}

export const getUsers = (page) => async (dispatch, getState, api) => {
    
    const dataObj = {
        page
    };

    await api.post('/users/page', dataObj).then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err);
    });

};