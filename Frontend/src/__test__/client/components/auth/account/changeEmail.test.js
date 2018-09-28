import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ChangeEmail from './../../../../../client/components/auth/account/changeEmail';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('ChangeEmail Component', () => {

    let store;
    beforeEach(() => { store = mockStore({
        account: {
            newEmail: false,
            newEmailErrors: false
        }
    }) });

    it('Renders as expected', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ChangeEmail />
                </Router>
            </Provider>
        );

        expect(wrapper.find('.auth_wrap').length).toBe(1);

    });

});