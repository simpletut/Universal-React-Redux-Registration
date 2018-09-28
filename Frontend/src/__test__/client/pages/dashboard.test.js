import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from './../../../client/pages/dashboard';

const DashboardComponent = Dashboard.component;

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Dashboard Page', () => {

  let store;
  beforeEach(() => { store = mockStore({}) });

  it('Renders as expected', () => {

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <DashboardComponent />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.content_block').length).toBe(1);

  });

});