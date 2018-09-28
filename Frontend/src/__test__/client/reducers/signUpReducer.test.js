import signUpReducer from './../../../client/reducers/signUpReducer';
import {SIGNUP_SUCCESS, SIGNUP_ERROR} from './../../../client/actions/types';

describe('SignUp Reducer Reducer', () => {

	const initial_state = {
        signUpStatus: false,
        signUpErrors: false
	}

	it('Has a default state', () => {
		expect(signUpReducer(undefined, {
			type: "unexpected"
		})).toEqual({ ...initial_state });
    });
    
    it('SignUp Success', () => {
		expect(signUpReducer(undefined, {
            type: SIGNUP_SUCCESS,
            payload: true
		})).toEqual({ 
            ...initial_state,
            signUpStatus: true
        });
    });
    
    it('SignUp Error', () => {
		expect(signUpReducer(undefined, {
            type: SIGNUP_ERROR,
            payload: true
		})).toEqual({ 
            ...initial_state,
            signUpErrors: true
        });
	});

	
});