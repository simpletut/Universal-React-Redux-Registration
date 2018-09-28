import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import Header from './../../../client/components/header';

configure({ adapter: new Adapter() });

describe('Main layout Header Component', () => {

    it('Ensure Header component renders', () => {

        const component = mount(
            <BrowserRouter>
                <Header />
            </BrowserRouter>);
            
        expect(component.find('header').length).toBe(1);

    });

});