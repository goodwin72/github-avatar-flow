import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import AvatarList from '../AvatarList';
import Avatar from '../Avatar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

describe('<AvatarList />', () => {
  it('renders without crashing', () => {
    shallow(<AvatarList />);
  });
});
