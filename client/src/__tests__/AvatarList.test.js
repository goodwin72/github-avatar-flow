import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';
import AvatarList from '../AvatarList';
import 'bootstrap/dist/js/bootstrap.bundle.min';

describe('<AvatarList />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        'login': 'andykent',
        'id': 614,
        'avatar_url': 'https://avatars3.githubusercontent.com/u/614?v=4',
      },
      {
        'login': 'mojombo',
        'id': 1,
        'avatar_url': 'https://avatars0.githubusercontent.com/u/1?v=4',
      },
    ]));

    shallow(<AvatarList />);
  });

  // This test doesn't work for some reason.
  // My assumption is that my fetch mock is not returning data in
  //  the format that the code handles assigning it to
  //  state expects.
  it('renders an Avatar for each User in state', (done) => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        'login': 'andykent',
        'id': 614,
        'avatar_url': 'https://avatars3.githubusercontent.com/u/614?v=4',
      },
      {
        'login': 'mojombo',
        'id': 1,
        'avatar_url': 'https://avatars0.githubusercontent.com/u/1?v=4',
      },
    ]));

    const wrapper = shallow(<AvatarList />);

    // Wait for the DOM to be re-rendered.
    setTimeout(() => {
      // console.log(wrapper.debug());
      expect(wrapper.update().find(Avatar).length).toBe(2);
      done();
    }, 0);
  });
});
