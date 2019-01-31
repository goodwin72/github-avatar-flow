import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    shallow(
      <Avatar
        login='andykent'
        id={614}
        avatarURL='https://avatars3.githubusercontent.com/u/614?v=4'
      />
    );
  });
});
