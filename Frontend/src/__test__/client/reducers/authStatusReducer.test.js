import authStatusReducer from './../../../client/reducers/authStatusReducer';
import {AUTH_STATUS, AUTH_ERROR} from './../../../client/actions/types';

describe('authStatus Reducer', () => {

	const initial_state = {
        status: null,
        errors: null
	}

	it('Has a default state', () => {
		expect(authStatusReducer(undefined, {
			type: "unexpected"
		})).toEqual({ ...initial_state });
	});

	it('User has auth', () => {
		expect(authStatusReducer(undefined, {
			type: AUTH_STATUS,
			payload: true
		})).toEqual({
			...initial_state,
			status: true
		});
    });
    
    it('User auth errors', () => {
		expect(authStatusReducer(undefined, {
			type: AUTH_ERROR,
			payload: true
		})).toEqual({
			...initial_state,
			errors: true
		});
	});

	
});