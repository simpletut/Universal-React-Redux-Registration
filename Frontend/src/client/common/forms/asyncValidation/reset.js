import axios from 'axios';
import { RESET_PW_ERROR } from './../../../actions/types';
import webConfig from './../../../../../webConfig';

const asyncValidate = (values, dispatch, props, field) => {
    
    var error = {};

    const email = new Promise(resolve => {
        if (values.email) {
            axios.post(`${webConfig.axiosInstance_baseURL}/users/email/unique`, values)
            .then(res => {

                if (res.data.unique === true) {
                    error.email = 'Account not found.';
                }

                resolve()

            }).catch(() => {
                dispatch({
                    type: RESET_PW_ERROR,
                    payload: true
                });
            });

        }else{
            resolve()
        }
    });

    return Promise.all([email]).then(() => {
        if(error.email){
            throw error;
        }
    });

};

export default asyncValidate

