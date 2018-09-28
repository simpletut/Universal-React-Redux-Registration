import React from 'react';
import { configure,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './../../../client/components/footer';

configure({ adapter: new Adapter() });

describe('Footer Component', () => {

	it('Ensure Footer component renders', () => {
        
        const component = mount(<Footer />);
        expect(component.find('footer').length).toBe(1);
        
      });
    
});