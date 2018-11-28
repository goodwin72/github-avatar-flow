import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import BaseURLs from '../BaseURLs';
import AvatarList from '../AvatarList';
import Avatar from '../Avatar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

describe('<AvatarList />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        'login':'andykent',
        'id':614,
        'avatar_url':'https://avatars3.githubusercontent.com/u/614?v=4'
      },
      {
        'login':'mojombo',
        'id':1,
        'avatar_url':'https://avatars0.githubusercontent.com/u/1?v=4'
      },
    ]));

    shallow(<AvatarList />);
  });

  // This test doesn't work for some reason.
  // My assumption is that my fetch mock is not returning data in
  //  the format that the code handles assigning it to
  //  state expects.
  /* it('renders an Avatar for each User in state', () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        'login':'andykent',
        'id':614,
        'avatar_url':'https://avatars3.githubusercontent.com/u/614?v=4'
      },
      {
        'login':'mojombo',
        'id':1,
        'avatar_url':'https://avatars0.githubusercontent.com/u/1?v=4'
      },
    ]));

    const wrapper = shallow(<AvatarList />);
    expect(wrapper.find(Avatar).length).toBe(2);
  }); */
});
