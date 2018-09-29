import axios from 'axios';
import { SIGNUP_ERROR } from './../../../actions/types';
import webConfig from './../../../../../webConfig';

const asyncValidate = (values, dispatch, props, field) => {
    
    var error = {};

    const email = new Promise(resolve => {
        if (values.email) {
            axios.post(`${webConfig.axiosInstance_baseURL}/users/email/unique`, values)
            .then(res => {

                if (res.data.unique != true) {
                    error.email = 'Email has been used...';
                }

                resolve()

            }).catch(() => {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: true
                });
            });

        }else{
            resolve()
        }
    });

    const username = new Promise(resolve => {
        if (values.username) {
            axios.post(`${webConfig.axiosInstance_baseURL}/users/username/unique`, values)
            .then(res => {

                if (res.data.unique != true) {
                    error.username = 'Username has been used.';
                }

                resolve()

            }).catch(() => {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: true
                });
            });

        }else{
            resolve()
        }
    });

    return Promise.all([email, username]).then(() => {
        if(error.email || error.username){
            throw error;
        }
    });

};

export default asyncValidate

