import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Account from './../../../../client/pages/auth/account';

const AccountComponent = Account.component;

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Account Page', () => {

    let store;
    beforeEach(() => {
        store = mockStore({
            currentUser: {
                fName: "John",
                lName: "Cena",
                email: "johncena@gmail.com",
                username: "johnCena"
            },
            account: {
                newEmail: false,
                newEmailErrors: false
            }
        })
    });

    it('Renders as expected', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <AccountComponent isUnitTest={true} />
                </Router>
            </Provider>
        );

        expect(wrapper.find('.auth_wrap').length).toBe(2);

    });

});