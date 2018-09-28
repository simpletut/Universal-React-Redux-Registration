import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Register from './../../../../client/pages/auth/register';

const RegisterComponent = Register.component;

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Register Page', () => {

    let store;
    beforeEach(() => {
        store = mockStore({
            signUp: {
                signUpStatus: false,
                signUpErrors: false
            }
        })
    });

    it('Register renders as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <RegisterComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.auth_wrap').length).toBe(1);
    });

    it('All form fields render', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <RegisterComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.form_row').length).toBe(6);
    });

    it('Quick links render as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <RegisterComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.quick_links ul li').length).toBe(2);
    });



});