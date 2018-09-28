import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Reset from './../../../../client/pages/auth/reset';

const ResetComponent = Reset.component;

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Reset Page', () => {

    let store;
    beforeEach(() => {
        store = mockStore({
            account: {
                resetPassword: false,
                resetPasswordErrors: false
            }
        })
    });

    it('Reset renders as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ResetComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.auth_wrap').length).toBe(1);
    });

    it('Quick links render as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ResetComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.quick_links ul li').length).toBe(1);
    });

    it('Form fields render as expected', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ResetComponent />
                </Router>
            </Provider>
        );
        expect(wrapper.find('.form_row').length).toBe(1);
    });

    



});