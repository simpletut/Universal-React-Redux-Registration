import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './../../../../client/pages/auth/login';

const LoginComponent = Login.component;

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Login Page', () => {

    let store;
    beforeEach(() => {
        store = mockStore({
            authStatus: {
                status: false,
                errors: false
            }
        })
    });

    it('LogIn form renders as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <LoginComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.auth_wrap').length).toBe(1);
    });

    it('Quick links render as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <LoginComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.quick_links ul li').length).toBe(2);
    });

});