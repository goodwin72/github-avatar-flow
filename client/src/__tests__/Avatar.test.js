import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Avatar from '../Avatar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    shallow(
      <Avatar 
        login={'andykent'} 
        id={614} 
        avatarURL={'https://avatars3.githubusercontent.com/u/614?v=4'} 
      />
    );
  });
});
