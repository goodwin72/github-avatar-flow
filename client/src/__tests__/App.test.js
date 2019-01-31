import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Navbar from '../Navbar';
import AvatarList from '../AvatarList';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders a Navbar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navbar).length).toBe(1);
  });

  it('renders an AvatarList', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AvatarList).length).toBe(1);
  });
});
