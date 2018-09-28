import accountReducer from './../../../client/reducers/accountReducer';
import { CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_ERROR, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_ERROR, RESET_PW_SUCCESS, RESET_PW_ERROR } from './../../../client/actions/types';

describe('Account Reducer', () => {

	const initial_state = {
		newEmail: false,
		newEmailErrors: false,
		newPassword: false,
		newPasswordErrors: false,
		resetPassword: false,
		resetPasswordErrors: false
	}

	it('Has a default state', () => {
		expect(accountReducer(undefined, {
			type: "unexpected"
		})).toEqual({ ...initial_state });
	});

	it('User email changed', () => {
		expect(accountReducer(undefined, {
			type: CHANGE_EMAIL_SUCCESS,
			payload: true
		})).toEqual({
			...initial_state,
			newEmail: true
		});
	});

	it('User email error', () => {
		expect(accountReducer(undefined, {
			type: CHANGE_EMAIL_ERROR,
			payload: true
		})).toEqual({
			...initial_state,
			newEmailErrors: true
		});
	});

	it('Changed user password', () => {
		expect(accountReducer(undefined, {
			type: NEW_PASSWORD_SUCCESS,
			payload: true
		})).toEqual({
			...initial_state,
			newPassword: true
		});
	});

	it('Change password error', () => {
		expect(accountReducer(undefined, {
			type: NEW_PASSWORD_ERROR,
			payload: true
		})).toEqual({
			...initial_state,
			newPasswordErrors: true
		});
	});

	it('User password reset', () => {
		expect(accountReducer(undefined, {
			type: RESET_PW_SUCCESS,
			payload: true
		})).toEqual({
			...initial_state,
			resetPassword: true
		});
	});

	it('User password reset errors', () => {
		expect(accountReducer(undefined, {
			type: RESET_PW_ERROR,
			payload: true
		})).toEqual({
			...initial_state,
			resetPasswordErrors: true
		});
	});

});