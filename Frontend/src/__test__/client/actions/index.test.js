import expect from 'expect';

import * as actions from './../../../client/actions/index';
import {AUTH_STATUS} from './../../../client/actions/types';

const history = {
    push: function(url){
        // to be past as props.. do nothing..
    }
}

describe('Action: force_noAuthStatus', () => {

    it('Set auth status to false', () => {

        const mockData = false;

        const expectedAction = {
            type: AUTH_STATUS,
            payload: mockData
        }

        expect(actions.force_noAuthStatus(mockData, history)).toEqual(expectedAction)

    })

});
