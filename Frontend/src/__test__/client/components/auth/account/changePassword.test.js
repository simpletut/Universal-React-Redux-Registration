import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import ChangePassword from './../../../../../client/components/auth/account/changePassword';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('ChangePassword Component', () => {

  let store;
  beforeEach(() => {
    store = mockStore({
      account: {
        newPassword: false,
        newPasswordErrors: false
      }
    })
  });

  it('Renders as expected', () => {

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ChangePassword />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.auth_wrap').length).toBe(1);

  });

});