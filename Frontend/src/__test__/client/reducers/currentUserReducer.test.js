import currentUserReducer from './../../../client/reducers/currentUserReducer';
import {CURRENT_USER} from './../../../client/actions/types';

describe('Current User Reducer', () => {
    
    const expectedObj = {
        fName: "John",
        lName: "Cena",
        email: "johncena@gmail.com",
        username: "johncena"
    }

	it('Has a default state', () => {
		expect(currentUserReducer(undefined, {
			type: "unexpected"
		})).toEqual(null);
	});

	it('Current user details returned', () => {
		expect(currentUserReducer(undefined, {
			type: CURRENT_USER,
			payload: expectedObj
		})).toEqual(expectedObj);
    });

	
});